# create-plop/generators

Here we store all the generator(s) that required to build up the `create-plop`

The signature is a function that accept a `config` object, then return a function
that accept the `plop` object.

```js
export default function initGenerator (config = {}) {
  return function (plop) {
    plop.setGenrator('nameOfThisGenerator', {
      // the rest of the code
    })
  }
}

```

---

July 2022
