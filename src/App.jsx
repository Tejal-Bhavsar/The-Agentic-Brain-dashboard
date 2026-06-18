import React, { useState } from 'react';
import { mockCustomers } from './data/mockCustomers';
import DashboardOverview from './components/DashboardOverview';
import NurtureVisualizer from './components/NurtureVisualizer';
import ChurnPredictor from './components/ChurnPredictor';
import VoiceOutreachAgent from './components/VoiceOutreachAgent';
import { Brain, Users, Activity, Clock, ShieldAlert, Cpu, Heart } from 'lucide-react';

const INITIAL_LOGS = [
  { id: "log-1", timestamp: "09:12:05", type: "system", event: "Dashboard Initialized", description: "MCRDSE Agentic Operations Center loaded successfully. Brand theme tokens activated." },
  { id: "log-2", timestamp: "08:45:00", type: "churn", event: "Automated Churn Scan", description: "Scheduled Recency/Frequency scan finished. Tariq Mahmood & Sarah Jenkins flagged as Critical Churn Risk." },
  { id: "log-3", timestamp: "07:11:42", type: "nurture", event: "Onboarding Trigger Sent", description: "Day 1 check-in questionnaire SMS dispatched to Alex Mercer (cust-01)." },
  { id: "log-4", timestamp: "2026-06-16 16:30:15", type: "outreach", event: "Draft Auto-Dispatched", description: "Prompt blueprint triggered: Founder voice check-in email saved to Marcus Vance's draft folder." },
  { id: "log-5", timestamp: "2026-06-16 11:02:50", type: "system", event: "Shopify Order Webhook", description: "Webhook received for Alex Mercer (Starter Kit). Active profile generated." }
];

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [customers, setCustomers] = useState(mockCustomers);
  const [selectedCustomerId, setSelectedCustomerId] = useState(mockCustomers[0].id);
  const [systemLogs, setSystemLogs] = useState(INITIAL_LOGS);

  // Helper to append action records to the live dashboard log feed
  const logSystemAction = (type, event, description) => {
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0];
    const newLog = {
      id: `log-${Date.now()}`,
      timestamp: timeStr,
      type,
      event,
      description
    };
    setSystemLogs(prev => [newLog, ...prev]);
  };

  const handleRunBatchAnalysis = () => {
    logSystemAction(
      'churn', 
      'Batch Churn Run Triggered', 
      'Re-scoring all customers based on updated weights. Updated telemetry logs generated.'
    );
  };

  return (
    <div className="flex h-screen bg-mcrdse-bg overflow-hidden text-mcrdse-plum font-sans">
      
      {/* LEFT SIDEBAR - Editorial cream panel with thin lines */}
      <aside className="w-64 bg-mcrdse-card border-r border-mcrdse-plum/10 flex flex-col justify-between shrink-0">
        <div>
          {/* Logo Header matching the mcrdse.com serif styling */}
          <div className="p-6 border-b border-mcrdse-plum/10 flex flex-col gap-1">
            <h1 className="text-3xl font-serif font-bold tracking-tight text-mcrdse-plum lowercase">
              mcrdse
            </h1>
            <p className="text-[9px] text-mcrdse-taupe font-mono tracking-widest uppercase">
              Agentic Operations
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="p-4 space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition duration-200 ${
                activeTab === 'overview' 
                  ? 'bg-mcrdse-plum text-white shadow-sm' 
                  : 'text-mcrdse-taupe hover:text-mcrdse-plum hover:bg-mcrdse-sandDark'
              }`}
            >
              <Activity className="w-4 h-4 shrink-0" /> Overview Dashboard
            </button>

            <button
              onClick={() => setActiveTab('nurture')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition duration-200 ${
                activeTab === 'nurture' 
                  ? 'bg-mcrdse-plum text-white shadow-sm' 
                  : 'text-mcrdse-taupe hover:text-mcrdse-plum hover:bg-mcrdse-sandDark'
              }`}
            >
              <Clock className="w-4 h-4 shrink-0" /> Nurture Pipeline
            </button>

            <button
              onClick={() => setActiveTab('churn')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition duration-200 ${
                activeTab === 'churn' 
                  ? 'bg-mcrdse-plum text-white shadow-sm' 
                  : 'text-mcrdse-taupe hover:text-mcrdse-plum hover:bg-mcrdse-sandDark'
              }`}
            >
              <ShieldAlert className="w-4 h-4 shrink-0" /> Churn Risk Engine
            </button>

            <button
              onClick={() => setActiveTab('outreach')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition duration-200 ${
                activeTab === 'outreach' 
                  ? 'bg-mcrdse-plum text-white shadow-sm' 
                  : 'text-mcrdse-taupe hover:text-mcrdse-plum hover:bg-mcrdse-sandDark'
              }`}
            >
              <Brain className="w-4 h-4 shrink-0" /> Voice Outreach Agent
            </button>
          </nav>
        </div>

        {/* BOTTOM PIPELINE STATS PANEL */}
        <div className="p-5 border-t border-mcrdse-plum/10 bg-mcrdse-bg/40 space-y-3">
          <div className="flex items-center justify-between text-[10px] font-mono text-mcrdse-taupe uppercase">
            <span>Agent Infrastructure</span>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mcrdse-violet opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-mcrdse-violet"></span>
            </span>
          </div>

          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center gap-2 text-mcrdse-plum bg-mcrdse-card p-2 rounded-xl border border-mcrdse-plum/10">
              <Cpu className="w-3.5 h-3.5 text-mcrdse-violet" />
              <div>
                <div className="text-[9px] text-mcrdse-taupe uppercase leading-none">Primary LLM</div>
                <div className="text-mcrdse-plum font-semibold">Claude Code / Sonnet</div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-mcrdse-plum bg-mcrdse-card p-2 rounded-xl border border-mcrdse-plum/10">
              <Heart className="w-3.5 h-3.5 text-mcrdse-violet" />
              <div>
                <div className="text-[9px] text-mcrdse-taupe uppercase leading-none">Shopify Sync</div>
                <div className="text-mcrdse-plum font-semibold">Real-Time Webhooks</div>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* MAIN VIEW AREA */}
      <main className="flex-1 overflow-y-auto p-8 relative">
        {activeTab === 'overview' && (
          <DashboardOverview 
            customers={customers} 
            systemLogs={systemLogs} 
            onNavigate={setActiveTab}
            onRunBatchAnalysis={handleRunBatchAnalysis}
          />
        )}
        
        {activeTab === 'nurture' && (
          <NurtureVisualizer 
            customers={customers} 
            selectedCustomerId={selectedCustomerId}
            onSelectCustomer={setSelectedCustomerId}
          />
        )}

        {activeTab === 'churn' && (
          <ChurnPredictor 
            customers={customers} 
            selectedCustomerId={selectedCustomerId}
            onSelectCustomer={setSelectedCustomerId}
            onNavigate={setActiveTab}
            onLogSystemAction={logSystemAction}
          />
        )}

        {activeTab === 'outreach' && (
          <VoiceOutreachAgent 
            customers={customers} 
            selectedCustomerId={selectedCustomerId}
            onSelectCustomer={setSelectedCustomerId}
            onLogSystemAction={logSystemAction}
          />
        )}
      </main>

    </div>
  );
}
