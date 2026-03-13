import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.POSTGRES_DB || 'gamesdb',
  process.env.POSTGRES_USER || 'postgres',
  process.env.POSTGRES_PASSWORD || 'mysecretpassword',
  {
    host: process.env.POSTGRES_HOST || 'localhost',
    dialect: 'postgres',
    port: 5432
  }
);

export default sequelize;