import "./ExpenseList.css";
import { ExpenseProps } from "./types.ts";
import { useRef, useState } from "react";



function ExpenseList({ expenses, setExpenses }: ExpenseProps) {
  const categoryRef = useRef<HTMLSelectElement>(null);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };
  const filteredExpenses = expenses.filter(
    (expense) =>
      selectedCategory === "All" || expense.category === selectedCategory
  );

  function handleDelete(id: string) {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  }

  return (
    <>
      <div className="mb-3 category-selector">
        <label htmlFor="category" className="form-label">
          Category:{" "}
        </label>
        <select
          id="category"
          ref={categoryRef}
          name="category"
          className="form-control"
          onChange={handleCategoryChange}
        >
          <option value="All">All</option>
          <option value="Groceries">Groceries</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
        </select>
      </div>

      <table className="table-bordered">
        <thead>
          <tr>
            <th>Description</th>
            <th>Amount</th>
            <th>Category</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {filteredExpenses.map((expense) => (
            <tr key={expense.id}>
              <td>{expense.description}</td>
            <td style={{ textAlign: "right" }}>{expense.amount.toFixed(2)}</td>
              <td>{expense.category}</td>
              <td>
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td style={{ fontWeight: "bold" }}>Total</td>
            <td style={{ textAlign: "right", fontWeight: "bold" }}>
                {filteredExpenses.reduce((total, expense) => {
                    return total + expense.amount;
                }, 0).toFixed(2)}
            </td>
            <td colSpan={2}></td>
          </tr>
        </tbody>
      </table>
    </>
  );
}

export default ExpenseList;
