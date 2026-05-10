import type { MediaScene } from "@/lib/types";

export interface ScrollMediaClip {
  id: string;
  title: string;
  description: string;
  videoSrc: string;
  posterSrc: string;
}

export interface RouteMediaStory {
  title: string;
  intro: string;
  clips: ScrollMediaClip[];
  scenes: MediaScene[];
}

type RawRouteMediaStory = Omit<RouteMediaStory, "scenes"> & {
  scenes?: MediaScene[];
};

type RouteSceneTemplate = Array<{ title: string; description: string }>;

function resolveStaticBasePath() {
  const envBasePath = process.env.NEXT_PUBLIC_BASE_PATH?.trim();
  if (envBasePath) {
    return envBasePath === "/" ? "" : envBasePath.replace(/\/$/, "");
  }

  const isGithubActions = process.env.GITHUB_ACTIONS === "true";
  const repo = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
  const isUserOrOrgPagesRepo = repo.endsWith(".github.io");

  if (!isGithubActions || !repo || isUserOrOrgPagesRepo) {
    return "";
  }

  return `/${repo}`;
}

const staticBasePath = resolveStaticBasePath();

function withBasePath(path: string) {
  if (!path.startsWith("/") || !staticBasePath) {
    return path;
  }

  if (path === staticBasePath || path.startsWith(`${staticBasePath}/`)) {
    return path;
  }

  return `${staticBasePath}${path}`;
}

function applyBasePathToStory(story: RawRouteMediaStory): RawRouteMediaStory {
  if (!staticBasePath) {
    return story;
  }

  return {
    ...story,
    clips: story.clips.map((clip) => ({
      ...clip,
      videoSrc: withBasePath(clip.videoSrc),
      posterSrc: withBasePath(clip.posterSrc),
    })),
  };
}

const routePhaseCounts: Record<string, number> = {
  "/counts": 5,
  "/surveys": 5,
  "/studies": 7,
  "/counts/intersection-turning-movement-counts": 4,
  "/counts/atr-volume-classification-loop-detector-and-road-tube-counts": 4,
  "/counts/pedestrian-counts": 4,
  "/surveys/license-plate-survey": 4,
  "/surveys/parking-occupancy-survey": 4,
  "/surveys/vehicle-occupancy-surveys": 4,
  "/ball-bank-study": 4,
  "/cordon-counts": 4,
  "/delay-studies": 4,
  "/gap-study": 4,
  "/gps-travel-runs": 4,
  "/radar-speed-studies": 4,
  "/travel-time-studies": 4,
  "/customized-data-collection": 4,
  "/contact-us": 4,
};

const routeSceneTemplates: Record<string, RouteSceneTemplate> = {
  "/counts": [
    {
      title: "Network context setup",
      description: "Frame the intersection and corridor locations that define the count boundary.",
    },
    {
      title: "Directional volume capture",
      description: "Observe directional demand and turning intensity through active peak windows.",
    },
    {
      title: "QA-cleared count outputs",
      description: "Release validated count tables and summaries ready for planning analysis.",
    },
  ],
  "/counts/intersection-turning-movement-counts": [
    {
      title: "Approach and lane framing",
      description: "Confirm lane groups, approaches, and modal tags before observation starts.",
    },
    {
      title: "Turning movement window",
      description: "Capture left, through, and right-turn behavior by interval and direction.",
    },
    {
      title: "Movement table validation",
      description: "Run QA checks and package the final turning movement tabulations.",
    },
  ],
  "/counts/atr-volume-classification-loop-detector-and-road-tube-counts": [
    {
      title: "Sensor placement context",
      description: "Position road tubes or loops where classification and speed capture will be stable.",
    },
    {
      title: "Continuous stream capture",
      description: "Record multi-hour or multi-day flow for volume, class, and speed analysis.",
    },
    {
      title: "Interval output review",
      description: "Deliver cleaned interval summaries with class schema and speed metrics.",
    },
  ],
  "/counts/pedestrian-counts": [
    {
      title: "Crossing point setup",
      description: "Define crossings, paths, and observation points in the public realm.",
    },
    {
      title: "Pedestrian peak capture",
      description: "Track route preference and crossing volumes across target peak periods.",
    },
    {
      title: "Movement distribution summary",
      description: "Publish interval volumes and directional movement breakdowns for design decisions.",
    },
  ],
  "/surveys": [
    {
      title: "Decision framing",
      description: "Tie the survey method to the planning question that needs to be answered.",
    },
    {
      title: "Behavior evidence window",
      description: "Collect route, utilization, or occupancy behavior in representative conditions.",
    },
    {
      title: "Planning interpretation",
      description: "Translate survey observations into decision-ready evidence for stakeholders.",
    },
  ],
  "/surveys/license-plate-survey": [
    {
      title: "Checkpoint network setup",
      description: "Place capture points to support robust origin-destination path matching.",
    },
    {
      title: "Timestamped plate matching",
      description: "Match observations across stations to infer route choice and trip patterns.",
    },
    {
      title: "OD matrix outputs",
      description: "Deliver match-rate and OD summaries aligned to corridor analysis needs.",
    },
  ],
  "/surveys/parking-occupancy-survey": [
    {
      title: "Zone inventory framing",
      description: "Define curb, lot, and structure zones included in the occupancy program.",
    },
    {
      title: "Occupancy and turnover tracking",
      description: "Measure utilization pressure and turnover patterns by time window.",
    },
    {
      title: "Demand imbalance reporting",
      description: "Highlight peak stress periods and zone-level utilization differences.",
    },
  ],
  "/surveys/vehicle-occupancy-surveys": [
    {
      title: "Observation rule setup",
      description: "Set class definitions, vantage points, and interval structure for occupant capture.",
    },
    {
      title: "Occupant sampling window",
      description: "Capture person-per-vehicle behavior by direction and period.",
    },
    {
      title: "Person-throughput baseline",
      description: "Return occupancy rate tables for demand management evaluation.",
    },
  ],
  "/studies": [
    {
      title: "Study hypothesis framing",
      description: "Define the operational question and the field evidence needed to answer it.",
    },
    {
      title: "Diagnostic observation window",
      description: "Measure behavior that explains delay, safety, speed, or reliability outcomes.",
    },
    {
      title: "Evidence-led recommendations",
      description: "Deliver study findings in a format ready for technical decisions.",
    },
  ],
  "/ball-bank-study": [
    {
      title: "Curve test setup",
      description: "Select roadway segments and operating conditions for ball bank runs.",
    },
    {
      title: "Lateral comfort measurement",
      description: "Observe banking response across varied speeds to identify stability thresholds.",
    },
    {
      title: "Advisory guidance output",
      description: "Summarize safe operating ranges and supporting technical notes.",
    },
  ],
  "/cordon-counts": [
    {
      title: "Boundary screenline setup",
      description: "Establish the cordon perimeter and crossing points around the study zone.",
    },
    {
      title: "Inbound and outbound capture",
      description: "Measure directional boundary crossings through target observation periods.",
    },
    {
      title: "Zone demand profile",
      description: "Package area-level demand outputs for planning and access analysis.",
    },
  ],
  "/delay-studies": [
    {
      title: "Friction point selection",
      description: "Identify intersections and segments with recurring slowdown patterns.",
    },
    {
      title: "Delay and queue tracking",
      description: "Measure stopped time, queue persistence, and period-specific congestion behavior.",
    },
    {
      title: "Hotspot ranking outputs",
      description: "Return comparable delay evidence to prioritize intervention strategies.",
    },
  ],
  "/gap-study": [
    {
      title: "Conflict point setup",
      description: "Define the crossing or access movements where usable gaps are assessed.",
    },
    {
      title: "Acceptable interval capture",
      description: "Measure temporal gaps across peak and off-peak traffic streams.",
    },
    {
      title: "Control strategy support",
      description: "Summarize gap distributions for crossing and intersection decisions.",
    },
  ],
  "/gps-travel-runs": [
    {
      title: "Route run planning",
      description: "Define repeat run structure and segment checkpoints across the corridor.",
    },
    {
      title: "High-resolution trace capture",
      description: "Record route timing and speed behavior at detailed temporal resolution.",
    },
    {
      title: "Reliability comparison output",
      description: "Deliver variability and consistency metrics across periods and runs.",
    },
  ],
  "/radar-speed-studies": [
    {
      title: "Radar station setup",
      description: "Place calibrated radar equipment at locations matched to study goals.",
    },
    {
      title: "Speed distribution window",
      description: "Capture prevailing speeds and directional variation across selected periods.",
    },
    {
      title: "Percentile speed summary",
      description: "Publish percentile and distribution outputs for technical review.",
    },
  ],
  "/travel-time-studies": [
    {
      title: "Route definition setup",
      description: "Confirm origin-destination paths and segment checkpoints for timing analysis.",
    },
    {
      title: "Multi-run time capture",
      description: "Track repeated corridor runs to measure period-specific performance.",
    },
    {
      title: "Bottleneck reliability output",
      description: "Return travel-time and segment delay evidence for corridor decisions.",
    },
  ],
  "/customized-data-collection": [
    {
      title: "Constraint intake",
      description: "Map project objectives, access limits, and timeline constraints.",
    },
    {
      title: "Method blend design",
      description: "Compose counts, surveys, and studies into one coordinated program.",
    },
    {
      title: "Scope-aligned delivery",
      description: "Package outputs and QA notes around the exact project requirements.",
    },
  ],
  "/contact-us": [
    {
      title: "Project context framing",
      description: "Capture location, schedule, and objective details for scoping.",
    },
    {
      title: "Method and schedule alignment",
      description: "Match the right collection approach to constraints and deliverables.",
    },
    {
      title: "Practical quote pathway",
      description: "Move from intake details to a clear project plan and quote.",
    },
  ],
};

const routeMediaStories: Record<string, RawRouteMediaStory> = {
  "/": {
    title: "How Better Transportation Decisions Get Made",
    intro:
      "Reliable transportation planning is built through a practical sequence: clarify the objective, read corridor behavior, measure operations in the field, test variability, and deliver evidence that can be acted on.",
    clips: [
      {
        id: "route-506",
        title: "Define the decision scope",
        description:
          "You define the decision to be made, and our team aligns scope, locations, timing windows, and confidence requirements before collection begins.",
        videoSrc: "/media/videos/route-506.mp4",
        posterSrc: "/media/posters/route-506.jpg",
      },
      {
        id: "mixkit-2032",
        title: "Read corridor conditions",
        description:
          "Geometry, access, and control context are reviewed so you can see where pressure forms and where short disruptions propagate across the corridor.",
        videoSrc: "/media/videos/mixkit-2032.mp4",
        posterSrc: "/media/posters/mixkit-2032.jpg",
      },
      {
        id: "highway-pov",
        title: "Observe live operations",
        description:
          "Turning patterns, lane use, merge behavior, and queue dynamics are captured during representative periods so your analysis reflects real operations.",
        videoSrc: "/media/videos/highway-pov.mp4",
        posterSrc: "/media/posters/highway-pov.jpg",
      },
      {
        id: "highway-fog",
        title: "Validate variability",
        description:
          "Peak, off-peak, weather, and day-to-day variation are tested so you can separate persistent issues from one-off effects.",
        videoSrc: "/media/videos/highway-fog.mp4",
        posterSrc: "/media/posters/highway-fog.jpg",
      },
      {
        id: "route-56",
        title: "Deliver actionable recommendations",
        description:
          "Evidence is translated into concise findings and tradeoffs, and you receive implementation-ready guidance for planning, design, and approvals.",
        videoSrc: "/media/videos/route-56.mp4",
        posterSrc: "/media/posters/route-56.jpg",
      },
    ],
    scenes: [
      {
        id: "home-step-01",
        title: "Define the question",
        description: "You define project boundaries and success criteria, and our team confirms the required scope and locations.",
        clipIndex: 0,
        start: 0.08,
        end: 0.78,
        ornamentState: "origin",
      },
      {
        id: "home-step-02",
        title: "Read the corridor",
        description: "Movement context is interpreted so you can pinpoint conflict zones, bottlenecks, and directional pressure points.",
        clipIndex: 1,
        start: 0.1,
        end: 0.82,
        ornamentState: "merge",
      },
      {
        id: "home-step-03",
        title: "Observe operations",
        description: "Lane-by-lane field behavior is documented so you can base queue and merge decisions on measured evidence.",
        clipIndex: 2,
        start: 0.08,
        end: 0.76,
        ornamentState: "merge",
      },
      {
        id: "home-step-04",
        title: "Validate variability",
        description: "Results are compared across changing conditions so you can distinguish stable trends from temporary noise.",
        clipIndex: 3,
        start: 0.08,
        end: 0.76,
        ornamentState: "merge",
      },
      {
        id: "home-step-05",
        title: "Deliver recommendations",
        description: "Findings are synthesized and you receive practical next actions with assumptions and tradeoffs made explicit.",
        clipIndex: 4,
        start: 0.08,
        end: 0.76,
        ornamentState: "distribute",
      },
    ],
  },
  "/counts": {
    title: "Count programs grounded in real traffic behavior",
    intro:
      "Intersection and corridor count planning starts with clear visibility into movement density and directional distribution.",
    clips: [
      {
        id: "route-56",
        title: "Daytime traffic capture",
        description: "Directional movement and lane usage in active daytime conditions.",
        videoSrc: "/media/videos/route-56.mp4",
        posterSrc: "/media/posters/route-56.jpg",
      },
    ],
  },
  "/counts/intersection-turning-movement-counts": {
    title: "Directional turning behavior in context",
    intro:
      "Turning movement programs depend on lane assignment accuracy, signal phase context, and peak-period behavior.",
    clips: [
      {
        id: "route-57",
        title: "Intersection motion patterning",
        description: "Approach-level directional splits and turning flow interactions.",
        videoSrc: "/media/videos/route-57.mp4",
        posterSrc: "/media/posters/route-57.jpg",
      },
    ],
  },
  "/counts/atr-volume-classification-loop-detector-and-road-tube-counts": {
    title: "Continuous monitoring for volume and class",
    intro:
      "ATR and classification programs support reliable trend analysis when count windows and equipment placement are tuned correctly.",
    clips: [
      {
        id: "route-611",
        title: "Corridor stream continuity",
        description: "Volume progression suited to continuous and class-sensitive monitoring.",
        videoSrc: "/media/videos/route-611.mp4",
        posterSrc: "/media/posters/route-611.jpg",
      },
    ],
  },
  "/counts/pedestrian-counts": {
    title: "Pedestrian movement at crossing points",
    intro:
      "Pedestrian programs focus on crossing demand, route preference, and interaction timing at key public realm interfaces.",
    clips: [
      {
        id: "route-58",
        title: "Crosswalk activity",
        description: "Pedestrian routing and crossing activity in active urban conditions.",
        videoSrc: "/media/videos/route-58.mp4",
        posterSrc: "/media/posters/route-58.jpg",
      },
    ],
  },
  "/surveys": {
    title: "Behavior-focused survey programs",
    intro:
      "Survey design captures how people and vehicles move through networks, not just how many pass a single location.",
    clips: [
      {
        id: "route-127",
        title: "Signal cycle response",
        description: "Observed behavior around signal timing and approach response.",
        videoSrc: "/media/videos/route-127.mp4",
        posterSrc: "/media/posters/route-127.jpg",
      },
    ],
  },
  "/surveys/license-plate-survey": {
    title: "Route tracing through plate matching",
    intro:
      "License plate surveys establish origin-destination pathing and route preference between control points.",
    clips: [
      {
        id: "route-40",
        title: "Bridge and corridor pass-through",
        description: "Vehicle progression between checkpoints for route inference.",
        videoSrc: "/media/videos/route-40.mp4",
        posterSrc: "/media/posters/route-40.jpg",
      },
    ],
  },
  "/surveys/parking-occupancy-survey": {
    title: "Parking utilization in operating conditions",
    intro:
      "Occupancy programs identify demand spikes, turnover periods, and utilization imbalance across supply zones.",
    clips: [
      {
        id: "route-2449",
        title: "Curb and lot activity",
        description: "Real-world occupancy pressure across active street and curb space.",
        videoSrc: "/media/videos/route-2449.mp4",
        posterSrc: "/media/posters/route-2449.jpg",
      },
    ],
  },
  "/surveys/vehicle-occupancy-surveys": {
    title: "Vehicle occupancy capture at throughput points",
    intro:
      "Occupancy sampling supports mode-share and person-throughput analysis in policy and planning studies.",
    clips: [
      {
        id: "route-2486",
        title: "Vehicle stream observation",
        description: "Stable vantage for occupant sampling in consistent flow.",
        videoSrc: "/media/videos/route-2486.mp4",
        posterSrc: "/media/posters/route-2486.jpg",
      },
    ],
  },
  "/studies": {
    title: "Specialized traffic studies with operational depth",
    intro:
      "Study programs combine field observation and measurement to explain why networks perform the way they do.",
    clips: [
      {
        id: "route-1755",
        title: "Multi-approach interaction",
        description: "Complex flow interaction suited to diagnostic study work.",
        videoSrc: "/media/videos/route-1755.mp4",
        posterSrc: "/media/posters/route-1755.jpg",
      },
    ],
  },
  "/ball-bank-study": {
    title: "Horizontal curve risk context",
    intro:
      "Ball bank studies evaluate roadway curvature conditions and driver comfort thresholds tied to safety outcomes.",
    clips: [
      {
        id: "route-42367",
        title: "Curvature and path behavior",
        description: "Vehicle progression through curves relevant to lateral comfort evaluation.",
        videoSrc: "/media/videos/route-42367.mp4",
        posterSrc: "/media/posters/route-42367.jpg",
      },
    ],
  },
  "/cordon-counts": {
    title: "Boundary-based movement measurement",
    intro:
      "Cordon counts quantify inflow and outflow across defined boundaries for demand and network loading analysis.",
    clips: [
      {
        id: "route-2034",
        title: "Inbound and outbound pressure",
        description: "Boundary crossing movement patterns across a wider urban frame.",
        videoSrc: "/media/videos/route-2034.mp4",
        posterSrc: "/media/posters/route-2034.jpg",
      },
    ],
  },
  "/delay-studies": {
    title: "Delay formation and queue persistence",
    intro:
      "Delay studies isolate when and where network friction forms so improvements can target the real constraints.",
    clips: [
      {
        id: "route-3304",
        title: "Congestion persistence",
        description: "Queue-heavy conditions used to diagnose recurring delay.",
        videoSrc: "/media/videos/route-3304.mp4",
        posterSrc: "/media/posters/route-3304.jpg",
      },
    ],
  },
  "/gap-study": {
    title: "Gap acceptance in crossing decisions",
    intro:
      "Gap studies measure usable intervals in live traffic streams to support crossing and access recommendations.",
    clips: [
      {
        id: "route-4343",
        title: "Acceptable interval windows",
        description: "Traffic stream intervals relevant to crossing opportunity analysis.",
        videoSrc: "/media/videos/route-4343.mp4",
        posterSrc: "/media/posters/route-4343.jpg",
      },
    ],
  },
  "/gps-travel-runs": {
    title: "Corridor travel reliability",
    intro:
      "GPS travel runs profile corridor performance over time and expose recurring reliability constraints.",
    clips: [
      {
        id: "route-44653",
        title: "Continuous route traversal",
        description: "Point-of-view corridor progression for travel-time context.",
        videoSrc: "/media/videos/route-44653.mp4",
        posterSrc: "/media/posters/route-44653.jpg",
      },
    ],
  },
  "/radar-speed-studies": {
    title: "Speed environment characterization",
    intro:
      "Radar speed studies capture prevailing speed patterns and distribution behavior under typical operating conditions.",
    clips: [
      {
        id: "route-42368",
        title: "Speed-flow profile",
        description: "Movement cadence appropriate for speed distribution assessment.",
        videoSrc: "/media/videos/route-42368.mp4",
        posterSrc: "/media/posters/route-42368.jpg",
      },
    ],
  },
  "/travel-time-studies": {
    title: "Segment and corridor travel time",
    intro:
      "Travel-time studies quantify run consistency, segment-level delay, and reliability across selected routes.",
    clips: [
      {
        id: "route-44651",
        title: "Travel run perspective",
        description: "Route-level movement used for segment travel-time benchmarking.",
        videoSrc: "/media/videos/route-44651.mp4",
        posterSrc: "/media/posters/route-44651.jpg",
      },
    ],
  },
  "/customized-data-collection": {
    title: "Custom programs for mixed objectives",
    intro:
      "Custom collection packages combine methods and time windows to align with site-specific project questions.",
    clips: [
      {
        id: "route-42369",
        title: "Mixed-condition corridor view",
        description: "A broad corridor context suitable for multi-method program design.",
        videoSrc: "/media/videos/route-42369.mp4",
        posterSrc: "/media/posters/route-42369.jpg",
      },
    ],
  },
  "/contact-us": {
    title: "Start with grounded site context",
    intro:
      "Share your scope and location constraints, and TSA will shape a practical collection plan around real operating conditions.",
    clips: [
      {
        id: "route-4067",
        title: "Network context framing",
        description: "Transport context clip used to frame scoping conversations.",
        videoSrc: "/media/videos/route-4067.mp4",
        posterSrc: "/media/posters/route-4067.jpg",
      },
    ],
  },
};

const sceneCache = new Map<string, RouteMediaStory>();

function resolveRoutePhaseCount(route: string, fallbackLength: number): number {
  if (routePhaseCounts[route]) {
    return routePhaseCounts[route];
  }

  if (route.startsWith("/counts")) {
    return 4;
  }

  if (route.startsWith("/surveys")) {
    return 4;
  }

  if (route === "/contact-us") {
    return 4;
  }

  if (route === "/customized-data-collection") {
    return 4;
  }

  return Math.max(4, fallbackLength);
}

function fallbackExpansionsForRoute(route: string): RouteSceneTemplate {
  if (route === "/counts") {
    return [
      {
        title: "Service-track coverage",
        description: "Cover turning movements, pedestrian activity, and automated counter programs in one view.",
      },
      {
        title: "Planning-ready release",
        description: "Package validated counts for transportation planning, signal timing, and operations review.",
      },
    ];
  }

  if (route === "/surveys") {
    return [
      {
        title: "Method selection by question",
        description: "Select LPRS, parking utilization, or occupancy programs according to decision objective.",
      },
      {
        title: "Decision-ready interpretation",
        description: "Translate survey evidence into route, demand, and utilization recommendations.",
      },
    ];
  }

  if (route === "/studies") {
    return [
      {
        title: "Safety and speed diagnostics",
        description: "Cover Ball Bank, Delay, and Radar methods to evaluate control and speed outcomes.",
      },
      {
        title: "Boundary and gap diagnostics",
        description: "Include Cordon and GAP studies for movement boundaries and crossing feasibility decisions.",
      },
      {
        title: "Travel reliability synthesis",
        description: "Combine Travel Time and GPS runs to quantify corridor consistency and reliability.",
      },
      {
        title: "Study-to-action recommendations",
        description: "Convert measured findings into safety, operations, and planning recommendations.",
      },
    ];
  }

  if (route.startsWith("/counts/")) {
    return [
      {
        title: "Collection method execution",
        description: "Deploy manual boards, video, sensors, or counters based on site-specific requirements.",
      },
    ];
  }

  if (route.startsWith("/surveys/")) {
    return [
      {
        title: "Collection method execution",
        description: "Apply camera, observation, or sensor workflows matched to survey interval and objective.",
      },
    ];
  }

  if (route === "/contact-us") {
    return [
      {
        title: "Contact and response coordination",
        description: "Move from scope intake to schedule fit and direct follow-up with the TSA team.",
      },
    ];
  }

  if (route === "/customized-data-collection") {
    return [
      {
        title: "Program validation and handoff",
        description: "Confirm blended method scope and deliverables before field deployment starts.",
      },
    ];
  }

  return [
    {
      title: "Method execution",
      description: "Run field collection with calibrated tools and repeatable procedures.",
    },
  ];
}

function expandTemplateToCount(route: string, template: RouteSceneTemplate, targetCount: number): RouteSceneTemplate {
  if (template.length >= targetCount) {
    return template.slice(0, targetCount);
  }

  const expanded = [...template];
  const expansions = fallbackExpansionsForRoute(route);

  let index = 0;
  while (expanded.length < targetCount) {
    expanded.push(expansions[index % expansions.length]);
    index += 1;
  }

  return expanded;
}

function getSceneTiming(index: number, total: number): Pick<MediaScene, "start" | "end" | "ornamentState"> {
  const startMin = 0.06;
  const endMax = 0.94;
  const slot = (endMax - startMin) / Math.max(total, 1);
  const start = startMin + slot * index;
  const end = Math.min(endMax, start + slot * 0.92);

  const ornamentState: MediaScene["ornamentState"] =
    index === 0 ? "origin" : index === total - 1 ? "distribute" : "merge";

  return { start, end, ornamentState };
}

function fallbackTemplateForRoute(route: string): RouteSceneTemplate {
  if (route.startsWith("/counts")) {
    return [
      {
        title: "Field setup context",
        description: "Define where and how count observations will be collected.",
      },
      {
        title: "Core capture window",
        description: "Measure directional traffic behavior during active time periods.",
      },
      {
        title: "Validated output release",
        description: "Deliver tabulated count outputs with quality checks documented.",
      },
    ];
  }

  if (route.startsWith("/surveys")) {
    return [
      {
        title: "Survey framing context",
        description: "Set checkpoints and rules around the decision objective.",
      },
      {
        title: "Behavior observation window",
        description: "Capture utilization and movement behavior in representative conditions.",
      },
      {
        title: "Insight-ready outputs",
        description: "Translate raw observations into usable planning evidence.",
      },
    ];
  }

  if (route === "/contact-us") {
    return [
      {
        title: "Project context framing",
        description: "Capture intake details needed for a scoped response.",
      },
      {
        title: "Scope alignment",
        description: "Match method and timeline to your field constraints.",
      },
      {
        title: "Quote-ready handoff",
        description: "Prepare a practical delivery approach and response package.",
      },
    ];
  }

  if (route === "/customized-data-collection") {
    return [
      {
        title: "Constraint intake",
        description: "Map unique requirements and operating limits for the program.",
      },
      {
        title: "Hybrid method design",
        description: "Blend the right mix of counts, surveys, and studies.",
      },
      {
        title: "Custom package release",
        description: "Deliver a tailored scope and output format for your team.",
      },
    ];
  }

  return [
    {
      title: "Study setup context",
      description: "Define study scope and field evidence targets.",
    },
    {
      title: "Diagnostic capture window",
      description: "Collect traffic behavior relevant to the core study question.",
    },
    {
      title: "Decision-ready findings",
      description: "Summarize results in a format usable for technical planning decisions.",
    },
  ];
}

function buildDefaultScenes(route: string, clip: ScrollMediaClip, clipIndex = 0): MediaScene[] {
  const baseTemplate = routeSceneTemplates[route] ?? fallbackTemplateForRoute(route);
  const targetCount = resolveRoutePhaseCount(route, baseTemplate.length);
  const template = expandTemplateToCount(route, baseTemplate, targetCount);

  return template.map((phase, index) => {
    const timing = getSceneTiming(index, template.length);
    return {
      id: `${clip.id}-${String(index + 1).padStart(2, "0")}-${timing.ornamentState}`,
      title: phase.title,
      description: phase.description,
      clipIndex,
      start: timing.start,
      end: timing.end,
      ornamentState: timing.ornamentState,
      chapterLabel: `Phase ${String(index + 1).padStart(2, "0")}`,
      metricHint: "Field evidence",
      overlayPreset: "lanes",
    };
  });
}

function buildScenesFromClips(route: string, clips: ScrollMediaClip[]): MediaScene[] {
  if (clips.length === 0) {
    return [] as MediaScene[];
  }

  if (clips.length === 1) {
    return buildDefaultScenes(route, clips[0], 0);
  }

  return clips.map((clip, index) => {
    const ornamentState: MediaScene["ornamentState"] =
      index === 0 ? "origin" : index === clips.length - 1 ? "distribute" : "merge";

    return {
      id: `${clip.id}-scene`,
      title: clip.title,
      description: clip.description,
      clipIndex: index,
      start: 0.1,
      end: 0.88,
      ornamentState,
      chapterLabel: `Chapter ${String(index + 1).padStart(2, "0")}`,
      metricHint: index % 2 === 0 ? "Observed signal" : "Planning output",
      overlayPreset:
        route === "/contact-us"
          ? "console"
          : route === "/customized-data-collection"
            ? "composer"
            : route.startsWith("/surveys")
              ? "matrix"
              : route.startsWith("/counts")
                ? "stack"
                : "lens",
      variantHint: `${route}-variant-${index + 1}`,
    };
  });
}

function normalizeStory(cacheKey: string, route: string, story: RawRouteMediaStory): RouteMediaStory {
  const cached = sceneCache.get(cacheKey);

  if (cached) {
    return cached;
  }

  const storyWithBasePath = applyBasePathToStory(story);

  const normalized: RouteMediaStory = {
    ...storyWithBasePath,
    scenes: storyWithBasePath.scenes?.length ? storyWithBasePath.scenes : buildScenesFromClips(route, storyWithBasePath.clips),
  };

  sceneCache.set(cacheKey, normalized);
  return normalized;
}

const mediaSlotStories: Record<string, RawRouteMediaStory> = {
  counts_operational: routeMediaStories["/counts"],
  surveys_decision: routeMediaStories["/surveys"],
  studies_diagnostic: routeMediaStories["/studies"],
  detail_counts: routeMediaStories["/counts/intersection-turning-movement-counts"],
  detail_surveys: routeMediaStories["/surveys/license-plate-survey"],
  detail_studies: routeMediaStories["/travel-time-studies"],
  custom_program: routeMediaStories["/customized-data-collection"],
  contact_context: routeMediaStories["/contact-us"],
};

function clip(
  id: string,
  title: string,
  description: string,
  videoSrc: string,
  posterSrc: string,
): ScrollMediaClip {
  return { id, title, description, videoSrc, posterSrc };
}

const clipCatalog = {
  route56: clip("route-56", "Daytime traffic capture", "Directional movement and lane usage in active daytime conditions.", "/media/videos/route-56.mp4", "/media/posters/route-56.jpg"),
  route57: clip("route-57", "Intersection motion patterning", "Approach-level directional splits and turning flow interactions.", "/media/videos/route-57.mp4", "/media/posters/route-57.jpg"),
  route58: clip("route-58", "Crosswalk activity", "Pedestrian routing and crossing activity in active urban conditions.", "/media/videos/route-58.mp4", "/media/posters/route-58.jpg"),
  route611: clip("route-611", "Corridor stream continuity", "Volume progression suited to continuous and class-sensitive monitoring.", "/media/videos/route-611.mp4", "/media/posters/route-611.jpg"),
  route127: clip("route-127", "Signal cycle response", "Observed behavior around signal timing and approach response.", "/media/videos/route-127.mp4", "/media/posters/route-127.jpg"),
  route1755: clip("route-1755", "Multi-approach interaction", "Complex flow interaction suited to diagnostic study work.", "/media/videos/route-1755.mp4", "/media/posters/route-1755.jpg"),
  route2034: clip("route-2034", "Inbound and outbound pressure", "Boundary crossing movement patterns across a wider urban frame.", "/media/videos/route-2034.mp4", "/media/posters/route-2034.jpg"),
  route2449: clip("route-2449", "Curb and lot activity", "Real-world occupancy pressure across active street and curb space.", "/media/videos/route-2449.mp4", "/media/posters/route-2449.jpg"),
  route2486: clip("route-2486", "Vehicle stream observation", "Stable vantage for occupant sampling in consistent flow.", "/media/videos/route-2486.mp4", "/media/posters/route-2486.jpg"),
  route3304: clip("route-3304", "Congestion persistence", "Queue-heavy conditions used to diagnose recurring delay.", "/media/videos/route-3304.mp4", "/media/posters/route-3304.jpg"),
  route40: clip("route-40", "Bridge and corridor pass-through", "Vehicle progression between checkpoints for route inference.", "/media/videos/route-40.mp4", "/media/posters/route-40.jpg"),
  route4067: clip("route-4067", "Network context framing", "Transport context clip used to frame scoping conversations.", "/media/videos/route-4067.mp4", "/media/posters/route-4067.jpg"),
  route42367: clip("route-42367", "Curvature and path behavior", "Vehicle progression through curves relevant to lateral comfort evaluation.", "/media/videos/route-42367.mp4", "/media/posters/route-42367.jpg"),
  route42368: clip("route-42368", "Speed-flow profile", "Movement cadence appropriate for speed distribution assessment.", "/media/videos/route-42368.mp4", "/media/posters/route-42368.jpg"),
  route42369: clip("route-42369", "Mixed-condition corridor view", "A broad corridor context suitable for multi-method program design.", "/media/videos/route-42369.mp4", "/media/posters/route-42369.jpg"),
  route4343: clip("route-4343", "Acceptable interval windows", "Traffic stream intervals relevant to crossing opportunity analysis.", "/media/videos/route-4343.mp4", "/media/posters/route-4343.jpg"),
  route44651: clip("route-44651", "Travel run perspective", "Route-level movement used for segment travel-time benchmarking.", "/media/videos/route-44651.mp4", "/media/posters/route-44651.jpg"),
  route44653: clip("route-44653", "Continuous route traversal", "Point-of-view corridor progression for travel-time context.", "/media/videos/route-44653.mp4", "/media/posters/route-44653.jpg"),
  mixkit11: clip("mixkit-11", "Aerial city traffic at night", "Aerial movement across lit intersections and city arteries.", "/media/videos/mixkit-11.mp4", "/media/posters/mixkit-11.jpg"),
  mixkit2032: clip("mixkit-2032", "Busy city road from above", "Roadway and pedestrian bridge context in sustained flow.", "/media/videos/mixkit-2032.mp4", "/media/posters/mixkit-2032.jpg"),
  mixkit4251: clip("mixkit-4251", "Night avenue throughput", "Dense avenue movement through night operations.", "/media/videos/mixkit-4251.mp4", "/media/posters/mixkit-4251.jpg"),
  mixkit34562: clip("mixkit-34562", "Twin avenue traffic stream", "Two-way traffic rhythm through a major urban axis.", "/media/videos/mixkit-34562.mp4", "/media/posters/mixkit-34562.jpg"),
  mixkit4331: clip("mixkit-4331", "Rain-night movement", "Weather-affected flow and visibility in live traffic.", "/media/videos/mixkit-4331.mp4", "/media/posters/mixkit-4331.jpg"),
  mixkit49846: clip("mixkit-49846", "Split aerial city sweep", "Large-scale city movement across linked corridors.", "/media/videos/mixkit-49846.mp4", "/media/posters/mixkit-49846.jpg"),
  mixkit50998: clip("mixkit-50998", "Roundabout night pattern", "Roundabout circulation and lane discipline under load.", "/media/videos/mixkit-50998.mp4", "/media/posters/mixkit-50998.jpg"),
  mixkit42039: clip("mixkit-42039", "Driver-eye night stream", "Interior perspective on congested evening traffic.", "/media/videos/mixkit-42039.mp4", "/media/posters/mixkit-42039.jpg"),
} as const;

const assetBundles: Record<string, ScrollMediaClip[]> = {
  "counts-overview": [clipCatalog.route56, clipCatalog.mixkit2032, clipCatalog.route611, clipCatalog.mixkit4251, clipCatalog.mixkit50998],
  "surveys-overview": [clipCatalog.route127, clipCatalog.route2449, clipCatalog.route2486, clipCatalog.mixkit4331],
  "studies-overview": [clipCatalog.route1755, clipCatalog.route3304, clipCatalog.route4343, clipCatalog.route44651, clipCatalog.route44653, clipCatalog.mixkit49846],
  "detail-counts-turning": [clipCatalog.route57, clipCatalog.mixkit50998, clipCatalog.route56, clipCatalog.mixkit2032],
  "detail-counts-atr": [clipCatalog.route611, clipCatalog.mixkit4251, clipCatalog.mixkit34562, clipCatalog.mixkit11],
  "detail-counts-pedestrian": [clipCatalog.route58, clipCatalog.mixkit2032, clipCatalog.route56, clipCatalog.mixkit42039],
  "detail-surveys-license": [clipCatalog.route2034, clipCatalog.route40, clipCatalog.mixkit49846, clipCatalog.mixkit34562, clipCatalog.mixkit11],
  "detail-surveys-parking": [clipCatalog.route2449, clipCatalog.mixkit2032, clipCatalog.mixkit4331, clipCatalog.mixkit50998, clipCatalog.mixkit34562],
  "detail-surveys-occupancy": [clipCatalog.route2486, clipCatalog.mixkit42039, clipCatalog.mixkit4251, clipCatalog.route127, clipCatalog.mixkit11],
  "detail-studies-ball-bank": [clipCatalog.route42367, clipCatalog.mixkit4251, clipCatalog.mixkit4331, clipCatalog.route42368, clipCatalog.mixkit49846],
  "detail-studies-cordon": [clipCatalog.route2034, clipCatalog.mixkit11, clipCatalog.mixkit49846, clipCatalog.route3304, clipCatalog.mixkit50998],
  "detail-studies-delay": [clipCatalog.route3304, clipCatalog.mixkit34562, clipCatalog.mixkit2032, clipCatalog.mixkit4331, clipCatalog.route44651],
  "detail-studies-gap": [clipCatalog.route4343, clipCatalog.mixkit50998, clipCatalog.route42368, clipCatalog.mixkit42039, clipCatalog.route44653],
  "detail-studies-gps": [clipCatalog.route44653, clipCatalog.mixkit42039, clipCatalog.mixkit34562, clipCatalog.mixkit49846, clipCatalog.route44651],
  "detail-studies-radar": [clipCatalog.route42368, clipCatalog.mixkit11, clipCatalog.mixkit4251, clipCatalog.mixkit4331, clipCatalog.mixkit50998],
  "detail-studies-travel-time": [clipCatalog.route44651, clipCatalog.route44653, clipCatalog.mixkit42039, clipCatalog.mixkit2032, clipCatalog.mixkit34562],
  "custom-program-core": [clipCatalog.route42369, clipCatalog.route56, clipCatalog.route127, clipCatalog.route1755, clipCatalog.mixkit49846, clipCatalog.mixkit50998],
  "contact-core": [clipCatalog.route4067, clipCatalog.mixkit2032, clipCatalog.mixkit11],
  "counts-core": [clipCatalog.route56, clipCatalog.route611, clipCatalog.mixkit2032, clipCatalog.mixkit4251, clipCatalog.mixkit50998],
  "surveys-core": [clipCatalog.route127, clipCatalog.route2449, clipCatalog.route2486, clipCatalog.mixkit4331],
  "studies-core": [clipCatalog.route1755, clipCatalog.route3304, clipCatalog.route44651, clipCatalog.route44653, clipCatalog.mixkit49846, clipCatalog.mixkit50998],
  "detail-counts-core": [clipCatalog.route57, clipCatalog.route611, clipCatalog.mixkit2032, clipCatalog.mixkit4251],
  "detail-surveys-core": [clipCatalog.route127, clipCatalog.route2449, clipCatalog.mixkit4331, clipCatalog.mixkit34562, clipCatalog.mixkit11],
  "detail-studies-core": [clipCatalog.route42368, clipCatalog.route3304, clipCatalog.mixkit49846, clipCatalog.route44651, clipCatalog.mixkit50998],
};

function applyAssetBundle(story: RawRouteMediaStory, assetBundleId?: string): RawRouteMediaStory {
  if (!assetBundleId) {
    return story;
  }

  const bundledClips = assetBundles[assetBundleId];

  if (!bundledClips?.length) {
    return story;
  }

  return {
    ...story,
    clips: bundledClips,
    scenes: undefined,
  };
}

export function getRouteMediaStory(route: string, mediaSlot?: string, assetBundleId?: string): RouteMediaStory | null {
  if (mediaSlot && mediaSlotStories[mediaSlot]) {
    const bundledStory = applyAssetBundle(mediaSlotStories[mediaSlot], assetBundleId);
    return normalizeStory(`${route}::${mediaSlot}::${assetBundleId ?? "default"}`, route, bundledStory);
  }

  const story = routeMediaStories[route];
  if (!story) {
    return null;
  }

  const bundledStory = applyAssetBundle(story, assetBundleId);
  return normalizeStory(`${route}::${assetBundleId ?? "default"}`, route, bundledStory);
}
