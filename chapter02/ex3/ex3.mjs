import * as ohm from 'ohm-js';
import {extractExamples} from 'ohm-js/extras';

import test from 'node:test';
import assert from 'node:assert';

const grammarDef = `
  Wafer {
    Main = Expr
    Expr = // TODO
    op = // TODO
    number = digit+

    // Examples:
    //+ "42", "1", "66 + 99", "1 + 2 - 3"
    //- "abc"
  }
`;

test('calculator language', () => {
  assert(false);
});

// Bonus: implement this!
function testExtractedExamples(grammarSource) {
  for (const ex of extractExamples(grammarSource)) {
    // TODO
  }
}
