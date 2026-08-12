import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const c = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

c.connect((err) => {
  if (err) {
    console.error('❌ Connection failed:', err.message);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL');

  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id          INT AUTO_INCREMENT PRIMARY KEY,
      name        VARCHAR(100)  NOT NULL,
      email       VARCHAR(150)  NOT NULL UNIQUE,
      password    VARCHAR(255)  NOT NULL,
      created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
    )
  `;

  c.query(sql, (e) => {
    if (e) {
      console.error('❌ Failed to create table:', e.message);
    } else {
      console.log('✅ users table created (or already exists)');
    }
    c.end();
  });
});
