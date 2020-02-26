module.exports = {
  'devServer': {
    'proxy': {
      '^/api': {
        'target': 'https://customer-portal.dev.getcns.tech',
        'headers': {
          'x-cookie-domain': 'http://localhost:8888'
        }
      }
    }
  },
  'transpileDependencies': [
    'vuetify'
  ]
}
