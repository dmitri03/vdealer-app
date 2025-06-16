import Link from "next/link";
import connectDB from "@/data/db";
import Owner from "@/data/models/Owner";

async function getCustomers() {
  await connectDB();
  const customers = await Owner.find({}).sort({ name: 1 });
  return customers;
}

export default async function CustomersList() {
  const customers = await getCustomers();

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Customers</h1>
          <Link
            href="/customers/create"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Add Customer
          </Link>
        </div>

        <div className="bg-white shadow rounded">
          {customers.length === 0 ? (
            <p className="p-4 text-gray-500">No customers found</p>
          ) : (
            <ul className="divide-y">
              {customers.map((customer) => (
                <li
                  key={customer._id.toString()}
                  className="p-4 flex justify-between items-center"
                >
                  <div>
                    <h2 className="font-medium text-black">{customer.name}</h2>
                    <p className="text-sm text-gray-600">{customer.email}</p>
                  </div>
                  <div className="space-x-4">
                    <Link
                      href={`/vehicles/create/${customer._id}`}
                      className="text-blue-500 hover:text-blue-600"
                    >
                      Add Vehicle
                    </Link>
                    <Link
                      href={`/vehicles/list/${customer._id}`}
                      className="text-green-500 hover:text-green-600"
                    >
                      View Vehicles
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  );
}