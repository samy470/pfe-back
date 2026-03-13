import { DataTypes } from 'sequelize';
import sequelize from './gamesDB';

const Game = sequelize.define('Game', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  publisher: {
    type: DataTypes.STRING,
    allowNull: false
  },
  image: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  heroimage: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false
  },
  discount: {
    type: DataTypes.INTEGER
  },
  rating: {
    type: DataTypes.DECIMAL(2,1),
    allowNull: false
  },
  reviews: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  platforms: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: false
  },
  trending: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  details: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  },
  size: {
    type: DataTypes.STRING,
    allowNull: false
  },
  requirements: {
    type: DataTypes.TEXT,
    allowNull: false
  }
}, {
  tableName: 'games',
  timestamps: false
});

export default Game;