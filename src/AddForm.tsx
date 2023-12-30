import { Expense, FormExpense, ExpenseProps } from "./types.ts";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import "./AddForm.css";

function AddForm({ expenses, setExpenses }: ExpenseProps) {
  
  const schema: ZodType<FormExpense> = z.object({
    description: z.string().min(3, {message: "Description should be at least three characters."}),
    amount: z
      .number({
        invalid_type_error:
          "Amount is required.",
      })
      .min(0.01),
    category: z
      .string()
      .min(1, { message: "Category is required." }),
  });

  const submitData = (formData: FormExpense) => {
    // called after Zod has validated the input
    // id is part of the Expense type, but not the FormExpense type so we add it here
    const expense: Expense = { ...formData, id: uuidv4() };
    setExpenses([...expenses, expense]);
    reset(); // blank the form fields
  };

  // plumbing for the Zod form validation
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
        <div className="form-group">
          <label htmlFor="description" className="form-label">
            Description:{" "}
          </label>
          <input
            id="description"
            type="text"
            {...register("description")}
            className="form-control"
            aria-label="Enter the description of this expense"
          />
        </div>
        {errors.description && (
          <p className="text-danger validation-message">
            {errors.description.message}
          </p>
        )}
        <div className="form-group">
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
            aria-label="Enter the amount of this expense"
          />
        </div>
        {errors.amount && (
          <p className="text-danger validation-message">
            {errors.amount.message}
          </p>
        )}
        <div className="form-group">
          <label htmlFor="category" className="form-label">
            Category:{" "}
          </label>
          <select
            id="category"
            {...register("category")}
            name="category"
            className="form-control drop-down"
            aria-label="Select the category of this expense"
          >
            <option value="">Select category</option>
            <option value="Groceries">Groceries</option>
            <option value="Utilities">Utilities</option>
            <option value="Entertainment">Entertainment</option>
          </select>
        </div>
        {errors.category && (
          <p className="text-danger validation-message">
            {errors.category.message}
          </p>
        )}
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
}

export default AddForm;
