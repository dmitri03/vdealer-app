import Link from "next/link";
import { createCustomer } from "@/actions/customer-actions";
import { redirect } from "next/navigation";
import connectDB from "@/data/db";
export default function CreateCustomer() {
connectDB();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Register New Customer</h1>

        <form
          action={async (formData) => {
            "use server";
            const result = await createCustomer(formData);
            console.log(result);
            redirect("/");
          }}
        >
          <div>
            <label htmlFor="name" className="block mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              name="email"
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
            >
              Register
            </button>

            <Link
              href="/"
              className="px-6 py-2 border rounded hover:bg-gray-100"
            >
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </main>
  );
}