import { executeMysqlQuery } from "./../config/db";
import DeviceType from "../models/deviceType";
import { deviceTypeSchema } from "../schemas/deviceType";

export const getAll = async (req, res) => {
  try {
    const result = await executeMysqlQuery(
      "SELECT * FROM device_type WHERE Deleted = 0"
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const query = `SELECT * FROM device_type WHERE DeviceTypeId = ${id}`;
    const result = await executeMysqlQuery(query);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createDevice = async (req, res) => {
  try {
    const { error } = deviceTypeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const deviceType = new DeviceType(req.body);
    const query = `INSERT INTO device_type (DeviceTypeName, Description, Deleted) VALUES ('${deviceType.DeviceTypeName}', '${deviceType.Description}', ${deviceType.Deleted})`;
    await executeMysqlQuery(query);
    res.status(200).json("Device created successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateDevice = async (req, res) => {
  try {
    const { error } = deviceTypeSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const deviceType = new DeviceType(req.body);
    const query = `UPDATE device_type SET DeviceTypeName = '${deviceType.DeviceTypeName}', Description = '${deviceType.Description}', Deleted = ${deviceType.Deleted} WHERE DeviceTypeId = ${deviceType.DeviceTypeId}`;
    await executeMysqlQuery(query);
    res.status(200).json({ message: "Device type updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteDevice = async (req, res) => {
  try {
    const query = `UPDATE device_type SET Deleted = 1 WHERE DeviceTypeId = ${req.params.id}`;
    await executeMysqlQuery(query);
    res.status(200).json({ message: "Device deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
