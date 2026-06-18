import React, { useState } from 'react';
import { Clock, HelpCircle, Webhook, MessageSquare, AlertCircle, FileText, CheckCircle2, User } from 'lucide-react';

const MILESTONES = [
  {
    day: 0,
    title: "Shopify Handoff (Day 0)",
    event: "Order Webhook Trigger",
    icon: Webhook,
    color: "text-mcrdse-plum bg-mcrdse-sandDark border-mcrdse-plum/30",
    description: "Shopify webhook signals a new product order. The agentic brain parses metadata to initiate the 90-day profile.",
    prompt: `SYSTEM: You are the Nurture Handoff Agent. Triggered on Shopify Order Webhook.
INPUT: { customer_email, order_items, shipping_address }
TASK: Parse order. Categorize dosage type (Starter Kit vs. Reorder). Initialize database record in NurtureState table. Send Welcome SMS to customer within 10 minutes, introducing their integration advisor.`,
    payload: `{
  "topic": "orders/create",
  "customer": {
    "first_name": "Alex",
    "email": "alex.mercer@gmail.com"
  },
  "line_items": [
    { "title": "MCRDSE Focus Starter Kit", "quantity": 1 }
  ]
}`
  },
  {
    day: 1,
    title: "Intention Intake (Day 1)",
    event: "Onboarding Flow",
    icon: FileText,
    color: "text-mcrdse-violet bg-mcrdse-violet/10 border-mcrdse-violet/30",
    description: "Customer is prompted to set their baseline state and choose their microdose protocol (Fadiman vs. Stamets Stack).",
    prompt: `SYSTEM: You are the Intention Intake Agent. Sent on Day 1 at 09:00 AM local time.
TASK: Draft onboarding email requesting intake values (Intention, anxiety level 1-10, primary focus goal).
IF intake_submitted: update protocol in customer record.
IF intake_missing after 48h: send follow-up check-in via integration advisor SMS pipeline.`,
    payload: `{
  "customer_id": "cust-01",
  "baseline_anxiety": 6,
  "intention": "Reduce work burnout and improve focus.",
  "selected_protocol": "Fadiman Protocol"
}`
  },
  {
    day: 14,
    title: "Protocol Audit (Day 14)",
    event: "Early Check-in Eval",
    icon: MessageSquare,
    color: "text-blue-600 bg-blue-50 border-blue-200",
    description: "Calculates sentiment from early check-ins. Detects issues like high sensitivity/anxiety and routes to human coach.",
    prompt: `SYSTEM: You are the Sentiment & Protocol Auditor.
TASK: Analyze customer's Week 1 & 2 integration journal sentiment score.
LOGIC:
  IF average_sentiment < 4 OR feedback contains "anxious", "headache", "jitters":
    1. Update status to "Critical Alert"
    2. Post Slack notification to #integration-support
    3. Trigger personal founder-voice email draft suggesting dose dilution.
  ELSE:
    Send automatic Week 2 Encouragement and Dosage Journal template.`,
    payload: `{
  "journal_sentiment": "Positive (Burnout loops diminishing)",
  "anxiety_trend": "Downwards (-20%)",
  "dilution_required": false
}`
  },
  {
    day: 45,
    title: "Midpoint Reflection (Day 45)",
    event: "Habit Integration Check",
    icon: HelpCircle,
    color: "text-mcrdse-amber bg-mcrdse-amber/10 border-mcrdse-amber/30",
    description: "Audits behavior halfway through. Validates if second supply was ordered. Triggers churn predictor warning if order is delayed.",
    prompt: `SYSTEM: You are the Midpoint Retention Auditor. Runs on Day 45 cron.
LOGIC:
  Check Orders Table: Has customer placed a Refill Order?
  IF days_since_last_order > 38:
    1. Flag customer in Churn Prediction table with status "Warning"
    2. Alert Outreach Agent to draft a founder-voice check-in checking on journal skip reasons.
  ELSE:
    Deliver integration workbook Chapter 2 (Neuroplasticity and Habit Rewriting).`,
    payload: `{
  "days_active": 45,
  "refill_ordered": true,
  "completed_journals": "4 of 6",
  "churn_risk_flag": "Stable"
}`
  },
  {
    day: 90,
    title: "Graduation (Day 90+)",
    event: "Neuroplasticity Exit Check",
    icon: CheckCircle2,
    color: "text-mcrdse-green bg-mcrdse-green/10 border-mcrdse-green/30",
    description: "90-day cycle complete. The customer has interrupted their default mode loops. Enrolls them into VIP circles.",
    prompt: `SYSTEM: You are the Graduation Architect. Triggered on Day 90.
TASK: Evaluate total 90-day progress report.
1. Apply Shopify customer tag 'mcrdse-graduated'.
2. Create founder-voice congratulations draft highlighting customer's specific journey statistics (e.g. 'You completed 12 check-ins!').
3. Deliver invite to the integration graduates circle for peer-to-peer mentoring.`,
    payload: `{
  "customer_id": "cust-05",
  "total_completed_weeks": 12,
  "average_wellness_rating": 8.8,
  "tag_applied": "mcrdse-graduated"
}`
  }
];

export default function NurtureVisualizer({ customers, selectedCustomerId, onSelectCustomer }) {
  const [activeNodeIndex, setActiveNodeIndex] = useState(0);

  // Group customers by milestones to show where they are currently
  const getCustomersAtMilestone = (milestoneDay) => {
    return customers.filter(c => {
      if (milestoneDay === 0) return c.nurtureDay <= 7;
      if (milestoneDay === 1) return c.nurtureDay > 7 && c.nurtureDay <= 21;
      if (milestoneDay === 14) return c.nurtureDay > 21 && c.nurtureDay <= 50;
      if (milestoneDay === 45) return c.nurtureDay > 50 && c.nurtureDay <= 90;
      return c.nurtureDay > 90; // Day 90+
    });
  };

  const selectedNode = MILESTONES[activeNodeIndex];
  const activeMilestoneCustomers = getCustomersAtMilestone(selectedNode.day);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div>
          <h1 className="text-2xl font-serif font-bold text-mcrdse-plum lowercase">90-day nurture sequence</h1>
          <p className="text-mcrdse-taupe text-xs font-sans">Task 1: Automated Customer Handoff & Journey Automation Logic.</p>
        </div>
      </div>

      {/* Interactive Timeline Map - Sand container, thin lines */}
      <div className="p-8 rounded-2xl bg-mcrdse-card border border-mcrdse-plum/15 shadow-sm">
        <h3 className="text-[10px] font-mono font-bold text-mcrdse-taupe mb-6 uppercase tracking-wider">Automated Handoff Lifecycle Map</h3>
        
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-4">
          {/* Connector Line for Desktop */}
          <div className="absolute top-1/2 left-4 right-4 h-[1px] bg-mcrdse-plum/10 -translate-y-1/2 hidden md:block z-0" />
          
          {MILESTONES.map((milestone, idx) => {
            const IconComponent = milestone.icon;
            const isActive = activeNodeIndex === idx;
            const milestoneCustomers = getCustomersAtMilestone(milestone.day);
            const customerCount = milestoneCustomers.length;

            return (
              <button
                key={milestone.day}
                onClick={() => setActiveNodeIndex(idx)}
                className={`relative z-10 w-full md:w-auto flex md:flex-col items-center gap-4 md:gap-2 text-left md:text-center group p-3 md:p-2 rounded-xl transition duration-200 ${
                  isActive ? 'bg-mcrdse-bg md:bg-transparent border border-mcrdse-plum/10 md:border-transparent shadow-sm md:shadow-none' : 'hover:bg-mcrdse-bg/40'
                }`}
              >
                <div className={`p-4 rounded-full border transition duration-300 ${
                  isActive 
                    ? `${milestone.color} scale-105 shadow-md shadow-mcrdse-plum/5 border-mcrdse-plum/80` 
                    : 'bg-mcrdse-card border-mcrdse-plum/15 text-mcrdse-taupe/60 group-hover:text-mcrdse-plum group-hover:border-mcrdse-plum/45'
                }`}>
                  <IconComponent className="w-5 h-5" />
                </div>
                
                <div>
                  <h4 className={`text-xs font-bold font-serif transition ${isActive ? 'text-mcrdse-plum' : 'text-mcrdse-taupe group-hover:text-mcrdse-plum'}`}>
                    {milestone.title}
                  </h4>
                  <p className="text-[10px] font-mono text-mcrdse-taupe/70 mt-0.5">{milestone.event}</p>
                  
                  {/* Customer Badges inside Node */}
                  {customerCount > 0 && (
                    <span className="inline-flex items-center gap-1 mt-1.5 px-2 py-0.5 rounded-full text-[9px] font-bold bg-mcrdse-bg text-mcrdse-plum border border-mcrdse-plum/10 font-mono">
                      <User className="w-2.5 h-2.5" />
                      {customerCount} {customerCount === 1 ? 'client' : 'clients'}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail Panel Split: Agent logic & Customers active at node */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Active Customers in this Milestone */}
        <div className="p-6 rounded-2xl bg-mcrdse-card border border-mcrdse-plum/15 flex flex-col justify-between shadow-sm">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-serif font-bold text-mcrdse-plum lowercase">Active at Stage</h3>
              <span className="text-[10px] bg-mcrdse-bg text-mcrdse-plum px-2 py-0.5 rounded border border-mcrdse-plum/10 font-mono font-bold">
                {activeMilestoneCustomers.length} active
              </span>
            </div>
            
            {activeMilestoneCustomers.length === 0 ? (
              <div className="py-10 text-center text-mcrdse-taupe/60 text-xs border border-dashed border-mcrdse-plum/15 rounded-2xl">
                No active clients in this lifecycle stage.
              </div>
            ) : (
              <div className="space-y-3">
                {activeMilestoneCustomers.map((cust) => {
                  const isSelected = cust.id === selectedCustomerId;
                  return (
                    <div
                      key={cust.id}
                      onClick={() => onSelectCustomer(cust.id)}
                      className={`p-4 rounded-xl border text-left cursor-pointer transition duration-200 ${
                        isSelected 
                          ? 'bg-mcrdse-plum text-white border-mcrdse-plum shadow-md' 
                          : 'bg-mcrdse-bg/30 border-mcrdse-plum/10 text-mcrdse-plum hover:bg-mcrdse-bg/75'
                      }`}
                    >
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-xs font-serif">{cust.name}</span>
                        <span className={`text-[9px] font-mono ${isSelected ? 'text-white/75' : 'text-mcrdse-taupe'}`}>Day {cust.nurtureDay}</span>
                      </div>
                      <div className={`text-[10px] mt-1 font-mono truncate ${isSelected ? 'text-white/70' : 'text-mcrdse-taupe/90'}`}>{cust.email}</div>
                      
                      <div className="mt-3 flex justify-between items-center text-[9px] font-mono">
                        <span className={`px-2 py-0.5 rounded ${
                          isSelected ? 'bg-white/10 text-white border border-white/20' : 'bg-mcrdse-card text-mcrdse-plum border border-mcrdse-plum/10'
                        }`}>
                          {cust.dosagePlan.split(' ')[0]} protocol
                        </span>
                        <span className={isSelected ? 'text-white/70' : 'text-mcrdse-taupe'}>
                          {cust.weeklyCheckIns.filter(w => w.completed).length} logs done
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          <div className="mt-6 p-4 bg-mcrdse-bg border border-mcrdse-plum/10 rounded-xl text-[11px] text-mcrdse-taupe flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-mcrdse-violet shrink-0 mt-0.5" />
            <span>Click on a customer card to load their profile in the Churn Risk or Voice Outreach tabs.</span>
          </div>
        </div>

        {/* Technical Agent Prompt & Payload */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-mcrdse-card border border-mcrdse-plum/15 space-y-5 shadow-sm">
          <div className="flex items-center gap-3 border-b border-mcrdse-plum/10 pb-4">
            <div className="p-2.5 bg-mcrdse-bg rounded-xl text-mcrdse-plum/80 border border-mcrdse-plum/10">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-serif font-bold text-mcrdse-plum lowercase">Agent Logic Schema</h3>
              <p className="text-[10px] text-mcrdse-taupe font-mono uppercase">Milestone Day {selectedNode.day} Specifications.</p>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="text-[10px] font-bold text-mcrdse-taupe uppercase tracking-wider mb-2 font-mono">Agent System Instruction:</h4>
              <pre className="p-4 rounded-xl bg-mcrdse-bg text-mcrdse-plum text-[11px] font-mono overflow-x-auto border border-mcrdse-plum/15 whitespace-pre-wrap leading-relaxed">
                {selectedNode.prompt}
              </pre>
            </div>

            <div>
              <h4 className="text-[10px] font-bold text-mcrdse-taupe uppercase tracking-wider mb-2 font-mono">Mock Payload / Database Hook Context:</h4>
              <pre className="p-4 rounded-xl bg-mcrdse-bg text-mcrdse-violet text-[11px] font-mono overflow-x-auto border border-mcrdse-plum/15 whitespace-pre-wrap">
                {selectedNode.payload}
              </pre>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
