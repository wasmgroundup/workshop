import test from "node:test";
import assert from "node:assert";
import * as w from "@wasmgroundup/emit";

function exportsec(exports) {
  return [
    // ----- export section -----
    7, // Section identifier
    5, // Section size in bytes
    1, // Number of entries that follow

    // export section - entry 0
    1, // Name size in bytes
    102, // 'f' char code
    0, // export type: function
    0, // function index
  ];
}

function export_(nm, exportdesc) {}

const exportdesc = {
  func(idx) {},
};

test("compile result compiles to a WebAssembly object", async () => {
  const mod = w
    .module([
      w.typesec([w.functype([], [])]),
      w.funcsec([w.typeidx(0)]),
      exportsec([export_("f", exportdesc.func(0))]),
      w.codesec([w.code(w.func([], [w.instr.end]))]),
    ])
    .flat(Infinity);

  const { instance } = await WebAssembly.instantiate(Uint8Array.from(mod));

  assert.strictEqual(
    instance instanceof WebAssembly.Instance,
    true,
    "instance instanceof Instance",
  );
  assert.equal(instance.exports.f(), undefined);
});
