export default {
  install(Vue, options) {
    const pluginOptions = {
      useFn: false,
      seperator: '__',
      firstLetterUpperCase: false,
      ...options
    };

    Vue.nsMixin = function(namespace, nsMixin) {
      const addNamespaceToKey = data => {
        let removedReference = { ...data };

        if (typeof data === 'function') {
          removedReference = nsMixin.data();
        }

        // iterate through object
        Object.keys(removedReference).forEach(key => {
          const tKey = pluginOptions.firstLetterUpperCase
            ? key.charAt(0).toUpperCase() + key.slice(1)
            : key;
          const name = namespace + pluginOptions.seperator + tKey;

          // set key and value
          removedReference[name] = removedReference[key];

          // remove old value
          delete removedReference[key];
        });

        return typeof data === 'function'
          ? function() {
              return removedReference;
            }
          : removedReference;
      };

      const __cachedMethods = {
        ...nsMixin.methods
      };

      if (pluginOptions.useFn) {
        nsMixin.methods[namespace] = function() {
          return Object.keys(__cachedMethods).reduce((before, current) => {
            return {
              ...before,
              [current]: __cachedMethods[current].bind(this)
            };
          }, {});
        };
      } else {
        nsMixin.methods = addNamespaceToKey(nsMixin.methods);
      }

      nsMixin.data = addNamespaceToKey(nsMixin.data);
      nsMixin.computed = addNamespaceToKey(nsMixin.computed);

      this.options = Vue.util.mergeOptions(this.options, nsMixin);

      return this;
    };
  }
};
