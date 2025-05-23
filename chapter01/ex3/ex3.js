import test from "node:test";
import assert from "node:assert";

const m = [
  magic(),
  version(),
  typesec([functype([], [])]),
  funcsec([typeidx(0)]),
  // ----- export section -----
  7, // Section identifier
  5, // Section size in bytes
  1, // Number of entries that follow

  // export section - entry 0
  1, // Name size in bytes
  102, // 'f' char code
  0, // export type: function
  0, // function index
  codesec([code(func([], [instr.end]))]),
];

test("compile result compiles to a WebAssembly object", async () => {
  const mod = module([
    typesec([functype([], [])]),
    funcsec([typeidx(0)]),
    exportsec([export_("main", exportdesc.func(0))]),
    codesec([code(func([], [instr.end]))]),
  ]).flat(Infinity);

  const { instance } = await WebAssembly.instantiate(Uint8Array.from(mod));

  assert.strictEqual(
    instance instanceof WebAssembly.Instance,
    true,
    "instance instanceof Instance",
  );
  assert.equal(instance.exports.main(), undefined);
});
