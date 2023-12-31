import "./ExpenseList.css";
import { ExpenseProps } from "./types.ts";
import { useState } from "react";

function ExpenseList({ expenses, setExpenses }: ExpenseProps) {
  if (expenses.length === 0) return null;

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
          name="category"
          className="form-control drop-down"
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
              <td className="centred-td">{expense.description}</td>
              <td style={{ textAlign: "right" }}>
                $
                {expense.amount.toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </td>
              <td className="centred-td">{expense.category}</td>
              <td className="centred-td">
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleDelete(expense.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <td style={{ textAlign: "right", fontWeight: "bold" }}>
              $
              {filteredExpenses
                .reduce((total, expense) => {
                  return total + expense.amount;
                }, 0)
                .toLocaleString("en-US", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
            </td>
            <td colSpan={2}></td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default ExpenseList;
