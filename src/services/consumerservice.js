const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const { check,body,validationResult}=require('express-validator');

fs.createReadStream(path.join(path.dirname(__dirname), '/uploads/customer.csv'))
.pipe(csv())
.on('data', async (row) => {
    try{
        
    if(!row.firstname){
        throw new UserException('firstname is required',row)
    }
    if(!row.lastname){
        throw new UserException('lastname is required',row)
    }
    if(row.password.length<5){
        throw new UserException('Password should have minimum 5 characters',row)
    }
    if(row.email.indexOf('@')<1){
        throw new UserException('Email is not valid',row)
    }
    var regex = new RegExp(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{5,}$/);
    // console.log(regex.test(row.password))
    if(regex.test(row.password)==false){
        throw new UserException('Password must atleast have one specialcharacter, one alphabet and a number',row)
    }
    fetch('http://localhost:3020/V1/customer', {
        method: 'post',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
          customer: {
            firstname: row.firstname,
            lastname: row.lastname,
            email: row.email,
          },
          password: row.password,
        }),
      })
        .then((res) => {
          status = res.status;
          return res.json();
        })
        .then((jsonData) => {
          
          if (jsonData.success == true) {
            console.log('Added Customer',jsonData.id);
          }
          else{
            console.log('Error',jsonData.error);
          }
        }).catch(err=>{
          console.log(err)
        })
      
    } 
    catch(error){
        console.log(error)
    }
});
function UserException(message,value) {
    this.message = message;
    this.name = 'UserException';
    this.value=value
  }

