import { DataTypes, Sequelize } from 'sequelize';

export function Users(sequelize: Sequelize) {
  const User: any = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataTypes.STRING,
      },
    },
    {
      paranoid: false,
    }
  );

  User.associate = (db: any) => {
    db.users.belongsToMany(db.books, {
      through: db.userBookLinks,
      foreignKey: 'userId',
      otherKey: 'bookID',
    });
  };

  return User;
}
