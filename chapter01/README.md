# Tools

- [wasm-tools](https://github.com/bytecodealliance/wasm-tools)

# Resources

## Exercise 0

- [WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface)
- [WebAssembly.Instance](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Instance)

## Exercise 1

- [5.5.15. Binary Format: Modules](https://www.w3.org/TR/2019/REC-wasm-core-1-20191205/#modules%E2%91%A0%E2%93%AA)
- [Uint8Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array)
- [TypedArray.from()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/from)
- Magic number: `"\0asm"`
  - [TextEncoder.encode()](https://developer.mozilla.org/en-US/docs/Web/API/TextEncoder/encode)
- Version (32 bits, little endian): `1`
  - [bitwise and `&`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_AND)

## Exercise 2

- [5.5.4. Type Section](https://www.w3.org/TR/2019/REC-wasm-core-1-20191205/#binary-typesec)
    - [2.3.3. Function Types](https://www.w3.org/TR/2019/REC-wasm-core-1-20191205/#syntax-functype)
- [5.5.6. Function Section](https://www.w3.org/TR/2019/REC-wasm-core-1-20191205/#binary-funcsec)
    - [2.5.1. Indices](https://www.w3.org/TR/2019/REC-wasm-core-1-20191205/#syntax-typeidx)
- [5.5.13. Code Section](https://www.w3.org/TR/2019/REC-wasm-core-1-20191205/#binary-codesec)
  - [end instruction](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/Control_flow/end)

## Exercise 3

- [5.5.10. Export Section](https://www.w3.org/TR/2019/REC-wasm-core-1-20191205/#binary-exportsec)
  - [2.5.10. Exports](https://www.w3.org/TR/2019/REC-wasm-core-1-20191205/#syntax-export)
