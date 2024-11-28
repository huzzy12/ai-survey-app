import { sql } from '@vercel/postgres';
import { createPool } from '@vercel/postgres';

// Create a connection pool
export const pool = createPool({
  connectionString: process.env.POSTGRES_URL,
});

// Initialize the database table
export async function initDB() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS survey_responses (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) NOT NULL,
        answers JSONB NOT NULL,
        score INTEGER NOT NULL,
        category VARCHAR(50) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  }
}
