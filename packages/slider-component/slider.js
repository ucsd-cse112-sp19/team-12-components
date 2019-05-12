var Main = {
  data() {
    return {
      value1: 0, value2: 50, value3: 36, value4: 48, value5: 42, value6: 0,
          value7: 0, value8: 0, value9: 0, value10: 0, value11: [30, 60],
          marks: {
            0: '0°C',
            8: '8°C',
            37: '37°C',
            50: {
              style: {
                color: '#1989FA'
              },
              label: this.$createElement('strong', '50%')
            }
          }
    }
  },
  methods : {formatTooltip(val) { return val / 100; }}
};
var Ctor = Vue.extend(Main);
new Ctor().$mount('#app');