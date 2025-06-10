function typesec(types) {
  assert.equal(types.length, 0);
  // Return an array of bytes that represents an empty type section
  return [
    // ----- type section -----

    1, // Section identifier
    1, // Section size in bytes
    0, // Number of entries that follow
  ];
}
