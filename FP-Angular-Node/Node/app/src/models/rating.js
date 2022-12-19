import { Sequelize } from "sequelize"; 
import db from "../../config/config.js";
 
const { DataTypes } = Sequelize;

const Rating = db.define('UserData', {
  user_id: {
    type: DataTypes.INTEGER
  },
  movie_id: {
    type: DataTypes.INTEGER
  },
  movie_rating: {
    type: DataTypes.FLOAT
  },
  favourite:{
    type: DataTypes.BOOLEAN
  },
  movie_title:{
    type: DataTypes.STRING
  },
  score: {
    type: DataTypes.INTEGER
  },
  comment:{
    type: DataTypes.STRING
  },
}, {
  freezeTableName: true
});
 
export default Rating;