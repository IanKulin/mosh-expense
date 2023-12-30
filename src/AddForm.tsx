import { Expense, ExpenseProps } from "./types.ts";
import { FormEvent, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import {z } from "zod";

function AddForm({ expenses, setExpenses }: ExpenseProps) {
  const descriptionRef = useRef<HTMLInputElement>(null);
  const amountRef = useRef<HTMLInputElement>(null);
  const categoryRef = useRef<HTMLSelectElement>(null);
 

  const handleSubmit = (event: FormEvent) => {
    const expense: Expense = { description: "", amount: 0, category: "", id: uuidv4() };
    event.preventDefault();
    if (descriptionRef.current) {
      expense.description = descriptionRef.current.value;
      descriptionRef.current.value = "";
    }
    if (amountRef.current) {
      expense.amount = Number(amountRef.current.value);
      amountRef.current.value = "";
    }
    if (categoryRef.current) {
      expense.category = categoryRef.current.value;
      categoryRef.current.value = "";
    }
    setExpenses([...expenses, expense]);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:{" "}
          </label>
          <input
            id="description"
            ref={descriptionRef}
            type="text"
            name="description"
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount:{" "}
          </label>
          <input
            id="amount"
            ref={amountRef}
            type="number"
            name="amount"
            className="form-control"
            step="0.01"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category:{" "}
          </label>
          <select
            id="category"
            ref={categoryRef}
            name="category"
            className="form-control"
          >
            <option value="">Select category</option>
            <option value="Groceries">Groceries</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddForm;
