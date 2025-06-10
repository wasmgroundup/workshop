function typesec(types) {
  assert.equal(types.length, 0);
  // Return an array of bytes that represents an empty type section
  return [
    // ----- type section -----

    1, // Section identifier
    w.u32(1), // Section size in bytes
    w.u32(types.length), // Number of entries that follow
  ];
}
