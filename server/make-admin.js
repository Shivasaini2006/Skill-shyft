const mysql = require('mysql2/promise');
require('dotenv').config();

async function makeAdmin() {
  const email = process.argv[2];

  if (!email) {
    console.error('Please provide an email address: node make-admin.js <email>');
    process.exit(1);
  }

  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'skill_shyft'
    });

    const [result] = await connection.execute(
      "UPDATE users SET role = 'admin' WHERE email = ?",
      [email]
    );

    if (result.affectedRows > 0) {
      console.log(`Success! User with email ${email} is now an ADMIN.`);
    } else {
      console.log(`User with email ${email} not found.`);
    }

    process.exit(0);
  } catch (error) {
    console.error('Error updating user role:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

makeAdmin();
