import test from "node:test";
import assert from "node:assert";

function compile(code) {
  // return [...(new TextEncoder).encode('\0asm'), ...[1, 0, 0, 0]];
  // return [(new TextEncoder).encode('\0asm'), [1, 0, 0, 0]].flat(1);
  // return [...[...(new TextEncoder).encode('\0asm')], 1, 0, 0, 0];
  // return [
  //   0x00, // '\0' (magic number)
  //   0x61, // 'a'
  //   0x73, // 's'
  //   0x6d, // 'm'
  //   0x01, // version
  //   0x00, // version
  //   0x00, // version
  //   0x00, // version
  // ];
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
