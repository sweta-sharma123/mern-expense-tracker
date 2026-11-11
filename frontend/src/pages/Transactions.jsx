import { useEffect, useState } from "react";
import api from "../services/api";

const emptyForm = {
  title: "", amount: "", type: "expense", category: "Food",
  date: new Date().toISOString().slice(0, 10), note: ""
};

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [message, setMessage] = useState("");

  const load = async () => {
    const response = await api.get("/transactions", {
      params: { search, type: typeFilter }
    });
    setTransactions(response.data);
  };

  useEffect(() => {
    load().catch(() => setMessage("Could not load transactions"));
  }, [search, typeFilter]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      const data = { ...form, amount: Number(form.amount) };
      if (editingId) await api.put(`/transactions/${editingId}`, data);
      else await api.post("/transactions", data);
      setForm(emptyForm);
      setEditingId(null);
      await load();
      setMessage(editingId ? "Transaction updated" : "Transaction added");
    } catch (error) {
      setMessage(error.response?.data?.message || "Could not save transaction");
    }
  };

  const edit = (item) => {
    setEditingId(item._id);
    setForm({
      title: item.title,
      amount: item.amount,
      type: item.type,
      category: item.category,
      date: new Date(item.date).toISOString().slice(0, 10),
      note: item.note || ""
    });
    window.scrollTo(0, 0);
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this transaction?")) return;
    try {
      await api.delete(`/transactions/${id}`);
      await load();
      setMessage("Transaction deleted");
    } catch (error) {
      setMessage("Could not delete transaction");
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div>
      <div className="page-heading"><div><h2>Transactions</h2><p className="muted">Add and manage your income and expenses.</p></div></div>
      <section className="panel">
        <h3>{editingId ? "Edit Transaction" : "Add Transaction"}</h3>
        <form onSubmit={submit} className="form-grid">
          <div><label>Title</label><input name="title" value={form.title} onChange={change} placeholder="e.g. Salary or Food" required /></div>
          <div><label>Amount (₹)</label><input name="amount" type="number" min="0.01" step="0.01" value={form.amount} onChange={change} required /></div>
          <div><label>Type</label><select name="type" value={form.type} onChange={change}><option value="income">Income</option><option value="expense">Expense</option></select></div>
          <div><label>Category</label><select name="category" value={form.category} onChange={change}>
            <option>Food</option><option>Travel</option><option>Shopping</option><option>Salary</option><option>Education</option><option>Bills</option><option>Health</option><option>Entertainment</option><option>Other</option>
          </select></div>
          <div><label>Date</label><input name="date" type="date" value={form.date} onChange={change} required /></div>
          <div><label>Note (optional)</label><input name="note" value={form.note} onChange={change} placeholder="Short note" /></div>
          <div className="form-actions">
            <button className="primary">{editingId ? "Update Transaction" : "Add Transaction"}</button>
            {editingId && <button type="button" className="secondary" onClick={cancelEdit}>Cancel</button>}
          </div>
        </form>
        {message && <p className="message">{message}</p>}
      </section>

      <section className="panel">
        <div className="filter-row">
          <input placeholder="Search by title..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select value={typeFilter} onChange={(e) => setTypeFilter(e.target.value)}>
            <option value="">All Types</option><option value="income">Income</option><option value="expense">Expense</option>
          </select>
        </div>
        {transactions.length === 0 ? <p className="muted">No transactions found.</p> : (
          <div className="table-wrap"><table>
            <thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Type</th><th>Amount</th><th>Actions</th></tr></thead>
            <tbody>{transactions.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td><td>{item.category}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td><td>{item.type}</td>
                <td className={item.type === "income" ? "green" : "red"}>₹{Number(item.amount).toLocaleString("en-IN")}</td>
                <td className="actions"><button className="small secondary" onClick={() => edit(item)}>Edit</button><button className="small danger" onClick={() => remove(item._id)}>Delete</button></td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </section>
    </div>
  );
};

export default Transactions;
