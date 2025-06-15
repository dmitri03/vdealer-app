"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { deleteVehicleById } from "@/actions/vehicle-actions";

export default function DeleteVehicleButton({
  vehicleId,
}: {
  vehicleId: string;
  customerId: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    const confirmed = confirm("Are you sure you want to delete this vehicle?");
    if (!confirmed) return;

    startTransition(async () => {
      const result = await deleteVehicleById(vehicleId);

      if (result.success) {
        router.refresh();
      } else {
        alert("Failed to delete vehicle");
      }
    });
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-600 hover:underline ml-4"
    >
      {isPending ? "Deleting..." : "Delete"}
    </button>
  );
}
