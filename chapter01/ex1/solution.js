function compile(code) {
  //return [...(new TextEncoder).encode('\0asm'), ...[1, 0, 0, 0]];
  //return [(new TextEncoder).encode('\0asm'), [1, 0, 0, 0]].flat(1);
  return [0, 97, 115, 109, 1, 0, 0, 0];
}
