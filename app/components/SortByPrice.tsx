"use client";

import React, { useState } from "react";

interface SortByProps {
  defaultSortBy?: string;
  defaultOrder?: "asc" | "desc";
}

export default function SortBy({
  defaultSortBy = "price",
  defaultOrder = "asc",
}: SortByProps) {
  const [sortBy, setSortBy] = useState(defaultSortBy);
  const [order, setOrder] = useState(defaultOrder);

  return (
    <form method="GET" action="/vehicles/list" className="flex gap-4 items-center mb-6">
      <div>
        <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700">
          Sort By
        </label>
        <select
          name="sortBy"
          id="sortBy"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="border rounded px-2 py-1"
        >
          <option value="price">Price</option>
          <option value="year">Year</option>
          <option value="mileage">Mileage</option>
          <option value="make">Make</option>
          <option value="vehicle_model">Model</option>
        </select>
      </div>

      <div>
        <label htmlFor="order" className="block text-sm font-medium text-gray-700">
          Order
        </label>
        <select
          name="order"
          id="order"
          value={order}
          onChange={(e) => setOrder(e.target.value as "asc" | "desc")}
          className="border rounded px-2 py-1"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <button
        type="submit"
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Sort
      </button>
    </form>
  );
}
