import test from "node:test";
import assert from "node:assert";

function compile(code) {
  // Fail if the string is any value other than the empty string
  // Return an array of bytes with the smallest module possible
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
