import express from "express";
import auth from "../middleware/auth.js";
import {
  getTransactions, addTransaction, updateTransaction, deleteTransaction
} from "../controllers/transactionController.js";

const router = express.Router();

router.use(auth);
router.get("/", getTransactions);
router.post("/", addTransaction);
router.put("/:id", updateTransaction);
router.delete("/:id", deleteTransaction);

export default router;
