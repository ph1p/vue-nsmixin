## vue-nsmixin (Namespaced mixin)

This small script provides a solution to use "namespaced" methods, computed and data values.

## How to use?

```bash
npm i vue-nsmixin
# or
yarn add vue-nsmixin
```

```javascript
const NsMixin = require('vue-nsmixin');
// or
import NsMixin from 'vue-nsmixin';

Vue.use(NsMixin, {
  useFn: true // use namespace function for methods
  seperator: '', // default "__"
  firstLetterUpperCase: false // set first letter of method, data or computed to uppercase
});
```

Now you can do this:

```javascript
Vue.nsMixin('namespace', {
  // ...options
  data() {
    return {
      value: ''
    }
  },
  computed: {
    cpValue() {
      // ...
    }
  }
  methods: {
    func() {
      // ...
    }
  }
});
```

In your component:

```javascript
this.namespace().func(); // to use this set useFn: true in options

this.namespace__func(); // method
this.namespace__value; // data
this.namespace__cpValue; // computed
```