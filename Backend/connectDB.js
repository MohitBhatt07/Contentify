const {Client } =  require("pg");
const dotenv = require("dotenv");
dotenv.config();

// const client = new Client("postgres://contentify_db_user:UdgjWzqvJyqkchF5Rw6SbneJorw6nzcb@dpg-cp45qv21hbls73esaedg-a/contentify_db");

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

const connectDB = async () => {
  try {
      await client.connect();
      console.log('Connected to PostgreSQL database!');
  } catch (err) {
      console.error('Connection error:', err.stack);
  } 
};

module.exports = {connectDB ,client};