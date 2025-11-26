import express from "express";

import {
  getAccounts,
  getAccountById,
  createAccount,
  updateAccount,
  deleteAccount,
} from "../controllers/account.js";

const router = express.Router();

router.get("/account/get-all", getAccounts);
router.get("/account/get-data-by-id/:id", getAccountById);
router.post("/account/create", createAccount);
router.put("/account/update", updateAccount);
router.delete("/account/delete/:id", deleteAccount);

export default router;
