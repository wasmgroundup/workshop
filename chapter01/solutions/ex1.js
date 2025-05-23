import test from "node:test";
import assert from "node:assert";

function compile(code) {
  //return [...(new TextEncoder).encode('\0asm'), ...[1, 0, 0, 0]];
  //return [(new TextEncoder).encode('\0asm'), [1, 0, 0, 0]].flat(1);
  return [0, 97, 115, 109, 1, 0, 0, 0];
}

test("compile result compiles to a WebAssembly object", async () => {
  const { instance, module } = await WebAssembly.instantiate(
    Uint8Array.from(compile("")),
  );

  assert.strictEqual(
    instance instanceof WebAssembly.Instance,
    true,
    "instance instanceof Instance",
  );
  assert.strictEqual(
    module instanceof WebAssembly.Module,
    true,
    "module instanceof Module",
  );
});
