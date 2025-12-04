import { executeMysqlQuery } from "../config/db";

export const getAllBookingVotesDetail = async (req, res) => {
  try {
    const bookingVotesDetail = await executeMysqlQuery(
      "SELECT * FROM booking_votes_detail WHERE Deleted = 0"
    );
    res.send(bookingVotesDetail);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send(error.message);
  }
};

export const getBookingVotesDetailById = async (req, res) => {
  try {
    const id = req.params.id;
    const bookingVotesDetail = await executeMysqlQuery(
      `SELECT * FROM booking_votes_detail WHERE BookingVotesDetailId = ${id}`
    );
    res.send(bookingVotesDetail);
  } catch (error) {
    console.error("Error executing query:", error);
    res.status(500).send(error.message);
  }
};
