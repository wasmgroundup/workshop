import * as ohm from 'ohm-js';
import {extractExamples} from 'ohm-js/extras';

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

test('calculator language', () => {
  assert.equal(wafer.match('42').succeeded(), true);
  assert.equal(wafer.match('1').succeeded(), true);
  assert.equal(wafer.match('66 + 99').succeeded(), true);
  assert.equal(wafer.match('1 + 2 - 3').succeeded(), true);
  assert.equal(wafer.match('abc').succeeded(), false);
});

function testExtractedExamples(grammarSource) {
  const grammar = ohm.grammar(grammarSource);
  for (const ex of extractExamples(grammarSource)) {
    const result = grammar.match(ex.example, ex.rule);
    assert.strictEqual(result.succeeded(), ex.shouldMatch, JSON.stringify(ex));
  }
}

test('extracted examples', () => {
  testExtractedExamples(grammarDef);
});
