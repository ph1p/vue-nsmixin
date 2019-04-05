export default {
  install(Vue, options) {
    Vue.nsMixin = function(namespace, nsMixin) {
      const addNamespaceToKey = data => {
        let removedReference = { ...data };

        if (typeof data === 'function') {
          removedReference = nsMixin.data();
        }

        Object.keys(removedReference).forEach(key => {
          removedReference[namespace + '__' + key] = removedReference[key];

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

      if (options && options.useFn) {
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
