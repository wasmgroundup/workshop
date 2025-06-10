const { instance } = await WebAssembly.instantiate(bytes);
const { add, addAlt } = instance.exports;
