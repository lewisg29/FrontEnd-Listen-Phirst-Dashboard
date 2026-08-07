"use client";

import { FormEvent, useState } from "react";

const navItems = [
  "Dashboard",
  "Data Access",
  "Calls",
  "Responses",
  "Insights",
  "Settings",
] as const;

type NavItem = (typeof navItems)[number];

const completedCalls = [
  {
    caller: "Jordan Miles",
    date: "July 12, 2026",
    duration: "8 min",
    score: "Positive",
    summary:
      "Jordan felt heard by the care team but wanted clearer next steps after the visit.",
  },
  {
    caller: "Avery Smith",
    date: "July 11, 2026",
    duration: "6 min",
    score: "Neutral",
    summary:
      "Avery said scheduling was easy, but wait time made the experience feel rushed.",
  },
  {
    caller: "Morgan Lee",
    date: "July 10, 2026",
    duration: "10 min",
    score: "Needs follow-up",
    summary:
      "Morgan had billing confusion and asked for a human support callback.",
  },
];

const insightCards = [
  {
    title: "Follow-up clarity",
    text: "Patients often remember the conversation well but lose confidence when the next action is unclear.",
  },
  {
    title: "Front desk experience",
    text: "Scheduling language is a repeated driver of both positive and negative feedback.",
  },
  {
    title: "Billing handoff",
    text: "Billing questions should be routed to a person quickly when Oz detects confusion.",
  },
];

const patientProfile = {
  name: "Sarah",
  patientId: "mock_patient_sarah_001",
  location: "Boston, MA",
  age: 42,
  diabetesType: "Type 2",
  treatmentPlan: "Metformin and lifestyle management",
  quote: "I want my experience to help make care easier for other patients.",
};

const dataAccessRecords = [
  {
    company: "Northstar Medical Devices",
    companyType: "medical_device",
    purpose: "Product development",
    categories: ["demographics", "care_experience"],
    accessedAt: "2026-01-05T14:00:00+00:00",
    amount: 5,
  },
  {
    company: "Meridian Device Works",
    companyType: "medical_device",
    purpose: "Market research",
    categories: ["device_preferences", "treatment_plan"],
    accessedAt: "2026-01-12T16:30:00+00:00",
    amount: 5,
  },
  {
    company: "Clarity Diagnostics",
    companyType: "medical_device",
    purpose: "Clinical trial design",
    categories: ["outcomes", "medication_experience"],
    accessedAt: "2026-01-20T18:15:00+00:00",
    amount: 5,
  },
  {
    company: "Northstar Medical Devices",
    companyType: "medical_device",
    purpose: "Care pathway improvement",
    categories: ["digital_health", "accessibility"],
    accessedAt: "2026-01-27T15:45:00+00:00",
    amount: 5,
  },
  {
    company: "Meridian Device Works",
    companyType: "medical_device",
    purpose: "Product development",
    categories: ["demographics", "care_experience"],
    accessedAt: "2026-02-06T13:20:00+00:00",
    amount: 5,
  },
  {
    company: "Clarity Diagnostics",
    companyType: "medical_device",
    purpose: "Market research",
    categories: ["device_preferences", "treatment_plan"],
    accessedAt: "2026-02-15T17:10:00+00:00",
    amount: 5,
  },
  {
    company: "Northstar Medical Devices",
    companyType: "medical_device",
    purpose: "Clinical trial design",
    categories: ["outcomes", "medication_experience"],
    accessedAt: "2026-02-24T19:05:00+00:00",
    amount: 5,
  },
  {
    company: "Meridian Device Works",
    companyType: "medical_device",
    purpose: "Care pathway improvement",
    categories: ["digital_health", "accessibility"],
    accessedAt: "2026-03-03T14:40:00+00:00",
    amount: 5,
  },
  {
    company: "Clarity Diagnostics",
    companyType: "medical_device",
    purpose: "Product development",
    categories: ["demographics", "care_experience"],
    accessedAt: "2026-03-08T16:05:00+00:00",
    amount: 5,
  },
  {
    company: "Northstar Medical Devices",
    companyType: "medical_device",
    purpose: "Market research",
    categories: ["device_preferences", "treatment_plan"],
    accessedAt: "2026-03-13T18:50:00+00:00",
    amount: 5,
  },
  {
    company: "Harborview Health System",
    companyType: "hospital",
    purpose: "Clinical trial design",
    categories: ["outcomes", "medication_experience"],
    accessedAt: "2026-03-18T15:30:00+00:00",
    amount: 5,
  },
  {
    company: "Willow Health Network",
    companyType: "hospital",
    purpose: "Care pathway improvement",
    categories: ["digital_health", "accessibility"],
    accessedAt: "2026-03-23T17:25:00+00:00",
    amount: 5,
  },
  {
    company: "Summit Community Hospital",
    companyType: "hospital",
    purpose: "Product development",
    categories: ["demographics", "care_experience"],
    accessedAt: "2026-03-27T19:10:00+00:00",
    amount: 5,
  },
  {
    company: "Harborview Health System",
    companyType: "hospital",
    purpose: "Market research",
    categories: ["device_preferences", "treatment_plan"],
    accessedAt: "2026-03-30T13:55:00+00:00",
    amount: 5,
  },
  {
    company: "Willow Health Network",
    companyType: "hospital",
    purpose: "Clinical trial design",
    categories: ["outcomes", "medication_experience"],
    accessedAt: "2026-04-09T16:20:00+00:00",
    amount: 5,
  },
  {
    company: "Summit Community Hospital",
    companyType: "hospital",
    purpose: "Care pathway improvement",
    categories: ["digital_health", "accessibility"],
    accessedAt: "2026-04-22T18:35:00+00:00",
    amount: 5,
  },
  {
    company: "Harborview Health System",
    companyType: "hospital",
    purpose: "Product development",
    categories: ["demographics", "care_experience"],
    accessedAt: "2026-05-02T14:10:00+00:00",
    amount: 5,
  },
  {
    company: "BluePeak Biopharma",
    companyType: "biopharma",
    purpose: "Market research",
    categories: ["device_preferences", "treatment_plan"],
    accessedAt: "2026-05-08T17:45:00+00:00",
    amount: 5,
  },
  {
    company: "Catalyst BioWorks",
    companyType: "biopharma",
    purpose: "Clinical trial design",
    categories: ["outcomes", "medication_experience"],
    accessedAt: "2026-05-14T19:20:00+00:00",
    amount: 5,
  },
  {
    company: "NovaCura Therapeutics",
    companyType: "biopharma",
    purpose: "Care pathway improvement",
    categories: ["digital_health", "accessibility"],
    accessedAt: "2026-05-21T15:15:00+00:00",
    amount: 5,
  },
  {
    company: "BluePeak Biopharma",
    companyType: "biopharma",
    purpose: "Product development",
    categories: ["demographics", "care_experience"],
    accessedAt: "2026-05-28T18:00:00+00:00",
    amount: 5,
  },
  {
    company: "Catalyst BioWorks",
    companyType: "biopharma",
    purpose: "Market research",
    categories: ["device_preferences", "treatment_plan"],
    accessedAt: "2026-06-03T14:25:00+00:00",
    amount: 5,
  },
  {
    company: "NovaCura Therapeutics",
    companyType: "biopharma",
    purpose: "Clinical trial design",
    categories: ["outcomes", "medication_experience"],
    accessedAt: "2026-06-07T16:40:00+00:00",
    amount: 5,
  },
  {
    company: "CareTrail Labs",
    companyType: "startup",
    purpose: "Care pathway improvement",
    categories: ["digital_health", "accessibility"],
    accessedAt: "2026-06-11T18:05:00+00:00",
    amount: 5,
  },
  {
    company: "PulseForge Health",
    companyType: "startup",
    purpose: "Product development",
    categories: ["demographics", "care_experience"],
    accessedAt: "2026-06-16T13:35:00+00:00",
    amount: 5,
  },
  {
    company: "Kindred Digital Care",
    companyType: "startup",
    purpose: "Market research",
    categories: ["device_preferences", "treatment_plan"],
    accessedAt: "2026-06-20T17:50:00+00:00",
    amount: 5,
  },
  {
    company: "CareTrail Labs",
    companyType: "startup",
    purpose: "Clinical trial design",
    categories: ["outcomes", "medication_experience"],
    accessedAt: "2026-06-25T19:15:00+00:00",
    amount: 5,
  },
  {
    company: "PulseForge Health",
    companyType: "startup",
    purpose: "Care pathway improvement",
    categories: ["digital_health", "accessibility"],
    accessedAt: "2026-06-29T15:05:00+00:00",
    amount: 5,
  },
  {
    company: "Kindred Digital Care",
    companyType: "startup",
    purpose: "Product development",
    categories: ["demographics", "care_experience"],
    accessedAt: "2026-07-22T14:39:45.509731+00:00",
    amount: 5,
  },
] as const;

const companyTypeLabels: Record<string, string> = {
  biopharma: "Biopharma",
  hospital: "Hospital",
  medical_device: "Medical device",
  startup: "Startup",
};

const dataAccessSummary = {
  totalEarnings: dataAccessRecords.reduce((sum, record) => sum + record.amount, 0),
  totalRecords: dataAccessRecords.length,
  companies: new Set(dataAccessRecords.map((record) => record.company)).size,
  latestAccess: dataAccessRecords[dataAccessRecords.length - 1].accessedAt,
};

const companyTypeSummary = Object.entries(
  dataAccessRecords.reduce<Record<string, { count: number; earnings: number }>>(
    (summary, record) => {
      summary[record.companyType] ??= { count: 0, earnings: 0 };
      summary[record.companyType].count += 1;
      summary[record.companyType].earnings += record.amount;
      return summary;
    },
    {},
  ),
);

type AuthMethod = "password" | "otp";

type AuthFieldErrors = Partial<
  Record<"email" | "password" | "phone" | "otp", string>
>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const temporaryCredentials = {
  email: "demo@phicilitatechange.com",
  password: "OzDemo2026!",
};

export default function Home() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [activeNav, setActiveNav] = useState<NavItem>("Dashboard");

  function handleSignOut() {
    setActiveNav("Dashboard");
    setIsSignedIn(false);
  }

  if (!isSignedIn) {
    return <AuthScreen onAuthenticated={() => setIsSignedIn(true)} />;
  }

  return (
    <main className="min-h-screen bg-[#eef3f7] p-4 text-slate-900 sm:p-6">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-lg bg-white shadow-xl lg:grid-cols-[230px_1fr]">
        <aside className="flex bg-slate-950 text-white lg:min-h-[calc(100vh-3rem)] lg:flex-col">
          <div className="hidden border-b border-white/10 p-6 lg:block">
            <p className="text-lg font-bold">Phicil-itate Change</p>
            <p className="mt-1 text-xs text-slate-400">Oz voice dashboard</p>
          </div>

          <nav className="flex flex-1 gap-1 overflow-x-auto p-3 lg:flex-col lg:p-4">
            {navItems.map((item) => (
              <button
                className={`h-11 rounded-md px-3 text-left text-sm font-medium transition ${
                  activeNav === item
                    ? "bg-white/12 text-white"
                    : "text-slate-300 hover:bg-white/8 hover:text-white"
                }`}
                key={item}
                onClick={() => setActiveNav(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="hidden border-t border-white/10 p-4 lg:block">
            <p className="text-sm font-semibold">Oz</p>
            <p className="mt-1 text-xs text-slate-400">
              ElevenLabs call assistant
            </p>
          </div>
        </aside>

        <section className="space-y-6 p-5 sm:p-7">
          <header className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-semibold text-cyan-700">
                Phicil-itate Change
              </p>
              <h1 className="text-3xl font-bold tracking-normal sm:text-4xl">
                {activeNav}
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <button
                className="h-10 rounded-md border border-slate-200 px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                onClick={handleSignOut}
                type="button"
              >
                Sign out
              </button>
              <button
                className="h-10 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800"
                onClick={() => setActiveNav("Data Access")}
                type="button"
              >
                Review access
              </button>
            </div>
          </header>

          {activeNav === "Dashboard" && <DashboardSection />}
          {activeNav === "Data Access" && <DataAccessSection />}
          {activeNav === "Calls" && <CallsSection />}
          {activeNav === "Responses" && <ResponsesSection />}
          {activeNav === "Insights" && <InsightsSection />}
          {activeNav === "Settings" && (
            <SettingsSection onSignOut={handleSignOut} />
          )}
        </section>
      </div>
    </main>
  );
}

function AuthScreen({
  onAuthenticated,
}: {
  onAuthenticated: () => void;
}) {
  const [authMethod, setAuthMethod] = useState<AuthMethod>("password");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState<AuthFieldErrors>({});
  const [formError, setFormError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function validateAuthForm() {
    const nextErrors: AuthFieldErrors = {};
    const normalizedEmail = email.trim();
    const phoneDigits = phone.replace(/\D/g, "");

    if (!normalizedEmail) {
      nextErrors.email = "Email is required.";
    } else if (!emailPattern.test(normalizedEmail)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (authMethod === "password") {
      if (!password) {
        nextErrors.password = "Password is required.";
      } else if (password.length < 8) {
        nextErrors.password = "Password must be at least 8 characters.";
      }
    }

    if (authMethod === "otp") {
      if (!phone.trim()) {
        nextErrors.phone = "Phone number is required.";
      } else if (phoneDigits.length < 10) {
        nextErrors.phone = "Enter a valid phone number.";
      }

      if (!otp.trim()) {
        nextErrors.otp = "OTP code is required.";
      } else if (!/^\d{6}$/.test(otp.trim())) {
        nextErrors.otp = "Enter the 6-digit OTP code.";
      }
    }

    return nextErrors;
  }

  function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validateAuthForm();
    setErrors(nextErrors);
    setFormError("");

    if (Object.keys(nextErrors).length > 0) {
      setFormError("Please fix the highlighted fields.");
      return;
    }

    if (
      authMethod === "password" &&
      (email.trim().toLowerCase() !== temporaryCredentials.email ||
        password !== temporaryCredentials.password)
    ) {
      setFormError("Use the temporary demo email and password to sign in.");
      return;
    }

    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
      onAuthenticated();
    }, 700);
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[#eef3f7] p-4 text-slate-900">
      <section className="grid w-full max-w-5xl overflow-hidden rounded-lg bg-white shadow-xl lg:grid-cols-[0.9fr_1.1fr]">
        <div className="bg-slate-950 p-8 text-white sm:p-10">
          <p className="text-xl font-bold">Phicil-itate Change</p>
          <h1 className="mt-12 text-4xl font-bold tracking-normal">
            Welcome to your Oz dashboard.
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-6 text-slate-300">
            After a healthcare experience call is complete, Oz organizes the
            answers, themes, and follow-up needs into one simple place.
          </p>
        </div>

        <form className="space-y-5 p-8 sm:p-10" noValidate onSubmit={handleAuth}>
          <div>
            <p className="text-sm font-semibold text-cyan-700">
              Secure account access
            </p>
            <h2 className="mt-1 text-3xl font-bold">Login</h2>
          </div>

          <div
            aria-label="Login method"
            className="grid grid-cols-2 rounded-md bg-slate-100 p-1"
            role="tablist"
          >
            <button
              aria-selected={authMethod === "password"}
              className={`h-10 rounded-md text-sm font-bold transition ${
                authMethod === "password"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              onClick={() => {
                setAuthMethod("password");
                setErrors({});
                setFormError("");
              }}
              role="tab"
              type="button"
            >
              Password
            </button>
            <button
              aria-selected={authMethod === "otp"}
              className={`h-10 rounded-md text-sm font-bold transition ${
                authMethod === "otp"
                  ? "bg-white text-slate-950 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
              onClick={() => {
                setAuthMethod("otp");
                setErrors({});
                setFormError("");
              }}
              role="tab"
              type="button"
            >
              OTP
            </button>
          </div>

          <label className="block">
            <span className="text-sm font-semibold text-slate-600">Email</span>
            <input
              aria-describedby={errors.email ? "email-error" : undefined}
              aria-invalid={Boolean(errors.email)}
              className={`mt-2 h-12 w-full rounded-md border px-3 outline-none transition focus:border-cyan-600 ${
                errors.email ? "border-rose-400 bg-rose-50" : "border-slate-200"
              }`}
              onChange={(event) => setEmail(event.target.value)}
              placeholder={temporaryCredentials.email}
              value={email}
              type="email"
            />
            {errors.email && (
              <span className="mt-2 block text-sm font-semibold text-rose-700" id="email-error">
                {errors.email}
              </span>
            )}
          </label>

          {authMethod === "password" && (
            <label className="block">
              <span className="text-sm font-semibold text-slate-600">
                Password
              </span>
              <input
                aria-describedby={errors.password ? "password-error" : undefined}
                aria-invalid={Boolean(errors.password)}
                className={`mt-2 h-12 w-full rounded-md border px-3 outline-none transition focus:border-cyan-600 ${
                  errors.password
                    ? "border-rose-400 bg-rose-50"
                    : "border-slate-200"
                }`}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter your password"
                type="password"
                value={password}
              />
              {errors.password && (
                <span
                  className="mt-2 block text-sm font-semibold text-rose-700"
                  id="password-error"
                >
                  {errors.password}
                </span>
              )}
            </label>
          )}

          {authMethod === "otp" && (
            <div className="grid gap-5 sm:grid-cols-[1.2fr_0.8fr]">
              <label className="block">
                <span className="text-sm font-semibold text-slate-600">
                  Phone
                </span>
                <input
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                  aria-invalid={Boolean(errors.phone)}
                  className={`mt-2 h-12 w-full rounded-md border px-3 outline-none transition focus:border-cyan-600 ${
                    errors.phone
                      ? "border-rose-400 bg-rose-50"
                      : "border-slate-200"
                  }`}
                  inputMode="tel"
                  onChange={(event) => setPhone(event.target.value)}
                  placeholder="(555) 014-2086"
                  type="tel"
                  value={phone}
                />
                {errors.phone && (
                  <span
                    className="mt-2 block text-sm font-semibold text-rose-700"
                    id="phone-error"
                  >
                    {errors.phone}
                  </span>
                )}
              </label>

              <label className="block">
                <span className="text-sm font-semibold text-slate-600">
                  OTP code
                </span>
                <input
                  aria-describedby={errors.otp ? "otp-error" : undefined}
                  aria-invalid={Boolean(errors.otp)}
                  className={`mt-2 h-12 w-full rounded-md border px-3 outline-none transition focus:border-cyan-600 ${
                    errors.otp
                      ? "border-rose-400 bg-rose-50"
                      : "border-slate-200"
                  }`}
                  inputMode="numeric"
                  maxLength={6}
                  onChange={(event) => setOtp(event.target.value)}
                  placeholder="123456"
                  type="text"
                  value={otp}
                />
                {errors.otp && (
                  <span
                    className="mt-2 block text-sm font-semibold text-rose-700"
                    id="otp-error"
                  >
                    {errors.otp}
                  </span>
                )}
              </label>
            </div>
          )}

          <div className="rounded-md border border-cyan-100 bg-cyan-50 px-4 py-3 text-sm text-cyan-950">
            <p className="font-bold">Temporary demo access</p>
            <p className="mt-1 font-semibold">
              Email: {temporaryCredentials.email}
            </p>
            <p className="font-semibold">
              Password: {temporaryCredentials.password}
            </p>
          </div>

          {formError && (
            <div
              className="rounded-md border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700"
              role="alert"
            >
              {formError}
            </div>
          )}

          <button
            className="h-12 w-full rounded-md bg-slate-950 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Signing in..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}

function DashboardSection() {
  return (
    <div className="space-y-6">
      <section className="grid gap-4 md:grid-cols-4">
        <StatCard
          label="Total earned"
          value={formatCurrency(dataAccessSummary.totalEarnings)}
        />
        <StatCard
          label="Data accesses"
          value={String(dataAccessSummary.totalRecords)}
        />
        <StatCard label="Companies" value={String(dataAccessSummary.companies)} />
        <StatCard
          label="Latest access"
          value={formatShortDate(dataAccessSummary.latestAccess)}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <Panel title="Patient Snapshot">
          <blockquote className="border-l-4 border-cyan-600 pl-4 text-sm leading-6 text-slate-600">
            {patientProfile.quote}
          </blockquote>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SmallMetric label="Patient" value={patientProfile.name} />
            <SmallMetric label="Location" value={patientProfile.location} />
            <SmallMetric label="Condition" value={patientProfile.diabetesType} />
          </div>
        </Panel>

        <Panel title="Data By Company Type">
          <div className="space-y-3">
            {companyTypeSummary.map(([companyType, summary]) => (
              <TypeSummaryRow
                companyType={companyType}
                key={companyType}
                summary={summary}
              />
            ))}
          </div>
        </Panel>
      </section>

      <DataAccessSection compact />
    </div>
  );
}

function DataAccessSection({ compact = false }: { compact?: boolean }) {
  const records = compact
    ? dataAccessRecords.slice(-6).reverse()
    : [...dataAccessRecords].reverse();
  const gridClassName = compact
    ? "grid gap-3 md:grid-cols-2 xl:grid-cols-3"
    : "grid gap-4 md:grid-cols-2 xl:grid-cols-3";

  return (
    <Panel title={compact ? "Recent Data Access" : "Data Access Records"}>
      <div className={gridClassName}>
        {records.map((record) => (
          <AccessRecordRow
            key={`${record.company}-${record.accessedAt}`}
            record={record}
          />
        ))}
      </div>
    </Panel>
  );
}

function TypeSummaryRow({
  companyType,
  summary,
}: {
  companyType: string;
  summary: { count: number; earnings: number };
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-md bg-slate-50 p-3">
      <div>
        <p className="text-sm font-bold">{companyTypeLabels[companyType]}</p>
        <p className="mt-1 text-xs font-semibold text-slate-500">
          {summary.count} accesses
        </p>
      </div>
      <p className="text-sm font-bold text-cyan-700">
        {formatCurrency(summary.earnings)}
      </p>
    </div>
  );
}

function AccessRecordRow({
  record,
}: {
  record: (typeof dataAccessRecords)[number];
}) {
  return (
    <article className="flex h-full flex-col rounded-md border border-slate-200 bg-white p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-bold">{record.company}</p>
          <p className="mt-1 text-sm text-slate-500">
            {companyTypeLabels[record.companyType]} · {formatLongDate(record.accessedAt)}
          </p>
        </div>
        <span className="rounded-md bg-emerald-50 px-2.5 py-1 text-sm font-bold text-emerald-700">
          {formatCurrency(record.amount)}
        </span>
      </div>

      <p className="mt-3 text-sm font-semibold text-slate-700">
        {record.purpose}
      </p>
      <div className="mt-auto flex flex-wrap gap-2 pt-3">
        {record.categories.map((category) => (
          <span
            className="rounded-md bg-cyan-50 px-2.5 py-1 text-xs font-bold text-cyan-700"
            key={category}
          >
            {cleanCategory(category)}
          </span>
        ))}
      </div>
    </article>
  );
}

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    currency: "USD",
    maximumFractionDigits: 0,
    style: "currency",
  }).format(amount);
}

function formatShortDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "short",
  }).format(new Date(date));
}

function formatLongDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

function cleanCategory(category: string) {
  return category
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function CallsSection() {
  return (
    <Panel title="Completed Calls">
      <div className="space-y-3">
        {completedCalls.map((call) => (
          <CallCard key={`${call.caller}-${call.date}`} call={call} />
        ))}
      </div>
    </Panel>
  );
}

function ResponsesSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <Panel title="Questionnaire Responses">
        <Question
          answer="The nurse explained everything clearly, but I did not know who to call afterward."
          question="How did the healthcare experience go?"
        />
        <Question
          answer="Scheduling was simple. The wait time was the hardest part."
          question="What could have been better?"
        />
        <Question
          answer="A text message with the next steps would help."
          question="What support would you like next?"
        />
      </Panel>

      <Panel title="Response Themes">
        <div className="space-y-4">
          <Progress label="Communication" value="82%" width="82%" />
          <Progress label="Scheduling" value="72%" width="72%" />
          <Progress label="Billing" value="41%" width="41%" />
        </div>
      </Panel>
    </section>
  );
}

function InsightsSection() {
  return (
    <section className="grid gap-6 lg:grid-cols-3">
      {insightCards.map((insight) => (
        <Panel key={insight.title} title={insight.title}>
          <p className="text-sm leading-6 text-slate-600">{insight.text}</p>
        </Panel>
      ))}
    </section>
  );
}

function SettingsSection({ onSignOut }: { onSignOut: () => void }) {
  return (
    <section className="grid gap-6 lg:grid-cols-2">
      <Panel title="Account">
        <div className="space-y-3">
          <SmallMetric label="Workspace" value="Phicil-itate Change" />
          <SmallMetric label="Assistant" value="Oz" />
          <SmallMetric label="Voice provider" value="ElevenLabs" />
        </div>
      </Panel>

      <Panel title="Preferences">
        <div className="space-y-3">
          <ToggleRow label="Email daily call summary" />
          <ToggleRow label="Flag urgent follow-ups" />
          <ToggleRow label="Show simple language insights" />
          <button
            className="h-11 rounded-md bg-slate-950 px-5 text-sm font-bold text-white hover:bg-slate-800"
            onClick={onSignOut}
            type="button"
          >
            Sign out
          </button>
        </div>
      </Panel>
    </section>
  );
}

function Panel({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5">
      <h2 className="mb-4 text-lg font-bold">{title}</h2>
      {children}
    </section>
  );
}

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
  );
}

function SmallMetric({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-xs font-semibold uppercase text-slate-400">{label}</p>
      <p className="mt-1 text-sm font-bold">{value}</p>
    </div>
  );
}

function CallCard({ call }: { call: (typeof completedCalls)[number] }) {
  return (
    <div className="rounded-md border border-slate-200 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-bold">{call.caller}</p>
          <p className="mt-1 text-sm text-slate-500">
            {call.date} · {call.duration}
          </p>
        </div>
        <span className="rounded-md bg-cyan-50 px-2.5 py-1 text-xs font-bold text-cyan-700">
          {call.score}
        </span>
      </div>
      <p className="mt-3 text-sm leading-6 text-slate-600">{call.summary}</p>
    </div>
  );
}

function Question({ answer, question }: { answer: string; question: string }) {
  return (
    <div className="mb-4 rounded-md bg-slate-50 p-4 last:mb-0">
      <p className="text-sm font-bold">{question}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600">{answer}</p>
    </div>
  );
}

function Progress({
  label,
  value,
  width,
}: {
  label: string;
  value: string;
  width: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <p className="font-bold">{label}</p>
        <p className="text-slate-500">{value}</p>
      </div>
      <div className="h-2 rounded-full bg-slate-100">
        <div className="h-2 rounded-full bg-cyan-600" style={{ width }} />
      </div>
    </div>
  );
}

function ToggleRow({ label }: { label: string }) {
  return (
    <label className="flex items-center justify-between rounded-md bg-slate-50 p-4">
      <span className="text-sm font-bold">{label}</span>
      <input className="size-5 accent-cyan-600" defaultChecked type="checkbox" />
    </label>
  );
}
