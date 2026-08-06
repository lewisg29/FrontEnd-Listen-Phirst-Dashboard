import { useState } from 'react';
import './App.css';

const navItems = [
  'Dashboard',
  'Data Access',
  'Calls',
  'Responses',
  'Insights',
  'Settings',
];

const completedCalls = [
  {
    caller: 'Jordan Miles',
    date: 'July 12, 2026',
    duration: '8 min',
    score: 'Positive',
    summary:
      'Jordan felt heard by the care team but wanted clearer next steps after the visit.',
  },
  {
    caller: 'Avery Smith',
    date: 'July 11, 2026',
    duration: '6 min',
    score: 'Neutral',
    summary:
      'Avery said scheduling was easy, but wait time made the experience feel rushed.',
  },
  {
    caller: 'Morgan Lee',
    date: 'July 10, 2026',
    duration: '10 min',
    score: 'Needs follow-up',
    summary:
      'Morgan had billing confusion and asked for a human support callback.',
  },
];

const insightCards = [
  {
    title: 'Follow-up clarity',
    text: 'Patients often remember the conversation well but lose confidence when the next action is unclear.',
  },
  {
    title: 'Front desk experience',
    text: 'Scheduling language is a repeated driver of both positive and negative feedback.',
  },
  {
    title: 'Billing handoff',
    text: 'Billing questions should be routed to a person quickly when Oz detects confusion.',
  },
];

const patientProfile = {
  name: 'Sarah',
  patientId: 'mock_patient_sarah_001',
  location: 'Boston, MA',
  age: 42,
  diabetesType: 'Type 2',
  treatmentPlan: 'Metformin and lifestyle management',
  quote: 'I want my experience to help make care easier for other patients.',
};

const dataAccessRecords = [
  {
    company: 'Northstar Medical Devices',
    companyType: 'medical_device',
    purpose: 'Product development',
    categories: ['demographics', 'care_experience'],
    accessedAt: '2026-01-05T14:00:00+00:00',
    amount: 5,
  },
  {
    company: 'Meridian Device Works',
    companyType: 'medical_device',
    purpose: 'Market research',
    categories: ['device_preferences', 'treatment_plan'],
    accessedAt: '2026-01-12T16:30:00+00:00',
    amount: 5,
  },
  {
    company: 'Clarity Diagnostics',
    companyType: 'medical_device',
    purpose: 'Clinical trial design',
    categories: ['outcomes', 'medication_experience'],
    accessedAt: '2026-01-20T18:15:00+00:00',
    amount: 5,
  },
  {
    company: 'Northstar Medical Devices',
    companyType: 'medical_device',
    purpose: 'Care pathway improvement',
    categories: ['digital_health', 'accessibility'],
    accessedAt: '2026-01-27T15:45:00+00:00',
    amount: 5,
  },
  {
    company: 'Meridian Device Works',
    companyType: 'medical_device',
    purpose: 'Product development',
    categories: ['demographics', 'care_experience'],
    accessedAt: '2026-02-06T13:20:00+00:00',
    amount: 5,
  },
  {
    company: 'Clarity Diagnostics',
    companyType: 'medical_device',
    purpose: 'Market research',
    categories: ['device_preferences', 'treatment_plan'],
    accessedAt: '2026-02-15T17:10:00+00:00',
    amount: 5,
  },
  {
    company: 'Northstar Medical Devices',
    companyType: 'medical_device',
    purpose: 'Clinical trial design',
    categories: ['outcomes', 'medication_experience'],
    accessedAt: '2026-02-24T19:05:00+00:00',
    amount: 5,
  },
  {
    company: 'Meridian Device Works',
    companyType: 'medical_device',
    purpose: 'Care pathway improvement',
    categories: ['digital_health', 'accessibility'],
    accessedAt: '2026-03-03T14:40:00+00:00',
    amount: 5,
  },
  {
    company: 'Clarity Diagnostics',
    companyType: 'medical_device',
    purpose: 'Product development',
    categories: ['demographics', 'care_experience'],
    accessedAt: '2026-03-08T16:05:00+00:00',
    amount: 5,
  },
  {
    company: 'Northstar Medical Devices',
    companyType: 'medical_device',
    purpose: 'Market research',
    categories: ['device_preferences', 'treatment_plan'],
    accessedAt: '2026-03-13T18:50:00+00:00',
    amount: 5,
  },
  {
    company: 'Harborview Health System',
    companyType: 'hospital',
    purpose: 'Clinical trial design',
    categories: ['outcomes', 'medication_experience'],
    accessedAt: '2026-03-18T15:30:00+00:00',
    amount: 5,
  },
  {
    company: 'Willow Health Network',
    companyType: 'hospital',
    purpose: 'Care pathway improvement',
    categories: ['digital_health', 'accessibility'],
    accessedAt: '2026-03-23T17:25:00+00:00',
    amount: 5,
  },
  {
    company: 'Summit Community Hospital',
    companyType: 'hospital',
    purpose: 'Product development',
    categories: ['demographics', 'care_experience'],
    accessedAt: '2026-03-27T19:10:00+00:00',
    amount: 5,
  },
  {
    company: 'Harborview Health System',
    companyType: 'hospital',
    purpose: 'Market research',
    categories: ['device_preferences', 'treatment_plan'],
    accessedAt: '2026-03-30T13:55:00+00:00',
    amount: 5,
  },
  {
    company: 'Willow Health Network',
    companyType: 'hospital',
    purpose: 'Clinical trial design',
    categories: ['outcomes', 'medication_experience'],
    accessedAt: '2026-04-09T16:20:00+00:00',
    amount: 5,
  },
  {
    company: 'Summit Community Hospital',
    companyType: 'hospital',
    purpose: 'Care pathway improvement',
    categories: ['digital_health', 'accessibility'],
    accessedAt: '2026-04-22T18:35:00+00:00',
    amount: 5,
  },
  {
    company: 'Harborview Health System',
    companyType: 'hospital',
    purpose: 'Product development',
    categories: ['demographics', 'care_experience'],
    accessedAt: '2026-05-02T14:10:00+00:00',
    amount: 5,
  },
  {
    company: 'BluePeak Biopharma',
    companyType: 'biopharma',
    purpose: 'Market research',
    categories: ['device_preferences', 'treatment_plan'],
    accessedAt: '2026-05-08T17:45:00+00:00',
    amount: 5,
  },
  {
    company: 'Catalyst BioWorks',
    companyType: 'biopharma',
    purpose: 'Clinical trial design',
    categories: ['outcomes', 'medication_experience'],
    accessedAt: '2026-05-14T19:20:00+00:00',
    amount: 5,
  },
  {
    company: 'NovaCura Therapeutics',
    companyType: 'biopharma',
    purpose: 'Care pathway improvement',
    categories: ['digital_health', 'accessibility'],
    accessedAt: '2026-05-21T15:15:00+00:00',
    amount: 5,
  },
  {
    company: 'BluePeak Biopharma',
    companyType: 'biopharma',
    purpose: 'Product development',
    categories: ['demographics', 'care_experience'],
    accessedAt: '2026-05-28T18:00:00+00:00',
    amount: 5,
  },
  {
    company: 'Catalyst BioWorks',
    companyType: 'biopharma',
    purpose: 'Market research',
    categories: ['device_preferences', 'treatment_plan'],
    accessedAt: '2026-06-03T14:25:00+00:00',
    amount: 5,
  },
  {
    company: 'NovaCura Therapeutics',
    companyType: 'biopharma',
    purpose: 'Clinical trial design',
    categories: ['outcomes', 'medication_experience'],
    accessedAt: '2026-06-07T16:40:00+00:00',
    amount: 5,
  },
  {
    company: 'CareTrail Labs',
    companyType: 'startup',
    purpose: 'Care pathway improvement',
    categories: ['digital_health', 'accessibility'],
    accessedAt: '2026-06-11T18:05:00+00:00',
    amount: 5,
  },
  {
    company: 'PulseForge Health',
    companyType: 'startup',
    purpose: 'Product development',
    categories: ['demographics', 'care_experience'],
    accessedAt: '2026-06-16T13:35:00+00:00',
    amount: 5,
  },
  {
    company: 'Kindred Digital Care',
    companyType: 'startup',
    purpose: 'Market research',
    categories: ['device_preferences', 'treatment_plan'],
    accessedAt: '2026-06-20T17:50:00+00:00',
    amount: 5,
  },
  {
    company: 'CareTrail Labs',
    companyType: 'startup',
    purpose: 'Clinical trial design',
    categories: ['outcomes', 'medication_experience'],
    accessedAt: '2026-06-25T19:15:00+00:00',
    amount: 5,
  },
  {
    company: 'PulseForge Health',
    companyType: 'startup',
    purpose: 'Care pathway improvement',
    categories: ['digital_health', 'accessibility'],
    accessedAt: '2026-06-29T15:05:00+00:00',
    amount: 5,
  },
  {
    company: 'Kindred Digital Care',
    companyType: 'startup',
    purpose: 'Product development',
    categories: ['demographics', 'care_experience'],
    accessedAt: '2026-07-22T14:39:45.509731+00:00',
    amount: 5,
  },
];

const companyTypeLabels = {
  biopharma: 'Biopharma',
  hospital: 'Hospital',
  medical_device: 'Medical device',
  startup: 'Startup',
};

const dataAccessSummary = {
  totalEarnings: dataAccessRecords.reduce((sum, record) => sum + record.amount, 0),
  totalRecords: dataAccessRecords.length,
  companies: new Set(dataAccessRecords.map((record) => record.company)).size,
  latestAccess: dataAccessRecords[dataAccessRecords.length - 1].accessedAt,
};

const companyTypeSummary = Object.entries(
  dataAccessRecords.reduce((summary, record) => {
    const current = summary[record.companyType] || { count: 0, earnings: 0 };
    summary[record.companyType] = {
      count: current.count + 1,
      earnings: current.earnings + record.amount,
    };
    return summary;
  }, {}),
);

function App() {
  const [authMode, setAuthMode] = useState('create');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [activeNav, setActiveNav] = useState('Dashboard');

  function handleAuth(event) {
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
    <main className="app-shell">
      <div className="dashboard-frame">
        <aside className="sidebar">
          <div className="brand-block">
            <p className="brand-name">Phicil-itate Change</p>
            <p className="brand-caption">Oz voice dashboard</p>
          </div>

          <nav className="nav-list" aria-label="Dashboard navigation">
            {navItems.map((item) => (
              <button
                className={`nav-button ${activeNav === item ? 'active' : ''}`}
                key={item}
                onClick={() => setActiveNav(item)}
                type="button"
              >
                {item}
              </button>
            ))}
          </nav>

          <div className="assistant-block">
            <p>Oz</p>
            <span>ElevenLabs call assistant</span>
          </div>
        </aside>

        <section className="content">
          <header className="page-header">
            <div>
              <p className="eyebrow">Phicil-itate Change</p>
              <h1>{activeNav}</h1>
            </div>
            <button
              className="primary-button"
              onClick={() => setActiveNav('Data Access')}
              type="button"
            >
              Review access
            </button>
          </header>

          {activeNav === 'Dashboard' && <DashboardSection />}
          {activeNav === 'Data Access' && <DataAccessSection />}
          {activeNav === 'Calls' && <CallsSection />}
          {activeNav === 'Responses' && <ResponsesSection />}
          {activeNav === 'Insights' && <InsightsSection />}
          {activeNav === 'Settings' && (
            <SettingsSection onSignOut={() => setIsSignedIn(false)} />
          )}
        </section>
      </div>
    </main>
  );
}

function AuthScreen({ authMode, onSubmit, setAuthMode }) {
  const isCreate = authMode === 'create';

  return (
    <main className="auth-shell">
      <section className="auth-card">
        <div className="auth-intro">
          <p className="brand-name">Phicil-itate Change</p>
          <h1>Welcome to your Oz dashboard.</h1>
          <p>
            After a healthcare experience call is complete, Oz organizes the
            answers, themes, and follow-up needs into one simple place.
          </p>
        </div>

        <form className="auth-form" onSubmit={onSubmit}>
          <div>
            <p className="eyebrow">
              {isCreate ? 'Would you like to create an account?' : 'Welcome back'}
            </p>
            <h2>{isCreate ? 'Create account' : 'Login'}</h2>
          </div>

          {isCreate && (
            <label className="field">
              <span>Full name</span>
              <input placeholder="Your name" type="text" />
            </label>
          )}

          <label className="field">
            <span>Email</span>
            <input placeholder="you@company.com" type="email" />
          </label>

          <label className="field">
            <span>Password</span>
            <input placeholder="Enter your password" type="password" />
          </label>

          {isCreate && (
            <label className="field">
              <span>Organization</span>
              <input placeholder="Clinic, hospital, or startup" type="text" />
            </label>
          )}

          <button className="submit-button" type="submit">
            {isCreate ? 'Create account' : 'Login'}
          </button>

          <button
            className="text-button"
            onClick={() => setAuthMode(isCreate ? 'login' : 'create')}
            type="button"
          >
            {isCreate
              ? 'Already have an account? Login'
              : 'Need an account? Create one'}
          </button>
        </form>
      </section>
    </main>
  );
}

function DashboardSection() {
  return (
    <div className="stack">
      <section className="stats-grid">
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

      <section className="dashboard-columns">
        <Panel title="Patient Snapshot">
          <blockquote className="quote">{patientProfile.quote}</blockquote>
          <div className="small-metric-grid">
            <SmallMetric label="Patient" value={patientProfile.name} />
            <SmallMetric label="Location" value={patientProfile.location} />
            <SmallMetric label="Condition" value={patientProfile.diabetesType} />
          </div>
        </Panel>

        <Panel title="Data By Company Type">
          <div className="row-stack">
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

function DataAccessSection({ compact = false }) {
  const records = compact
    ? dataAccessRecords.slice(-6).reverse()
    : [...dataAccessRecords].reverse();

  return (
    <Panel title={compact ? 'Recent Data Access' : 'Data Access Records'}>
      <div className={`access-grid ${compact ? 'compact' : ''}`}>
        {records.map((record) => (
          <AccessRecordCard
            key={`${record.company}-${record.accessedAt}`}
            record={record}
          />
        ))}
      </div>
    </Panel>
  );
}

function TypeSummaryRow({ companyType, summary }) {
  return (
    <div className="summary-row">
      <div>
        <p>{companyTypeLabels[companyType]}</p>
        <span>{summary.count} accesses</span>
      </div>
      <strong>{formatCurrency(summary.earnings)}</strong>
    </div>
  );
}

function AccessRecordCard({ record }) {
  return (
    <article className="access-card">
      <div className="access-card-header">
        <div>
          <p className="record-company">{record.company}</p>
          <p className="record-meta">
            {companyTypeLabels[record.companyType]}
            <span aria-hidden="true"> / </span>
            {formatLongDate(record.accessedAt)}
          </p>
        </div>
        <span className="amount-badge">{formatCurrency(record.amount)}</span>
      </div>

      <p className="record-purpose">{record.purpose}</p>
      <div className="tag-list">
        {record.categories.map((category) => (
          <span className="tag" key={category}>
            {cleanCategory(category)}
          </span>
        ))}
      </div>
    </article>
  );
}

function CallsSection() {
  return (
    <Panel title="Completed Calls">
      <div className="row-stack">
        {completedCalls.map((call) => (
          <CallCard key={`${call.caller}-${call.date}`} call={call} />
        ))}
      </div>
    </Panel>
  );
}

function ResponsesSection() {
  return (
    <section className="two-column-grid">
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
        <div className="row-stack large-gap">
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
    <section className="insight-grid">
      {insightCards.map((insight) => (
        <Panel key={insight.title} title={insight.title}>
          <p className="muted-copy">{insight.text}</p>
        </Panel>
      ))}
    </section>
  );
}

function SettingsSection({ onSignOut }) {
  return (
    <section className="two-column-grid">
      <Panel title="Account">
        <div className="row-stack">
          <SmallMetric label="Workspace" value="Phicil-itate Change" />
          <SmallMetric label="Assistant" value="Oz" />
          <SmallMetric label="Voice provider" value="ElevenLabs" />
        </div>
      </Panel>

      <Panel title="Preferences">
        <div className="row-stack">
          <ToggleRow label="Email daily call summary" />
          <ToggleRow label="Flag urgent follow-ups" />
          <ToggleRow label="Show simple language insights" />
          <button className="primary-button align-left" onClick={onSignOut} type="button">
            Sign out
          </button>
        </div>
      </Panel>
    </section>
  );
}

function Panel({ children, title }) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="stat-card">
      <p>{label}</p>
      <strong>{value}</strong>
    </div>
  );
}

function SmallMetric({ label, value }) {
  return (
    <div className="small-metric">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function CallCard({ call }) {
  return (
    <div className="call-card">
      <div className="call-card-header">
        <div>
          <p className="record-company">{call.caller}</p>
          <p className="record-meta">
            {call.date}
            <span aria-hidden="true"> / </span>
            {call.duration}
          </p>
        </div>
        <span className="tag">{call.score}</span>
      </div>
      <p className="muted-copy">{call.summary}</p>
    </div>
  );
}

function Question({ answer, question }) {
  return (
    <div className="question-card">
      <p>{question}</p>
      <span>{answer}</span>
    </div>
  );
}

function Progress({ label, value, width }) {
  return (
    <div>
      <div className="progress-label">
        <p>{label}</p>
        <span>{value}</span>
      </div>
      <div className="progress-track">
        <div className="progress-fill" style={{ width }} />
      </div>
    </div>
  );
}

function ToggleRow({ label }) {
  return (
    <label className="toggle-row">
      <span>{label}</span>
      <input defaultChecked type="checkbox" />
    </label>
  );
}

function formatCurrency(amount) {
  return new Intl.NumberFormat('en-US', {
    currency: 'USD',
    maximumFractionDigits: 0,
    style: 'currency',
  }).format(amount);
}

function formatShortDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'short',
  }).format(new Date(date));
}

function formatLongDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date));
}

function cleanCategory(category) {
  return category
    .split('_')
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

export default App;
