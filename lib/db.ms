// lib/Database.js
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

class Database {
  constructor() {
    this.db = null;
  }

  // Initialize connection to the database
  async init() {
    if (!this.db) {
      this.db = await open({
        filename: './lytport.db',
        driver: sqlite3.Database,
      });
    }
  }

  // Close the database connection
  async close() {
    if (this.db) {
      await this.db.close();
      this.db = null;
    }
  }

  // Example method to fetch data from a specific table
  async fetchData(query, params = []) {
    try {
      await this.init();
      const result = await this.db.all(query, params);
      return result;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }

  // Example method to insert data into a specific table
  async insertData(query, params = []) {
    try {
      await this.init();
      const result = await this.db.run(query, params);
      return result;
    } catch (error) {
      console.error('Error inserting data:', error);
      throw error;
    }
  }

  // Example method to update data in a specific table
  async updateData(query, params = []) {
    try {
      await this.init();
      const result = await this.db.run(query, params);
      return result;
    } catch (error) {
      console.error('Error updating data:', error);
      throw error;
    }
  }

  // Example method to delete data from a specific table
  async deleteData(query, params = []) {
    try {
      await this.init();
      const result = await this.db.run(query, params);
      return result;
    } catch (error) {
      console.error('Error deleting data:', error);
      throw error;
    }
  }
}

export default new Database();
