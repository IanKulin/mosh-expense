import { useRef, useState } from "react";
import "./ExpenseList.css";

interface Expense {
  description: string;
  amount: number;
  category: string;
}

interface ExpenseListProps {
  expenses: Expense[];
}

function ExpenseList({ expenses }: ExpenseListProps) {
  const categoryRef = useRef<HTMLSelectElement>(null);

  const [selectedCategory, setSelectedCategory] = useState("All");
  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(event.target.value);
  };
  const filteredExpenses = expenses.filter(
    (expense) => selectedCategory === "All" || expense.category === selectedCategory
  );

  return (
    <>
      <div className="mb-3">
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
            <tr key={expense.description}>
              <td>{expense.description}</td>
              <td>{expense.amount}</td>
              <td>{expense.category}</td>
              <td>
                <button className="btn btn-outline-danger">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default ExpenseList;
