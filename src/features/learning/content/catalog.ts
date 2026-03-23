import {
  ConceptGraphNode,
  FormulaCardItem,
  Problem,
  SimulationDefinition,
  Topic,
} from "@/features/learning/domain/types";

export const topics: Topic[] = [
  {
    id: "rv",
    order: 1,
    section: "Foundations",
    title: "Single Random Variable",
    shortTitle: "Random Variable",
    description:
      "PMF, PDF, CDF, expectation, variance, and the language of uncertainty.",
    color: "var(--accent)",
    prerequisites: [],
    formulas: ["pmf-condition", "expectation", "variance"],
    blocks: [
      {
        label: "intuition",
        body: "A random variable is the measuring instrument that turns outcomes into numbers we can reason about.",
      },
      {
        label: "reasoning",
        body: "Once outcomes become numerical, we can compare, average, transform, and bound them with mathematical precision.",
      },
      {
        label: "engineering",
        body: "This is the substrate for noise models, queuing models, reliability analysis, and stochastic machine learning.",
      },
    ],
  },
  {
    id: "cdf",
    order: 2,
    section: "Foundations",
    title: "CDF and Distribution Functions",
    shortTitle: "CDF / PDF / PMF",
    description:
      "How probability mass and cumulative probability describe uncertainty from two complementary viewpoints.",
    color: "var(--gold)",
    prerequisites: ["rv"],
    formulas: ["cdf-difference"],
    blocks: [
      {
        label: "intuition",
        body: "The PMF or PDF tells you where probability lives; the CDF tells you how much probability has accumulated up to x.",
      },
      {
        label: "exam",
        body: "For intervals, the CDF is the fast path: P(a < X <= b) = F(b) - F(a).",
      },
      {
        label: "danger",
        body: "For continuous variables, the PDF is not itself a probability. You must integrate over an interval.",
      },
    ],
  },
  {
    id: "expect",
    order: 3,
    section: "Foundations",
    title: "Expectation and Variance",
    shortTitle: "Expectation & Variance",
    description:
      "Mean and spread as the core summaries that drive everything from signal power to concentration bounds.",
    color: "var(--mint)",
    prerequisites: ["rv"],
    formulas: ["expectation", "variance"],
    blocks: [
      {
        label: "reasoning",
        body: "Expectation is linear, variance is not. That asymmetry is the source of many exam traps and beautiful theorems.",
      },
      {
        label: "engineering",
        body: "Variance is AC power, standard deviation is RMS deviation, and both show up constantly in SNR reasoning.",
      },
      {
        label: "research",
        body: "Variance is the second central moment and underpins concentration inequalities, asymptotics, and estimation theory.",
      },
    ],
  },
  {
    id: "cheby",
    order: 4,
    section: "Bounds",
    title: "Chebyshev Inequality",
    shortTitle: "Chebyshev",
    description:
      "Distribution-free control over tail probability when only mean and variance are known.",
    color: "var(--gold)",
    prerequisites: ["expect"],
    formulas: ["chebyshev"],
    blocks: [
      {
        label: "intuition",
        body: "Chebyshev says large deviations cannot happen too often if variance is finite.",
      },
      {
        label: "reasoning",
        body: "It is weak compared with Gaussian tails, but it is honest when you know almost nothing about the distribution.",
      },
      {
        label: "danger",
        body: "Students often treat Chebyshev as precise. It is a worst-case bound, not a prediction.",
      },
    ],
  },
  {
    id: "joint",
    order: 5,
    section: "Multivariable",
    title: "Joint, Marginal, and Conditional Distributions",
    shortTitle: "Joint / Conditional",
    description:
      "The move from one random variable to interacting uncertainty across dimensions.",
    color: "var(--violet)",
    prerequisites: ["rv", "cdf"],
    formulas: ["conditional"],
    blocks: [
      {
        label: "intuition",
        body: "Marginals integrate away the other variable; conditionals freeze a slice of the joint and renormalize it.",
      },
      {
        label: "engineering",
        body: "This is the language of Bayesian updates, filtering, inference, and correlated systems.",
      },
      {
        label: "research",
        body: "Joint structure is where covariance, dependence, and transformations become geometric.",
      },
    ],
  },
  {
    id: "process",
    order: 6,
    section: "Random Processes",
    title: "Random Process Basics",
    shortTitle: "Random Process",
    description:
      "From snapshots to trajectories: a process assigns a random variable to every time index.",
    color: "var(--mint)",
    prerequisites: ["joint"],
    formulas: [
      "ensemble-view",
      "mean-function",
      "variance-function",
      "process-distribution",
    ],
    blocks: [
      {
        label: "intuition",
        body: "A random variable gives one number per outcome. A random process gives an entire path per outcome.",
      },
      {
        label: "reasoning",
        body: "The ensemble view separates randomness across experiments from dynamics across time.",
      },
      {
        label: "engineering",
        body: "Noise, traffic, fading, and arrival streams are all better understood as processes rather than isolated random variables.",
      },
      {
        label: "research",
        body: "Formally, a random process is a family {X(t), t in T} of random variables defined on the same probability space. The index set may be discrete, continuous, or spatial.",
      },
      {
        label: "exam",
        body: "Always separate a realization X(t, omega) from the process X(t). A realization is one path; the process is the law over all such paths.",
      },
      {
        label: "danger",
        body: "Time averaging and ensemble averaging are not automatically equal. That is an ergodicity question, not something guaranteed by the definition of a random process.",
      },
    ],
  },
  {
    id: "distproc",
    order: 7,
    section: "Random Processes",
    title: "Distribution of a Process",
    shortTitle: "Process Distribution",
    description:
      "Hierarchy of finite-dimensional distributions and the shift from point statistics to temporal structure.",
    color: "var(--accent)",
    prerequisites: ["process"],
    formulas: ["process-distribution"],
    blocks: [
      {
        label: "reasoning",
        body: "A process is fully characterized by its joint distributions across all collections of time indices.",
      },
      {
        label: "research",
        body: "Finite-dimensional distribution families encode the entire law of the process.",
      },
      {
        label: "exam",
        body: "First-order distributions are not enough to prove stationarity or independence across time.",
      },
    ],
  },
  {
    id: "stationary",
    order: 8,
    section: "Core Theory",
    title: "Stationarity",
    shortTitle: "Stationarity",
    description:
      "Time-invariant structure in strict-sense and wide-sense forms.",
    color: "var(--rose)",
    prerequisites: ["process", "distproc"],
    formulas: ["sss-condition", "wss-condition", "autocovariance"],
    blocks: [
      {
        label: "intuition",
        body: "Stationary processes do not care when you observe them; only the relative offset matters.",
      },
      {
        label: "reasoning",
        body: "WSS requires constant mean and autocorrelation that depends only on lag.",
      },
      {
        label: "engineering",
        body: "Stationarity is what makes spectral analysis usable. If the statistics drift in time, a single PSD estimate can become misleading.",
      },
      {
        label: "research",
        body: "Strict-sense stationarity preserves every finite-dimensional distribution under time shifts, while wide-sense stationarity preserves only first and second moments.",
      },
      {
        label: "exam",
        body: "For Gaussian processes, WSS often carries far more power because second-order structure can determine the entire process law.",
      },
      {
        label: "danger",
        body: "Constant mean alone is not enough. The correlation structure must also be time-shift invariant.",
      },
    ],
  },
  {
    id: "acf",
    order: 9,
    section: "Core Theory",
    title: "Autocorrelation Function",
    shortTitle: "Autocorrelation",
    description: "Temporal memory, lag structure, and power at zero lag.",
    color: "var(--gold)",
    prerequisites: ["stationary", "expect"],
    formulas: ["autocorrelation"],
    blocks: [
      {
        label: "intuition",
        body: "Autocorrelation asks whether the process resembles a shifted copy of itself.",
      },
      {
        label: "engineering",
        body: "In communication systems this drives ISI, predictability, and matched-filter behavior.",
      },
      {
        label: "exam",
        body: "R(0) is total power. For real processes, the ACF is even.",
      },
    ],
  },
  {
    id: "psd",
    order: 10,
    section: "Core Theory",
    title: "Power Spectral Density",
    shortTitle: "PSD",
    description:
      "Frequency-domain description of process power via Wiener-Khinchin.",
    color: "var(--violet)",
    prerequisites: ["acf"],
    formulas: ["psd"],
    blocks: [
      {
        label: "reasoning",
        body: "The PSD is the Fourier transform of the autocorrelation function for a WSS process.",
      },
      {
        label: "engineering",
        body: "PSD tells you where the power is concentrated across frequency bands.",
      },
      {
        label: "research",
        body: "Spectral factorization and stochastic filtering both begin here.",
      },
    ],
  },
  {
    id: "poisson",
    order: 11,
    section: "Counting Processes",
    title: "Poisson Process",
    shortTitle: "Poisson",
    description:
      "Counting rare events with independent stationary increments and exponential interarrival times.",
    color: "var(--mint)",
    prerequisites: ["process", "distproc"],
    formulas: ["poisson-pmf", "poisson-interarrival", "poisson-increments"],
    blocks: [
      {
        label: "intuition",
        body: "A Poisson process counts how many arrivals have occurred by time t.",
      },
      {
        label: "reasoning",
        body: "Independent stationary increments and the one-arrival axiom uniquely force the Poisson law.",
      },
      {
        label: "engineering",
        body: "Poisson models sparse independent arrivals such as network packets, photon hits, radioactive decay events, and customer requests in light traffic regimes.",
      },
      {
        label: "research",
        body: "Conditioned on N(t)=n, the arrival times are distributed like the order statistics of n i.i.d. Uniform(0,t) variables. That characterization is one of the deepest structural facts about Poisson processes.",
      },
      {
        label: "exam",
        body: "For N(t), mean and variance are both lambda t. Interarrival times are exponential and memoryless.",
      },
      {
        label: "danger",
        body: "A Poisson random variable is one snapshot count. A Poisson process is the full time-indexed counting object with increment structure.",
      },
    ],
  },
];

export const formulaDeck: FormulaCardItem[] = [
  {
    id: "pmf-condition",
    title: "PMF Conditions",
    expression: "p_X(x) \\ge 0, \\; \\sum_x p_X(x) = 1",
    summary: "Non-negativity and total mass one.",
    topicId: "rv",
    tags: ["core", "discrete"],
  },
  {
    id: "cdf-difference",
    title: "CDF Interval Rule",
    expression: "P(a < X \\le b) = F_X(b) - F_X(a)",
    summary: "Fastest route from CDF to interval probability.",
    topicId: "cdf",
    tags: ["core"],
  },
  {
    id: "expectation",
    title: "Expectation",
    expression: "E[X] = \\int x f_X(x) \\, dx",
    summary: "Weighted average of the random variable.",
    topicId: "expect",
    tags: ["formula"],
  },
  {
    id: "variance",
    title: "Variance",
    expression: "\\operatorname{Var}(X) = E[X^2] - (E[X])^2",
    summary: "Second raw moment minus squared mean.",
    topicId: "expect",
    tags: ["formula"],
  },
  {
    id: "chebyshev",
    title: "Chebyshev Inequality",
    expression: "P(|X-\\mu| \\ge k\\sigma) \\le \\frac{1}{k^2}",
    summary: "Distribution-free deviation bound.",
    topicId: "cheby",
    tags: ["theorem", "core"],
  },
  {
    id: "conditional",
    title: "Conditional Density",
    expression: "f_{X|Y}(x|y) = \\frac{f_{XY}(x,y)}{f_Y(y)}",
    summary: "Slice the joint and normalize it.",
    topicId: "joint",
    tags: ["bayes", "multivariable"],
  },
  {
    id: "ensemble-view",
    title: "Process as a Family",
    expression: "X(t, \\omega): T \\times \\Omega \\to \\mathbb{R}",
    summary: "A process maps each time-outcome pair to a numerical state.",
    topicId: "process",
    tags: ["process", "core"],
  },
  {
    id: "mean-function",
    title: "Mean Function",
    expression: "m_X(t) = E[X(t)]",
    summary: "Expected process value at each time.",
    topicId: "process",
    tags: ["process"],
  },
  {
    id: "variance-function",
    title: "Variance Function",
    expression: "\\sigma_X^2(t) = E[(X(t)-m_X(t))^2]",
    summary: "Spread of the process across time.",
    topicId: "process",
    tags: ["process"],
  },
  {
    id: "process-distribution",
    title: "Finite-Dimensional Law",
    expression: "F_{X(t_1),\\dots,X(t_n)}(x_1,\\dots,x_n)",
    summary:
      "A process is characterized by its joint distributions across selected time instants.",
    topicId: "process",
    tags: ["process", "distribution"],
  },
  {
    id: "sss-condition",
    title: "Strict-Sense Stationarity",
    expression:
      "F_{X(t_1),\\dots,X(t_n)} = F_{X(t_1+\\tau),\\dots,X(t_n+\\tau)}",
    summary:
      "All finite-dimensional distributions are invariant under time shifts.",
    topicId: "stationary",
    tags: ["stationarity", "core"],
  },
  {
    id: "wss-condition",
    title: "WSS Conditions",
    expression: "E[X(t)] = \\mu, \\; R_X(t_1,t_2) = R_X(t_1-t_2)",
    summary: "Constant mean and lag-only correlation.",
    topicId: "stationary",
    tags: ["core"],
  },
  {
    id: "autocovariance",
    title: "Autocovariance",
    expression: "C_X(\\tau) = R_X(\\tau) - \\mu_X^2",
    summary: "Correlation with the DC component removed.",
    topicId: "stationary",
    tags: ["stationarity", "signal"],
  },
  {
    id: "autocorrelation",
    title: "Autocorrelation",
    expression: "R_{XX}(\\tau) = E[X(t)X(t+\\tau)]",
    summary: "Temporal self-similarity as a function of lag.",
    topicId: "acf",
    tags: ["signal"],
  },
  {
    id: "psd",
    title: "Wiener-Khinchin",
    expression: "S_X(f) = \\mathcal{F}\\{R_{XX}(\\tau)\\}",
    summary: "Fourier transform bridge from time correlation to spectrum.",
    topicId: "psd",
    tags: ["frequency"],
  },
  {
    id: "poisson-pmf",
    title: "Poisson Process Snapshot",
    expression: "P(N(t)=k) = \\frac{(\\lambda t)^k e^{-\\lambda t}}{k!}",
    summary: "Count distribution at a fixed time.",
    topicId: "poisson",
    tags: ["counting"],
  },
  {
    id: "poisson-interarrival",
    title: "Interarrival Law",
    expression:
      "T \\sim \\mathrm{Exp}(\\lambda), \\quad P(T>s+t\\mid T>s)=P(T>t)",
    summary: "Waiting times are exponential and memoryless.",
    topicId: "poisson",
    tags: ["memoryless", "counting"],
  },
  {
    id: "poisson-increments",
    title: "Increment Distribution",
    expression: "N(t+\\Delta)-N(t) \\sim \\mathrm{Poisson}(\\lambda\\Delta)",
    summary: "Counts over equal-length intervals have the same law.",
    topicId: "poisson",
    tags: ["increments", "stationary"],
  },
];

export const problems: Problem[] = [
  {
    id: "rv-lotus",
    topicId: "rv",
    level: "medium",
    title: "Expectation by LOTUS",
    statement:
      "Let X have density f_X(x)=2x on 0<x<1. Compute E[X^2] without first finding the distribution of X^2.",
    hints: ["Use LOTUS directly.", "Integrate x^2 f_X(x) over the support."],
    steps: [
      { text: "Apply LOTUS: E[X^2] = integral x^2 f_X(x) dx." },
      {
        text: "Substitute the density: E[X^2] = integral_0^1 x^2 (2x) dx = 2 integral_0^1 x^3 dx.",
      },
      { text: "Evaluate to get 2 * 1/4 = 1/2." },
    ],
    answer: "E[X^2] = 1/2",
  },
  {
    id: "cheby-bound",
    topicId: "cheby",
    level: "easy",
    title: "Chebyshev at Two Sigma",
    statement:
      "If a random variable has finite variance, what fraction of probability must lie within two standard deviations of the mean?",
    hints: [
      "Chebyshev bounds probability outside k sigma by 1/k^2.",
      "Use k = 2.",
    ],
    steps: [
      { text: "Chebyshev gives P(|X-mu| >= 2 sigma) <= 1/4." },
      { text: "Therefore P(|X-mu| < 2 sigma) >= 3/4." },
    ],
    answer: "At least 75% lies within two standard deviations.",
  },
  {
    id: "acf-power",
    topicId: "acf",
    level: "hard",
    title: "Lag-Zero Interpretation",
    statement:
      "For a real WSS process X(t), show why R_XX(0) represents the total average power.",
    hints: [
      "Evaluate the definition of autocorrelation at tau = 0.",
      "Interpret E[X(t)^2] physically.",
    ],
    steps: [
      { text: "Set tau=0 in the definition: R_XX(0)=E[X(t)X(t)] = E[X^2(t)]." },
      { text: "For real-valued signals, mean-square value is average power." },
      { text: "Hence lag-zero autocorrelation equals total power." },
    ],
    answer: "R_XX(0)=E[X^2(t)], the mean-square power of the process.",
  },
  {
    id: "poisson-conditional",
    topicId: "poisson",
    level: "monster",
    title: "Conditional Poisson Distribution",
    statement:
      "Given N(4)=8 for a Poisson process, find the distribution of N(2).",
    hints: [
      "Condition on the total count and use uniform arrival locations.",
      "Each of the 8 arrivals falls in [0,2] with probability 1/2.",
    ],
    steps: [
      {
        text: "Conditioned on N(4)=8, the 8 arrival times are distributed like order statistics of 8 i.i.d. Uniform(0,4) variables.",
      },
      {
        text: "Each arrival independently falls in [0,2] with probability 1/2.",
      },
      { text: "Therefore N(2)|N(4)=8 follows Binomial(8, 1/2)." },
    ],
    answer: "N(2) | N(4)=8 ~ Binomial(8, 1/2)",
  },
];

export const graphNodes: ConceptGraphNode[] = [
  {
    id: "rv",
    label: "Random Variable",
    x: 0.12,
    y: 0.16,
    description: "Scalar uncertainty model",
    prereqs: [],
  },
  {
    id: "cdf",
    label: "CDF / PDF / PMF",
    x: 0.34,
    y: 0.16,
    description: "Distribution functions",
    prereqs: ["rv"],
  },
  {
    id: "expect",
    label: "Expectation & Variance",
    x: 0.34,
    y: 0.36,
    description: "Central summaries",
    prereqs: ["rv"],
  },
  {
    id: "cheby",
    label: "Chebyshev",
    x: 0.56,
    y: 0.16,
    description: "Distribution-free bounds",
    prereqs: ["expect"],
  },
  {
    id: "joint",
    label: "Joint Distributions",
    x: 0.56,
    y: 0.36,
    description: "Multivariable uncertainty",
    prereqs: ["rv", "cdf"],
  },
  {
    id: "process",
    label: "Random Process",
    x: 0.26,
    y: 0.62,
    description: "Trajectory-valued randomness",
    prereqs: ["joint"],
  },
  {
    id: "distproc",
    label: "Process Distribution",
    x: 0.46,
    y: 0.62,
    description: "Finite-dimensional laws",
    prereqs: ["process"],
  },
  {
    id: "stationary",
    label: "Stationarity",
    x: 0.62,
    y: 0.62,
    description: "Time invariance",
    prereqs: ["process", "distproc"],
  },
  {
    id: "acf",
    label: "Autocorrelation",
    x: 0.82,
    y: 0.62,
    description: "Lag-domain structure",
    prereqs: ["stationary", "expect"],
  },
  {
    id: "psd",
    label: "PSD",
    x: 0.82,
    y: 0.82,
    description: "Frequency-domain power",
    prereqs: ["acf"],
  },
  {
    id: "poisson",
    label: "Poisson Process",
    x: 0.44,
    y: 0.82,
    description: "Counting rare events",
    prereqs: ["process", "distproc"],
  },
];

export const simulations: SimulationDefinition[] = [
  {
    id: "autocorrelation-lab",
    title: "Autocorrelation Visualizer",
    summary:
      "Interactive lag-domain decay explorer with OU-style parameters and ensemble overlays.",
    status: "ready",
    metrics: ["lag response", "power at zero lag", "envelope decay"],
    topicIds: ["acf", "stationary"],
  },
  {
    id: "psd-analyzer",
    title: "PSD Analyzer",
    summary:
      "Frequency-domain surface prepared for Wiener-Khinchin demonstrations and audio-linked signal inspection.",
    status: "scaffolded",
    metrics: ["peak frequency", "bandwidth", "spectral symmetry"],
    topicIds: ["psd", "acf"],
  },
  {
    id: "poisson-arrivals",
    title: "Poisson Arrival Simulator",
    summary:
      "Arrival staircase with rate control, expected trend overlay, and interarrival summaries.",
    status: "ready",
    metrics: ["count", "expected count", "variance match"],
    topicIds: ["poisson"],
  },
  {
    id: "stationarity-transformer",
    title: "Stationarity Transformer",
    summary:
      "Compare WSS and non-stationary realizations while tracking mean and spread drift over time.",
    status: "scaffolded",
    metrics: ["mean drift", "variance drift", "lag invariance"],
    topicIds: ["stationary", "process"],
  },
];
