const Sequelize=require('sequelize')
const database=require('../connection/database')
const consumermodel=database.define('tbl_consumer',{
    consumerid:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    firstname:Sequelize.STRING,
    lastname:Sequelize.STRING,
    email:Sequelize.STRING,
    password:Sequelize.STRING
},{
    freezeTableName:true,
    timestamps:false
})


module.exports={consumermodel}