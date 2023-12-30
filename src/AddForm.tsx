import { Expense, FormExpense, ExpenseProps } from "./types.ts";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

function AddForm({ expenses, setExpenses }: ExpenseProps) {
  const schema: ZodType<FormExpense> = z.object({
    description: z.string().min(1),
    amount: z.number({ invalid_type_error: "Please enter a number" }).min(0.01),
    category: z.string().min(1, { message: "Please select a category" }),
  });

  const submitData = (formData: FormExpense) => {
    // id is part of the Expense type, but not the FormExpense type so we add it here
    const expense: Expense = { ...formData, id: uuidv4() };
    setExpenses([...expenses, expense]);
    reset(); // blank the form fields
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
      {/* handleSubmit is the Zod form validation, then it calls submitData 
          if successful */}
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
          {errors.category && (
            <p className="text-danger">{errors.category.message}</p>
          )}
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddForm;
