const pool = require('../utils/db');

async function runMigration() {
  try {
    const connection = await pool.getConnection();
    
    console.log('Running migration: Adding created_by column to employees table...');
    
    // Check if column already exists
    const [columns] = await connection.query(
      "SHOW COLUMNS FROM employees LIKE 'created_by'"
    );
    
    if (columns.length > 0) {
      console.log('Column created_by already exists. Skipping migration.');
      connection.release();
      return;
    }
    
    // Add the column with matching data type (INT UNSIGNED to match users.id)
    await connection.query('ALTER TABLE employees ADD COLUMN created_by INT UNSIGNED');
    console.log('✓ Added created_by column');
    
    // Add foreign key constraint
    await connection.query(
      'ALTER TABLE employees ADD FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL'
    );
    console.log('✓ Added foreign key constraint');
    
    connection.release();
    console.log('Migration completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

runMigration();
