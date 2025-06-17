"use client";

import React, { useState } from "react";

interface FilterByPriceProps {
  defaultMin?: number;
  defaultMax?: number;
}

export default function FilterByPrice({ defaultMin = 0, defaultMax = 1000000 }: FilterByPriceProps) {
  const [minPrice, setMinPrice] = useState(defaultMin);
  const [maxPrice, setMaxPrice] = useState(defaultMax);

  return (
    <form method="GET" action="/vehicles/list" className="flex gap-4 items-center mb-6">
      <div>
        <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700">
          Min Price
        </label>
        <input
          type="number"
          name="minPrice"
          id="minPrice"
          value={minPrice}
          onChange={(e) => setMinPrice(Number(e.target.value))}
          className="border rounded px-2 py-1 w-24"
          min={0}
        />
      </div>

      <div>
        <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700">
          Max Price
        </label>
        <input
          type="number"
          name="maxPrice"
          id="maxPrice"
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="border rounded px-2 py-1 w-24"
          min={0}
        />
      </div>

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Filter
      </button>
    </form>
  );
}
