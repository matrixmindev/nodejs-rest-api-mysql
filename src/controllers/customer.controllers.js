import { CustomerModel } from "../Models/customer.model.js";

export class CustomerController {
  static async getCustomers(req, res) {
    const { name } = req.query;

    const result = await CustomerModel.getByName({ name });

    if (result) {
      return res.json(result);
    } else if (result === false) {
      return res.status(404).json({
        message: `el nombre ${name} no se encuentra en la base de datos`,
      });
    }

    try {
      const rows = await CustomerModel.getAll();
      res.json(rows);
    } catch (error) {
      res.status(500).json({
        message: "Ha ocurrido un error al obtener los datos",
        error,
      });
    }
  }

  static async getCustomer(req, res) {
    const { id } = req.params;

    const rows = await CustomerModel.getById({ id });

    if (rows.length <= 0)
      return res.status(404).json({ message: "customers not found" });

    res.json(rows);
  }
  //add client
  static async createCustomer(req, res) {
    const { name, salary } = req.body;

    const newCustomer = await CustomerModel.create({ name, salary });
    console.log(newCustomer);
    res.json(newCustomer);
  }

  // actualizar cliente
  static async updateCustomer(req, res) {
    const { name, salary } = req.body;
    const { id } = req.params;

    if (!name && !salary)
      return res.status(404).send("rellene los campos del formulario");

    try {
      const result = await CustomerModel.update({
        id,
        name,
        salary,
      });

      if (result.affectedRows <= 0) {
        return res.status(404).json({ message: "Customers not found" });
      }

      const rows = await CustomerModel.getById({ id });

      res.json(rows);
    } catch (error) {
      res.status(500).json({ message: "ha ocurrido un error" });
    }
  }

  //delete client
  static async deleteCustomer(req, res) {
    const { id } = req.params;

    try {
      const result = await CustomerModel.delete({ id });
      console.log(result.affectedRows);
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "customer not found" });
      }

      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ message: "ha ocurrido un error" });
    }
  }
}
