"use client";

import { FormEvent, useState } from "react";

const navItems = ["Dashboard", "Calls", "Responses", "Insights", "Settings"] as const;

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

const responseThemes = [
  { label: "Felt listened to", value: "82%" },
  { label: "Clear next steps", value: "64%" },
  { label: "Scheduling friction", value: "28%" },
  { label: "Needs callback", value: "11%" },
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

export default function Home() {
  const [authMode, setAuthMode] = useState<"login" | "create">("create");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [activeNav, setActiveNav] = useState<NavItem>("Dashboard");

  function handleAuth(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSignedIn(true);
  }

  if (!isSignedIn) {
    return (
      <AuthScreen
        authMode={authMode}
        onSubmit={handleAuth}
        setAuthMode={setAuthMode}
      />
    );
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
            <button
              className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
              onClick={() => setActiveNav("Calls")}
              type="button"
            >
              Review calls
            </button>
          </header>

          {activeNav === "Dashboard" && <DashboardSection />}
          {activeNav === "Calls" && <CallsSection />}
          {activeNav === "Responses" && <ResponsesSection />}
          {activeNav === "Insights" && <InsightsSection />}
          {activeNav === "Settings" && (
            <SettingsSection onSignOut={() => setIsSignedIn(false)} />
          )}
        </section>
      </div>
    </main>
  );
}

function AuthScreen({
  authMode,
  onSubmit,
  setAuthMode,
}: {
  authMode: "login" | "create";
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  setAuthMode: (mode: "login" | "create") => void;
}) {
  const isCreate = authMode === "create";

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

        <form className="space-y-5 p-8 sm:p-10" onSubmit={onSubmit}>
          <div>
            <p className="text-sm font-semibold text-cyan-700">
              {isCreate ? "Would you like to create an account?" : "Welcome back"}
            </p>
            <h2 className="mt-1 text-3xl font-bold">
              {isCreate ? "Create account" : "Login"}
            </h2>
          </div>

          {isCreate && (
            <label className="block">
              <span className="text-sm font-semibold text-slate-600">
                Full name
              </span>
              <input
                className="mt-2 h-12 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-cyan-600"
                placeholder="Your name"
                type="text"
              />
            </label>
          )}

          <label className="block">
            <span className="text-sm font-semibold text-slate-600">Email</span>
            <input
              className="mt-2 h-12 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-cyan-600"
              placeholder="you@company.com"
              type="email"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold text-slate-600">
              Password
            </span>
            <input
              className="mt-2 h-12 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-cyan-600"
              placeholder="Enter your password"
              type="password"
            />
          </label>

          {isCreate && (
            <label className="block">
              <span className="text-sm font-semibold text-slate-600">
                Organization
              </span>
              <input
                className="mt-2 h-12 w-full rounded-md border border-slate-200 px-3 outline-none transition focus:border-cyan-600"
                placeholder="Clinic, hospital, or startup"
                type="text"
              />
            </label>
          )}

          <button
            className="h-12 w-full rounded-md bg-slate-950 text-sm font-bold text-white transition hover:bg-slate-800"
            type="submit"
          >
            {isCreate ? "Create account" : "Login"}
          </button>

          <button
            className="w-full text-sm font-semibold text-cyan-700 hover:text-cyan-900"
            onClick={() => setAuthMode(isCreate ? "login" : "create")}
            type="button"
          >
            {isCreate
              ? "Already have an account? Login"
              : "Need an account? Create one"}
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
        <StatCard label="Completed calls" value="148" />
        <StatCard label="Avg call length" value="7 min" />
        <StatCard label="Positive feedback" value="76%" />
        <StatCard label="Needs follow-up" value="11%" />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.85fr]">
        <Panel title="Latest Oz Summary">
          <p className="text-sm leading-6 text-slate-600">
            Oz completed a phone questionnaire about a recent healthcare
            experience. The caller said the visit went well overall, but they
            wanted clearer instructions after leaving the appointment.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <SmallMetric label="Tone" value="Calm" />
            <SmallMetric label="Follow-up" value="Needed" />
            <SmallMetric label="Category" value="Care clarity" />
          </div>
        </Panel>

        <Panel title="Top Themes">
          <div className="space-y-3">
            {responseThemes.map((theme) => (
              <div
                className="flex items-center justify-between rounded-md bg-slate-50 p-3"
                key={theme.label}
              >
                <p className="text-sm font-bold">{theme.label}</p>
                <p className="text-sm font-bold text-cyan-700">{theme.value}</p>
              </div>
            ))}
          </div>
        </Panel>
      </section>
    </div>
  );
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
