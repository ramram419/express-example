const { Sequelize } = require('sequelize');
const { applyExtraSetup } = require('./extra-setup');
const dotenv = require('dotenv');
dotenv.config();

const sequelize = new Sequelize(process.env.RDS_DB ,process.env.RDS_USER ,process.env.RDS_PWD,{
	host: process.env.RDS_HOST,
	dialect: 'mysql'
});

const modelDefiners = [
	require('./models/user.model'),
	require('./models/instrument.model'),
	require('./models/orchestra.model'),
	// Add more models here...
	// require('./models/item'),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
	modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);
sequelize.sync();

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
