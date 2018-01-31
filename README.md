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

## mapGettersFromStates

Generates [getters](https://vuex.vuejs.org/en/getters.html) from
[states](https://vuex.vuejs.org/en/state.html)

```javascript
...mapGettersFromStates({
    states,
}),
 ```

generates:

```javascript
{
    id: state => state.id,
    name: state => state.name,
    mail: state => state.email,
}
```

## mapMutationsFromTypes

Generates [mutations](https://vuex.vuejs.org/en/mutations.html) from
[mutation types](https://vuex.vuejs.org/en/mutations.html#using-constants-for-mutation-types)

```javascript
...mapMutationsFromTypes({
    types,
}),
```

generates:

```javascript
{
    [types.ID](state, payload) {
        state.id = payload;
    },
    [types.NAME](state, payload) {
        state.name = payload;
    },
    [types.EMAIL](state, payload) {
        state.email = payload;
    },
}
```
