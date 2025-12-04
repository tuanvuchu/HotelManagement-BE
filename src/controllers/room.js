import { executeMysqlQuery } from "../config/db";
import Room from "../models/room";
import { roomSchema } from "../schemas/room";

export const getAllRooms = async (req, res) => {
  try {
    const result = await executeMysqlQuery(
      "SELECT * FROM room WHERE Deleted = 0"
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//todo
export const getRoomsFillter = async (req, res) => {
  try {
    const result = await executeMysqlQuery(
      "SELECT * FROM room WHERE Deleted = 0"
    );
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getRoomById = async (req, res) => {
  try {
    const { id } = req.params;
    const room = await executeMysqlQuery(
      "SELECT * FROM room WHERE RoomId = ?",
      [id]
    );
    res.status(200).json(room);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    const { error } = roomSchema.validate(room, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    await executeMysqlQuery(
      "INSERT INTO room (RoomTypeId, RoomImage, Price, NumberOfFloor, MaximumNumberOfGuests, Status, Description, RoomArea, Amenities, RoomDetail, Deleted) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        room.RoomTypeId,
        room.RoomImage,
        room.Price,
        room.NumberOfFloor,
        room.MaximumNumberOfGuests,
        room.Status,
        room.Description,
        room.RoomArea,
        room.Amenities,
        room.RoomDetail,
        room.Deleted,
      ]
    );
    res.status(200).json("Room created successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateRoom = async (req, res) => {
  try {
    const room = new Room(req.body);
    const { error } = roomSchema.validate(room, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    await executeMysqlQuery(
      "UPDATE room SET RoomTypeId =?, RoomImage =?, Price =?, NumberOfFloor =?, MaximumNumberOfGuests=?, Status =?, Description =?, RoomArea=?, Amenities=?, RoomDetail=?, Deleted =? WHERE RoomId =?",
      [
        room.RoomTypeId,
        room.RoomImage,
        room.Price,
        room.NumberOfFloor,
        room.MaximumNumberOfGuests,
        room.Status,
        room.Description,
        room.RoomArea,
        room.Amenities,
        room.RoomDetail,
        room.Deleted,
        room.RoomId,
      ]
    );
    res.status(200).json("Room updated successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteRoom = async (req, res) => {
  try {
    const { id } = req.params;
    await executeMysqlQuery("UPDATE room SET Deleted = 1 WHERE RoomId = ?", [
      id,
    ]);
    res.status(200).json("Room deleted successfully");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
