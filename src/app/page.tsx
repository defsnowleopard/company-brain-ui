
"use client";

import { useState } from "react";
import {
  BrainCircuit,
  LayoutDashboard,
  Search,
  Users,
  Building2,
  BookOpen,
  Bot,
  Workflow,
  Plug,
  Settings,
  ChevronRight,
  Database,
  Activity,
  FileText,
  Menu,
  X,
} from "lucide-react";

const navigation = [
  { name: "Overview", icon: LayoutDashboard },
  { name: "Knowledge Explorer", icon: Search },
  { name: "Clients", icon: Building2 },
  { name: "People", icon: Users },
  { name: "SOPs", icon: BookOpen },
  { name: "AI Agents", icon: Bot },
  { name: "Automations", icon: Workflow },
  { name: "Integrations", icon: Plug },
  { name: "Settings", icon: Settings },
];

const records = [
  {
    id: 1,
    title: "GoHighLevel Client Onboarding",
    type: "SOP",
    description:
      "Client account setup, tracking, permissions and onboarding workflows.",
    tags: ["GHL", "Onboarding", "CRM"],
  },
  {
    id: 2,
    title: "Company Infrastructure",
    type: "Project",
    description:
      "Connected systems, servers, agents and operational architecture.",
    tags: ["DevOps", "Infrastructure"],
  },
  {
    id: 3,
    title: "Sales Objection Handling",
    type: "SOP",
    description:
      "Sales qualification, objection handling and discovery procedures.",
    tags: ["Sales", "Training"],
  },
  {
    id: 4,
    title: "Example Client Account",
    type: "Company",
    description:
      "Client profile, performance metrics and account relationships.",
    tags: ["Client", "Marketing"],
  },
  {
    id: 5,
    title: "Example Account Manager",
    type: "Person",
    description:
      "Team member profile, responsibilities and client relationships.",
    tags: ["Team", "Operations"],
  },
  {
    id: 6,
    title: "CRM Data Architecture",
    type: "Concept",
    description:
      "Structured CRM endpoints, data indexing and integration strategy.",
    tags: ["CRM", "Automation"],
  },
];

type KnowledgeRecord = (typeof records)[number];

const categories = [
  "All",
  "Company",
  "Person",
  "SOP",
  "Project",
  "Concept",
];

export default function Home() {
  const [activePage, setActivePage] = useState("Overview");
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selected, setSelected] =
    useState<KnowledgeRecord | null>(null);

  const filteredRecords = records.filter((record) => {
    const matchesQuery = [
      record.title,
      record.description,
      record.type,
      ...record.tags,
    ]
      .join(" ")
      .toLowerCase()
      .includes(query.toLowerCase());

    const matchesCategory =
      category === "All" || record.type === category;

    return matchesQuery && matchesCategory;
  });

  function navigate(page: string) {
    setActivePage(page);
    setSelected(null);
    setQuery("");

    const pageCategories: Record<string, string> = {
      Clients: "Company",
      People: "Person",
      SOPs: "SOP",
    };

    setCategory(pageCategories[page] || "All");
  }

  const isKnowledgePage = [
    "Overview",
    "Knowledge Explorer",
    "Clients",
    "People",
    "SOPs",
  ].includes(activePage);

  return (
    <div className="min-h-screen bg-[#0b1120] text-slate-100 flex">
      {/* Sidebar */}
      {sidebarOpen && (
        <aside className="w-60 shrink-0 min-h-screen bg-[#101a2d] border-r border-slate-800 p-4">
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-blue-600 rounded-xl p-2">
              <BrainCircuit size={26} />
            </div>
            <div>
              <h1 className="font-bold text-lg">
                Company Brain
              </h1>
              <p className="text-xs tracking-widest text-slate-400">
                INCREASE ROAS
              </p>
            </div>
          </div>

          <p className="text-xs text-slate-500 uppercase tracking-widest mb-3">
            Workspace
          </p>

          <nav className="space-y-1">
            {navigation.map(({ name, icon: Icon }) => (
              <button
                key={name}
                onClick={() => navigate(name)}
                className={`flex items-center gap-3 w-full p-3 rounded-lg text-sm text-left transition cursor-pointer ${
                  activePage === name
                    ? "bg-blue-600/20 text-blue-400"
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                <Icon size={19} />
                {name}
              </button>
            ))}
          </nav>

          <div className="mt-12 rounded-xl border border-slate-700 p-4">
            <div className="flex items-center gap-2 text-sm">
              <span className="h-2 w-2 rounded-full bg-blue-400" />
              Development mode
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Local prototype
            </p>
          </div>
        </aside>
      )}

      {/* Main workspace */}
      <main className="flex-1 min-w-0">
        <header className="flex items-center justify-between border-b border-slate-800 p-5">
          <div className="flex items-center gap-4">
            <button
              aria-label="Toggle sidebar"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-slate-400 hover:text-white cursor-pointer"
            >
              <Menu size={22} />
            </button>

            <span className="text-sm text-slate-400">
              Workspace
            </span>

            <ChevronRight size={15} />

            <span className="text-sm">{activePage}</span>
          </div>

          <span className="rounded-full border border-slate-700 px-3 py-1 text-xs text-blue-400">
            DEMO MODE
          </span>
        </header>

        <div className="p-6 md:p-8 max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold tracking-tight">
            {activePage === "Overview"
              ? "Your business, connected."
              : activePage}
          </h2>

          <p className="text-slate-400 mt-2 mb-8">
            Your central workspace for company knowledge,
            intelligence and operations.
          </p>

          {/* Dashboard statistics */}
          {activePage === "Overview" && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {[
                {
                  title: "Indexed Knowledge",
                  value: "2,693",
                  icon: Database,
                  detail: "November 19 repository report",
                },
                {
                  title: "Source Documents",
                  value: "4,035",
                  icon: FileText,
                  detail: "November 17 repository report",
                },
                {
                  title: "Brain Health",
                  value: "97/100",
                  icon: Activity,
                  detail: "November 17 repository report",
                },
              ].map(({ title, value, icon: Icon, detail }) => (
                <div
                  key={title}
                  className="bg-[#131f33] border border-slate-800 rounded-xl p-5"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-sm text-slate-400">
                      {title}
                    </p>
                    <Icon
                      size={20}
                      className="text-blue-400"
                    />
                  </div>
                  <p className="text-3xl font-bold mt-3">
                    {value}
                  </p>
                  <p className="text-xs text-slate-500 mt-2">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          )}

          {/* Knowledge explorer */}
          {isKnowledgePage ? (
            <>
              <h3 className="text-xl font-semibold mb-4">
                Knowledge Explorer
              </h3>

              <div className="flex items-center gap-3 bg-[#131f33] border border-slate-700 rounded-xl p-4">
                <Search
                  size={22}
                  className="text-blue-400 shrink-0"
                />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search clients, people, procedures, projects..."
                  className="bg-transparent outline-none w-full text-sm placeholder:text-slate-500"
                />
                {query && (
                  <button
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                    className="cursor-pointer"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Category filters */}
              <div className="flex flex-wrap gap-2 my-5">
                {categories.map((item) => (
                  <button
                    key={item}
                    onClick={() => setCategory(item)}
                    className={`px-4 py-2 rounded-lg text-xs font-medium border cursor-pointer transition ${
                      category === item
                        ? "bg-blue-600 border-blue-500 text-white"
                        : "bg-slate-900 border-slate-700 text-slate-400 hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>

              <p className="text-xs text-slate-500 mb-4">
                {filteredRecords.length} matching demo records
              </p>

              {/* Results */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                {filteredRecords.map((record) => (
                  <button
                    key={record.id}
                    onClick={() => setSelected(record)}
                    className="text-left rounded-xl border border-slate-800 bg-[#131f33] p-5 hover:border-blue-500 transition cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
                        {record.type}
                      </span>
                      <ChevronRight
                        size={18}
                        className="text-slate-500"
                      />
                    </div>

                    <h4 className="text-lg font-semibold mt-3">
                      {record.title}
                    </h4>

                    <p className="text-sm text-slate-400 mt-2">
                      {record.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-4">
                      {record.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 rounded-md bg-slate-800 text-xs text-slate-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </button>
                ))}
              </div>

              {filteredRecords.length === 0 && (
                <div className="p-10 text-center text-slate-500">
                  No matching knowledge records.
                </div>
              )}
            </>
          ) : (
            <div className="bg-[#131f33] border border-slate-800 rounded-xl p-8">
              <h3 className="text-xl font-semibold">
                {activePage}
              </h3>
              <p className="text-slate-400 mt-3">
                This module is ready for future development.
                No live services are connected yet.
              </p>
            </div>
          )}
        </div>
      </main>

      {/* Record detail panel */}
      {selected && (
        <div className="fixed inset-0 bg-black/60 z-50 flex justify-end">
          <section className="w-full max-w-md bg-[#131f33] border-l border-slate-700 p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-8">
              <span className="text-xs uppercase tracking-widest text-blue-400">
                Knowledge Record
              </span>
              <button
                aria-label="Close record"
                onClick={() => setSelected(null)}
                className="text-slate-400 hover:text-white cursor-pointer"
              >
                <X />
              </button>
            </div>

            <span className="text-sm text-blue-400">
              {selected.type}
            </span>

            <h2 className="text-2xl font-bold mt-2">
              {selected.title}
            </h2>

            <p className="text-slate-400 mt-4">
              {selected.description}
            </p>

            <div className="border-t border-slate-700 mt-8 pt-6">
              <h3 className="font-semibold mb-3">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {selected.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-slate-800 rounded-lg px-3 py-1 text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-700 mt-8 pt-6">
              <h3 className="font-semibold mb-3">
                Related Knowledge
              </h3>
              <p className="text-sm text-slate-500">
                Relationships, source citations and timelines
                will populate after our GBrain integration.
              </p>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
