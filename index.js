const express = require('express')
const { Sequelize,DataTypes } = require('sequelize');
const app = express()
const port = 9000

const sequelize = new Sequelize('kajal', 'root', 'kajal', {
    host: 'localhost',
    dialect: 'mysql',
});


sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');
}).catch((error)=>{
    console.error('Unable to connect to the database:', error);
})

// const User = sequelize.define('User', {
//   firstName: {
//     type: DataTypes.STRING,
//     allowNull: false
//   },
//   lastName: {
//     type: DataTypes.STRING
//   }
// }, {
//   tableName: 'Employees',
//   timestamps: false,
// });



//////////////////////////////////////////////////////
const Ship = sequelize.define('ship', { name: DataTypes.TEXT ,captainName:{type: DataTypes.TEXT}}, { timestamps: false });
const Captain = sequelize.define('captain', {
  name: { type: DataTypes.TEXT}
}, { timestamps: false });


Ship.belongsTo(Captain, { targetKey: 'name', foreignKey: 'captainName' });


async function fun1(){
  // await Captain.create({ name: "Jack Sparrow" });
  // const ship = await Ship.create({ name: "Black Pearl",captainName:"Jack Sparrow"});
  console.log((await Ship.findOne({ include: Captain ,raw: true})));
}



fun1()




sequelize.sync()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})