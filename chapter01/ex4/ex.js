import test from "node:test";
import assert from "node:assert";
import * as w from "@wasmgroundup/emit";

const { u32 } = w;

export const instr = {
  end: 0x0b,
};

function section(id, contents) {
  const sizeInBytes = contents.flat(Infinity).length;
  return [id, u32(sizeInBytes), contents];
}

function vec(elements) {
  return [u32(elements.length), elements];
}

const SECTION_ID_TYPE = 1;

function functype(paramTypes, resultTypes) {
  return [0x60, vec(paramTypes), vec(resultTypes)];
}

function typesec(functypes) {
  return section(SECTION_ID_TYPE, vec(functypes));
}

function funcsec(typeidxs) {
  return [
    // ----- function section -----

    3, // Section identifier
    2, // Section size in bytes
    1, // Number of entries that follow

    // function section - entry 0
    0, // Index of the type section entry
  ];
}
function typeidx(x) {}
function code(func) {}
function func(locals, body) {}
function codesec(codes) {
  return [
    // ----- code section -----

    10, // Section identifier
    4, // Section size in bytes
    1, // Number of entries that follow

    // code section - entry 0
    2, // Entry size in bytes
    0, // Empty vector of local variables
    11, // `end` instruction
  ];
}

test("compile result compiles to a WebAssembly object", async () => {
  const mod = w
    .module([
      typesec([functype([], [])]),
      funcsec([typeidx(0)]),
      codesec([code(func([], [instr.end]))]),
    ])
    .flat(Infinity);

  const { instance } = await WebAssembly.instantiate(Uint8Array.from(mod));

  assert.strictEqual(
    instance instanceof WebAssembly.Instance,
    true,
    "instance instanceof Instance",
  );
});
