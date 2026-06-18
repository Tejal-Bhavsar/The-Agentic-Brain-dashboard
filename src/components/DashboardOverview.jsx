import React from 'react';
import { Brain, Users, Clock, AlertTriangle, Activity, Zap, CheckCircle2, ShieldAlert, ArrowRight } from 'lucide-react';

export default function DashboardOverview({ customers, systemLogs, onNavigate, onRunBatchAnalysis }) {
  const totalCustomers = customers.length;
  const activeNurture = customers.filter(c => c.nurtureDay <= 90).length;
  
  const criticalChurnCount = customers.filter(c => {
    const daysSinceLastOrder = Math.floor((new Date("2026-06-17") - new Date(c.lastOrderDate)) / (1000 * 60 * 60 * 24));
    const missedCheckins = c.weeklyCheckIns.filter(w => !w.completed).length;
    return daysSinceLastOrder > 45 || missedCheckins >= 2;
  }).length;

  return (
    <div className="space-y-8 animate-float-subtle">
      {/* MCRDSE Brand Hero Header - Mimics the shop screenshot layout */}
      <div className="bg-[#f2eae0]/60 border border-mcrdse-plum/15 rounded-3xl p-8 md:p-10 relative overflow-hidden shadow-sm">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#faf6ee] px-3 py-1 rounded-full border border-mcrdse-plum/10 text-xs font-mono font-bold text-mcrdse-plum">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-mcrdse-violet opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-mcrdse-violet"></span>
              </span>
              All Systems Active (Claude Code v4)
            </div>
            
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-mcrdse-plum leading-tight lowercase">
              focus, bliss & agency:<br/>the mcrdse brain
            </h1>
            
            <p className="text-sm text-mcrdse-taupe leading-relaxed max-w-xl">
              An automated, high-fidelity operations dashboard sitting at the intersection of neuroscience and artificial intelligence. Monitor user onboarding loops, run churn algorithms, and calibrate founder-voice outreach templates.
            </p>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <button 
                onClick={onRunBatchAnalysis}
                className="px-5 py-2.5 bg-mcrdse-plum hover:bg-[#2c0c2c] text-[#faf6ee] rounded-full text-xs font-bold font-serif tracking-wide transition duration-150 shadow-sm"
              >
                run churn scan
              </button>
              <button 
                onClick={() => onNavigate('outreach')}
                className="px-5 py-2.5 border border-mcrdse-plum/20 hover:border-mcrdse-plum hover:bg-mcrdse-bg text-mcrdse-plum rounded-full text-xs font-semibold font-sans transition duration-150"
              >
                calibrate voice
              </button>
            </div>
          </div>

          {/* Right Product Illustration Column - SVG mimicking the screenshot packaging */}
          <div className="lg:col-span-5 flex justify-center items-center">
            <div className="relative w-64 h-64 flex justify-center items-center bg-[#faf6ee] rounded-full border border-mcrdse-plum/10 shadow-sm overflow-hidden p-6">
              {/* Botanical wreath background in SVG */}
              <svg className="absolute inset-0 w-full h-full text-mcrdse-plum/5 animate-spin" style={{ animationDuration: '60s' }} viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" />
                <path d="M 50 5 A 5 5 0 0 1 50 15 A 5 5 0 0 1 50 5" fill="currentColor" opacity="0.3" transform="rotate(30 50 50)" />
                <path d="M 50 5 A 5 5 0 0 1 50 15 A 5 5 0 0 1 50 5" fill="currentColor" opacity="0.3" transform="rotate(90 50 50)" />
                <path d="M 50 5 A 5 5 0 0 1 50 15 A 5 5 0 0 1 50 5" fill="currentColor" opacity="0.3" transform="rotate(150 50 50)" />
                <path d="M 50 5 A 5 5 0 0 1 50 15 A 5 5 0 0 1 50 5" fill="currentColor" opacity="0.3" transform="rotate(210 50 50)" />
                <path d="M 50 5 A 5 5 0 0 1 50 15 A 5 5 0 0 1 50 5" fill="currentColor" opacity="0.3" transform="rotate(270 50 50)" />
                <path d="M 50 5 A 5 5 0 0 1 50 15 A 5 5 0 0 1 50 5" fill="currentColor" opacity="0.3" transform="rotate(330 50 50)" />
              </svg>
              
              {/* Stylized Product Cylinders matching screenshot */}
              <div className="flex gap-4 items-end relative z-10">
                {/* Focus Bottle (Eggplant Blue/Grey) */}
                <div className="w-10 h-28 bg-[#3c4a5c] rounded-full border border-mcrdse-plum shadow flex flex-col justify-between items-center py-4 text-white relative hover:scale-105 transition duration-300">
                  <div className="text-[7px] font-mono tracking-widest uppercase origin-center rotate-90 my-2">MCRDSE</div>
                  <div className="text-[9px] font-serif font-bold tracking-tight lowercase">focus</div>
                </div>
                {/* Bliss Bottle (Green Sage) */}
                <div className="w-10 h-28 bg-[#5f7361] rounded-full border border-mcrdse-plum shadow flex flex-col justify-between items-center py-4 text-white relative hover:scale-105 transition duration-300">
                  <div className="text-[7px] font-mono tracking-widest uppercase origin-center rotate-90 my-2">MCRDSE</div>
                  <div className="text-[9px] font-serif font-bold tracking-tight lowercase">bliss</div>
                </div>
              </div>

              {/* Little floral elements */}
              <span className="absolute top-8 left-8 text-xl opacity-20">🍃</span>
              <span className="absolute bottom-8 right-8 text-xl opacity-20">🍄</span>
              <span className="absolute top-12 right-12 text-sm opacity-20">🌸</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards Grid - Clean light styling, serif numbers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="card-editorial p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-mono font-bold text-mcrdse-taupe uppercase tracking-wider">Total Clients</p>
              <h3 className="text-4xl font-serif font-bold text-mcrdse-plum">{totalCustomers}</h3>
            </div>
            <div className="p-3 bg-mcrdse-bg rounded-2xl text-mcrdse-plum/80 border border-mcrdse-plum/10">
              <Users className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xs text-mcrdse-green font-semibold mt-4 flex items-center gap-1 font-mono">
            <Zap className="w-3.5 h-3.5" /> +2 new this week
          </div>
        </div>

        <div className="card-editorial p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-mono font-bold text-mcrdse-taupe uppercase tracking-wider">Active Nurture</p>
              <h3 className="text-4xl font-serif font-bold text-mcrdse-plum">{activeNurture}</h3>
            </div>
            <div className="p-3 bg-mcrdse-bg rounded-2xl text-mcrdse-plum/80 border border-mcrdse-plum/10">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xs text-mcrdse-taupe font-medium mt-4 flex items-center gap-1 font-mono">
            <Activity className="w-3.5 h-3.5 text-mcrdse-violet" /> Onboarding (0-90d)
          </div>
        </div>

        <div className="card-editorial p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-mono font-bold text-mcrdse-taupe uppercase tracking-wider">High Churn Risk</p>
              <h3 className="text-4xl font-serif font-bold text-mcrdse-rose">{criticalChurnCount}</h3>
            </div>
            <div className="p-3 bg-mcrdse-rose/10 rounded-2xl text-mcrdse-rose border border-mcrdse-rose/20">
              <AlertTriangle className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xs text-mcrdse-rose font-bold mt-4 flex items-center gap-1 font-mono">
            <ShieldAlert className="w-3.5 h-3.5" /> Overdue re-orders
          </div>
        </div>

        <div className="card-editorial p-6">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <p className="text-[10px] font-mono font-bold text-mcrdse-taupe uppercase tracking-wider">Agents Online</p>
              <h3 className="text-4xl font-serif font-bold text-mcrdse-green">3</h3>
            </div>
            <div className="p-3 bg-mcrdse-green/10 rounded-2xl text-mcrdse-green border border-mcrdse-green/20">
              <Brain className="w-5 h-5" />
            </div>
          </div>
          <div className="text-xs text-mcrdse-green font-semibold mt-4 flex items-center gap-1 font-mono">
            <CheckCircle2 className="w-3.5 h-3.5" /> Pipeline Online
          </div>
        </div>
      </div>

      {/* Main Grid: Live logs & Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Playbook / Actions Panel */}
        <div className="p-6 rounded-3xl bg-mcrdse-card border border-mcrdse-plum/15 flex flex-col justify-between shadow-sm space-y-6">
          <div className="space-y-4">
            <h2 className="text-xl font-serif font-bold text-mcrdse-plum lowercase">Operations Playbook</h2>
            <p className="text-xs text-mcrdse-taupe leading-relaxed">
              Trigger autonomous agent workflows to evaluate customer health and generate contextual communication drafts.
            </p>
            
            <div className="space-y-3">
              <button 
                onClick={onRunBatchAnalysis}
                className="w-full text-left p-4 rounded-2xl bg-mcrdse-bg/40 border border-mcrdse-plum/10 hover:bg-mcrdse-sandDark hover:border-mcrdse-plum/30 transition duration-150 group flex items-start gap-3"
              >
                <div className="p-2 bg-mcrdse-plum text-white rounded-xl group-hover:scale-105 transition">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-mcrdse-plum group-hover:text-mcrdse-violet transition">Execute Churn Analysis</div>
                  <div className="text-[10px] text-mcrdse-taupe mt-0.5 font-mono">Run Recency-Frequency analysis.</div>
                </div>
              </button>

              <button 
                onClick={() => onNavigate('nurture')}
                className="w-full text-left p-4 rounded-2xl bg-mcrdse-bg/40 border border-mcrdse-plum/10 hover:bg-mcrdse-sandDark hover:border-mcrdse-plum/30 transition duration-150 group flex items-start gap-3"
              >
                <div className="p-2 bg-mcrdse-plum text-white rounded-xl group-hover:scale-105 transition">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-mcrdse-plum group-hover:text-mcrdse-violet transition">Audit Nurture States</div>
                  <div className="text-[10px] text-mcrdse-taupe mt-0.5 font-mono">Inspect 90-day checklist.</div>
                </div>
              </button>

              <button 
                onClick={() => onNavigate('outreach')}
                className="w-full text-left p-4 rounded-2xl bg-mcrdse-bg/40 border border-mcrdse-plum/10 hover:bg-mcrdse-sandDark hover:border-mcrdse-plum/30 transition duration-150 group flex items-start gap-3"
              >
                <div className="p-2 bg-mcrdse-plum text-white rounded-xl group-hover:scale-105 transition">
                  <Brain className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-mcrdse-plum group-hover:text-mcrdse-violet transition">Calibrate Outreach Voice</div>
                  <div className="text-[10px] text-mcrdse-taupe mt-0.5 font-mono">Modify brand guidelines.</div>
                </div>
              </button>
            </div>
          </div>
          
          <div className="pt-4 border-t border-mcrdse-plum/10 text-[10px] text-mcrdse-taupe font-mono flex justify-between">
            <span>Webhook Status</span>
            <span className="font-semibold text-mcrdse-green">Synchronized</span>
          </div>
        </div>

        {/* Live System Activity Feed - styled like an index ledger sheet */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-mcrdse-card border border-mcrdse-plum/15 flex flex-col h-[420px] shadow-sm">
          <div className="flex justify-between items-center mb-4 border-b border-mcrdse-plum/10 pb-3">
            <h2 className="text-xl font-serif font-bold text-mcrdse-plum flex items-center gap-2 lowercase">
              <Activity className="w-5 h-5 text-mcrdse-violet animate-pulse" />
              agent activity log
            </h2>
            <span className="text-[9px] bg-mcrdse-bg text-mcrdse-plum px-2.5 py-1 rounded-full border border-mcrdse-plum/10 font-mono uppercase tracking-wider font-bold">
              realtime sync
            </span>
          </div>
          
          <div className="flex-1 overflow-y-auto pr-1 space-y-3 font-mono text-[11px] leading-relaxed">
            {systemLogs.map((log) => (
              <div 
                key={log.id} 
                className="p-3.5 rounded-2xl bg-mcrdse-bg/30 border border-mcrdse-plum/10 flex items-start gap-3.5 hover:bg-mcrdse-bg/65 transition"
              >
                <span className="text-mcrdse-taupe shrink-0 mt-0.5 font-bold text-[10px]">{log.timestamp}</span>
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className={`px-2 py-0.5 rounded-full text-[8px] uppercase font-bold tracking-wider border ${
                      log.type === 'nurture' ? 'bg-mcrdse-bg text-mcrdse-plum border-mcrdse-plum/20' :
                      log.type === 'churn' ? 'bg-mcrdse-rose/10 text-mcrdse-rose border-mcrdse-rose/20' :
                      log.type === 'outreach' ? 'bg-mcrdse-green/10 text-mcrdse-green border-mcrdse-green/20' :
                      'bg-mcrdse-card text-mcrdse-taupe border-mcrdse-plum/10'
                    }`}>
                      {log.type}
                    </span>
                    <span className="text-mcrdse-plum font-bold font-sans text-xs">{log.event}</span>
                  </div>
                  <p className="text-mcrdse-taupe font-sans text-xs leading-relaxed">{log.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
