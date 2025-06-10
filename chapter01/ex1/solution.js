function compile(code) {
  //return [...new TextEncoder().encode('\0asm'), ...[1, 0, 0, 0]];
  //return [Array.from(new TextEncoder().encode('\0asm')), [1, 0, 0, 0]].flat(1);
  return [0, 97, 115, 109, 1, 0, 0, 0];
}

function int32le(v) {
  return [
    (v & 0xff) >>> 0,
    (v & 0xff00) >>> 8,
    (v & 0xff0000) >>> 16,
    (v & 0xff000000) >>> 24,
  ];
}
