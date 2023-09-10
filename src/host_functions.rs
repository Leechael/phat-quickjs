use alloc::rc::Weak;
use anyhow::Result;
use log::error;

use crate::service::{Service, ServiceRef, ServiceWeakRef};
use crate::traits::ResultExt;

pub(crate) use http_listen::try_accept_http_request;

mod debug;
mod http_listen;
mod http_request;
mod print;
mod timer;
mod url;

pub(crate) fn setup_host_functions(ctx: &js::Context) -> Result<()> {
    let ns = js::Value::new_object(ctx);
    set_extensions(&ns, ctx)?;
    print::setup(&ns)?;
    url::setup(&ns)?;
    timer::setup(&ns)?;
    http_request::setup(&ns)?;
    http_listen::setup(&ns)?;
    debug::setup(&ns)?;
    ns.define_property_fn("close", close_res)?;
    js::get_global(ctx).set_property("Sidevm", &ns)?;
    Ok(())
}

fn set_extensions(ns: &js::Value, ctx: &js::Context) -> Result<()> {
    use qjs_extensions as ext;
    let scale = js::Value::new_object(ctx);
    ext::scale2::setup(&scale)?;
    ns.set_property("SCALE", &scale)?;
    Ok(())
}

#[no_mangle]
extern "C" fn __pink_getrandom(pbuf: *mut u8, nbytes: u8) {
    let buf = unsafe { core::slice::from_raw_parts_mut(pbuf, nbytes as usize) };
    crate::runtime::getrandom(buf).expect("Failed to get random bytes");
}

#[js::host_call(with_context)]
fn close_res(service: ServiceRef, _this: js::Value, res_id: u64) {
    service.remove_resource(res_id);
}
