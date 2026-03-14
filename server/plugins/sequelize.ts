import db from '../database';

const sequelize = db.sequelize!;

export default defineNitroPlugin(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ DB connected');

    // sync force: true will drop the table if it already exists
    // sync alter: true will update the table to match the model
    await sequelize.sync({ alter: true });
    console.log('✅ Models synced');
  } catch (err) {
    console.error('❌ DB error', err);
  }
});
