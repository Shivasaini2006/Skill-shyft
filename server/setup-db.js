const mysql = require('mysql2/promise');
const fs = require('fs');
const path = require('path');

async function setupDB() {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      multipleStatements: true
    });
    
    console.log('Connected to MySQL. Creating database and running schema...');
    
    const schemaPath = path.join(__dirname, '../database/schema.sql');
    const schemaSql = fs.readFileSync(schemaPath, 'utf8');
    
    await connection.query(schemaSql);
    console.log('Database schema imported successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error setting up DB:', error);
    process.exit(1);
  }
}

setupDB();
