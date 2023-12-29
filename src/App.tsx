import { useState, useEffect } from "react";
import AddForm from "./AddForm";
import ExpenseList from "./ExpenseList";
import { v4 as uuidv4 } from 'uuid';


interface Expense {
  description: string;
  amount: number;
  category: string;
  id: string;
}

function loadSampleExpenses(): Expense[] {
  return [
    {
      description: "Two minute noodles",
      amount: 1,
      category: "Groceries",
      id: uuidv4(),
    },
    {
      description: "Power bill",
      amount: 2,
      category: "Utilities",
      id: uuidv4(),
    },
    {
      description: "Hookers",
      amount: 300,
      category: "Entertainment",
      id: uuidv4(),
    },
    {
      description: "Cocaine",
      amount: 200,
      category: "Entertainment",
      id: uuidv4(),
    },
    {
      description: "Weed",
      amount: 200,
      category: "Entertainment",
      id: uuidv4(),
    },
    {
      description: "LSD",
      amount: 200,
      category: "Entertainment",
      id: uuidv4(),
    },
    {
      description: "Shrooms",
      amount: 200,
      category: "Groceries",
      id: uuidv4(),
    },
    {
      description: "Ayahuasca",
      amount: 200,
      category: "Entertainment",
      id: uuidv4(),
    },
  ];
}


function App() {
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    setExpenses(loadSampleExpenses());
  }, []);

  return (
    <>
      <AddForm />
      <hr />
      <ExpenseList expenses={expenses}/>
    </>
  );
}

export default App;
