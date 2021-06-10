const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({ origin: '*' }));
// const language=require('./lang/language')
const category=require('./routers/categoryrouter')
app.use(express.json());
const i18nUtils = require('./utils/i18n')
app.use('/V1',category)
const fetch = require('node-fetch')
const { I18n } = require('i18n')
const path=require('path');
// console.log(__dirname)
// var anyObject={}
//   const i18n = new I18n({
//     locales: ['en', 'ar', 'tr'],
//     directory: path.join(__dirname, 'lang'),
//     defaultLocale: 'en',
//     register:anyObject,
//     header: 'Accept-Language',
//     api: {
//         __: 't', // now req.__ becomes req.t
//         __n: 'tn' // and req.__n can be called as req.tn
//       },
//   })
//   anyObject.setLocale('de')

// app.use(i18nextMiddleware.handle(i18next));

app.listen(3020,(req,res)=>{
    
    console.log("Example app listening at http://%s:%s", 3020)
})


