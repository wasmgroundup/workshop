import test from "node:test";
import assert from "node:assert";
import * as w from "@wasmgroundup/emit";

const { u32 } = w;

function section(id, contents) {
  const sizeInBytes = contents.flat(Infinity).length;
  return [id, u32(sizeInBytes), contents];
}

function vec(elements) {
  return [u32(elements.length), elements];
}

const SECTION_ID_TYPE = 1;

function typesec(functypes) {
  return section(SECTION_ID_TYPE, vec(functypes));
}

function functype(paramTypes, resultTypes) {
  // hint: use `vec`
  return [
    // type section - entry
    0x60, // Type `function`
    0, // Empty vector of parameters
    0, // Empty vector of return values
  ];
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
