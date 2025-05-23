# Exercise 3

Writing a Compiler with Ohm

## Description

- Use the Ohm Editor to implement a simple calculator language, that can represent expressions like `66 + 99` and `1 + 2 - 3`.
-

```
Wafer {
  Main = Expr
  Expr = // TODO
  op = // TODO
  number = digit+

  // Examples:
  //+ "42", "1", "66 + 99", "1 + 2 - 3"
  //- "abc"
}
```

## Resources

### Ohm syntax

- [Ohm Quick Reference](https://github.com/ohmjs/ohm/blob/main/doc/quick-reference.md)
- [Complete syntax reference](https://github.com/ohmjs/ohm/blob/main/doc/syntax-reference.md)

### Empty Module Structure

- magic number: `"\0asm"`
  - [TextEncoder.encode()](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encode)
- version (32 bits, little endian): `1`
  - [bitwise and `&`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND)

### Node

- [test()](https://nodejs.org/api/test.html#testname-options-fn)
- [assert](https://nodejs.org/api/assert.html)

Test module basics `mymod.mjs`:

```js
import test from 'node:test';
import assert from 'node:assert';

test('setup', () => {
  assert(true);
});
```

```js
node mymod.mjs
```

## Spoiler Alert

```js
[0, 97, 115, 109, 1, 0, 0, 0]
```
