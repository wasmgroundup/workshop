import * as ohm from 'ohm-js';

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
semantics.addOperation('jsValue', {
  // TODO
});

test('jsValue', () => {
  const jsValue = (input) => {
    const r = wafer.match(input);
    return semantics(r).jsValue();
  };
  assert.equal(jsValue('42'), 42);
});
