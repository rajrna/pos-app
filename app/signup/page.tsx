"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type SignupFormValues = {
  email: string;
  password: string;
};

export default function Page() {
  const [showPassword, setShowPassword] =
    useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupFormValues>();

  const onSubmit = (data: SignupFormValues) => {
    console.log(data);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4 font-sans ">
      {/* Logo Section */}
      <div className="my-8 flex items-center gap-2">
        <span className="text-2xl text-blue-900 font-bold tracking-tight">
          <Link href="/">Rebuzz</Link>
        </span>
      </div>

      {/* Header */}
      <div className="text-center max-w-md mb-10">
        <h1 className="text-[32px] font-bold leading-tight mb-4">
          Check out Rebuzz — it&apos;s free!
        </h1>
        <p className="text-gray-600 text-[20px] leading-relaxed">
          Rebuzz helps freelancers, consultants,
          and small businesses simplify their
          finances.
        </p>
      </div>

      {/* Form Container */}
      <div className="w-full max-w-100">
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* Email Field */}
          <div>
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-2 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message:
                    "Enter a valid email address",
                },
              })}
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-500">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div>
            <label
              className="block text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                className="w-full px-2 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                {...register("password", {
                  required:
                    "Password is required",
                  minLength: {
                    value: 8,
                    message:
                      "Password must be at least 8 characters",
                  },
                })}
              />
              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-600 text-sm font-bold hover:underline"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password ? (
              <p className="mt-2 text-sm text-red-500">
                {errors.password.message}
              </p>
            ) : (
              <p className="mt-2 text-[14px] text-gray-600">
                At least 8 characters, but longer
                is better.
              </p>
            )}
            <Link
              href="/login"
              className="text-blue-800 font-semibold py-2"
            >
              Already have an account
            </Link>
          </div>

          {/* Primary CTA */}
          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-5 text-[16px] rounded-full transition-colors duration-200"
          >
            Get started
          </Button>
        </form>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-200"></span>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-gray-600">
              or
            </span>
          </div>
        </div>

        {/* Social Logins */}
        <div className="space-y-3">
          <Button className="w-full flex items-center justify-center gap-3 border border-gray-900 py-5 rounded-full hover:bg-blue-200 hover:text-blue-800 hover:border-blue-900 bg-gray-50 text-gray-700 transition-colors text-[16px] font-semibold">
            {/* <Image
              width={10}
              src={}
              alt="Google"
              className="w-5 h-5"
            /> */}
            Sign up with Google
          </Button>

          <Button className="w-full flex items-center justify-center gap-3 border border-gray-900 bg-gray-900 text-gray-100 py-5 rounded-full hover:bg-blue-200 hover:text-blue-800 hover:border-blue-900 transition-colors font-semibold text-[16px]">
            {/* <svg
              className="w-5 h-5 fill-current"
              viewBox="0 0 24 24"
            >
              <path d="M17.05 20.28c-.96 0-2.04-.68-3.02-.68-1 0-1.92.65-2.88.65-2.5 0-5.18-2.6-5.18-6.14 0-3.66 2.38-5.7 4.54-5.7.98 0 1.76.54 2.53.54s1.66-.58 2.76-.58c1.1 0 2.2.48 3 1.54-2.18 1.15-1.84 3.96.43 4.9-1.04 1.5-2.4 3.1-3.65 3.1-.4 0-.8-.13-1.14-.13-.34 0-.74.13-1.13.13zM12.03 7.25c-.13-2.23 1.73-4.13 3.6-4.25.2 2.36-2 4.38-3.6 4.25z" />
            </svg> */}
            Sign up with Apple
          </Button>
        </div>
      </div>
    </div>
  );
}
