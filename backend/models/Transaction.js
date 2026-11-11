import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true, trim: true },
  amount: { type: Number, required: true, min: 0.01 },
  type: { type: String, enum: ["income", "expense"], required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true, default: Date.now },
  note: { type: String, default: "" }
}, { timestamps: true });

const Transaction = mongoose.model("Transaction", transactionSchema);
export default Transaction;
