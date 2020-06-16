import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

// 创建 i18n 实例，并引入语言文件（可以是 js 文件、也可以为 json 文件）
const i18n = new VueI18n({
  // locale 为语言标识，通过locale的值实现语言切换 (this.$i18n.locale)
  locale: 'zh',
  messages: {
    'zh': require('@/i18n/languages/zh.json'),
    'en': require('@/i18n/languages/en.json')
  }
})

export default i18n
