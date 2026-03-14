import { DataTypes, Sequelize } from 'sequelize';

export function Books(sequelize: Sequelize) {
  const Book = sequelize.define(
    'books',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      barcode: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      paranoid: false,
    }
  );

  return Book;
}
