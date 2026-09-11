import type { IconType } from "react-icons";
import { BsGrid3X3GapFill, BsGlobe2, BsCpu } from "react-icons/bs";

export interface ThesisTopic {
  icon: IconType;
  listLabel: string;
  cardLabel: string;
  heading: string;
  preview: string;
  rest: string;
}

// Single source of truth for the thesis topics — used by both the Home
// page teaser (Thesis.tsx) and the full /our-thesis page.
export const thesisTopics: ThesisTopic[] = [
  {
    icon: BsGrid3X3GapFill,
    listLabel: "Every call has intent",
    cardLabel: "Understanding Beats Answering",
    heading: "Every Call Has Intent",
    preview:
      "Most clinics treat every incoming call the same way — pick up, write it down, hope someone follows up. But a call asking to reschedule carries different urgency than one reporting a missed dose.",
    rest: "We think an AI receptionist earns its place only if it can tell these apart in the caller's own language, and act differently depending on what it hears — booking one caller in, escalating another, and quietly logging a third for a callback. That's the bar we build to, call after call.",
  },
  {
    icon: BsGlobe2,
    listLabel: "Multilingual is non-negotiable",
    cardLabel: "Language Is Infrastructure",
    heading: "Multilingual Is Non-Negotiable",
    preview:
      "Voice AI trained primarily on English text handles Assamese, Bengali, and Hindi callers as an afterthought — a translation layer bolted on top, not a first-class capability.",
    rest: "For the hospitals we work with, that ordering is backwards: the overwhelming majority of patients call in their own language, often switching mid-sentence between two. A receptionist that can't follow that isn't one a clinic can actually deploy at its front desk.",
  },
  {
    icon: BsCpu,
    listLabel: "Small models, real hospitals",
    cardLabel: "Built To Run, Not Just Demo",
    heading: "Small Models, Real Hospitals",
    preview:
      "It's easy to build an impressive voice demo. It's much harder to build one that keeps working at 8am on a Monday, on a landline in Silchar, with call quality that would break most cloud pipelines.",
    rest: "We optimize for latency and reliability on real phone infrastructure first, and impressiveness second — because a hospital front desk doesn't get to tell a patient to call back when the network is being difficult.",
  },
];
