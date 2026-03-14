import path from 'path';
import { Sequelize, Model, ModelStatic, Dialect } from 'sequelize';

// Lưu ý: cần "resolveJsonModule": true trong tsconfig.json
import { dbConfig } from '../config/database';
import { Users } from './users';
import { Books } from './books';
import { UserBookLinks } from './userBookLink';

const basename = path.basename('/server/database');
const config = dbConfig;

type DbMap = {
  [key: string]: ModelStatic<Model>;
} & {
  sequelize?: Sequelize;
  Sequelize?: typeof Sequelize;
};

const db: DbMap = {};

let sequelize: Sequelize;

sequelize = new Sequelize({
  database: config.database,
  dialect: config.dialect as Dialect,
  host: config.host,
  port: config.port,
  username: config.username,
  password: config.password,
  logging: config.logging,
});

const table = [Users, Books, UserBookLinks];
// Tự động import tất cả model
table.forEach(model => {
  const mod = model(sequelize);
  const modelName = mod.name;
  db[modelName] = mod;
});

Object.keys(db).forEach(modelName => {
  const model = db[modelName] as any;
  if (model?.associate) {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
