use anyhow::Result;
use js::FromJsContext;

mod engine;
mod global;
mod module;

pub(crate) fn setup(ns: &js::Value) -> Result<()> {
    let wasm_ns = ns.context()?.new_object("WebAssembly");
    ns.set_property("WebAssembly", &wasm_ns)?;

    module::setup(&wasm_ns)?;
    global::setup(&wasm_ns)?;
    wasm_ns.define_property_fn("validate", validate)?;
    wasm_ns.define_property_fn("parseWat", parse_wat)?;
    Ok(())
}

#[js::host_call(with_context)]
fn validate(ctx: js::Context, _this: js::Value, source: js::Bytes) -> Result<bool> {
    let store = engine::GlobalStore::from_js_context(&ctx)?;
    Ok(wasmi::Module::validate(&store.engine(), source.as_bytes()).is_ok())
}

#[js::host_call]
fn parse_wat(source: js::BytesOrString) -> Result<js::Bytes> {
    let wasm = wat::parse_bytes(source.as_bytes())?;
    Ok(wasm.into_owned().into())
}
