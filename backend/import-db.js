const mysql = require('mysql2/promise');
const fs = require('fs');
require('dotenv').config();

async function importDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    multipleStatements: true
  });

  try {
    const sql = fs.readFileSync('./yunojewels.sql', 'utf8');
    console.log('Starting database import...');
    await connection.query(sql);
    console.log('✅ Database imported successfully!');
  } catch (error) {
    console.error('❌ Import failed:', error.message);
  } finally {
    await connection.end();
  }
}

importDatabase();
