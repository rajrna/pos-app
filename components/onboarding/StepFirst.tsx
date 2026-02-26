import { FormState } from "react-hook-form";
import FormInput from "./FormInput";

export default function StepFirst() {
  const update =
    (key: keyof FormState) => (val: string) =>
      setForm((f) => ({ ...f, [key]: val }));
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-1 flex items-center gap-2">
        Welcome aboard!
      </h1>
      <p className="text-slate-500 mb-8 text-sm">
        Let&apos;s start with the basics.
      </p>
      <div className="grid grid-cols-2 gap-x-4">
        <FormInput
          label="First name"
          value={form.firstName}
          onChange={update("firstName")}
          placeholder="Jane"
        />
        <FormInput
          label="Last name"
          value={form.lastName}
          onChange={update("lastName")}
          placeholder="Smith"
        />
      </div>
      <FormInput
        label="Email address"
        type="email"
        value={form.email}
        onChange={update("email")}
        placeholder="jane@company.com"
      />
      <FormInput
        label="Password"
        type="password"
        value={form.password}
        onChange={update("password")}
        placeholder="Create a strong password"
      />
    </div>
  );
}
