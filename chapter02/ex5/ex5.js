import * as ohm from 'ohm-js';
import * as w from '@wasmgroundup/emit';

import test from 'node:test';
import assert from 'node:assert';

const grammarDef = `
  Wafer {
    Main = Expr
    Expr = number (op number)*

    op = "+" | "-"
    number = digit+

    // Examples:
    //+ "42", "1", "66 + 99", "1 + 2 - 3"
    //- "abc"
  }
`;

const wafer = ohm.grammar(grammarDef);

const semantics = wafer.createSemantics();
semantics.addOperation('toWasm', {
  // TODO
});

function compile(input) {
  const r = wafer.match(input);
  if (!r.succeeded()) {
    throw new Error(`Failed to match input: ${input}`);
  }
  // Construct a minimal Wasm module with a single function `main(): i32`.
  const mod = w.module([
    w.typesec([w.functype([], [w.valtype.i32])]),
    w.funcsec([w.typeidx(0)]),
    w.exportsec([w.export_('main', w.exportdesc.func(0))]),
    w.codesec([w.code(w.func([], semantics(r).toWasm()))]),
  ]);

  return Uint8Array.from(mod.flat(Infinity));
}

function loadMod(bytes) {
  const mod = new WebAssembly.Module(bytes);
  return new WebAssembly.Instance(mod).exports;
}

test('toWasm', () => {
  const evalWasm = input => loadMod(compile(input)).main();
  assert.equal(evalWasm('42'), 42);
});
