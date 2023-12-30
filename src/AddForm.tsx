import { Expense, FormExpense, ExpenseProps } from "./types.ts";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";


function AddForm({ expenses, setExpenses }: ExpenseProps) {
  const schema: ZodType<FormExpense> = z.object({
    description: z.string().min(1),
    amount: z.number().min(0.01),
    category: z.string().min(1),
  });


  const submitData = (data: FormExpense) => {
    // add the uuid
    const expense: Expense = { ...data, id: uuidv4() };
    console.log(expense);
    setExpenses([...expenses, expense]);
    reset(); // reset the form fields
  };


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Expense>({
    resolver: zodResolver(schema),
  });


  return (
    <div>
      <form onSubmit={handleSubmit(submitData)}>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Description:{" "}
          </label>
          <input
            id="description"
            type="text"
            {...register("description")}
            className="form-control"
          />
          {errors.description && (
            <p className="text-danger">{errors.description.message}</p>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount:{" "}
          </label>
          <input
            id="amount"
            type="number"
            {...register("amount", { valueAsNumber: true })}
            name="amount"
            className="form-control"
            step="0.01"
          />
          {errors.amount && (
            <p className="text-danger">{errors.amount.message}</p>
          )}
          {errors.id && <p className="text-danger">{errors.id.message}</p>}
        </div>
        <div className="mb-3">
          <label htmlFor="category" className="form-label">
            Category:{" "}
          </label>
          <select
            id="category"
            {...register("category")}
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
