function functype(paramTypes, resultTypes) {
  return [
    // type section - entry 0
    0x60, // Type `function`
    vec(paramTypes),
    vec(resultTypes),
  ];
}
