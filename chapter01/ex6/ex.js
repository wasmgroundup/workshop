import test from "node:test";
import assert from "node:assert";
import * as w from "@wasmgroundup/emit";

function compileExpr(expr) {
  // Implement a compiler that takes an expression in reverse polish notation and returns
  // the body of a wasm function, the language only allows integers and basic arithmetic operations:
  // + - * /
  // Note: division should return an integer
  return [w.instr.i32.const, w.i32(42), w.instr.end];
}

function compile(code) {
  return w
    .module([
      w.typesec([w.functype([], [w.valtype.i32])]),
      w.funcsec([w.typeidx(0)]),
      w.exportsec([w.export_("main", w.exportdesc.func(0))]),
      w.codesec([w.code(w.func([], compileExpr(code)))]),
    ])
    .flat(Infinity);
}

async function testExpr(code, expected) {
  const mod = compile(code);

  const { instance } = await WebAssembly.instantiate(Uint8Array.from(mod));

  assert.strictEqual(
    instance instanceof WebAssembly.Instance,
    true,
    "instance instanceof Instance",
  );
  assert.equal(instance.exports.main(), expected);
}

test("compile result compiles to a WebAssembly object", async () => {
  await testExpr("42", 42);
  await testExpr("10 32 +", 42);
  await testExpr("10 37 + 5 -", 42);
});
