function compileExpr(expr) {
  return expr
    .trim()
    .split(" ")
    .map((token) => {
      const n = parseInt(token, 10);
      if (Number.isFinite(n)) {
        return [w.instr.i32.const, w.i32(n)];
      } else {
        switch (token) {
          case "+":
            return w.instr.i32.add;
          case "-":
            return w.instr.i32.sub;
          case "*":
            return w.instr.i32.mul;
          case "/":
            return w.instr.i32.div_s;
          default:
            throw Error(
              `Syntax error, expected arithmetic operation, got: '${token}'`,
            );
        }
      }
    });
}
