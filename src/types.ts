export interface Expense {
    description: string;
    amount: number;
    category: string;
    id: string;
  }
  
  export interface ExpenseProps {
    expenses: Expense[];
    setExpenses: (expenses: Expense[]) => void;
  }