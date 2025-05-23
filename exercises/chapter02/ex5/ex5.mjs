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
  Main(expr) {
    return [expr.toWasm(), w.instr.end];
  },
  Expr(num, iterOps, iterOperands) {
    const bcFrag = [num.toWasm()];
    for (let i = 0; i < iterOps.numChildren; i++) {
      const op = iterOps.child(i);
      const operand = iterOperands.child(i);
      bcFrag.push(operand.toWasm(), op.toWasm());
    }
    return bcFrag;
  },
  op(_ch) {
    switch (this.sourceString) {
      case '+':
        return [w.instr.i32.add];
      case '-':
        return [w.instr.i32.sub];
      default:
        throw new Error(`Unknown operator: ${this.sourceString}`);
    }
  },
  number(_digits) {
    const jsValue = parseInt(this.sourceString, 10);
    return [w.instr.i32.const, w.i32(jsValue)];
  },
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
  assert.equal(evalWasm('1 + 2 - 33'), 1 + 2 - 33);
});
