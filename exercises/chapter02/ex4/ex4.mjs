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

const semantics = wafer.createSemantics();
semantics.addOperation('prettyPrint', {
  Main(expr) {
    return expr.prettyPrint();
  },
  Expr(num, iterOps, iterOperands) {
    const result = [num.prettyPrint()];
    for (let i = 0; i < iterOps.numChildren; i++) {
      const op = iterOps.child(i);
      const operand = iterOperands.child(i);
      result.push(op.prettyPrint(), operand.prettyPrint());
    }
    return result.join(' ');
  },
  op(_ch) {
    return this.sourceString;
  },
  number(_digits) {
    return this.sourceString;
  },
});

test('pretty printing', () => {
  const pretty = (input) => {
    const r = wafer.match(input);
    return semantics(r).prettyPrint();
  };
  assert.equal(pretty('42'), '42');
  assert.equal(pretty('1        + 2 - 33'), '1 + 2 - 33');
});

semantics.addOperation('jsValue', {
  Main(expr) {
    return expr.jsValue();
  },
  Expr(num, iterOps, iterOperands) {
    let ans = num.jsValue();
    for (let i = 0; i < iterOps.numChildren; i++) {
      const op = iterOps.child(i);
      const operand = iterOperands.child(i);
      switch (op.sourceString) {
        case '+':
          ans += operand.jsValue();
          break;
        case '-':
          ans -= operand.jsValue();
          break;
        default:
          throw new Error(`Unknown operator: ${op.sourceString}`);
      }
    }
    return ans;
  },
  number(digits) {
    return parseInt(this.sourceString, 10);
  },
});

test('jsValue', () => {
  const jsValue = (input) => {
    const r = wafer.match(input);
    return semantics(r).jsValue();
  };
  assert.equal(jsValue('42'), 42);
  assert.equal(jsValue('1        + 2 - 33'), -30);
});
