"use client";

import { useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface DeleteProductButtonProps {
  productId: string;
  productName: string;
}

export default function DeleteProductButton({
  productId,
  productName,
}: DeleteProductButtonProps) {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${productName}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      const response = await fetch(
        `/api/admin/product/${productId}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        window.alert(
          data.error || "Unable to delete product."
        );
        return;
      }

      router.refresh();
    } catch {
      window.alert(
        "Something went wrong while deleting the product."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-200 text-neutral-600 transition hover:border-red-500 hover:bg-red-500 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
      aria-label={`Delete ${productName}`}
    >
      <Trash2
        className={`h-4 w-4 ${
          loading ? "animate-pulse" : ""
        }`}
      />
    </button>
  );
}