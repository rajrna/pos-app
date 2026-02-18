"use client";

import Link from "next/link";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { useCreateProduct } from "@/hooks/useProducts";

const productSchema = z.object({
  name: z
    .string()
    .min(1, "Product name is required"),
  price: z
    .number()
    .min(1, "Product price is required"),
  description: z.string().optional(),
  category: z.string().optional(),
  image: z.string().optional(),
});

type ProductFormData = z.infer<
  typeof productSchema
>;

export default function Page() {
  const createProductMutation =
    useCreateProduct();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
    },
  });
  const onSubmit = async (
    data: ProductFormData,
  ) => {
    try {
      await createProductMutation.mutateAsync(
        data,
      );
      toast.success(
        "Product created successfully!",
      );
    } catch (error) {
      console.error(
        "Failed to create product.",
        error,
      );
      toast.error(
        "Failed to create product. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/products"
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Products
        </Link>

        <h1 className="text-4xl font-bold text-gray-900">
          New product
        </h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Main Content Card */}
        <div className="max-w-4xl bg-white rounded-lg border shadow-sm p-8">
          <h3 className="text-xl font-semibold mb-3">
            Basic information
          </h3>
          <div className="grid grid-cols-3 gap-4 items-start pb-1">
            <Label
              htmlFor="name"
              className="text-right pt-3 text-gray-700"
            >
              Product
              <span className="text-red-500">
                *
              </span>
            </Label>
            <div className="col-span-2">
              <Input
                id="name"
                {...register("name")}
                className={
                  errors.name
                    ? "border-red-500"
                    : ""
                }
                placeholder="Product name"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-sm text-red-500 mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 items-start pb-1">
            <Label
              htmlFor="email"
              className="text-right pt-3 text-gray-700"
            >
              Price
            </Label>
            <div className="col-span-2">
              <Input
                id="price"
                type="number"
                {...register("price")}
                className={
                  errors.price
                    ? "border-red-500"
                    : ""
                }
                placeholder="$$$"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 items-start pb-1">
            <Label
              htmlFor="description"
              className="text-right pt-3 text-gray-700"
            >
              Description
            </Label>
            <div className="col-span-2">
              <Input
                id="description"
                type="string"
                {...register("description")}
                placeholder="Describe the product"
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mt-6 flex justify-end gap-3">
          <Link
            href="/products"
            className="bg-red-500 hover:bg-red-600 rounded px-2 text-gray-100 py-1"
          >
            Cancel
          </Link>
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Creating."
              : "Create product"}
          </Button>
        </div>
      </form>
    </div>
  );
}
