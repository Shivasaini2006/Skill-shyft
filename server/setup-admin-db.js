const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

async function setupAdminDB() {
  let connection;
  try {
    connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || 'root',
      database: process.env.DB_NAME || 'skill_shift',
      multipleStatements: true
    });
    
    console.log('Connected to MySQL. Adding admin schema...');
    
    // Add role to users if it doesn't exist
    try {
      await connection.query("ALTER TABLE users ADD COLUMN role ENUM('user', 'moderator', 'admin', 'super_admin') DEFAULT 'user'");
      console.log('Added role column to users table.');
    } catch (err) {
      if (err.code === 'ER_DUP_FIELDNAME') {
        console.log('Role column already exists in users table.');
      } else {
        throw err;
      }
    }
    
    const schemaPath = path.join(__dirname, 'database', 'admin_schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    await connection.query(schemaSql);
    console.log('Admin schema imported successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up Admin DB:', error);
    process.exit(1);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

setupAdminDB();
