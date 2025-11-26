import Joi from "joi";

export const bookingVotesSchema = Joi.object({
  BookingVotesId: Joi.string().uuid().required(),
  UserId: Joi.number().required(),
  BookingDate: Joi.date().optional(),
  CheckinDate: Joi.date().required(),
  CheckoutDate: Joi.date().required(),
  Note: Joi.string().required(),
  TotalAmount: Joi.number().required(),
  Status: Joi.string().required(),
  Deleted: Joi.boolean().required(),
  listBookingVotesDetails: Joi.array()
    .items(
      Joi.object({
        BookingVotesDetailId: Joi.string().uuid().required(),
        BookingVotesId: Joi.string().uuid().required(),
        RoomId: Joi.number().required(),
        RoomPrice: Joi.number().required(),
        Note: Joi.string().required(),
        Deleted: Joi.boolean().required(),
      }),
    )
    .required(),
});
