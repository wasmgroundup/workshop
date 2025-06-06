# Task

Create a file called `add.wat` with the following content:

```wasm
(module
  ;; stack/forth syntax
  (func $add (param $a i32) (param $b i32) (result i32)
    local.get $a
    local.get $b
    i32.add
  )

  ;; nested/lisp syntax
  (func $add-alt (param $a i32) (param $b i32) (result i32)
    (i32.add
      (local.get $a)
      (local.get $b))
  )

  (export "add" (func $add))
  (export "addAlt" (func $add-alt))
)
```

Compile it to Wasm

```bash
wasm-tools parse add.wat -o add.wasm
```

Load it and call exported functions

- Instantiate module
- Call exported functions on the instance

# Draw to a canvas

Download `draw.wasm`, in the same folder create a file called `draw.html` with the following content:

```html
<!DOCTYPE html>
<html><head><title>WasmDRAW!</title></head>
<body>
  <canvas width="256" height="256"></canvas>
  <script type="module">
    const canvas = document.querySelector("canvas");
    const ctx = canvas.getContext("2d");

    ctx.fillStyle = '#6250E7';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const backgroundImgData = ctx.getImageData(0, 0, canvas.width, canvas.height);

    function setPixel(x, y, r, g, b, a) {
      const {width, data} = backgroundImgData;
      const offset = (y * width * 4) + (x * 4);

      data[offset + 0] = r;
      data[offset + 1] = g;
      data[offset + 2] = b;
      data[offset + 3] = a;
    }

    const {instance} = await WebAssembly.instantiateStreaming(
        fetch('draw.wasm'), {waferImports: {setPixel}}
    );

    requestAnimationFrame(function render(timestamp) {
      const t = Math.floor((Math.sin(timestamp / 2000) + 1) / 2 * 255);
      instance.exports.draw(canvas.width, canvas.height, t);
      ctx.putImageData(backgroundImgData, 0, 0);

      ctx.fillStyle = 'white';
      ctx.font = '32px serif';
      ctx.fillText('WebAssembly', 16, 202)

      ctx.font = '22.5px serif';
      ctx.fillText('from the Ground Up', 18, 230);

      requestAnimationFrame(render);
    });
    </script>
</body>
</html>
```

# Tools

- [wasm-tools](https://github.com/bytecodealliance/wasm-tools)

# Resources

- [WebAssembly](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface)
- [WebAssembly.Instance](https://developer.mozilla.org/en-US/docs/WebAssembly/Reference/JavaScript_interface/Instance)
