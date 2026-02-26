import {
  FormInput,
  FormSelect,
} from "./FormFields";
import {
  Chip,
  GoalCard,
} from "./SelectionControls";
import {
  INDUSTRIES,
  BUSINESS_TYPES,
  TEAM_SIZES,
  GOALS,
} from "./Constants";

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  businessName: string;
  industry: string;
  businessType: string;
  teamSize: string;
  goals: string[];
}

type Updater = (
  key: keyof FormState,
) => (val: string) => void;

interface StepOneProps {
  form: FormState;
  update: Updater;
}

export function StepOne({
  form,
  update,
}: StepOneProps) {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-1">
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
        label="Name of your business"
        value={form.businessName}
        onChange={update("businessName")}
        placeholder="Meowtrix Cafe"
      />
    </div>
  );
}

interface StepTwoProps {
  form: FormState;
  update: Updater;
}

export function StepTwo({
  form,
  update,
}: StepTwoProps) {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-1">
        About your business
      </h1>
      <p className="text-slate-500 mb-8 text-sm">
        Help us personalize your experience.
      </p>
      <FormInput
        label="Business name"
        value={form.businessName}
        onChange={update("businessName")}
        placeholder="Acme Co."
      />
      <FormSelect
        label="Industry"
        value={form.industry}
        onChange={update("industry")}
        options={INDUSTRIES}
        placeholder="Select your industry"
      />
      <FormSelect
        label="Legal structure"
        value={form.businessType}
        onChange={update("businessType")}
        options={BUSINESS_TYPES}
        placeholder="Select business type"
      />
      <div className="mb-5">
        <label className="block text-xs font-semibold text-gray-700 mb-2 tracking-wide">
          Team size
        </label>
        <div className="flex gap-2 flex-wrap">
          {TEAM_SIZES.map((s) => (
            <Chip
              key={s}
              label={s}
              selected={form.teamSize === s}
              onClick={() =>
                update("teamSize")(s)
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}

interface StepThreeProps {
  form: FormState;
  toggleGoal: (goal: string) => void;
}

export function StepThree({
  form,
  toggleGoal,
}: StepThreeProps) {
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900 mb-1">
        What brings you here?
      </h1>
      <p className="text-slate-500 mb-8 text-sm">
        Select all that apply — we&apos;ll set up
        your dashboard accordingly.
      </p>
      <div className="grid grid-cols-2 gap-3 mb-6">
        {GOALS.map((g) => (
          <GoalCard
            key={g.label}
            icon={g.icon}
            label={g.label}
            selected={form.goals.includes(
              g.label,
            )}
            onClick={() => toggleGoal(g.label)}
          />
        ))}
      </div>
    </div>
  );
}
