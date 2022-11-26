let { Sequelize, DataTypes }  = require('sequelize')

// environment variables are variables a computer stores
let env = process.env.NODE_ENV || 'development'  // set a default if no enviromment variable

console.log('using environment' + env)

let configFile = require(__dirname + '/../config.json')
let config = configFile[env]  

let password = process.env.DB_PASSWORD  // undefined locally, not needed with sqlite
// we'll have to set the DB_PASSWORD environment variable at Azure 
config.password = password

let db = {} 

let sequelize = new Sequelize(config)

let studentModelCreate = require('./student')  // a function definition 
let studentModel = studentModelCreate(sequelize, DataTypes)

db[studentModel.name] = studentModel

db.sequelize = sequelize  // sequelize configuration 
db.Sequelize = Sequelize  // Sequelize library

module.exports = db