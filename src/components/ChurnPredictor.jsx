import React, { useState } from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Sliders, Info, ArrowRight } from 'lucide-react';

export default function ChurnPredictor({ 
  customers, 
  selectedCustomerId, 
  onSelectCustomer, 
  onNavigate, 
  onLogSystemAction 
}) {
  // Slider states for the churn detection algorithm weights
  const [recencyWeight, setRecencyWeight] = useState(8);
  const [frequencyWeight, setFrequencyWeight] = useState(5);
  const [logWeight, setLogWeight] = useState(4);

  // We set a fixed current date for evaluation: June 17, 2026
  const CURRENT_DATE = new Date("2026-06-17");

  // Calculate dynamic churn statistics for each customer
  const calculateCustomerRisk = (customer) => {
    const lastOrder = new Date(customer.lastOrderDate);
    const daysSinceLast = Math.floor((CURRENT_DATE - lastOrder) / (1000 * 60 * 60 * 24));
    
    // 1. Recency Score (how delayed is their next order?)
    const expectedInterval = customer.orderIntervalDays || 30;
    const delay = Math.max(0, daysSinceLast - expectedInterval);
    const recencyScore = Math.min(100, Math.floor((delay / expectedInterval) * 100));

    // 2. Frequency Score (single orders are high risk)
    const totalOrders = customer.orderHistory.length;
    const frequencyScore = totalOrders === 1 ? 100 : Math.max(0, 100 - (totalOrders * 20));

    // 3. Log Adherence Score (missing check-ins indicates drop-off)
    const checkIns = customer.weeklyCheckIns || [];
    const totalLogs = checkIns.length;
    const completedLogs = checkIns.filter(w => w.completed).length;
    const logScore = totalLogs > 0 ? Math.floor(((totalLogs - completedLogs) / totalLogs) * 100) : 50;

    // Weighted average math
    const totalWeight = recencyWeight + frequencyWeight + logWeight;
    let score = 0;
    if (totalWeight > 0) {
      score = Math.floor(
        ((recencyScore * recencyWeight) + 
        (frequencyScore * frequencyWeight) + 
        (logScore * logWeight)) / totalWeight
      );
    }

    // Determine status badge
    let riskLevel = "Stable";
    let badgeColor = "bg-mcrdse-green/10 text-mcrdse-green border-mcrdse-green/20";
    let icon = CheckCircle2;

    if (score > 70) {
      riskLevel = "Critical Risk";
      badgeColor = "bg-mcrdse-rose/10 text-mcrdse-rose border-mcrdse-rose/20";
      icon = ShieldAlert;
    } else if (score > 35) {
      riskLevel = "Warning";
      badgeColor = "bg-mcrdse-amber/10 text-mcrdse-amber border-mcrdse-amber/20";
      icon = AlertTriangle;
    }

    return {
      score,
      riskLevel,
      badgeColor,
      icon,
      metrics: {
        daysSinceLast,
        expectedInterval,
        delay,
        totalOrders,
        completedLogs,
        totalLogs,
        components: {
          recency: recencyScore,
          frequency: frequencyScore,
          log: logScore
        }
      }
    };
  };

  // Compile calculations for listing
  const calculatedCustomers = customers.map(c => ({
    ...c,
    riskDetails: calculateCustomerRisk(c)
  })).sort((a, b) => b.riskDetails.score - a.riskDetails.score);

  const selectedCustomer = calculatedCustomers.find(c => c.id === selectedCustomerId) || calculatedCustomers[0];

  const handleTriggerOutreach = (customer) => {
    onLogSystemAction(
      'outreach',
      `Manual outreach triggered for ${customer.name}`,
      `Navigating to email writer. Churn score: ${customer.riskDetails.score}%. Customer details preloaded.`
    );
    onSelectCustomer(customer.id);
    onNavigate('outreach');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div>
          <h1 className="text-2xl font-serif font-bold text-mcrdse-plum lowercase">order-data churn predictor</h1>
          <p className="text-mcrdse-taupe text-xs font-sans">Task 2: Detection of customer churn risks using recency, order frequency, and adherence signals.</p>
        </div>
      </div>

      {/* Algorithm Config Panel - styled editorial cream */}
      <div className="p-8 rounded-2xl bg-mcrdse-card border border-mcrdse-plum/15 shadow-sm">
        <div className="flex items-center gap-2 mb-3 text-mcrdse-plum">
          <Sliders className="w-5 h-5" />
          <h2 className="text-lg font-serif font-bold lowercase">Calibrate Risk Score Formulas</h2>
        </div>
        
        <p className="text-xs text-mcrdse-taupe leading-relaxed mb-6">
          Microdosing cycles require consistent dosing. Adjust sliders to fine-tune how much each data parameter impacts the composite Churn Risk Score.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-mcrdse-plum">Recency Delay Weight</span>
              <span className="text-mcrdse-violet font-mono">{recencyWeight}x</span>
            </div>
            <input 
              type="range" min="0" max="10" 
              value={recencyWeight} 
              onChange={(e) => setRecencyWeight(Number(e.target.value))}
              className="w-full h-1 bg-mcrdse-bg rounded-lg appearance-none cursor-pointer accent-mcrdse-plum"
            />
            <p className="text-[10px] text-mcrdse-taupe">How heavily to penalize orders delayed past their average cycle window.</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-mcrdse-plum">Single-Purchase Bias Weight</span>
              <span className="text-mcrdse-violet font-mono">{frequencyWeight}x</span>
            </div>
            <input 
              type="range" min="0" max="10" 
              value={frequencyWeight} 
              onChange={(e) => setFrequencyWeight(Number(e.target.value))}
              className="w-full h-1 bg-mcrdse-bg rounded-lg appearance-none cursor-pointer accent-mcrdse-plum"
            />
            <p className="text-[10px] text-mcrdse-taupe">Penalizes first-time buyers who don't establish a routine stack quickly.</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-semibold">
              <span className="text-mcrdse-plum">Log Skipping Weight</span>
              <span className="text-mcrdse-violet font-mono">{logWeight}x</span>
            </div>
            <input 
              type="range" min="0" max="10" 
              value={logWeight} 
              onChange={(e) => setLogWeight(Number(e.target.value))}
              className="w-full h-1 bg-mcrdse-bg rounded-lg appearance-none cursor-pointer accent-mcrdse-plum"
            />
            <p className="text-[10px] text-mcrdse-taupe">Penalizes clients skipping their weekly adaptation journaling.</p>
          </div>
        </div>
      </div>

      {/* Main split grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Customer risk leaderboard */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-mcrdse-card border border-mcrdse-plum/15 shadow-sm flex flex-col">
          <h3 className="text-lg font-serif font-bold text-mcrdse-plum mb-4 lowercase">Customer Risk Leaderboard</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-mcrdse-plum/10 text-mcrdse-taupe/90 font-mono uppercase tracking-wider">
                  <th className="pb-3 font-bold">Client</th>
                  <th className="pb-3 font-bold">Last Supply Order</th>
                  <th className="pb-3 font-bold">Total Orders</th>
                  <th className="pb-3 font-bold">Risk score</th>
                  <th className="pb-3 font-bold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-mcrdse-plum/5">
                {calculatedCustomers.map((cust) => {
                  const isSelected = cust.id === selectedCustomer.id;
                  const RiskIcon = cust.riskDetails.icon;

                  return (
                    <tr 
                      key={cust.id}
                      onClick={() => onSelectCustomer(cust.id)}
                      className={`cursor-pointer hover:bg-mcrdse-bg/40 transition duration-150 ${
                        isSelected ? 'bg-mcrdse-bg/75' : ''
                      }`}
                    >
                      <td className="py-4 pr-3">
                        <div className="font-serif font-bold text-mcrdse-plum text-sm">{cust.name}</div>
                        <div className="text-[10px] text-mcrdse-taupe font-mono mt-0.5">{cust.email}</div>
                      </td>
                      <td className="py-4 text-mcrdse-taupe font-mono">
                        {cust.riskDetails.metrics.daysSinceLast} days ago
                        <span className="text-[9px] text-mcrdse-taupe/70 block mt-0.5">Interval: {cust.orderIntervalDays}d</span>
                      </td>
                      <td className="py-4 text-mcrdse-plum font-mono">{cust.riskDetails.metrics.totalOrders}</td>
                      <td className="py-4 font-mono font-bold text-sm">
                        <span className={
                          cust.riskDetails.score > 70 ? 'text-mcrdse-rose' :
                          cust.riskDetails.score > 35 ? 'text-mcrdse-amber' : 'text-mcrdse-green'
                        }>
                          {cust.riskDetails.score}%
                        </span>
                      </td>
                      <td className="py-4 pr-3">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[9px] font-bold border ${cust.riskDetails.badgeColor}`}>
                          <RiskIcon className="w-3 h-3" />
                          {cust.riskDetails.riskLevel}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Selected Customer Risk Blueprint */}
        <div className="p-6 rounded-2xl bg-mcrdse-card border border-mcrdse-plum/15 shadow-sm space-y-6">
          <div className="border-b border-mcrdse-plum/10 pb-4">
            <h3 className="text-lg font-serif font-bold text-mcrdse-plum lowercase font-bold">Risk Diagnostics</h3>
            <p className="text-xs text-mcrdse-taupe mt-0.5">Deep telemetry for {selectedCustomer.name}</p>
          </div>

          <div className="space-y-5">
            {/* Risk Factor Bars */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-bold text-mcrdse-taupe uppercase tracking-wider font-mono">Risk Contribution Components</h4>
              
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-mcrdse-taupe">Recency Delay Rate</span>
                  <span className="text-mcrdse-plum font-bold">{selectedCustomer.riskDetails.metrics.components.recency}%</span>
                </div>
                <div className="h-2 bg-mcrdse-bg rounded-full overflow-hidden border border-mcrdse-plum/10">
                  <div 
                    className="h-full bg-mcrdse-plum rounded-full transition-all duration-500" 
                    style={{ width: `${selectedCustomer.riskDetails.metrics.components.recency}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-mcrdse-taupe">Purchase Retention Drop</span>
                  <span className="text-mcrdse-plum font-bold">{selectedCustomer.riskDetails.metrics.components.frequency}%</span>
                </div>
                <div className="h-2 bg-mcrdse-bg rounded-full overflow-hidden border border-mcrdse-plum/10">
                  <div 
                    className="h-full bg-mcrdse-taupe rounded-full transition-all duration-500" 
                    style={{ width: `${selectedCustomer.riskDetails.metrics.components.frequency}%` }}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-mcrdse-taupe">Journal Compliance Drop</span>
                  <span className="text-mcrdse-plum font-bold">{selectedCustomer.riskDetails.metrics.components.log}%</span>
                </div>
                <div className="h-2 bg-mcrdse-bg rounded-full overflow-hidden border border-mcrdse-plum/10">
                  <div 
                    className="h-full bg-mcrdse-violet rounded-full transition-all duration-500" 
                    style={{ width: `${selectedCustomer.riskDetails.metrics.components.log}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Calculations Explanation */}
            <div className="p-4 rounded-xl bg-mcrdse-bg border border-mcrdse-plum/10 space-y-2">
              <div className="flex items-center gap-2 text-xs font-bold text-mcrdse-plum">
                <Info className="w-4 h-4 text-mcrdse-violet" />
                Active Risk Computation
              </div>
              <p className="text-[10px] text-mcrdse-taupe leading-relaxed font-mono">
                ({selectedCustomer.riskDetails.metrics.components.recency}% &times; {recencyWeight}x recency + {selectedCustomer.riskDetails.metrics.components.frequency}% &times; {frequencyWeight}x frequency + {selectedCustomer.riskDetails.metrics.components.log}% &times; {logWeight}x logs) / {recencyWeight + frequencyWeight + logWeight} = <strong className="text-mcrdse-plum font-bold">{selectedCustomer.riskDetails.score}%</strong>.
              </p>
            </div>

            {/* Next best action */}
            {selectedCustomer.riskDetails.score > 35 ? (
              <button
                onClick={() => handleTriggerOutreach(selectedCustomer)}
                className="w-full mt-2 flex items-center justify-center gap-2 bg-mcrdse-violet hover:bg-mcrdse-violetHover text-white font-serif font-semibold text-xs py-3.5 px-4 rounded-full border border-mcrdse-plum/10 transition duration-200 hover:scale-[1.01] shadow-sm"
              >
                Draft Re-engagement Outreach
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <div className="p-4 rounded-xl border border-dashed border-mcrdse-plum/15 text-center text-xs text-mcrdse-taupe/60">
                Customer is in healthy loop. No intervention required.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
