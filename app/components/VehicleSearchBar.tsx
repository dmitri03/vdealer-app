"use client";

import React, { useState } from "react";

export default function SearchBar({ defaultValue = "" }) {
  const [search, setSearch] = useState(defaultValue);

  return (
    <form method="GET" className="flex gap-2">
      <input
        type="text"
        name="search"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by make or model"
        className="border px-4 py-2 rounded w-full md:w-1/2"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Search
      </button>
    </form>
  );
}
