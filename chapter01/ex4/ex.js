import test from "node:test";
import assert from "node:assert";
import * as w from "@wasmgroundup/emit";

function module(sections) {
  return [w.magic(), w.version(), ...sections];
}

function funcsec(typeidxs) {}
function typeidx(x) {}
function code(func) {}
function func(locals, body) {}
function codesec(codes) {}

export const instr = {
  end: 0x0b,
};

test("compile result compiles to a WebAssembly object", async () => {
  const mod = module([
    w.typesec([w.functype([], [])]),
    funcsec([typeidx(0)]),
    codesec([code(func([], [instr.end]))]),
  ]).flat(Infinity);

  const { instance } = await WebAssembly.instantiate(Uint8Array.from(mod));

  assert.strictEqual(
    instance instanceof WebAssembly.Instance,
    true,
    "instance instanceof Instance",
  );
});
