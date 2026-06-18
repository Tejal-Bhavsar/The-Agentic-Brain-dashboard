import React, { useState, useEffect } from 'react';
import { Sparkles, Sliders, FileText, Send, Check, AlertCircle, Info, Brain, Edit3 } from 'lucide-react';

const VOICE_PRESETS = {
  philosophical: {
    name: "Philosophical & Warm",
    guidelines: `We do not sell supplements; we help people wake up. Our voice is vulnerable, grounded, and deeply human. We respect the ancient roots of the compound. Focus on the default mode network loops, neuroplasticity, and the integration process. Use warm, reflective metaphors. Avoid corporate BS.`,
    warmth: 85,
    directness: 40,
    scientific: 30,
    philosophy: 90
  },
  scientific: {
    name: "Direct & Scientific",
    guidelines: `Focus heavily on clinical data, neuroscience, and measurable cognitive optimization. Reference the Default Mode Network (DMN), neuroplasticity, BDNF levels, and synaptic connectivity. Keep sentences punchy, objective, and clear. Emphasize tracking and journaling compliance as a scientific methodology.`,
    warmth: 35,
    directness: 80,
    scientific: 95,
    philosophy: 40
  },
  visionary: {
    name: "Vulnerable & Visionary",
    guidelines: `Speak as a founder who has walked this exact path. Share micro-stories of waking up from deep-seated loops. The tone should feel like a late-night text from a close friend who happens to study neuroscience. Highly empathetic, vision-oriented, and encouraging of radical honesty.`,
    warmth: 95,
    directness: 50,
    scientific: 45,
    philosophy: 80
  }
};

const CONTEXTS = [
  { id: "welcome_onboarding", name: "Welcome & Intention Setup (Day 1)", description: "Greet new user, reinforce their Day 1 intentions." },
  { id: "dosage_difficulty", name: "Anxiety / Dose Support (Day 14 Check-in)", description: "Support customer reporting anxious reactions or high sensitivity." },
  { id: "journal_skip_warning", name: "Journal Log Skips (Day 45)", description: "Re-engage customer skipping integration logs." },
  { id: "churn_reengagement", name: "Refill Order Delay (Churn Risk)", description: "Empathetic reach out to customer who hasn't reordered." }
];

export default function VoiceOutreachAgent({ 
  customers, 
  selectedCustomerId, 
  onSelectCustomer, 
  onLogSystemAction 
}) {
  const [activePreset, setActivePreset] = useState("philosophical");
  const [customGuidelines, setCustomGuidelines] = useState(VOICE_PRESETS.philosophical.guidelines);
  
  const [warmth, setWarmth] = useState(VOICE_PRESETS.philosophical.warmth);
  const [directness, setDirectness] = useState(VOICE_PRESETS.philosophical.directness);
  const [scientific, setScientific] = useState(VOICE_PRESETS.philosophical.scientific);
  const [philosophy, setPhilosophy] = useState(VOICE_PRESETS.philosophical.philosophy);

  const [activeContextId, setActiveContextId] = useState("welcome_onboarding");
  const [activeTab, setActiveTab] = useState("output"); // "output" or "blueprint"
  const [isCopied, setIsCopied] = useState(false);
  const [isSent, setIsSent] = useState(false);

  // States for editable templates and drafts
  const [editedDraft, setEditedDraft] = useState("");
  const [userHasEditedDraft, setUserHasEditedDraft] = useState(false);
  
  // Prompt Blueprint template states (making prompts fully customizable)
  const [blueprintSystem, setBlueprintSystem] = useState("");
  const [blueprintFewShots, setBlueprintFewShots] = useState(
    `[Example 1] Direct/Scientific: "Hi Marcus, saw your log compliance dropped 30%. DMN suppression needs consistent dosing. Take 30s to submit this Week 4 review: [Link]"\n\n[Example 2] Philosophical/Warm: "Hey Elena, congrats on crossing Day 60. Taking a reflective pause between stacks is a powerful integration parameter. How is the quiet space feeling?"`
  );

  const selectedCustomer = customers.find(c => c.id === selectedCustomerId) || customers[0];

  // Dynamic copywriting engine simulating LLM generation based on active variables & custom templates
  const generateEmailDraft = (customSystemPrompt = null) => {
    const name = selectedCustomer.name.split(" ")[0];
    const avgInt = selectedCustomer.orderIntervalDays || 30;
    
    // Evaluate if user added custom notes in the edited System Prompt blueprint
    const systemInstructionSource = customSystemPrompt || blueprintSystem || customGuidelines;
    const hasDilutionInstruction = systemInstructionSource.toLowerCase().includes("dilution") || systemInstructionSource.toLowerCase().includes("diluting");
    const hasDmnInstruction = systemInstructionSource.toLowerCase().includes("dmn") || systemInstructionSource.toLowerCase().includes("default mode");
    
    // Core context components based on sliders
    let salutation = warmth > 60 ? `Hey ${name},` : `Hi ${name},`;
    if (warmth > 80) salutation = `Hey ${name} — hope you're holding up well.`;

    let intro = "";
    let body = "";
    let callToAction = "";
    let signOff = warmth > 70 ? `Rooted,\n\nFounder, MCRDSE` : `Best regards,\n\nFounder, MCRDSE`;

    // Adjust vocabulary based on science/philosophy parameters
    const neuroTerm = (scientific > 60 || hasDmnInstruction) ? "neuroplasticity and DMN (default mode network) suppression" : "quieting the mind's default loops";
    const brainTerm = scientific > 75 ? "synaptic consolidation and BDNF pathways" : "opening up new mental pathways";
    const pathTerm = philosophy > 65 ? "the ritual of self-integration" : "your daily focus routine";

    if (activeContextId === "welcome_onboarding") {
      intro = `I saw you just jumped into the MCRDSE lifecycle and set up your Intention. First off: welcome. It takes guts to actively decide to interrupt the old loops.`;
      
      body = `Looking at your notes, you mentioned wanting to focus on: "${selectedCustomer.weeklyCheckIns[0]?.notes || 'optimizing focus and stress response'}". That's a perfect starting point. The protocol you picked (${selectedCustomer.dosagePlan.split(" ")[0]}) is specifically formatted for this. `;
      
      if (scientific > 50) {
        body += `Biologically, we are targeting ${neuroTerm}. Think of these early days as clearing the path for new neural tracks.`;
      } else {
        body += `In these early weeks, try to notice the small shifts. It's not about a massive "trip" — it's about the subtle absence of the usual noise.`;
      }

      callToAction = `Have you set up your morning journal routine yet? Let me know how day 1 feels for you.`;
    } 
    
    else if (activeContextId === "dosage_difficulty") {
      intro = `I was auditing our integration dashboard and noticed your early logs mention feeling some anxiety or high sensitivity. I wanted to reach out personally.`;
      
      body = `It's incredibly common, especially during week 1 and 2. What you're experiencing is actually a form of ${neuroTerm}. When the default loops soften, some underlying noise can float to the surface. `;
      
      if (scientific > 60 || hasDilutionInstruction) {
        body += `We should optimize the titration. I'd highly recommend dropping your dose by 50% for the next two cycles to calibrate your baseline sensitivity.`;
      } else {
        body += `Don't rush it. This is a collaboration with your nervous system. I recommend diluting the dose by half for your next cycle. Just give your brain space to breathe.`;
      }

      callToAction = `Are you open to trying a smaller dose tomorrow? I'd love to monitor how you feel.`;
    } 
    
    else if (activeContextId === "journal_skip_warning") {
      const missed = selectedCustomer.weeklyCheckIns.filter(w => !w.completed).length;
      intro = `Reaching out because our integration advisor flagged that you've missed the last ${missed || 2} journal logs.`;
      
      body = `The compound is only half the equation. The real rewrite happens during the integration phase. Without documenting the intention, the brain easily defaults back into the old patterns you're trying to escape. `;
      
      if (philosophy > 50) {
        body += `This isn't about homework — it's about locking in the shifts in ${pathTerm}. If you fall out of the habit, the loops reclaim the space.`;
      } else {
        body += `Even a simple 2-sentence check-in helps us align your protocol. Let's make sure we're actually tracking the metrics.`;
      }

      callToAction = `Could you take 60 seconds to drop a quick rating on your last week? Here is your link.`;
    } 
    
    else if (activeContextId === "churn_reengagement") {
      const daysOver = Math.max(10, Math.floor((new Date("2026-06-17") - new Date(selectedCustomer.lastOrderDate)) / (1000 * 60 * 60 * 24)) - avgInt);
      
      intro = `I was looking over our customer dashboard. It's been about ${daysOver + avgInt} days since your last stack shipped, which means you've likely finished your supply.`;
      
      body = `Sometimes, people stop because they feel like they've got what they needed. Other times, it's just the default loop pulling them back into old routines before the changes fully crystallize. `;
      
      if (philosophy > 70) {
        body += `If you felt a shift, remember that establishing new baselines of ${brainTerm} takes sustained integration. I want to make sure you didn't just drift back into the old noise.`;
      } else {
        body += `If you're taking a structured integration break, that's perfect. But if you simply forgot to reorder, I wanted to check in.`;
      }

      callToAction = `How are you feeling off-cycle? Let me know if you want to set up your next integration cycle or discuss an alternative protocol.`;
    }

    // Apply Directness/Brevity filter
    if (directness > 75) {
      const sentences = `${intro} ${body} ${callToAction}`.split(". ");
      const shortBody = sentences.slice(0, 3).join(". ") + ".";
      return `${salutation}\n\n${shortBody}\n\n${signOff}`;
    }

    return `${salutation}\n\n${intro}\n\n${body}\n\n${callToAction}\n\n${signOff}`;
  };

  // Sync preset changes with Guidelines & Blueprint templates
  const handleApplyPreset = (key) => {
    setActivePreset(key);
    const preset = VOICE_PRESETS[key];
    setCustomGuidelines(preset.guidelines);
    setWarmth(preset.warmth);
    setDirectness(preset.directness);
    setScientific(preset.scientific);
    setPhilosophy(preset.philosophy);
    setUserHasEditedDraft(false);
  };

  // Update draft whenever key parameters change (unless user is in custom editor mode)
  useEffect(() => {
    if (!userHasEditedDraft) {
      setEditedDraft(generateEmailDraft());
    }
  }, [selectedCustomerId, activeContextId, customGuidelines, warmth, directness, scientific, philosophy]);

  // Sync changes in Guidelines with system prompt blueprint state
  useEffect(() => {
    setBlueprintSystem(
      `You are the agentic outreach brain for MCRDSE wellness, representing the voice of the founder.\nYour voice must adhere to these GUIDELINES:\n---\n${customGuidelines}\n---\nTone weights calibration:\n- Warmth/Vulnerability: ${warmth}/100\n- Brevity/Directness: ${directness}/100\n- Neuroscience Focus: ${scientific}/100\n- Introspective Philosophy: {philosophy}/100`
    );
  }, [customGuidelines, warmth, directness, scientific, philosophy]);

  const handleCopy = () => {
    navigator.clipboard.writeText(editedDraft);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleSendEmail = () => {
    setIsSent(true);
    onLogSystemAction(
      'outreach',
      `Outreach Dispatched (Founder Customized)`,
      `Context: ${activeContextId} | Sent to: ${selectedCustomer.name} (${selectedCustomer.email}). Custom tweaks applied.`
    );
    setTimeout(() => setIsSent(false), 2500);
  };

  const handleApplyBlueprintEdits = () => {
    // Regenerate email based on edited system prompt blueprint guidelines
    const newDraft = generateEmailDraft(blueprintSystem);
    setEditedDraft(newDraft);
    setUserHasEditedDraft(false);
    onLogSystemAction(
      'outreach',
      `System Prompt Custom Blueprint Applied`,
      `Re-ran voice generator with modified system instructions template.`
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-2">
        <div>
          <h1 className="text-2xl font-serif font-bold text-mcrdse-plum lowercase">founder outreach email agent</h1>
          <p className="text-mcrdse-taupe text-xs font-sans">Task 3: Design prompt architecture and voice filters that draft high-context, authentic email communications.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Control Column: Presets, Custom Guidelines, Tone Sliders */}
        <div className="space-y-6">
          {/* Custom Brand Voice Profiles */}
          <div className="p-6 rounded-2xl bg-mcrdse-card border border-mcrdse-plum/15 shadow-sm space-y-4">
            <h2 className="text-md font-serif font-bold text-mcrdse-plum lowercase">Founder Voice Calibrator</h2>
            
            {/* Presets */}
            <div className="flex flex-wrap gap-2">
              {Object.keys(VOICE_PRESETS).map((key) => (
                <button
                  key={key}
                  onClick={() => handleApplyPreset(key)}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-semibold border transition ${
                    activePreset === key 
                      ? 'bg-mcrdse-plum text-white border-mcrdse-plum' 
                      : 'bg-mcrdse-bg text-mcrdse-plum border-mcrdse-plum/15 hover:bg-mcrdse-sandDark'
                  }`}
                >
                  {VOICE_PRESETS[key].name}
                </button>
              ))}
            </div>

            {/* Custom Guidelines Input */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-mcrdse-taupe uppercase tracking-wider font-mono">Custom Guidelines & Philosophy</label>
              <textarea
                value={customGuidelines}
                onChange={(e) => {
                  setCustomGuidelines(e.target.value);
                  setActivePreset("");
                  setUserHasEditedDraft(false);
                }}
                rows={5}
                className="w-full p-3 bg-mcrdse-bg text-mcrdse-plum text-xs border border-mcrdse-plum/15 rounded-xl focus:border-mcrdse-plum/30 outline-none resize-none font-sans leading-relaxed"
                placeholder="Describe tone constraints, styling restrictions, and philosophy..."
              />
            </div>

            {/* Tone Sliders */}
            <div className="space-y-3 pt-2">
              <h3 className="text-[10px] font-bold text-mcrdse-taupe uppercase tracking-wider font-mono">Interactive Tone Amplifiers</h3>
              
              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-mcrdse-taupe text-[11px]">Warmth & Vulnerability</span>
                  <span className="text-mcrdse-plum font-bold">{warmth}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={warmth} onChange={(e) => {setWarmth(Number(e.target.value)); setActivePreset(""); setUserHasEditedDraft(false);}}
                  className="w-full h-1 bg-mcrdse-bg accent-mcrdse-plum rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-mcrdse-taupe text-[11px]">Brevity & Directness</span>
                  <span className="text-mcrdse-plum font-bold">{directness}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={directness} onChange={(e) => {setDirectness(Number(e.target.value)); setActivePreset(""); setUserHasEditedDraft(false);}}
                  className="w-full h-1 bg-mcrdse-bg accent-mcrdse-plum rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-mcrdse-taupe text-[11px]">Scientific Neuro-Focus</span>
                  <span className="text-mcrdse-plum font-bold">{scientific}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={scientific} onChange={(e) => {setScientific(Number(e.target.value)); setActivePreset(""); setUserHasEditedDraft(false);}}
                  className="w-full h-1 bg-mcrdse-bg accent-mcrdse-plum rounded-lg appearance-none cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-mcrdse-taupe text-[11px]">Introspective Philosophy</span>
                  <span className="text-mcrdse-plum font-bold">{philosophy}%</span>
                </div>
                <input 
                  type="range" min="0" max="100" value={philosophy} onChange={(e) => {setPhilosophy(Number(e.target.value)); setActivePreset(""); setUserHasEditedDraft(false);}}
                  className="w-full h-1 bg-mcrdse-bg accent-mcrdse-plum rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Center & Right Column: Context selection & Output/Blueprint Tabs */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Target Customer & Context selectors */}
          <div className="p-6 rounded-2xl bg-mcrdse-card border border-mcrdse-plum/15 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-mcrdse-taupe uppercase tracking-wider font-mono">Target Client</label>
                <select
                  value={selectedCustomerId}
                  onChange={(e) => {
                    onSelectCustomer(e.target.value);
                    setUserHasEditedDraft(false);
                  }}
                  className="w-full p-3 bg-mcrdse-bg border border-mcrdse-plum/15 rounded-xl focus:border-mcrdse-plum/30 outline-none text-xs text-mcrdse-plum font-semibold"
                >
                  {customers.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} (Day {c.nurtureDay} - {c.nurtureStage.split(" ")[0]})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-mcrdse-taupe uppercase tracking-wider font-mono">Outreach Scenario</label>
                <select
                  value={activeContextId}
                  onChange={(e) => {
                    setActiveContextId(e.target.value);
                    setUserHasEditedDraft(false);
                  }}
                  className="w-full p-3 bg-mcrdse-bg border border-mcrdse-plum/15 rounded-xl focus:border-mcrdse-plum/30 outline-none text-xs text-mcrdse-plum font-semibold"
                >
                  {CONTEXTS.map((ctx) => (
                    <option key={ctx.id} value={ctx.id}>
                      {ctx.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            <p className="text-[10px] text-mcrdse-taupe mt-3 font-mono">
              Scenario Description: {CONTEXTS.find(c => c.id === activeContextId)?.description}
            </p>
          </div>

          {/* Interactive Output Playground */}
          <div className="p-6 rounded-2xl bg-mcrdse-card border border-mcrdse-plum/15 shadow-sm flex flex-col min-h-[350px]">
            {/* Tabs selector */}
            <div className="flex justify-between items-center border-b border-mcrdse-plum/10 pb-4 mb-4">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab("output")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                    activeTab === "output" 
                      ? 'bg-mcrdse-plum text-white' 
                      : 'text-mcrdse-taupe hover:text-mcrdse-plum'
                  }`}
                >
                  Drafted Letter
                </button>
                <button
                  onClick={() => setActiveTab("blueprint")}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                    activeTab === "blueprint" 
                      ? 'bg-mcrdse-plum text-white' 
                      : 'text-mcrdse-taupe hover:text-mcrdse-plum'
                  }`}
                >
                  <Brain className="w-3.5 h-3.5" /> Prompt Blueprint
                </button>
              </div>
              
              {activeTab === "output" ? (
                <div className="flex gap-2">
                  <button
                    onClick={handleCopy}
                    className="px-3.5 py-2 bg-mcrdse-bg hover:bg-mcrdse-sandDark border border-mcrdse-plum/15 text-mcrdse-plum rounded-full text-xs font-semibold transition flex items-center gap-1.5"
                  >
                    {isCopied ? <Check className="w-3.5 h-3.5 text-mcrdse-green" /> : <FileText className="w-3.5 h-3.5" />}
                    {isCopied ? "Copied!" : "Copy Letter"}
                  </button>
                  <button
                    onClick={handleSendEmail}
                    disabled={isSent}
                    className={`px-4 py-2 rounded-full text-xs font-serif font-bold transition flex items-center gap-1.5 ${
                      isSent 
                        ? 'bg-mcrdse-green/10 text-mcrdse-green border border-mcrdse-green/20' 
                        : 'bg-mcrdse-violet hover:bg-mcrdse-violetHover text-white'
                    }`}
                  >
                    {isSent ? <Check className="w-3.5 h-3.5" /> : <Send className="w-3.5 h-3.5" />}
                    {isSent ? "Sent to Pipeline!" : "Send Letter"}
                  </button>
                </div>
              ) : (
                <button
                  onClick={handleApplyBlueprintEdits}
                  className="px-4 py-2 bg-mcrdse-plum hover:bg-[#2c0c2c] text-white rounded-full text-xs font-semibold font-serif transition flex items-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5" /> Apply & Regenerate Draft
                </button>
              )}
            </div>

            {/* Tab Content */}
            <div className="flex-1 flex flex-col justify-between">
              {activeTab === "output" ? (
                <div className="space-y-4">
                  {/* Email Headers */}
                  <div className="bg-mcrdse-bg p-4 border border-mcrdse-plum/10 rounded-xl space-y-1.5 font-mono text-[10px] text-mcrdse-taupe">
                    <div><strong>To:</strong> {selectedCustomer.name} &lt;{selectedCustomer.email}&gt;</div>
                    <div><strong>From:</strong> Founder @ MCRDSE &lt;founder@mcrdse.com&gt;</div>
                    <div><strong>Subject:</strong> {
                      activeContextId === 'welcome_onboarding' ? 'Welcome to your MCRDSE integration lifecycle' :
                      activeContextId === 'dosage_difficulty' ? 'Dose adjustment check-in' :
                      activeContextId === 'journal_skip_warning' ? 'Missing connection check-in' :
                      'Your MCRDSE routine / off-cycle check'
                    }</div>
                  </div>

                  {/* Email Body - NOW A FULLY EDITABLE TEXTAREA */}
                  <div className="relative">
                    <textarea
                      value={editedDraft}
                      onChange={(e) => {
                        setEditedDraft(e.target.value);
                        setUserHasEditedDraft(true);
                      }}
                      rows={10}
                      className="w-full p-6 rounded-xl bg-mcrdse-bg/40 border border-mcrdse-plum/15 text-mcrdse-plum font-serif text-sm leading-relaxed tracking-wide focus:bg-white focus:border-mcrdse-plum outline-none resize-y"
                    />
                    <div className="absolute right-4 bottom-4 flex items-center gap-1 text-[9px] font-mono text-mcrdse-taupe bg-mcrdse-bg px-2.5 py-1 rounded border border-mcrdse-plum/10 select-none pointer-events-none">
                      <Edit3 className="w-2.5 h-2.5 text-mcrdse-violet" />
                      <span>Editable Draft Mode</span>
                    </div>
                  </div>
                  
                  {userHasEditedDraft && (
                    <div className="flex justify-end">
                      <button
                        onClick={() => {
                          setEditedDraft(generateEmailDraft());
                          setUserHasEditedDraft(false);
                        }}
                        className="text-[10px] font-mono text-mcrdse-rose underline hover:text-red-700"
                      >
                        Reset to generated draft template
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-4 text-[11px] font-mono text-mcrdse-taupe leading-relaxed">
                  <div>
                    <h4 className="text-[9px] font-bold text-mcrdse-taupe uppercase tracking-wider mb-1">Interactive Prompt Blueprint Editor:</h4>
                    <p className="text-mcrdse-taupe font-sans text-xs leading-relaxed mb-4">
                      Tweak the core instructions or mock examples below and click **Apply & Regenerate** to test prompt calibration instantly.
                    </p>
                  </div>
                  
                  <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-mcrdse-plum font-bold">{"{"}SYSTEM_PROMPT_TEMPLATE{"}"}</span>
                        <span className="text-[9px] text-mcrdse-taupe/80">(Editable System Instructions)</span>
                      </div>
                      <textarea
                        value={blueprintSystem}
                        onChange={(e) => setBlueprintSystem(e.target.value)}
                        rows={6}
                        className="w-full p-3 bg-mcrdse-bg text-mcrdse-plum border border-mcrdse-plum/15 rounded-xl font-mono text-xs focus:bg-white outline-none resize-y"
                      />
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-mcrdse-violet font-bold">{"{"}CUSTOMER_METADATA_VARIABLES{"}"}</span>
                        <span className="text-[9px] text-mcrdse-taupe/80">(Injected dynamically from telemetry)</span>
                      </div>
                      <pre className="p-3 bg-mcrdse-bg/40 text-mcrdse-taupe border border-mcrdse-plum/10 rounded-xl font-mono text-[10px] overflow-x-auto whitespace-pre">
{`Customer Name: ${selectedCustomer.name}
Start Date: ${selectedCustomer.startDate}
Nurture Day: ${selectedCustomer.nurtureDay}
Dosage Plan: ${selectedCustomer.dosagePlan}
Last Order Date: ${selectedCustomer.lastOrderDate}`}
                      </pre>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-mcrdse-plum font-bold">{"{"}FEW_SHOT_EXAMPLES{"}"}</span>
                        <span className="text-[9px] text-mcrdse-taupe/80">(Editable Few-Shot Injections)</span>
                      </div>
                      <textarea
                        value={blueprintFewShots}
                        onChange={(e) => setBlueprintFewShots(e.target.value)}
                        rows={4}
                        className="w-full p-3 bg-mcrdse-bg text-mcrdse-plum border border-mcrdse-plum/15 rounded-xl font-mono text-xs focus:bg-white outline-none resize-y"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 items-start p-3.5 bg-mcrdse-bg border border-mcrdse-plum/10 rounded-xl mt-4">
                    <Info className="w-4 h-4 text-mcrdse-violet shrink-0 mt-0.5" />
                    <span className="text-[10px] text-mcrdse-taupe font-sans">Modifying templates calibrates how the LLM translates weights into phrasing. Perfect for testing before deploying to outreach channels.</span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
