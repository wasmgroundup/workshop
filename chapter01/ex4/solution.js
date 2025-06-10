const SECTION_ID_FUNCTION = 3;

function funcsec(typeidxs) {
  return w.section(SECTION_ID_FUNCTION, w.vec(typeidxs));
}

function typeidx(x) {
  return u32(x);
}

const SECTION_ID_CODE = 10;

function code(func) {
  const sizeInBytes = func.flat(Infinity).length;
  return [u32(sizeInBytes), func];
}

function func(locals, body) {
  return [w.vec(locals), body];
}

function codesec(codes) {
  return w.section(SECTION_ID_CODE, w.vec(codes));
}
