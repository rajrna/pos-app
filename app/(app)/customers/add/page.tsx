"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateCustomer } from "@/hooks/useCustomers";
import * as z from "zod";
import toast from "react-hot-toast";

const customerSchema = z.object({
  name: z
    .string()
    .min(1, "Customer name is required"),
  email: z
    .email("Invalid email")
    .optional()
    .or(z.literal("")),
  phone: z.string().optional(),
});

type CustomerFormData = z.infer<
  typeof customerSchema
>;

export default function Page() {
  const createCustomerMutation =
    useCreateCustomer();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });
  const onSubmit = async (
    data: CustomerFormData,
  ) => {
    try {
      // Save to Supabase
      await createCustomerMutation.mutateAsync(
        data,
      );
      toast.success(
        "Customer created successfully!",
      );

      // Success! Navigate back to customers page
    } catch (error) {
      console.error(
        "Failed to create customer:",
        error,
      );
      toast.error(
        "Failed to create customer. Please try again.",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Header */}
      <div className="mb-8">
        <Link
          href="/customers"
          className="mb-4 -ml-2"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Customers
        </Link>

        <h1 className="text-4xl font-bold text-gray-900">
          New customer
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
              Customer
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
                placeholder="Customer name"
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
              Email
            </Label>
            <div className="col-span-2">
              <Input
                id="email"
                type="email"
                {...register("email")}
                className={
                  errors.email
                    ? "border-red-500"
                    : ""
                }
                placeholder="user@email.com"
                disabled={isSubmitting}
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 items-start pb-1">
            <Label
              htmlFor="phone"
              className="text-right pt-3 text-gray-700"
            >
              Phones
            </Label>
            <div className="col-span-2">
              <Input
                id="phone"
                type="tel"
                {...register("phone")}
                placeholder="+977 ..."
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-4xl mt-6 flex justify-end gap-3">
          <Link
            href="/customers"
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
              : "Create customer"}
          </Button>
        </div>
      </form>
    </div>
  );
}
