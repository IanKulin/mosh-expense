export interface Expense {
    description: string;
    amount: number;
    category: string;
    id: string;
  }

  // needed so we can validate the form without the id then 
  // add it later
  export interface FormExpense {
    description: string;
    amount: number;
    category: string;
  }
  
  export interface ExpenseProps {
    expenses: Expense[];
    setExpenses: (expenses: Expense[]) => void;
  }