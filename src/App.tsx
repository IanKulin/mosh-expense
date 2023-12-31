import { useState, useEffect } from "react";
import AddForm from "./AddForm";
import { Expense } from "./types.ts";
import ExpenseList from "./ExpenseList";
import { v4 as uuidv4 } from "uuid";


function loadSampleExpenses(): Expense[] {
  return [
    {
      description: "Two minute noodles",
      amount: 1.98,
      category: "Groceries",
      id: uuidv4(),
    },
    {
      description: "Power bill",
      amount: 223.64,
      category: "Utilities",
      id: uuidv4(),
    },
    {
      description: "Mirror ball hire",
      amount: 200.50,
      category: "Entertainment",
      id: uuidv4(),
    },
  ];
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>(() => {
    // Try to load expenses from local storage
    const savedExpenses = localStorage.getItem('mosh-expense');
    if (savedExpenses) {
      return JSON.parse(savedExpenses);
    } else {
      // If there are no saved expenses, load the sample expenses
      return loadSampleExpenses();
    }
  });

  useEffect(() => {
    // Save expenses to local storage whenever they change
    localStorage.setItem('mosh-expense', JSON.stringify(expenses));
  }, [expenses]);

  return (
    <>
      <AddForm expenses={expenses} setExpenses={setExpenses} />
      <hr />
      <ExpenseList expenses={expenses} setExpenses={setExpenses} />
    </>
  );
}

export default App;
