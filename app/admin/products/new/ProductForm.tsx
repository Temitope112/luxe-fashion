"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface Product {
  id: string;
  name: string;
  slug: string;
  category: string;
  description: string | null;
  price: string;
  oldPrice: string | null;
  badge: string | null;
  images: string[];
  colors: string[];
  sizes: string[];
  inStock: boolean;
}

interface ProductFormProps {
  product?: Product;
}

export default function ProductForm({
  product,
}: ProductFormProps) {
  const router = useRouter();

  const isEditing = Boolean(product);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    category: product?.category ?? "",
    description: product?.description ?? "",
    price: product?.price ?? "",
    oldPrice: product?.oldPrice ?? "",
    badge: product?.badge ?? "",
    images: product?.images.join(", ") ?? "",
    colors: product?.colors.join(", ") ?? "",
    sizes: product?.sizes.join(", ") ?? "",
    inStock: product?.inStock ?? true,
  });

  const updateField = (
    field: string,
    value: string | boolean
  ) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        isEditing
          ? `/api/admin/products/${product?.id}`
          : "/api/admin/products",
        {
          method: isEditing ? "PUT" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(
          data.error ||
            `Unable to ${
              isEditing ? "update" : "create"
            } product.`
        );
        return;
      }

      router.push("/admin/products");
      router.refresh();
    } catch {
      setError(
        `Unable to ${
          isEditing ? "update" : "create"
        } product.`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl bg-white p-7 shadow-sm sm:p-10"
    >
      {error && (
        <div className="mb-8 rounded-2xl bg-red-50 px-5 py-4 text-sm font-medium text-red-700">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <section>
        <h2 className="text-xl font-bold">
          Basic Information
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Field
            label="Product Name"
            value={form.name}
            onChange={(value) =>
              updateField("name", value)
            }
            placeholder="Classic Leather Jacket"
            required
          />

          <Field
            label="Slug"
            value={form.slug}
            onChange={(value) =>
              updateField("slug", value)
            }
            placeholder="classic-leather-jacket"
            required
          />

          <Field
            label="Category"
            value={form.category}
            onChange={(value) =>
              updateField("category", value)
            }
            placeholder="Jackets"
            required
          />

          <Field
            label="Badge"
            value={form.badge}
            onChange={(value) =>
              updateField("badge", value)
            }
            placeholder="New"
          />
        </div>

        <div className="mt-6">
          <label className="text-sm font-semibold">
            Description
          </label>

          <textarea
            value={form.description}
            onChange={(event) =>
              updateField(
                "description",
                event.target.value
              )
            }
            rows={5}
            placeholder="Describe the product..."
            className="mt-2 w-full rounded-2xl border border-neutral-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-black"
          />
        </div>
      </section>

      {/* Pricing */}
      <section className="mt-10 border-t border-neutral-200 pt-10">
        <h2 className="text-xl font-bold">
          Pricing
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Field
            label="Price"
            type="number"
            value={form.price}
            onChange={(value) =>
              updateField("price", value)
            }
            placeholder="99.00"
            required
          />

          <Field
            label="Old Price"
            type="number"
            value={form.oldPrice}
            onChange={(value) =>
              updateField("oldPrice", value)
            }
            placeholder="129.00"
          />
        </div>
      </section>

      {/* Images */}
      <section className="mt-10 border-t border-neutral-200 pt-10">
        <h2 className="text-xl font-bold">
          Images
        </h2>

        <p className="mt-2 text-sm text-neutral-500">
          Enter image URLs separated by commas.
        </p>

        <textarea
          value={form.images}
          onChange={(event) =>
            updateField(
              "images",
              event.target.value
            )
          }
          rows={4}
          placeholder="https://example.com/image-1.jpg, https://example.com/image-2.jpg"
          className="mt-6 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-black"
          required
        />
      </section>

      {/* Variants */}
      <section className="mt-10 border-t border-neutral-200 pt-10">
        <h2 className="text-xl font-bold">
          Variants
        </h2>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <Field
            label="Colors"
            value={form.colors}
            onChange={(value) =>
              updateField("colors", value)
            }
            placeholder="Black, White, Brown"
          />

          <Field
            label="Sizes"
            value={form.sizes}
            onChange={(value) =>
              updateField("sizes", value)
            }
            placeholder="S, M, L, XL"
          />
        </div>
      </section>

      {/* Stock */}
      <section className="mt-10 border-t border-neutral-200 pt-10">
        <label className="flex cursor-pointer items-center gap-3">
          <input
            type="checkbox"
            checked={form.inStock}
            onChange={(event) =>
              updateField(
                "inStock",
                event.target.checked
              )
            }
            className="h-4 w-4"
          />

          <span className="text-sm font-semibold">
            Product is in stock
          </span>
        </label>
      </section>

      {/* Actions */}
      <div className="mt-10 flex flex-col-reverse gap-3 border-t border-neutral-200 pt-8 sm:flex-row sm:justify-end">
        <button
          type="button"
          onClick={() =>
            router.push("/admin/products")
          }
          className="rounded-full border border-neutral-200 px-6 py-3 text-sm font-semibold transition hover:border-black"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full bg-black px-6 py-3 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {loading
            ? isEditing
              ? "Saving..."
              : "Creating..."
            : isEditing
              ? "Save Changes"
              : "Create Product"}
        </button>
      </div>
    </form>
  );
}

interface FieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
}: FieldProps) {
  return (
    <div>
      <label className="text-sm font-semibold">
        {label}
      </label>

      <input
        type={type}
        value={value}
        required={required}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-neutral-200 px-4 py-3 text-sm outline-none transition focus:border-black"
      />
    </div>
  );
}