import Joi from "joi";

export const accountSchema = Joi.object({
  AccountId: Joi.number().integer().required(),
  AccountName: Joi.string().required(),
  Password: Joi.string().required(),
  Role: Joi.string().required(),
  Email: Joi.string().required(),
  Status: Joi.string().required(),
  CreationDate: Joi.date().required(),
  Deleted: Joi.boolean().required(),
});
