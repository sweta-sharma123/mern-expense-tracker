import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const money = (value) => "₹" + Number(value || 0).toLocaleString("en-IN");

const Dashboard = () => {
  const [transactions, setTransactions] = useState([]);
  const [error, setError] = useState("");

  const load = async () => {
    try {
      const response = await api.get("/transactions");
      setTransactions(response.data);
    } catch (err) {
      setError("Could not load transactions. Please login again.");
    }
  };

  useEffect(() => { load(); }, []);

  const totals = useMemo(() => {
    let income = 0;
    let expense = 0;
    transactions.forEach((item) => {
      if (item.type === "income") income += Number(item.amount);
      else expense += Number(item.amount);
    });
    return { income, expense, balance: income - expense };
  }, [transactions]);

  const recent = transactions.slice(0, 5);

  return (
    <div>
      <div className="page-heading">
        <div><h2>Dashboard</h2><p className="muted">Your money overview</p></div>
        <Link className="primary link-button" to="/transactions">Manage Transactions</Link>
      </div>
      {error && <p className="error">{error}</p>}
      <div className="summary-grid">
        <div className="summary-card"><p>Total Income</p><h2 className="green">{money(totals.income)}</h2></div>
        <div className="summary-card"><p>Total Expense</p><h2 className="red">{money(totals.expense)}</h2></div>
        <div className="summary-card"><p>Remaining Balance</p><h2>{money(totals.balance)}</h2></div>
      </div>
      <section className="panel">
        <div className="page-heading"><h3>Recent Transactions</h3><Link to="/transactions">View all</Link></div>
        {recent.length === 0 ? <p className="muted">No transactions yet. Add your first income or expense.</p> : (
          <div className="table-wrap"><table>
            <thead><tr><th>Title</th><th>Category</th><th>Date</th><th>Type</th><th>Amount</th></tr></thead>
            <tbody>{recent.map((item) => (
              <tr key={item._id}>
                <td>{item.title}</td><td>{item.category}</td>
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.type}</td>
                <td className={item.type === "income" ? "green" : "red"}>{item.type === "income" ? "+" : "-"}{money(item.amount)}</td>
              </tr>
            ))}</tbody>
          </table></div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
