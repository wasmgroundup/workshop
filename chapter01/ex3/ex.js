import test from "node:test";
import assert from "node:assert";
import * as w from "@wasmgroundup/emit";

function typesec(types) {
  return [
    1, // Section identifier
    4, // Section size in bytes
    1, // Number of entries that follow
    ...types,
  ];
}

function functype(params, returns) {
  assert.equal(params.length, 0);
  assert.equal(returns.length, 0);
  // Return an array of bytes that represents a function with no params and no returns
}

test("compile result compiles to a WebAssembly object", async () => {
  const mod = w.module([typesec([functype([], [])])]).flat(Infinity);

  const { instance } = await WebAssembly.instantiate(Uint8Array.from(mod));

  assert.strictEqual(
    instance instanceof WebAssembly.Instance,
    true,
    "instance instanceof Instance",
  );
});
