var Main = {
  data() {
    return {
      value1: 0, value2: 50, value3: 36, value4: 48, value5: 42, value6: 0,
          value7: 0
    }
  },
  methods : {formatTooltip(val) { return val / 100; }}
};
var Ctor = Vue.extend(Main);
new Ctor().$mount('#app');