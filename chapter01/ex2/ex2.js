import test from "node:test";
import assert from "node:assert";

const m = [
  magic(),
  version(),
  // ----- type section -----
  1, // Section identifier
  4, // Section size in bytes
  1, // Number of entries that follow
  // type section - entry 0
  0x60, // Type `function`
  0, // Empty vector of parameters
  0, // Empty vector of return values
  // ----- function section -----
  3, // Section identifier
  2, // Section size in bytes
  1, // Number of entries that follow
  // function section - entry 0
  0, // Index of the type section entry
  // ----- code section -----
  10, // Section identifier
  4, // Section size in bytes
  1, // Number of entries that follow
  // code section - entry 0
  2, // Entry size in bytes
  0, // Empty vector of local variables
  11, // `end` instruction
].flat(Infinity);

test("compile result compiles to a WebAssembly object", async () => {
  const mod = module([
    typesec([functype(/* params */ [], /* returns */ [])]),
    funcsec([typeidx(0)]),
    codesec([code(func(/* locals */ [], [instr.end]))]),
  ]).flat(Infinity);

  const { instance } = await WebAssembly.instantiate(Uint8Array.from(mod));

  assert.strictEqual(
    instance instanceof WebAssembly.Instance,
    true,
    "instance instanceof Instance",
  );
});
