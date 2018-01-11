# Vuex helpers

## mapTwoWayState

Generates two way [computed properties](https://vuejs.org/v2/guide/computed.html#Computed-Setter).

```javascript
...mapTwoWayState({
  namespace: 'user',
  prefix: true,
}, [
  'name',
]),
```

generates:

```javascript
userName: {
  get() {
      return this.$store.getters['user/name'];
  },
  set(value) {
      this.$store.commit(`user/NAME`, value);
  },
},
```