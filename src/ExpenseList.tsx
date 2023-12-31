import "./ExpenseList.css";
import { ExpenseProps } from "./types.ts";
import TDCurrency from "./TDCurrency.tsx";
import TDDeleteButton from "./TDDeleteButton.tsx";
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

  const filteredTotal = filteredExpenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);

  function handleDelete(id: string) {
    setExpenses(expenses.filter((expense) => expense.id !== id));
  }

  return (
    <>
      <div className="category-selector">
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
              <td>{expense.description}</td>
              <TDCurrency>{expense.amount}</TDCurrency>
              <td>{expense.category}</td>
              <TDDeleteButton onClick={handleDelete} id={expense.id}/>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td></td>
            <TDCurrency fontWeight="bold">{filteredTotal}</TDCurrency>
            <td colSpan={2}></td>
          </tr>
        </tfoot>
      </table>
    </>
  );
}

export default ExpenseList;
