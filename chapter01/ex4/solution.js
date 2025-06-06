function funcsec(typeidxs) {
  return [
    // ----- function section -----
    3, // Section identifier
    2, // Section size in bytes
    1, // Number of entries that follow
    ...typeidxs,
  ];
}
function typeidx(x) {
  return x;
}
function code(func) {
  return func;
}
function func(locals, body) {
  return [
    // code section - entry 0
    2, // Entry size in bytes
    0, // Empty vector of local variables
    11, // `end` instruction
  ];
}
function codesec(codes) {
  return [
    // ----- code section -----
    10, // Section identifier
    4, // Section size in bytes
    1, // Number of entries that follow
  ];
}
