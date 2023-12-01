import { Sequelize, DataTypes } from 'sequelize';
import { databaseConfig } from '../db/db.js';
import { Op } from 'sequelize';


const sequelize = new Sequelize(databaseConfig);
// Define the Task model
const SignUp = sequelize.define('Register', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    team: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: 'registers', 
  });
  const syncDatabase = async () => {
    try {
      await sequelize.sync();
      console.log('Database synchronized.');
    } catch (error) {
      console.error('Error synchronizing database:', error.message);
    }
  };
  
  export { SignUp, syncDatabase };