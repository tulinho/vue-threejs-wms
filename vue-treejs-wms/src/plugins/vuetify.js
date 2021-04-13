import 'material-design-icons-iconfont/dist/material-design-icons.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'md'
  },
  theme: {
    themes: {
      light: {
        primary: '#3f51b5',
        secondary: '#ff5722',
        accent: '#673ab7',
        error: '#f44336',
        warning: '#ff9800',
        info: '#ffc107',
        success: '#4caf50'
        },
      dark: {
        primary: '#3949AB',
        secondary: '#9FA8DA',
        accent: '#8c9eff',
        error: '#b71c1c',
      },
    },
  },
})
