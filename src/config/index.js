const path = require('path')
const dotenv = require('dotenv')
dotenv.config()
const appConfig={
i18n: {
    locales: [
      'ar',
      'en',
      'tr'
    ],
    defaultLocale: 'en',
    header: 'accept-language',
    directory: path.join(__dirname, '/lang'),
    autoReload: true
  }
}
module.exports =appConfig