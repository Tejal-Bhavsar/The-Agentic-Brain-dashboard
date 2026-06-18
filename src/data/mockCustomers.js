export const mockCustomers = [
  {
    id: "cust-01",
    name: "Alex Mercer",
    email: "alex.mercer@gmail.com",
    phone: "+1 (555) 234-5678",
    startDate: "2026-06-12",
    daysActive: 5,
    nurtureStage: "Onboarding (Day 1-14)",
    nurtureDay: 5,
    dosagePlan: "Fadiman Protocol (1 day on, 2 days off)",
    lastOrderDate: "2026-06-12",
    orderIntervalDays: 30,
    orderHistory: [
      { id: "ord-101", date: "2026-06-12", amount: 89.00, product: "MCRDSE Focus Starter Kit (30-day)" }
    ],
    weeklyCheckIns: [
      { week: 1, completed: true, rating: 8, notes: "Setting intention to reduce caffeine intake and improve micro-focus. Felt a clean wave of presence on Day 1. No jitters.", date: "2026-06-14" }
    ],
    founderNotes: "Onboarding call completed. Alex is a senior software architect experiencing moderate burnout. Responding well to the mindfulness integration tips."
  },
  {
    id: "cust-02",
    name: "Sophia Chen",
    email: "sophia.chen@designhub.co",
    phone: "+1 (555) 876-5432",
    startDate: "2026-05-28",
    daysActive: 20,
    nurtureStage: "Early Integration (Day 15-30)",
    nurtureDay: 20,
    dosagePlan: "Stamets Stack (4 days on, 3 days off)",
    lastOrderDate: "2026-05-28",
    orderIntervalDays: 30,
    orderHistory: [
      { id: "ord-102", date: "2026-05-28", amount: 110.00, product: "MCRDSE Flow Stack + Adaptogen Bundle" }
    ],
    weeklyCheckIns: [
      { week: 1, completed: true, rating: 7, notes: "Adjusting to the 4/3 schedule. Feeling slightly more creative in the afternoons. Slept deeply.", date: "2026-06-03" },
      { week: 2, completed: true, rating: 9, notes: "Breakthrough week. Noticing that my default reactive loop (checking email constantly) has quieted down. Design workflows are flowing.", date: "2026-06-10" }
    ],
    founderNotes: "Sent a quick voice note congratulating her on the week 2 breakthrough. She loves the journaling prompts."
  },
  {
    id: "cust-03",
    name: "Marcus Vance",
    email: "marcus.v@venturegrowth.vc",
    phone: "+1 (555) 345-6789",
    startDate: "2026-05-03",
    daysActive: 45,
    nurtureStage: "Active Nurture (Day 31-60)",
    nurtureDay: 45,
    dosagePlan: "Fadiman Protocol (1 day on, 2 days off)",
    lastOrderDate: "2026-06-02",
    orderIntervalDays: 30,
    orderHistory: [
      { id: "ord-103", date: "2026-05-03", amount: 89.00, product: "MCRDSE Focus Starter Kit (30-day)" },
      { id: "ord-104", date: "2026-06-02", amount: 79.00, product: "MCRDSE Focus Refill Pack (30-day)" }
    ],
    weeklyCheckIns: [
      { week: 1, completed: true, rating: 6, notes: "Subtle effects. A bit of headache on day 1, solved by drinking more water.", date: "2026-05-10" },
      { week: 2, completed: true, rating: 7, notes: "Improved emotional resilience during a tough pitch week.", date: "2026-05-17" },
      { week: 3, completed: true, rating: 8, notes: "Noticing that I don't snap at small disruptions anymore. Loving the Fadiman pace.", date: "2026-05-24" },
      { week: 4, completed: true, rating: 8, notes: "Month 1 complete. Feeling a sustained shift in baseline stress.", date: "2026-05-31" },
      { week: 5, completed: false, rating: 0, notes: "No check-in submitted.", date: "2026-06-07" },
      { week: 6, completed: false, rating: 0, notes: "No check-in submitted.", date: "2026-06-14" }
    ],
    founderNotes: "Marcus missed the last two integration journal logs, though his second order shipped on time. Churn risk calculations should monitor this drop in engagement."
  },
  {
    id: "cust-04",
    name: "Elena Rostova",
    email: "elena.r@mindbodyflow.org",
    phone: "+1 (555) 901-2345",
    startDate: "2026-04-18",
    daysActive: 60,
    nurtureStage: "Reflection & Shift (Day 61-90)",
    nurtureDay: 60,
    dosagePlan: "Intuitive Microdosing (As needed, max 2x week)",
    lastOrderDate: "2026-05-18",
    orderIntervalDays: 30,
    orderHistory: [
      { id: "ord-105", date: "2026-04-18", amount: 129.00, product: "MCRDSE Clarity Premium Stack" },
      { id: "ord-106", date: "2026-05-18", amount: 119.00, product: "MCRDSE Clarity Refill Stack" }
    ],
    weeklyCheckIns: [
      { week: 1, completed: true, rating: 9, notes: "Immensely helpful. Using it for deep introspection sessions during yoga and weekend nature walks.", date: "2026-04-25" },
      { week: 2, completed: true, rating: 9, notes: "Sense of interconnectedness has amplified. Very clean formulation.", date: "2026-05-02" },
      { week: 3, completed: true, rating: 8, notes: "Reducing dosage frequency. The compound has helped rewrite my relationship with anxiety.", date: "2026-05-09" },
      { week: 4, completed: true, rating: 10, notes: "6-week check-in. Solid. Ordering refill today.", date: "2026-05-16" },
      { week: 5, completed: true, rating: 8, notes: "Transitioning to intuitive dosing. Only microdosing when preparing for heavy emotional workshops.", date: "2026-05-23" },
      { week: 6, completed: true, rating: 9, notes: "Feeling stable. Integrating the microdosing lessons into my sober meditation routines.", date: "2026-06-01" },
      { week: 7, completed: true, rating: 9, notes: "Very happy. Sharing the MCRDSE journey with my yoga clients.", date: "2026-06-08" },
      { week: 8, completed: true, rating: 9, notes: "Day 60 evaluation. Ready for the next phase.", date: "2026-06-15" }
    ],
    founderNotes: "Elena is a model customer. She runs yoga workshops and is microdosing with clear ritual parameters. Her next order is due now."
  },
  {
    id: "cust-05",
    name: "Dr. David Kael",
    email: "dkael@neuroscience-labs.org",
    phone: "+1 (555) 789-0123",
    startDate: "2026-02-10",
    daysActive: 127,
    nurtureStage: "Graduated (Day 90+)",
    nurtureDay: 127,
    dosagePlan: "Fadiman Protocol (1 day on, 2 days off)",
    lastOrderDate: "2026-06-09",
    orderIntervalDays: 30,
    orderHistory: [
      { id: "ord-107", date: "2026-02-10", amount: 89.00, product: "MCRDSE Focus Starter Kit" },
      { id: "ord-108", date: "2026-03-12", amount: 79.00, product: "MCRDSE Focus Refill" },
      { id: "ord-109", date: "2026-04-10", amount: 79.00, product: "MCRDSE Focus Refill" },
      { id: "ord-110", date: "2026-05-10", amount: 79.00, product: "MCRDSE Focus Refill" },
      { id: "ord-111", date: "2026-06-09", amount: 79.00, product: "MCRDSE Focus Refill" }
    ],
    weeklyCheckIns: [
      { week: 1, completed: true, rating: 8, date: "2026-02-17" },
      { week: 2, completed: true, rating: 8, date: "2026-02-24" },
      { week: 4, completed: true, rating: 9, date: "2026-03-10" },
      { week: 8, completed: true, rating: 9, date: "2026-04-07" },
      { week: 12, completed: true, rating: 10, date: "2026-05-05" }
    ],
    founderNotes: "Clinical researcher trying microdosing for personal longevity. Extremely stable order frequency. Graduated from the standard 90-day sequence. Subscribed to our monthly Integration Research Digest."
  },
  {
    id: "cust-06",
    name: "Tariq Mahmood",
    email: "tariq.m@pixelsandcode.io",
    phone: "+1 (555) 456-7890",
    startDate: "2026-03-15",
    daysActive: 94,
    nurtureStage: "At Risk (Day 90+)",
    nurtureDay: 94,
    dosagePlan: "Stamets Stack (4 days on, 3 days off)",
    lastOrderDate: "2026-04-15",
    orderIntervalDays: 30,
    orderHistory: [
      { id: "ord-112", date: "2026-03-15", amount: 89.00, product: "MCRDSE Focus Starter Kit" },
      { id: "ord-113", date: "2026-04-15", amount: 79.00, product: "MCRDSE Focus Refill" }
    ],
    weeklyCheckIns: [
      { week: 1, completed: true, rating: 7, notes: "Felt higher sensory clarity.", date: "2026-03-22" },
      { week: 2, completed: true, rating: 8, notes: "Flow state triggered easier during coding sessions.", date: "2026-03-29" },
      { week: 3, completed: true, rating: 7, notes: "Slight fatigue on off-days, taking hydration seriously.", date: "2026-04-05" },
      { week: 4, completed: false, rating: 0, notes: "", date: "2026-04-12" },
      { week: 5, completed: false, rating: 0, date: "2026-04-19" },
      { week: 6, completed: false, rating: 0, date: "2026-04-26" }
    ],
    founderNotes: "CRITICAL CHURN RISK. Last ordered April 15 (over 60 days ago). Completely stopped submitting logs. Likely discontinued because he fell out of the habit or had unmet expectations. Needs founder-led, empathetic re-engagement."
  },
  {
    id: "cust-07",
    name: "Sarah Jenkins",
    email: "sjenkins@wellnessgroup.com",
    phone: "+1 (555) 678-9012",
    startDate: "2026-04-01",
    daysActive: 77,
    nurtureStage: "Critical Churn Warning (Day 61-90)",
    nurtureDay: 77,
    dosagePlan: "Fadiman Protocol (1 day on, 2 days off)",
    lastOrderDate: "2026-04-01",
    orderIntervalDays: 30,
    orderHistory: [
      { id: "ord-114", date: "2026-04-01", amount: 110.00, product: "MCRDSE Flow Stack + Adaptogen Bundle" }
    ],
    weeklyCheckIns: [
      { week: 1, completed: true, rating: 5, notes: "Felt very sensitive, maybe dosage is too high? Feeling a bit anxious.", date: "2026-04-08" },
      { week: 2, completed: false, rating: 0, notes: "", date: "2026-04-15" }
    ],
    founderNotes: "Sarah had an anxious reaction in week 1. She never logged again and has not ordered since April 1st. High probability she abandoned the protocol due to a bad first experience that wasn't integration-supported in time. Needs support call."
  }
];
