# Exercise 4

Implementing an interpreter

## Description

- Using the same Wafer grammar from Ex. 3, write a 'jsValue' operation that evaluates an arithmetic expression.
- Write a test that verifies:
  * '42' evaluates to 42
  * '1 + 2 - 33' evaluates to -30

The grammar:

```js
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
`;```

## Resources

- [Ohm API Reference: Semantic actions](https://ohmjs.org/docs/api-reference#semantic-actions)

The `prettyPrint` operation:

```js
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
```
