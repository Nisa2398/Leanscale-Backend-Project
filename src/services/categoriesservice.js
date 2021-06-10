const axios = require('axios');
const https = require('https');
const {I18n} = require('i18n');
const i18nUtils = require('../utils/i18n');
const config = require('../config');
require('dotenv').config();


exports.getCountries = (req, res, next) => {
  try{
  axios
    .get('https://m2.leanscale.com/rest/default/V1/directory/countries')
    .then((response) => {
      i18nUtils.setLocale(req.headers['accept-language']);
      response.data.forEach((value, index) => {
        Object.keys(value).forEach((key, v) => {
          if (value['full_name_english']) {
            value['full_name_english'] = i18nUtils.translate(
              value['full_name_english'],
              req.headers['accept-language']
            );
          }
        });
      });
    
      res.status(200).json(response.data);
    }).catch(error=>{
      res.status(500).json({error:error});
    })
  }catch(error){
    res.status(500).json({error:error});
  }
};
exports.getCategories = (req, res, next) => {
  try{
  axios
    .get('https://m2.leanscale.com/rest/default/V1/categories/1', {
      headers: {
        consumerkey: process.env.consumerkey,
        consumersecret: process.env.consumersecret,
        accesstoken: process.env.accesstoken,
        tokensecret: process.env.tokensecret,
        Authorization: 'Bearer ' + `${process.env.accesstoken}`,
      },
    })
    .then((response) => {
      var result = response.data;
      i18nUtils.setLocale(req.headers['accept-language']);
      result['name'] = i18nUtils.translate(
        result['name'],
        req.headers['accept-language']
      );
      res.status(200).json(result);
    }).catch(error=>{
      res.status(500).json({error:error});
    })
  }catch(error){
    res.status(500).json({error:error});
  }
    
};
exports.getProducts = (req, res, next) => {
  try{
  axios
    .get(
      'https://m2.leanscale.com/rest/default/V1/categories/list?searchCriteria=0',
      {
        headers: {
          consumerkey: 'utvqdmpw03uzwp6k5kyzdbiozm20d2s7',
          consumersecret: 'g4iscqutq1iuj59nbcler2q4zkep9f68',
          accesstoken: 'bib99ay5ulymg6jgu1ur095y6cf26tn4',
          tokensecret: 'sl3lu6bvsnxinxf4fx77gb7bgja052t1',
          Authorization: 'Bearer' + ' bib99ay5ulymg6jgu1ur095y6cf26tn4',
        },
      }
    )
    .then((response) => {
      var result = response.data;
      i18nUtils.setLocale(req.headers['accept-language']);
      result['name'] = i18nUtils.translate(
        result['name'],
        req.headers['accept-language']
      );
      res.status(200).json(result);
    }).catch(error=>{
      res.status(500).json({error:error});
    })
  }catch(error){
    res.status(500).json({error:error});
  }
};
exports.addCustomer = (req, res, next) => {
  const {email,firstname,lastname}=req.body.customer
  
  const password =req.body.password
  try{
  axios
    .post('https://m2.leanscale.com/rest/default/V1/customers',{
      customer:{
        firstname:firstname,
        lastname:lastname,
        email:email
      },
      password:password
    })
    .then((response) => {
      
      res.status(201).json({success:true,id:response.data.id});
    }).catch(error=>{
      res.status(500).json({error:error});
    })
  }catch(error){
    res.status(500).json({error:error});
  }
};

