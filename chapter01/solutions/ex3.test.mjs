import test from "node:test";
import assert from "node:assert";

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

function stringToBytes(s) {
  const bytes = new TextEncoder().encode(s);
  return Array.from(bytes);
}

function magic() {
  // [0x00, 0x61, 0x73, 0x6d]
  return stringToBytes("\0asm");
}

function version() {
  return [0x01, 0x00, 0x00, 0x00];
}

function u32(v) {
  return v;
}

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

const SECTION_ID_FUNCTION = 3;

const typeidx = (x) => u32(x);

function funcsec(typeidxs) {
  return section(SECTION_ID_FUNCTION, vec(typeidxs));
}

const SECTION_ID_CODE = 10;

function code(func) {
  const sizeInBytes = func.flat(Infinity).length;
  return [u32(sizeInBytes), func];
}

function func(locals, body) {
  return [vec(locals), body];
}

function codesec(codes) {
  return section(SECTION_ID_CODE, vec(codes));
}

const instr = {
  end: 0x0b,
};

const SECTION_ID_EXPORT = 7;

function name(s) {
  return vec(stringToBytes(s));
}

function export_(nm, exportdesc) {
  return [name(nm), exportdesc];
}

function exportsec(exports) {
  return section(SECTION_ID_EXPORT, vec(exports));
}

const funcidx = (x) => u32(x);

const exportdesc = {
  func(idx) {
    return [0x00, funcidx(idx)];
  },
};

function module(sections) {
  return [magic(), version(), sections];
}
