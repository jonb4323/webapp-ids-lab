const pool = require('../utils/db');
const bcrypt = require('bcryptjs');

class User {
  static async changeRole(id, role) { // Only available for super admin
    try {
      const connection = await pool.getConnection();
      const [result] = await connection.query('UPDATE users SET role = ? WHERE id = ?', [role, id]);
      connection.release();
      return result;
    } catch (error) {
      console.error('Error changing user role:', error);
      throw error;
    }
  }

  static async findByEmail(email) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
      connection.release();
      return rows[0];
    } catch (error) {
      console.error('Error finding user by email:', error);
      throw error;
    }
  }

  static async findAll() {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT id, email, role, created_at FROM users');
      connection.release();
      return rows;
    } catch (error) {
      console.error('Error finding all users:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const connection = await pool.getConnection();
      const [rows] = await connection.query('SELECT * FROM users WHERE id = ?', [id]);
      connection.release();
      return rows[0];
    } catch (error) {
      console.error('Error finding user by id:', error);
      throw error;
    }
  }

  static async create(user) {
    try {
      const connection = await pool.getConnection();
      // This is where you would hash the password
      const [result] = await connection.query(
        'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
        [user.email, user.password, user.role]
      );
      connection.release();
      return result;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  static async verifyPassword(plainPassword, userPassword) {
    // This is where you would verify the password
    try { return await (plainPassword === userPassword); } 
    catch (error) {
      console.error('Error verifying password:', error);
      throw error;
    }
  }
}

module.exports = User;
