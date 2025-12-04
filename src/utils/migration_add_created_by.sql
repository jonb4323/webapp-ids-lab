-- Migration to add created_by column to employees table
ALTER TABLE employees ADD COLUMN created_by INT;
ALTER TABLE employees ADD FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL;
