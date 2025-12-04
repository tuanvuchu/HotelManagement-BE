import { executeMysqlQuery } from "../config/db";
import { bookingVotesSchema } from "../schemas/bookingVotes";

export const getAllBookingVotes = async (req, res) => {
  try {
    const bookingVotes = await executeMysqlQuery(
      "SELECT * FROM booking_votes WHERE Deleted = 0"
    );
    res.send(bookingVotes);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send(error.message);
  }
};

export const getBookingVotesById = async (req, res) => {
  try {
    const id = req.params.id;
    const bookingVotes = await executeMysqlQuery(
      `SELECT * FROM booking_votes WHERE BookingVotesId = ${id}`
    );
    res.send(bookingVotes);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send(error.message);
  }
};

export const createBookingVotes = async (req, res) => {
  try {
    const {
      BookingVotesId,
      UserId,
      CheckinDate,
      CheckoutDate,
      Note,
      TotalAmount,
      Status = "Pending",
      Deleted = 0,
      listBookingVotesDetails = [],
    } = req.body;

    const { error } = bookingVotesSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({ message: error.message });
    }

    await executeMysqlQuery(
      `INSERT INTO booking_votes (BookingVotesId, UserId, CheckinDate, CheckoutDate, Note, TotalAmount, Status, Deleted)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        BookingVotesId,
        UserId,
        CheckinDate,
        CheckoutDate,
        Note,
        TotalAmount,
        Status,
        Deleted,
      ]
    );

    for (const detail of listBookingVotesDetails) {
      const {
        RoomId,
        RoomPrice,
        Note: detailNote = "",
        Deleted: detailDeleted = 0,
      } = detail;
      await executeMysqlQuery(
        `INSERT INTO booking_votes_detail (BookingVotesId, RoomId, RoomPrice, Note, Deleted)
         VALUES (?, ?, ?, ?, ?)`,
        [BookingVotesId, RoomId, RoomPrice, detailNote, detailDeleted]
      );
    }

    res.status(201).json({
      message: "Create booking successfully!",
      BookingVotesId,
    });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingVotes = async (req, res) => {
  try {
    const {
      BookingVotesId,
      UserId,
      BookingDate,
      CheckinDate,
      CheckoutDate,
      Note,
      TotalAmount,
      Status,
      Deleted,
      listBookingVotesDetails,
    } = req.body;
    const { error } = bookingVotesSchema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    await executeMysqlQuery(
      `UPDATE booking_votes
       SET UserId = ?, BookingDate = ?, CheckinDate = ?, CheckoutDate = ?, Note = ?, TotalAmount=?, Status=?, Deleted = ?
       WHERE BookingVotesId = ?`,
      [
        UserId,
        BookingDate,
        CheckinDate,
        CheckoutDate,
        Note,
        TotalAmount,
        Status,
        Deleted,
        BookingVotesId,
      ]
    );
    if (listBookingVotesDetails && listBookingVotesDetails.length > 0) {
      for (const detail of listBookingVotesDetails) {
        const {
          BookingVotesDetailId,
          RoomId,
          RoomPrice,
          Note: detailNote,
          Deleted: detailDeleted,
        } = detail;
        await executeMysqlQuery(
          `UPDATE booking_votes_detail
           SET BookingVotesId = ?, RoomId = ?, RoomPrice=?, Note = ?, Deleted = ?
           WHERE BookingVotesDetailId = ?`,
          [
            BookingVotesId,
            RoomId,
            RoomPrice,
            detailNote,
            detailDeleted,
            BookingVotesDetailId,
          ]
        );
      }
    }
    res.send({ message: "Update booking votes successfully!" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send(error.message);
  }
};

export const deleteBookingVotes = async (req, res) => {
  try {
    const id = req.params.id;
    await executeMysqlQuery(
      `UPDATE booking_votes SET Deleted = 1 WHERE BookingVotesId = ?`,
      [id]
    );
    await executeMysqlQuery(
      "UPDATE booking_votes_detail SET Deleted = 1 WHERE BookingVotesId = ?",
      [id]
    );
    res.send({ message: "Delete booking votes successfully!" });
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send(error.message);
  }
};
