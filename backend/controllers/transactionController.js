import Transaction from "../models/Transaction.js";

export const getTransactions = async (req, res) => {
  try {
    const { search, type, category } = req.query;
    const filter = { userId: req.userId };

    if (type && ["income", "expense"].includes(type)) filter.type = type;
    if (category) filter.category = category;
    if (search) filter.title = { $regex: search, $options: "i" };

    const transactions = await Transaction.find(filter).sort({ date: -1, createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ message: "Could not load transactions" });
  }
};

export const addTransaction = async (req, res) => {
  try {
    const { title, amount, type, category, date, note } = req.body;

    if (!title || !amount || !type || !category) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }

    const transaction = await Transaction.create({
      userId: req.userId, title, amount, type, category, date, note
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(400).json({ message: "Could not add transaction. Check the entered values." });
  }
};

export const updateTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndUpdate(
      { _id: req.params.id, userId: req.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    res.json(transaction);
  } catch (error) {
    res.status(400).json({ message: "Could not update transaction" });
  }
};

export const deleteTransaction = async (req, res) => {
  try {
    const transaction = await Transaction.findOneAndDelete({
      _id: req.params.id,
      userId: req.userId
    });

    if (!transaction) return res.status(404).json({ message: "Transaction not found" });
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: "Could not delete transaction" });
  }
};
