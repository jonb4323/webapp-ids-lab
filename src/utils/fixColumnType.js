const pool = require('../utils/db');

async function fixColumnType() {
  try {
    const connection = await pool.getConnection();
    
    console.log('Fixing created_by column data type...');
    
    // Drop the column if it exists
    try {
      await connection.query('ALTER TABLE employees DROP COLUMN created_by');
      console.log('Dropped existing created_by column');
    } catch (err) {
      console.log('Column does not exist or already dropped');
    }
    
    // Add the column with correct data type
    await connection.query('ALTER TABLE employees ADD COLUMN created_by INT UNSIGNED');
    console.log('Added created_by column with INT UNSIGNED type');
    
    // Add foreign key constraint
    await connection.query(
      'ALTER TABLE employees ADD FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL'
    );
    console.log('Added foreign key constraint');
    
    connection.release();
    console.log('Column type fixed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Fix failed:', error);
    process.exit(1);
  }
}

fixColumnType();
