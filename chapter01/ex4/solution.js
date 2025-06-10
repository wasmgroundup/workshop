const SECTION_ID_FUNCTION = 3;

function funcsec(typeidxs) {
  return section(SECTION_ID_FUNCTION, vec(typeidxs));
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
  return [vec(locals), body];
}

function codesec(codes) {
  return section(SECTION_ID_CODE, vec(codes));
}
