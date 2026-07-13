"use client";

import { useMemo, useState } from "react";

const navItems = [
  "My Profile",
  "Prescriptions",
  "See My Doc",
  "Health Record",
  "Treatment Plan",
  "Insurance",
];

const careNotes = [
  { label: "Primary Care", value: "Dr. Amina Harris" },
  { label: "Care Plan", value: "Diabetes support" },
  { label: "Last Visit", value: "June 28, 2026" },
];

const documents = [
  { name: "Care Summary.pdf", size: "1 MB" },
  { name: "Prescription.pdf", size: "840 KB" },
  { name: "Insurance Card.pdf", size: "620 KB" },
];

const appointments = [
  {
    date: "2026-07-14",
    title: "Medical Checkup",
    time: "9:30 AM",
    type: "In office",
    clinician: "Dr. Harris",
  },
  {
    date: "2026-07-18",
    title: "Screening",
    time: "3:00 PM",
    type: "Clinic",
    clinician: "Nurse Patel",
  },
  {
    date: "2026-07-23",
    title: "Chat Consultation",
    time: "8:50 AM",
    type: "Virtual",
    clinician: "Care Team",
  },
  {
    date: "2026-08-04",
    title: "Video Call Consultation",
    time: "10:15 AM",
    type: "Virtual",
    clinician: "Dr. Harris",
  },
];

function dateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function prettyDate(date: string) {
  return new Date(`${date}T12:00:00`).toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export default function Home() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 6, 1));
  const [selectedDate, setSelectedDate] = useState("2026-07-14");

  const appointmentsByDate = useMemo(() => {
    return appointments.reduce<Record<string, typeof appointments>>(
      (groups, appointment) => {
        groups[appointment.date] = groups[appointment.date] || [];
        groups[appointment.date].push(appointment);
        return groups;
      },
      {},
    );
  }, []);

  const calendarDays = useMemo(() => {
    const start = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1,
    );
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0,
    ).getDate();
    const emptyDays = Array.from({ length: start.getDay() }, () => null);
    const monthDays = Array.from({ length: daysInMonth }, (_, index) => {
      return new Date(
        currentMonth.getFullYear(),
        currentMonth.getMonth(),
        index + 1,
      );
    });

    return [...emptyDays, ...monthDays];
  }, [currentMonth]);

  const selectedAppointments = appointmentsByDate[selectedDate] || [];
  const monthLabel = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  function changeMonth(direction: number) {
    const nextMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + direction,
      1,
    );
    setCurrentMonth(nextMonth);
    setSelectedDate(dateKey(nextMonth));
  }

  return (
    <main className="min-h-screen bg-[#eef3f7] p-4 text-slate-900 sm:p-6">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-lg bg-white shadow-xl lg:grid-cols-[230px_1fr]">
        <aside className="flex bg-slate-950 text-white lg:min-h-[calc(100vh-3rem)] lg:flex-col">
          <div className="hidden border-b border-white/10 p-6 lg:block">
            <p className="text-lg font-bold">Listen Phirst</p>
            <p className="mt-1 text-xs text-slate-400">Patient dashboard</p>
          </div>

          <nav className="flex flex-1 gap-1 overflow-x-auto p-3 lg:flex-col lg:p-4">
            {navItems.map((item, index) => (
              <button
                className={`h-11 rounded-md px-3 text-left text-sm font-medium transition ${
                  index === 0
                    ? "bg-white/12 text-white"
                    : "text-slate-300 hover:bg-white/8 hover:text-white"
                }`}
                key={item}
                type="button"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="hidden border-t border-white/10 p-4 lg:block">
            <div className="flex items-center gap-3">
              <div className="grid size-10 place-items-center rounded-md bg-cyan-500 font-bold text-slate-950">
                KT
              </div>
              <div>
                <p className="text-sm font-semibold">Kate Tanner</p>
                <p className="text-xs text-slate-400">kate@listenphirst.com</p>
              </div>
            </div>
          </div>
        </aside>

        <section className="grid gap-6 p-5 sm:p-7 xl:grid-cols-[1fr_360px]">
          <div className="space-y-6">
            <header className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-sm font-semibold text-cyan-700">
                  Listen Phirst
                </p>
                <h1 className="text-3xl font-bold tracking-normal sm:text-4xl">
                  Welcome back, Kate
                </h1>
              </div>
              <button
                className="rounded-md bg-slate-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800"
                type="button"
              >
                Book visit
              </button>
            </header>

            <section className="grid gap-4 md:grid-cols-3">
              <InfoTile label="Next appointment" value="Jul 14, 9:30 AM" />
              <InfoTile label="Care coordinator" value="Maya Collins" />
              <InfoTile label="Open documents" value="3 files" />
            </section>

            <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-lg border border-slate-200 bg-white p-5">
                <div className="mb-5 flex items-center justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold">Appointment Calendar</h2>
                    <p className="text-sm text-slate-500">{monthLabel}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      aria-label="Previous month"
                      className="grid size-9 place-items-center rounded-md border border-slate-200 text-lg font-semibold hover:bg-slate-100"
                      onClick={() => changeMonth(-1)}
                      type="button"
                    >
                      &lt;
                    </button>
                    <button
                      aria-label="Next month"
                      className="grid size-9 place-items-center rounded-md border border-slate-200 text-lg font-semibold hover:bg-slate-100"
                      onClick={() => changeMonth(1)}
                      type="button"
                    >
                      &gt;
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-7 gap-2 text-center text-xs font-semibold uppercase text-slate-400">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                    (day) => (
                      <span key={day}>{day}</span>
                    ),
                  )}
                </div>

                <div className="mt-2 grid grid-cols-7 gap-2">
                  {calendarDays.map((day, index) => {
                    if (!day) {
                      return <div className="aspect-square" key={index} />;
                    }

                    const key = dateKey(day);
                    const hasAppointment = Boolean(appointmentsByDate[key]);
                    const isSelected = selectedDate === key;

                    return (
                      <button
                        aria-pressed={isSelected}
                        className={`relative aspect-square rounded-md border text-sm font-semibold transition ${
                          isSelected
                            ? "border-cyan-600 bg-cyan-600 text-white"
                            : "border-slate-200 bg-white hover:border-cyan-400 hover:bg-cyan-50"
                        }`}
                        key={key}
                        onClick={() => setSelectedDate(key)}
                        type="button"
                      >
                        {day.getDate()}
                        {hasAppointment && (
                          <span
                            className={`absolute bottom-2 left-1/2 size-1.5 -translate-x-1/2 rounded-full ${
                              isSelected ? "bg-white" : "bg-cyan-600"
                            }`}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="rounded-lg border border-slate-200 bg-white p-5">
                <h2 className="text-lg font-bold">{prettyDate(selectedDate)}</h2>
                <div className="mt-4 space-y-3">
                  {selectedAppointments.length > 0 ? (
                    selectedAppointments.map((appointment) => (
                      <AppointmentCard
                        appointment={appointment}
                        key={`${appointment.date}-${appointment.title}`}
                      />
                    ))
                  ) : (
                    <p className="rounded-md bg-slate-50 p-4 text-sm text-slate-500">
                      No appointments scheduled.
                    </p>
                  )}
                </div>
              </div>
            </section>

            <section className="grid gap-6 lg:grid-cols-2">
              <Panel title="Care Snapshot">
                <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
                  {careNotes.map((note) => (
                    <div key={note.label}>
                      <p className="text-xs font-semibold uppercase text-slate-400">
                        {note.label}
                      </p>
                      <p className="mt-1 text-sm font-bold">{note.value}</p>
                    </div>
                  ))}
                </div>
              </Panel>

              <Panel title="Documents">
                <div className="space-y-3">
                  {documents.map((document) => (
                    <div
                      className="flex items-center justify-between rounded-md bg-slate-50 p-3"
                      key={document.name}
                    >
                      <div>
                        <p className="text-sm font-bold">{document.name}</p>
                        <p className="text-xs text-slate-500">
                          {document.size}
                        </p>
                      </div>
                      <button
                        className="rounded-md border border-slate-200 px-3 py-1.5 text-xs font-bold hover:bg-white"
                        type="button"
                      >
                        View
                      </button>
                    </div>
                  ))}
                </div>
              </Panel>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-lg border border-slate-200 bg-white p-6 text-center">
              <div className="mx-auto grid size-24 place-items-center rounded-full border-8 border-cyan-500 bg-slate-100 text-3xl font-bold text-slate-800">
                KT
              </div>
              <h2 className="mt-4 text-xl font-bold">Kate Tanner</h2>
              <div className="mt-5 grid grid-cols-2 gap-4 text-left">
                <ProfileStat label="Gender" value="Female" />
                <ProfileStat label="Age" value="25 years" />
                <ProfileStat label="Height" value="173 cm" />
                <ProfileStat label="Weight" value="58 kg" />
              </div>
            </section>

            <section className="rounded-lg border border-slate-200 bg-white p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-lg font-bold">Appointment History</h2>
                <button
                  className="text-sm font-bold text-cyan-700 hover:text-cyan-900"
                  type="button"
                >
                  See all
                </button>
              </div>
              <div className="space-y-3">
                {appointments.map((appointment) => (
                  <button
                    className="w-full rounded-md border border-slate-200 p-3 text-left transition hover:border-cyan-400 hover:bg-cyan-50"
                    key={`${appointment.date}-${appointment.time}`}
                    onClick={() => {
                      const nextDate = new Date(`${appointment.date}T12:00:00`);
                      setCurrentMonth(
                        new Date(
                          nextDate.getFullYear(),
                          nextDate.getMonth(),
                          1,
                        ),
                      );
                      setSelectedDate(appointment.date);
                    }}
                    type="button"
                  >
                    <p className="text-sm font-bold">{appointment.title}</p>
                    <p className="mt-1 text-xs text-slate-500">
                      {prettyDate(appointment.date)} at {appointment.time}
                    </p>
                  </button>
                ))}
              </div>
            </section>
          </aside>
        </section>
      </div>
    </main>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <p className="text-sm font-semibold text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-bold">{value}</p>
    </div>
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

function AppointmentCard({
  appointment,
}: {
  appointment: (typeof appointments)[number];
}) {
  return (
    <div className="rounded-md bg-cyan-50 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-bold">{appointment.title}</p>
          <p className="mt-1 text-sm text-slate-600">
            {appointment.clinician}
          </p>
        </div>
        <span className="rounded-md bg-white px-2.5 py-1 text-xs font-bold text-cyan-700">
          {appointment.type}
        </span>
      </div>
      <p className="mt-3 text-sm font-semibold">{appointment.time}</p>
    </div>
  );
}

function ProfileStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-md bg-slate-50 p-3">
      <p className="text-xs font-semibold text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-bold">{value}</p>
    </div>
  );
}
