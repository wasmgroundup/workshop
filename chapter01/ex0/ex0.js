import test from "node:test";
import assert from "node:assert";
import fs from "node:fs/promises";

test("Instantiate add.wasm and call exported functions", async () => {
  const bytes = await fs.readFile("add.wasm");
  // TODO

  assert.equal(add(1, 4), 5);
  assert.equal(addAlt(10, 40), 50);
});
