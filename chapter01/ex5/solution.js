function exportsec(exports) {
  return [
    // ----- export section -----
    7, // Section identifier
    5, // Section size in bytes
    1, // Number of entries that follow
  ];
}

function export_(nm, exportdesc) {
  const name = w.stringToBytes(nm);
  return [
    // export section - entry 0
    name.length, // Name size in bytes
    ...name,
    0, // export type: function
    exportdesc, // function index
  ];
}

const exportdesc = {
  func(idx) {
    return idx;
  },
};
