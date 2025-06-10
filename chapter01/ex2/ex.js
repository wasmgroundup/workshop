import test from "node:test";
import assert from "node:assert";
import * as w from "@wasmgroundup/emit";

function typesec(types) {
  assert.equal(types.length, 0);
  // Return an array of bytes that represents an empty type section
  return [
    // ----- type section -----

    ?, // Section identifier
    ?, // Section size in bytes
    ?, // Number of entries that follow
  ];
}

test("compile result compiles to a WebAssembly object", async () => {
  const mod = w.module([typesec([])]).flat(Infinity);
  const { instance } = await WebAssembly.instantiate(Uint8Array.from(mod));

  assert.strictEqual(
    instance instanceof WebAssembly.Instance,
    true,
    "instance instanceof Instance",
  );
});
