import { DataTypes, Sequelize } from 'sequelize';
import { Users } from './users';

export function UserBookLinks(sequelize: Sequelize) {
  const UserBookLink: any = sequelize.define(
    'user_book_links',
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bookID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      paranoid: false,
    }
  );

  UserBookLink.associate = (db: any) => {
    db.users.belongsToMany(db.books, {
      through: UserBookLink,
      foreignKey: 'userId',
      otherKey: 'bookID',
    });
    db.books.belongsToMany(db.users, {
      through: UserBookLink,
      foreignKey: 'bookID',
      otherKey: 'userId',
    });
  };

  return UserBookLink;
}
