const SECTION_ID_EXPORT = 7;
function exportsec(exports) {
  return w.section(SECTION_ID_EXPORT, w.vec(exports));
}

function export_(nm, exportdesc) {
  const name = w.stringToBytes(nm);
  return [
    // export section - entry 0
    u32(name.length), // Name size in bytes
    ...name,
    exportdesc, // function index
  ];
}

const exportdesc = {
  func(idx) {
    return [0x00, u32(idx)];
  },
};
