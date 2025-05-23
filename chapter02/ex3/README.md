# Exercise 3

Writing a Compiler with Ohm

## Description

- Use the Ohm Editor to implement a simple calculator language, that can represent expressions like `66 + 99` and `1 + 2 - 3`.
- Write a test that instantiates the grammar and verifies a few small examples.

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

**Bonus:**
- Write a `textExtractedExamples` function that uses `extractExamples` (part of the Ohm Extras module)


## Resources

### Ohm

- [Ohm Editor](https://ohmjs.org/editor)
- [Ohm Quick Reference](https://github.com/ohmjs/ohm/blob/main/doc/quick-reference.md)
- [Complete syntax reference](https://github.com/ohmjs/ohm/blob/main/doc/syntax-reference.md)

### Node

Test module basics `mymod.mjs`:

```js
import * as ohm from 'ohm-js';
import {extractExamples} from 'ohm-js/extras';

import test from 'node:test';
import assert from 'node:assert';

const grammarDef = `
  Wafer {
    ...
  }
`;

test('calculator language', () => {
  assert(true);
});

// Bonus: implement testExtractedExamples
function testExtractedExamples(grammarSource) {
  for (const ex of extractExamples(grammarSource)) {
    // TODO
  }
}
```
