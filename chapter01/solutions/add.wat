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
