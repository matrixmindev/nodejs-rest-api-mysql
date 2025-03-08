import { pool } from "../db.js";
export class CustomerModel {

  static async getByName({ name }) {
    if (name) {
      const [rows] = await pool.query(
        "SELECT * FROM customers WHERE name = ? ",
        [name]
      );
      console.log(rows);

      if (rows[0] !== undefined) {
        if (name.toLowerCase() === rows[0]["name"].toLowerCase()) {
          return rows[0];
        }
      } else {
        return false;
      }
    }
  }

  static async getAll() {
    const [rows] = await pool.query("SELECT * FROM customers");
    return rows;
  }

  static async getById({ id }) {
    const [rows] = await pool.query("SELECT * FROM customers WHERE id = ?", [
      id,
    ]);
    return rows[0];
  }

  static async create({ name, salary }) {
    try {
      const [rows] = await pool.query(
        "INSERT INTO customers (name, salary) VALUES (?,?)",
        [name, salary]
      );


      return {
       id: rows.insertId,
        name,
        salary
      };
    } catch (error) {
      if (error.code === "ER_BAD_NULL_ERROR") {    
        return {
        
          message: "Los campos no pueden ser nulos",
          sql_error: error.sqlMessage,
          code_error: error.code,
        };
      }
    }
  }

  // patch Customer
  static async update({ id, name, salary }) {
    const [result] = await pool.query(
      "UPDATE customers SET name = IFNULL(?,name), salary = IFNULL(?, salary) WHERE id = ?",
      [name, salary, id]
    );

    return result;
  }

  //delete Customer

  static async delete({ id }) {
    const [result] = await pool.query("DELETE FROM customers WHERE id = ?", [
      id,
    ]);

    return result;
  }
}
