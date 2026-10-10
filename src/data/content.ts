// ─────────────────────────────────────────────────────────────
// AI JOURNEY — Content Data Layer
// The complete interactive history, graph, course & sources of AI
// ─────────────────────────────────────────────────────────────

export type Level = "simple" | "deeper" | "deepest";

export interface Source {
  id: string;
  kind: "paper" | "video" | "blog" | "essay" | "article" | "book" | "talk" | "code";
  title: string;
  author: string;
  year: number;
  url: string;
  description: string;
  era: string;
}

export interface Concept {
  id: string;
  name: string;
  era: string;
  tagline: string;
  simple: string;
  deeper: string;
  deepest: string;
  year: number;
  sources: string[]; // source ids
  tags: string[];
}

export interface Era {
  id: string;
  index: number;
  name: string;
  years: string;
  yearStart: number;
  color: string;
  icon: string; // lucide icon name
  tagline: string;
  summary: string;
  concepts: string[]; // concept ids
  milestones: Milestone[];
}

export interface Milestone {
  year: number;
  title: string;
  description: string;
  sourceIds: string[];
}

export interface GraphNode {
  id: string;
  label: string;
  era: string;
  x: number;
  y: number;
  size: number;
  color: string;
  kind: "era" | "concept" | "person" | "paper" | "tech";
  description: string;
}

export interface GraphEdge {
  source: string;
  target: string;
  label?: string;
  weight: number;
}

export interface Chapter {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  era: string;
  conceptIds: string[];
  sources: string[];
  duration: string;
  level: Level;
}

// ═════════════════════════════════════════════════════════════
// ERAS — The 12 chapters of AI history
// ═════════════════════════════════════════════════════════════

export const eras: Era[] = [
  {
    id: "dream",
    index: 0,
    name: "The Dream",
    years: "Pre-1950",
    yearStart: 1936,
    color: "#8b5cf6",
    icon: "sparkles",
    tagline: "Before machines could think, humans imagined they could.",
    summary:
      "The idea of artificial beings stretches back to myths, but the modern dream began with mathematical logic, the theory of computation, and the audacious question: can a machine think?",
    concepts: ["turing-machine", "turing-test", "cybernetics", "logic"],
    milestones: [
      { year: 1936, title: "Turing Machine", description: "Alan Turing formalizes computation with an abstract machine that can simulate any algorithm.", sourceIds: ["turing-1936"] },
      { year: 1943, title: "McCulloch-Pitts Neuron", description: "The first mathematical model of an artificial neuron.", sourceIds: [] },
      { year: 1948, title: "Cybernetics", description: "Norbert Wiener publishes 'Cybernetics', the science of control and communication in animals and machines.", sourceIds: ["wiener-1948"] },
      { year: 1950, title: "Computing Machinery and Intelligence", description: "Turing poses the question 'Can machines think?' and proposes the Imitation Game.", sourceIds: ["turing-1950"] },
    ],
  },
  {
    id: "birth",
    index: 1,
    name: "The Birth of AI",
    years: "1956–1969",
    yearStart: 1956,
    color: "#6366f1",
    icon: "baby",
    tagline: "A summer workshop gives a field its name.",
    summary:
      "At Dartmouth in 1956, John McCarthy coined the term 'Artificial Intelligence'. The early years were wildly optimistic — machines that proved theorems, played checkers, and held conversations.",
    concepts: ["dartmouth", "lisp", "perceptron", "general-problem-solver", "eliza"],
    milestones: [
      { year: 1956, title: "Dartmouth Workshop", description: "The term 'Artificial Intelligence' is coined; the field is founded.", sourceIds: ["dartmouth-1956"] },
      { year: 1957, title: "Perceptron", description: "Frank Rosenblatt builds the Perceptron, an early neural network for pattern recognition.", sourceIds: ["rosenblatt-1957"] },
      { year: 1958, title: "LISP", description: "John McCarthy invents LISP, the language of AI for decades.", sourceIds: [] },
      { year: 1966, title: "ELIZA", description: "Joseph Weizenbaum's chatbot fools users into believing they're talking to a therapist.", sourceIds: ["weizenbaum-1966"] },
    ],
  },
  {
    id: "golden",
    index: 2,
    name: "The Golden Age",
    years: "1956–1974",
    yearStart: 1956,
    color: "#3b82f6",
    icon: "sun",
    tagline: "Unbridled optimism — machines will do anything within years.",
    summary:
      "Funding poured in. Symbolic AI dominated: logic, search, problem-solving. The dominant metaphor was the brain as symbol-manipulator. Progress seemed inevitable.",
    concepts: ["symbolic-ai", "search", "logic-theorist", "microblocks"],
    milestones: [
      { year: 1959, title: "Logic Theorist", description: "Newell & Simon's program proves theorems in Principia Mathematica — the first AI program.", sourceIds: [] },
      { year: 1965, title: "Expert Systems Seed", description: "DENDRAL project begins — early expert system for chemical analysis.", sourceIds: [] },
      { year: 1969, title: "Perceptrons Book", description: "Minsky & Papert publish 'Perceptrons', exposing limits of single-layer networks — contributing to the first AI winter.", sourceIds: ["minsky-papert-1969"] },
    ],
  },
  {
    id: "winter1",
    index: 3,
    name: "The First AI Winter",
    years: "1974–1980",
    yearStart: 1974,
    color: "#64748b",
    icon: "snowflake",
    tagline: "Funding freezes. The dreams melt.",
    summary:
      "Over-promising and under-delivering led to drastic funding cuts. The Perceptrons book and the Lighthill report convinced governments that AI had failed to deliver on its grand promises.",
    concepts: ["ai-winter", "lighthill"],
    milestones: [
      { year: 1973, title: "Lighthill Report", description: "James Lighthill's report to the UK Science Research Council savages AI research.", sourceIds: [] },
      { year: 1974, title: "Funding Collapse", description: "DARPA cuts funding for AI research; the winter begins.", sourceIds: [] },
    ],
  },
  {
    id: "expert",
    index: 4,
    name: "The Expert Systems Era",
    years: "1980–1987",
    yearStart: 1980,
    color: "#10b981",
    icon: "brain",
    tagline: "Rules, rules, rules — knowledge as if-then logic.",
    summary:
      "AI found a practical niche: expert systems that encoded human expertise as rules. Companies spent billions. But the systems were brittle, expensive to maintain, and couldn't learn.",
    concepts: ["expert-systems", "mycin", "backpropagation", "connectionism"],
    milestones: [
      { year: 1972, title: "MYCIN", description: "Stanford's expert system for diagnosing blood infections — a landmark in applied AI.", sourceIds: [] },
      { year: 1986, title: "Backpropagation Popularized", description: "Rumelhart, Hinton & Williams publish the backpropagation algorithm for training multi-layer networks.", sourceIds: ["backprop-1986"] },
      { year: 1987, title: "Expert Systems Crash", description: "The market collapses as expert systems prove too brittle and costly.", sourceIds: [] },
    ],
  },
  {
    id: "winter2",
    index: 5,
    name: "The Second AI Winter",
    years: "1987–1993",
    yearStart: 1987,
    color: "#64748b",
    icon: "snowflake",
    tagline: "The bubble bursts again. AI becomes a dirty word.",
    summary:
      "The expert systems market collapsed. Funding dried up again. Researchers rebranded — 'machine learning', 'informatics', 'analytics'. The field went underground and rebuilt itself on statistics.",
    concepts: ["ai-winter", "statistics"],
    milestones: [
      { year: 1988, title: "Soar Architecture", description: "Laird, Newell & Rosenbloom develop Soar, a cognitive architecture for general intelligence.", sourceIds: [] },
      { year: 1989, title: "Convolutional Networks", description: "Yann LeCun applies backprop to convolutional networks for handwritten digit recognition.", sourceIds: ["lecun-1989"] },
    ],
  },
  {
    id: "quiet",
    index: 6,
    name: "The Quiet Revolution",
    years: "1993–2011",
    yearStart: 1993,
    color: "#f59e0b",
    icon: "trending-up",
    tagline: "AI rebuilds itself in the shadows — with math, not hype.",
    summary:
      "Stripped of hype, AI transformed into a rigorous statistical discipline. SVMs, Bayesian methods, and probabilistic models dominated. IBM's Deep Blue beat Kasparov. The foundation for the deep learning explosion was laid quietly.",
    concepts: ["svm", "deep-blue", "bayesian", "random-forests", "hinton"],
    milestones: [
      { year: 1997, title: "Deep Blue beats Kasparov", description: "IBM's computer defeats world chess champion Garry Kasparov.", sourceIds: [] },
      { year: 1998, title: "Gradient Descent for Vision", description: "LeCun's LeNet-5 reads ZIP codes with CNNs.", sourceIds: ["lecun-1998"] },
      { year: 2006, title: "Deep Belief Networks", description: "Hinton, Osindero & Teh show how to train deep networks layer by layer — the spark of the deep learning era.", sourceIds: ["hinton-2006"] },
    ],
  },
  {
    id: "deep-learning",
    index: 7,
    name: "The Deep Learning Explosion",
    years: "2012–2017",
    yearStart: 2012,
    color: "#ef4444",
    icon: "flame",
    tagline: "GPUs + big data + deep nets = a revolution.",
    summary:
      "In 2012, AlexNet crushed the ImageNet competition. Deep neural networks, trained on GPUs, became the dominant paradigm. Vision, speech, and translation were transformed.",
    concepts: ["alexnet", "gpus", "imagenet", "batch-norm", "resnet", "lstm", "dropout", "word2vec"],
    milestones: [
      { year: 2012, title: "AlexNet", description: "Krizhevsky, Sutskever & Hinton's deep CNN wins ImageNet by a huge margin.", sourceIds: ["alexnet-2012"] },
      { year: 2014, title: "GANs", description: "Ian Goodfellow invents Generative Adversarial Networks.", sourceIds: ["gan-2014"] },
      { year: 2015, title: "ResNet", description: "He et al. introduce residual connections, enabling networks 100+ layers deep.", sourceIds: ["resnet-2015"] },
      { year: 2016, title: "AlphaGo", description: "DeepMind's AlphaGo defeats world Go champion Lee Sedol.", sourceIds: ["alphago-2016"] },
    ],
  },
  {
    id: "transformer",
    index: 8,
    name: "The Transformer Era",
    years: "2017–2020",
    yearStart: 2017,
    color: "#ec4899",
    icon: "zap",
    tagline: "'Attention is All You Need' — the architecture that changed everything.",
    summary:
      "The Transformer architecture replaced recurrence with self-attention. Models became massively parallel, pre-trainable on vast text, and transferable. BERT and GPT kicked off the era of pre-trained foundation models.",
    concepts: ["transformer", "attention", "bert", "gpt", "self-attention", "transfer-learning"],
    milestones: [
      { year: 2017, title: "Transformer", description: "Vaswani et al. publish 'Attention Is All You Need'.", sourceIds: ["transformer-2017"] },
      { year: 2018, title: "BERT", description: "Google's BERT sets new standards across NLP tasks via bidirectional pre-training.", sourceIds: ["bert-2018"] },
      { year: 2018, title: "GPT-1", description: "OpenAI demonstrates generative pre-training of transformers.", sourceIds: ["gpt-2018"] },
      { year: 2020, title: "GPT-3", description: "175 billion parameters — few-shot learning emerges at scale.", sourceIds: ["gpt3-2020"] },
    ],
  },
  {
    id: "llm",
    index: 9,
    name: "The LLM & Foundation Model Era",
    years: "2020–2023",
    yearStart: 2020,
    color: "#a855f7",
    icon: "rocket",
    tagline: "Scale is all you need — then alignment becomes the problem.",
    summary:
      "Models grew from millions to hundreds of billions of parameters. In-context learning, chain-of-thought, and RLHF made LLMs useful. Diffusion models revolutionized image generation. The race to AGI began.",
    concepts: ["scaling-laws", "rlhf", "chain-of-thought", "diffusion", "stable-diffusion", "midjourney", "chatgpt", "instructgpt"],
    milestones: [
      { year: 2020, title: "Scaling Laws", description: "Kaplan et al. publish scaling laws showing predictable performance gains from scale.", sourceIds: ["scaling-2020"] },
      { year: 2021, title: "DALL·E & Codex", description: "OpenAI releases DALL·E (text-to-image) and Codex (code generation).", sourceIds: [] },
      { year: 2022, title: "Stable Diffusion & ChatGPT", description: "Stable Diffusion opens image generation; ChatGPT reaches 100M users in 2 months.", sourceIds: ["stablediffusion-2022"] },
      { year: 2023, title: "GPT-4 & open-source LLMs", description: "GPT-4 launches; LLaMA, Mistral, and the open-source movement follows.", sourceIds: ["gpt4-2023"] },
    ],
  },
  {
    id: "agents",
    index: 10,
    name: "The Agent & Reasoning Era",
    years: "2023–2025",
    yearStart: 2023,
    color: "#06b6d4",
    icon: "bot",
    tagline: "Models don't just answer — they plan, reason, use tools, and act.",
    summary:
      "LLMs became agents: they browse, write code, call tools, and multi-step reason. Test-time compute (o1, DeepSeek-R1) unlocked harder reasoning. Multimodal models merged vision, language, and action.",
    concepts: ["agents", "rag", "function-calling", "o1", "reasoning", "multimodal", "mcp", "tool-use"],
    milestones: [
      { year: 2023, title: "AutoGPT & agent frameworks", description: "The open-source agent explosion begins with AutoGPT, then LangChain, CrewAI, AutoGen.", sourceIds: [] },
      { year: 2023, title: "RAG becomes standard", description: "Retrieval-Augmented Generation becomes the default way to ground LLMs.", sourceIds: [] },
      { year: 2024, title: "o1 — test-time compute", description: "OpenAI's o1 shows that scaling inference-time reasoning unlocks harder problems.", sourceIds: ["o1-2024"] },
      { year: 2025, title: "DeepSeek-R1 & open reasoning", description: "DeepSeek-R1 matches o1 with open weights; reasoning goes mainstream.", sourceIds: ["deepseek-r1-2025"] },
      { year: 2025, title: "MCP — Model Context Protocol", description: "Anthropic's MCP standardizes how models connect to tools and data.", sourceIds: ["mcp-2024"] },
    ],
  },
  {
    id: "present",
    index: 11,
    name: "The Present & Beyond",
    years: "2025–Future",
    yearStart: 2025,
    color: "#22d3ee",
    icon: "infinity",
    tagline: "Multimodal, embodied, autonomous — the path to AGI.",
    summary:
      "The frontier: world models that understand physics, models that act autonomously for days, robotics powered by AI, and the open question of AGI itself. The journey continues.",
    concepts: ["world-models", "agi", "robotics", "multimodal-agents", "long-horizon"],
    milestones: [
      { year: 2025, title: "AI in robotics", description: "Humanoid robots powered by vision-language-action models enter real warehouses and factories.", sourceIds: [] },
      { year: 2025, title: "Autonomous agents", description: "Agents complete multi-day software engineering tasks autonomously.", sourceIds: [] },
      { year: 2026, title: "The road ahead", description: "World models, scientific discovery agents, and the path to AGI define the next era.", sourceIds: [] },
    ],
  },
];

// ═════════════════════════════════════════════════════════════
// CONCEPTS — Deep explanations at 3 levels
// ═════════════════════════════════════════════════════════════

export const concepts: Concept[] = [
  {
    id: "turing-machine",
    name: "Turing Machine",
    era: "dream",
    tagline: "The abstract machine that defined what 'computing' means.",
    simple:
      "Imagine a very long strip of paper divided into squares. A machine reads one square at a time, follows simple rules, and can write, erase, or move. Alan Turing proved this simple idea can compute anything that is computable. It's the theoretical foundation of every computer.",
    deeper:
      "A Turing machine consists of an infinite tape, a read/write head, and a state register. At each step, it reads the symbol under the head, consults a transition table (its program), writes a symbol, moves left or right, and changes state. Despite its simplicity, it captures the essence of algorithmic computation — the Church-Turing thesis claims any effectively computable function can be computed by a Turing machine.",
    deepest:
      "Formally, a Turing machine is a 7-tuple (Q, Σ, Γ, δ, q₀, q_accept, q_reject) where Q is a finite set of states, Σ the input alphabet, Γ the tape alphabet, δ: Q×Γ → Q×Γ×{L,R} the transition function. The halting problem — determining whether an arbitrary machine halts on a given input — is undecidable, a fundamental limit of computation. Turing machines remain the standard model for complexity theory (P vs NP is defined in terms of them).",
    year: 1936,
    sources: ["turing-1936"],
    tags: ["computation", "theory", "foundation"],
  },
  {
    id: "turing-test",
    name: "The Turing Test",
    era: "dream",
    tagline: "Can a machine fool you into thinking it's human?",
    simple:
      "Alan Turing proposed a game: a human talks to both a machine and another human through text-only messages. If the human can't reliably tell which is which, the machine 'passes' — it's said to think. It's not a perfect test, but it framed the AI question in a practical way.",
    deeper:
      "The Imitation Game operationalizes the question 'can machines think?' as a behavioral test. Turing predicted that by 2000, a machine would fool 30% of human judges after 5 minutes of conversation. Critics (Searle's Chinese Room, Block's Blockhead) argue passing only proves simulation, not understanding. Modern LLMs now pass narrow versions, reigniting the debate.",
    deepest:
      "Searle's Chinese Room argument (1980) claims syntax manipulation can never produce semantics — a system could pass the test without any understanding. Replies include the Systems Reply (the whole system understands) and the Robot Reply (grounding in the real world). The test conflates intelligence with indistinguishability; it says nothing about consciousness, and its pass/fail threshold is fundamentally ill-posed for a graded phenomenon like intelligence.",
    year: 1950,
    sources: ["turing-1950", "searle-1980"],
    tags: ["philosophy", "evaluation", "consciousness"],
  },
  {
    id: "cybernetics",
    name: "Cybernetics",
    era: "dream",
    tagline: "The science of feedback, control, and communication.",
    simple:
      "Norbert Wiener studied how machines and living things control themselves through feedback — like a thermostat that turns heat on and off to stay at a set temperature. This idea of feedback loops became a cornerstone of both control theory and early AI.",
    deeper:
      "Cybernetics unified information theory, control theory, and biological regulation through the concept of negative feedback: a system compares its state to a goal and corrects the difference. McCulloch-Pitts neurons (1943) were explicitly cybernetic — logical models of neural activity. The Macy Conferences (1946–1953) brought together Wiener, von Neumann, Mead, Bateson, and others, forming the intellectual soil from which AI grew.",
    deepest:
      "Second-order cybernetics (von Foerster, Maturana, Varela) introduced the observer into the system — autopoiesis (self-production) and constructivism. The core formal concept is the feedback loop governed by control law u(t) = K·e(t) where e = r − y (reference minus output). This directly inspired reinforcement learning's reward/penalty loop and the error-correction view of learning. Cybernetics also birthed systems thinking, influencing everything from management science to family therapy.",
    year: 1948,
    sources: ["wiener-1948"],
    tags: ["control", "feedback", "interdisciplinary"],
  },
  {
    id: "logic",
    name: "Mathematical Logic",
    era: "dream",
    tagline: "The language of reasoning — and the first AI programs.",
    simple:
      "Logic is the study of correct reasoning. If all humans are mortal, and Socrates is human, then Socrates is mortal. Early AI researchers tried to make computers reason the same way — using formal rules of logic to derive conclusions from facts.",
    deeper:
      "First-order logic (FOL) provides predicates, quantifiers (∀, ∃), and inference rules (modus ponens, resolution). The Logic Theorist (1956) proved theorems in Principia Mathematica. Resolution (Robinson, 1965) became the workhorse of automated theorem proving. Prolog (Colmerauer, 1972) made logic programming practical. The tension: logic is sound but brittle — real-world knowledge doesn't fit clean axioms.",
    deepest:
      "Gödel's incompleteness theorems (1931) show any consistent formal system containing arithmetic has true unprovable statements — a fundamental limit. The frame problem (McCarthy & Hayes, 1969) shows representing what doesn't change when an action occurs is computationally explosive. Situation calculus models change via situations = histories of actions. Non-monotonic logic (default logic, circumscription) allows retracting conclusions — reasoning with incomplete knowledge. These results motivate probabilistic approaches.",
    year: 1936,
    sources: ["turing-1936"],
    tags: ["logic", "reasoning", "foundation"],
  },
  {
    id: "dartmouth",
    name: "The Dartmouth Workshop",
    era: "birth",
    tagline: "The summer that named a field.",
    simple:
      "In 1956, John McCarthy, Marvin Minsky, Claude Shannon, and Nathaniel Rochester organized a summer workshop at Dartmouth College. They proposed that 'every aspect of learning or any other feature of intelligence can in principle be so precisely described that a machine can be made to simulate it.' The term 'Artificial Intelligence' was born.",
    deeper:
      "The proposal's key claim — that intelligence can be precisely described and simulated — was breathtakingly optimistic. McCarthy coined 'AI' partly to escape association with cybernetics. The attendees became the founders of AI labs at MIT, Stanford, and CMU. The symbolic paradigm dominated for two decades. The workshop set the research agenda: problem-solving, language, learning, abstraction.",
    deepest:
      "The Dartmouth proposal committed to physical symbol system hypothesis (Newell & Simon, 1976): a physical symbol system has the necessary and sufficient means for general intelligent action. This claim drove symbolic AI for 30 years and remains contested — connectionists argue intelligence emerges from subsymbolic dynamics, not symbol manipulation. The workshop also established the field's characteristic optimism bias: predictions of human-level AI within a generation, repeatedly wrong.",
    year: 1956,
    sources: ["dartmouth-1956"],
    tags: ["history", "founding", "symbolic-ai"],
  },
  {
    id: "lisp",
    name: "LISP",
    era: "birth",
    tagline: "The language that made AI programmable.",
    simple:
      "John McCarthy invented LISP in 1958. It was designed for symbolic computation — manipulating lists of symbols, which is exactly what early AI programs needed. It introduced ideas like garbage collection, recursion, and treating code as data (homoiconicity). It was the AI language for 30+ years.",
    deeper:
      "LISP's core data structure is the linked list; its core operation is the S-expression. Garbage collection (1959) automated memory management for the first time. The REPL, dynamic typing, and first-class functions made it interactive and expressive. MacLISP, InterLisp, and Common LISP were major dialects. LISP machines (1980s) were specialized computers for AI. The second AI winter killed the LISP machine market.",
    deepest:
      "LISP's homoiconicity (code as data) enables macros — syntactic abstraction that lets programmers extend the language itself. The eval/apply metacircular interpreter shows the language can implement itself. LISP demonstrated that symbolic AI needs a representation where programs and data share structure. Modern descendants: Clojure, Scheme, Racket. The lesson: language design shapes what's expressible — LISP made meta-reasoning natural, Python does the same for ML today.",
    year: 1958,
    sources: ["dartmouth-1956"],
    tags: ["programming", "language", "symbolic-ai"],
  },
  {
    id: "perceptron",
    name: "The Perceptron",
    era: "birth",
    tagline: "The first learning machine — and the controversy that killed it for decades.",
    simple:
      "Frank Rosenblatt built the Perceptron in 1957 — a machine that could learn to classify patterns. It's a simple neural network: inputs get weighted, summed, and passed through a threshold. If it guesses wrong, the weights adjust. It was the first machine that learned from data.",
    deeper:
      "The Perceptron learning rule adjusts weights by w ← w + α(y − ŷ)x — a form of gradient descent on a step function. The perceptron convergence theorem guarantees learning for linearly separable data. But Minsky & Papert (1969) proved it can't solve XOR — not linearly separable. The book's pessimism + the perceptron's real limitations contributed to the first AI winter and decades of neural network neglect.",
    deepest:
      "The perceptron is a single-layer neural network: f(x) = σ(w·x + b) with σ the Heaviside step. XOR requires a hidden layer — multi-layer perceptrons (MLPs) can solve it, but the learning rule doesn't extend. Backpropagation (Rumelhart et al., 1986) fixes this via the chain rule. The modern neuron is σ(w·x + b) with σ = ReLU — a smooth, differentiable threshold. The perceptron is the single ancestor of every deep network today.",
    year: 1957,
    sources: ["rosenblatt-1957", "minsky-papert-1969"],
    tags: ["neural-networks", "learning", "controversy"],
  },
  {
    id: "general-problem-solver",
    name: "General Problem Solver",
    era: "birth",
    tagline: "The first program that 'thinks' by means-end analysis.",
    simple:
      "Newell and Simon built the GPS in 1957. Instead of being programmed for one task, GPS used general problem-solving: it broke big problems into sub-problems and worked backwards from the goal. It could solve puzzles, logic problems, and even prove theorems — the first general AI program.",
    deeper:
      "GPS used means-end analysis: compare current state to goal state, find an operator that reduces the difference, apply it, recurse. It introduced the separation of problem knowledge (operators) from control strategy (search). GPS influenced SOAR and modern planning. Its limits: it needed hand-coded operators and couldn't learn them — the knowledge acquisition bottleneck.",
    deepest:
      "GPS formalized problem-solving as state-space search: states, operators (state transitions), goal test, path cost. This is the foundation of automated planning (STRIPS, 1971), which underlies robotics task planning today. Means-end analysis is a heuristic search that reduces the goal-state distance. The frame problem persists: GPS must specify all preconditions and effects. Modern planners (PDDL, SATPLAN) scale this to millions of states via heuristics and compilation.",
    year: 1957,
    sources: ["dartmouth-1956"],
    tags: ["planning", "search", "reasoning"],
  },
  {
    id: "eliza",
    name: "ELIZA",
    era: "birth",
    tagline: "The chatbot that made people pour their hearts out to a script.",
    simple:
      "ELIZA (1966) was Joseph Weizenbaum's program that simulated a Rogerian psychotherapist. It didn't understand anything — it just pattern-matched your words and reflected them back. But people confided in it deeply. Weizenbaum was so disturbed by this that he became an AI critic.",
    deeper:
      "ELIZA's DOCTOR script used keyword matching and template-based rephrasing. 'I am sad' → 'How long have you been sad?' It exploited the tendency to anthropomorphize. The ELIZA effect — attributing understanding to surface behavior — is now more relevant than ever with LLMs. Weizenbaum's 1976 book 'Computer Power and Human Reason' argued some decisions should never be delegated to machines.",
    deepest:
      "ELIZA operates on surface syntax with zero semantics — a pure symbol-manipulation system. Its effectiveness reveals that therapeutic dialogue is largely pattern-mirror, which is both its power and its danger. Modern LLMs are ELIZA scaled by 10¹⁰ — same architecture of pattern completion, vastly more capable. The ELIZA effect is now the alignment problem: if users attribute understanding, they'll trust systems that don't understand. The 'stochastic parrot' debate is the ELIZA debate reborn.",
    year: 1966,
    sources: ["weizenbaum-1966"],
    tags: ["nlp", "chatbot", "philosophy", "history"],
  },
  {
    id: "symbolic-ai",
    name: "Symbolic AI",
    era: "golden",
    tagline: "Intelligence as symbol manipulation — the mind as a computer program.",
    simple:
      "Symbolic AI (or 'Good Old-Fashioned AI') assumed intelligence = manipulating symbols according to rules. Knowledge was explicitly represented as facts and rules; reasoning was logical inference. It dominated AI from the 1950s to the 1980s.",
    deeper:
      "The physical symbol system hypothesis: symbols are physical patterns, and manipulating them (creating, combining, transforming) suffices for general intelligence. Systems used knowledge bases + inference engines. It worked for well-defined problems (theorem proving, chess) but failed on perception, common sense, and learning. The frame problem and qualification problem showed the combinatorial explosion of real-world knowledge.",
    deepest:
      "Symbolic AI's core failure is the symbol grounding problem (Harnad, 1990): symbols derive meaning only from other symbols, never from the world. Sub-symbolic approaches (connectionism, embodied cognition) ground symbols in sensorimotor experience. Neuro-symbolic AI (modern hybrid) tries to combine learning (neural) with reasoning (symbolic). The debate mirrors rationalism vs empiricism — and the answer is almost certainly both.",
    year: 1956,
    sources: ["minsky-papert-1969"],
    tags: ["symbolic-ai", "reasoning", "paradigm"],
  },
  {
    id: "search",
    name: "Search & Heuristics",
    era: "golden",
    tagline: "The engine under every AI system — finding paths through possibility space.",
    simple:
      "Many AI problems are searches: find a path through a maze, a move in chess, a proof in logic. Search algorithms explore possible choices systematically. Heuristics ('rules of thumb') guide the search toward promising options, like 'in chess, control the center.'",
    deeper:
      "Uninformed search (BFS, DFS, uniform-cost) explores blindly. Informed search (A*, greedy best-first) uses a heuristic function h(n) to estimate distance to goal. A* is optimal if h is admissible (never overestimates). Game search uses minimax with alpha-beta pruning — exploring only the branches that matter. Adversarial search models opponents.",
    deepest:
      "A* finds shortest paths when h is admissible and consistent. IDA* trades memory for time. Monte Carlo Tree Search (MCTS) — used by AlphaGo — builds the search tree asymmetrically using random rollouts and the UCB1 bandit formula: exploit promising branches while exploring uncertain ones. Modern reasoning models (o1, R1) effectively do search over chain-of-thought — test-time compute as search.",
    year: 1956,
    sources: ["dartmouth-1956"],
    tags: ["search", "algorithms", "planning"],
  },
  {
    id: "logic-theorist",
    name: "Logic Theorist",
    era: "golden",
    tagline: "The first AI program — proved math theorems by machine.",
    simple:
      "In 1959, Newell and Simon's Logic Theorist proved theorems from Principia Mathematica — the same math foundation Bertrand Russell and Alfred North Whitehead had written by hand. A machine was doing formal reasoning for the first time.",
    deeper:
      "It used heuristic search over logical expressions, applying rules of inference. It even found a more elegant proof than Russell & Whitehead for one theorem. It demonstrated that problem-solving = search through a space of symbolic expressions. It was the proof-of-concept for symbolic AI.",
    deepest:
      "Logic Theorist used a tree of logical expressions and applied inference rules as operators. Its heuristics (means-end analysis, subgoaling) anticipated modern automated theorem provers (Vampire, E, Lean). The program is the ancestor of all symbolic reasoning systems — including modern proof assistants that verify hardware and software. It showed that theorem proving, once thought to require human insight, could be mechanized.",
    year: 1959,
    sources: ["dartmouth-1956"],
    tags: ["logic", "theorem-proving", "reasoning"],
  },
  {
    id: "ai-winter",
    name: "AI Winters",
    era: "winter1",
    tagline: "When hype collapses, funding freezes, and AI goes underground.",
    simple:
      "AI has had two major 'winters' — periods when progress disappointed and funding collapsed. The first (1974–1980) followed the Perceptrons book and the Lighthill report. The second (1987–1993) followed the expert systems crash. Each time, AI rebranded and rebuilt on stronger foundations.",
    deeper:
      "The cycle: hype → high expectations → failure to deliver → funding cuts → quiet rebuilding. The winters weren't wasted — they forced the field to abandon weak approaches and build rigorous ones. The survivors (Hinton, LeCun, Bengio) persisted through both winters on neural networks, which were considered dead. The lesson: hype cycles are inevitable, but foundational research survives them.",
    deepest:
      "AI winters are driven by the gap between promise and capability — the 'AI effect' (once something works, it's no longer considered AI). Funding follows perceived progress. The winters accelerated the shift from symbolic to statistical AI: expert systems failed on brittleness, while neural networks (revived by backprop) needed the quiet years to mature. Modern AI (post-2012) has avoided winter by delivering real commercial value — but the cycle remains a structural risk.",
    year: 1974,
    sources: ["minsky-papert-1969", "backprop-1986"],
    tags: ["history", "funding", "hype-cycle"],
  },
  {
    id: "expert-systems",
    name: "Expert Systems",
    era: "expert",
    tagline: "Encapsulating human expertise as rules — the first commercial AI.",
    simple:
      "Expert systems encoded what human experts know as if-then rules. 'If the patient has a fever AND a rash, THEN suspect measles.' Systems like MYCIN diagnosed infections and XCON configured computers. They were the first AI to make real money.",
    deeper:
      "Architecture: knowledge base (rules + facts) + inference engine (forward/backward chaining) + explanation facility. MYCIN (1972) used backward chaining with certainty factors. XCON/R1 (1980) saved DEC $40M/year configuring VAX systems. The bottleneck: knowledge acquisition from experts was slow and expensive. The systems couldn't learn or handle exceptions gracefully.",
    deepest:
      "Expert systems are rule-based production systems: working memory, rule base, inference engine. Forward chaining (data-driven) vs backward chaining (goal-driven). Rete algorithm (Forgy, 1982) optimized pattern matching. The CYC project (1984–) attempted to encode all common sense as explicit rules — a 35-year effort that largely failed, proving common sense resists formalization. Expert systems died when ML learned rules from data instead.",
    year: 1972,
    sources: ["backprop-1986"],
    tags: ["expert-systems", "rules", "commercial-ai"],
  },
  {
    id: "mycin",
    name: "MYCIN",
    era: "expert",
    tagline: "The doctor in the machine — diagnosing infections with rules.",
    simple:
      "MYCIN (Stanford, 1972) diagnosed bacterial infections and recommended antibiotics. It asked doctors questions, applied ~600 rules, and explained its reasoning. It performed as well as specialists — but was never used in practice.",
    deeper:
      "MYCIN used backward chaining: start from a hypothesis (infection), ask questions to confirm/deny, combine certainty factors (a proto-probability). Its explanation facility was revolutionary — it showed its rules. The Stanford group later built EMYCIN, a shell for building expert systems. MYCIN's failure in practice (legal liability, integration) became a cautionary tale.",
    deepest:
      "MYCIN's certainty factor calculus combined evidence: CF(h,e) = CF(h,e₁) ⊕ CF(h,e₂) with ⊕ defined to avoid double-counting. It anticipated modern probabilistic graphical models — Bayesian networks (Pearl, 1988) made the same ideas rigorous. MYCIN is the bridge from heuristic rules to probabilistic reasoning, and its explanation facility is the ancestor of XAI (explainable AI).",
    year: 1972,
    sources: ["backprop-1986"],
    tags: ["expert-systems", "medicine", "reasoning"],
  },
  {
    id: "backpropagation",
    name: "Backpropagation",
    era: "expert",
    tagline: "The algorithm that made deep learning possible.",
    simple:
      "Backpropagation is how neural networks learn. The network makes a guess, sees how wrong it was, and adjusts every weight slightly to reduce the error — propagating the error backwards through the network. It was popularized in 1986 and made training multi-layer networks practical.",
    deeper:
      "The chain rule from calculus: to minimize error E, each weight w updates as w ← w − η(∂E/∂w). The gradient ∂E/∂w is computed backwards from output to input, reusing intermediate derivatives. This made deep networks trainable — the key that unlocked everything after 2012. Before backprop, only single-layer networks (perceptrons) were trainable.",
    deepest:
      "Backprop computes ∂E/∂w for all weights via reverse-mode automatic differentiation — traversing the computation graph backward, applying the chain rule at each node. Computational cost ≈ forward pass. It's mathematically equivalent to reverse-mode AD, introduced by Linnainmaa (1970) and applied to neural nets by Werbos (1974). Modern frameworks (PyTorch, JAX) build dynamic computation graphs and run backprop automatically. Vanishing/exploding gradients (Hochreiter, 1991) motivated LSTM, ResNet, normalization.",
    year: 1986,
    sources: ["backprop-1986"],
    tags: ["learning", "neural-networks", "algorithm"],
  },
  {
    id: "connectionism",
    name: "Connectionism",
    era: "expert",
    tagline: "Intelligence from networks of simple units — the neural network philosophy.",
    simple:
      "Connectionism is the idea that intelligence emerges from networks of simple, neuron-like units — not from explicit symbols and rules. Knowledge is stored in the connection strengths (weights), not in individual nodes. Learning = adjusting weights.",
    deeper:
      "Parallel distributed processing (PDP, 1986) formalized connectionism: distributed representations, graceful degradation, learning via weight adjustment. It contrasted with symbolic AI's explicit rules. Connectionism explained generalization, pattern completion, and learning from examples — things symbolic AI couldn't. It became the dominant paradigm after 2012.",
    deepest:
      "Connectionist networks approximate universal function approximators (Cybenko, 1989; Hornik, 1991). Knowledge is stored in weight matrices as distributed representations — each concept is a pattern across many units, each unit participates in many concepts. This gives graceful degradation, content-addressable memory, and compositional structure. The weight-space view: learning navigates a high-dimensional loss landscape via gradient descent. Modern transformers are connectionist systems with 10¹² weights.",
    year: 1986,
    sources: ["backprop-1986"],
    tags: ["neural-networks", "connectionism", "philosophy"],
  },
  {
    id: "svm",
    name: "Support Vector Machines",
    era: "quiet",
    tagline: "The elegant math that dominated machine learning before deep learning.",
    simple:
      "SVMs find the best boundary between classes — the line (or plane) that maximizes the margin between them. They were the state of the art for classification in the 1990s–2000s, before deep learning took over.",
    deeper:
      "SVMs solve a convex optimization: find the hyperplane maximizing the margin (distance to nearest points). Support vectors are the critical points on the margin. Kernel trick: map data to higher dimensions to make it linearly separable — RBF, polynomial kernels. SVMs are principled, have few hyperparameters, and work well on small data.",
    deepest:
      "SVMs are regularized margin maximizers: minimize ½||w||² + CΣξᵢ subject to yᵢ(w·xᵢ + b) ≥ 1 − ξᵢ. The dual formulation depends only on dot products → kernel trick. The RBF kernel k(x,x') = exp(−γ||x−x'||²) maps to infinite dimensions. SVMs were displaced by deep learning on large datasets but remain strong on small/structured data. The margin theory (VC dimension) gives generalization guarantees.",
    year: 1995,
    sources: ["hinton-2006"],
    tags: ["machine-learning", "classification", "kernel-methods"],
  },
  {
    id: "deep-blue",
    name: "Deep Blue",
    era: "quiet",
    tagline: "The machine that beat the world chess champion — by brute force.",
    simple:
      "In 1997, IBM's Deep Blue defeated world chess champion Garry Kasparov. It evaluated 200 million positions per second — brute-force search, not learning. It was a symbolic AI landmark, but it didn't 'understand' chess; it just searched deeper.",
    deeper:
      "Deep Blue used specialized VLSI chips for move generation, alpha-beta search to depth 6–8 (20 ply with extensions), and a hand-tuned evaluation function by grandmasters. It exploited Kasparov's psychological state in the match. Critics noted it had no learning and couldn't transfer. Kasparov proposed 'advanced chess' — human + machine — which proved stronger than either alone.",
    deepest:
      "Deep Blue's evaluation had ~8,000 features tuned by hand. Its search used singular extensions (search deeper on forcing lines) and transposition tables. It was the last great symbolic-AI achievement. AlphaGo (2016) replaced hand-tuned evaluation with learned value/policy networks + MCTS — a paradigm shift from human-coded knowledge to machine-learned knowledge. Kasparov's legacy: humans + AI > AI alone (centaur chess).",
    year: 1997,
    sources: ["hinton-2006"],
    tags: ["games", "search", "history"],
  },
  {
    id: "bayesian",
    name: "Bayesian Methods",
    era: "quiet",
    tagline: "Reasoning under uncertainty with probability.",
    simple:
      "Bayesian methods use probability to represent uncertainty. Instead of a single answer, you get a distribution — '70% chance of rain.' Bayes' theorem updates beliefs when new evidence arrives. These methods dominated ML before deep learning and are resurging in modern AI.",
    deeper:
      "Bayes' theorem: P(hypothesis|data) = P(data|hypothesis)·P(hypothesis) / P(data). It updates prior beliefs with evidence. Bayesian networks (Pearl, 1988) represent dependencies as graphs. Naive Bayes is a simple but effective classifier. Gaussian processes give uncertainty estimates for regression. Modern Bayesian deep learning quantifies model uncertainty.",
    deepest:
      "Probabilistic graphical models: directed (Bayesian networks) and undirected (Markov random fields). Inference: exact (variable elimination, junction tree) and approximate (loopy belief propagation, MCMC, variational inference). Variational inference minimizes KL(q||p) — the foundation of VAEs and much of modern generative modeling. Bayesian deep learning treats weights as distributions — enabling uncertainty quantification, continual learning, and principled regularization.",
    year: 1998,
    sources: ["hinton-2006"],
    tags: ["probability", "uncertainty", "machine-learning"],
  },
  {
    id: "hinton",
    name: "Geoffrey Hinton & The Deep Learning Revival",
    era: "quiet",
    tagline: "The man who kept neural networks alive through the winters.",
    simple:
      "Geoffrey Hinton spent 30 years believing in neural networks when almost no one else did. His 2006 paper on deep belief networks showed how to train deep networks — sparking the revolution. He won the 2018 Turing Prize. He's the godfather of deep learning.",
    deeper:
      "Hinton's contributions span decades: Boltzmann machines (1983), backprop popularization (1986), deep belief networks (2006), dropout (2012), AlexNet (2012), capsule networks (2017), forward-forward algorithm (2022). He persisted through both AI winters. His students (Ilya Sutskever, Yann LeCun, Ruslan Salakhutdinov) became the leaders of the field. He left Google in 2023 to speak freely about AI risk.",
    deepest:
      "Hinton's 2006 deep belief networks used layer-wise pre-training (restricted Boltzmann machines) to initialize deep networks — solving the vanishing gradient problem before ReLU/resnets made it unnecessary. His work established that deep representations learn hierarchical features: edges → textures → parts → objects. His digital intelligence thesis (2024): digital intelligence can exceed biological intelligence because it can share copies instantly and run much faster than brains.",
    year: 2006,
    sources: ["hinton-2006"],
    tags: ["people", "deep-learning", "history"],
  },
  {
    id: "alexnet",
    name: "AlexNet",
    era: "deep-learning",
    tagline: "The 2012 breakthrough that made the world believe in deep learning.",
    simple:
      "AlexNet was a deep neural network that won the 2012 ImageNet competition by a massive margin — 15% error vs 26% for the runner-up. It was trained on GPUs and used ReLU activations. This single paper launched the deep learning era.",
    deeper:
      "Krizhevsky, Sutskever & Hinton's AlexNet had 5 convolutional layers + 3 fully-connected layers, 60M parameters. Key innovations: ReLU (faster training than tanh), GPU training (2× speedup), dropout (regularization), data augmentation, overlapping pooling. It showed that scale + data + GPUs + architecture = dramatic progress. The 'ImageNet moment' is AI's Sputnik.",
    deepest:
      "AlexNet's architecture: Conv(11×11,96) → MaxPool → Conv(5×5,256) → MaxPool → Conv(3×3,384) → Conv(3×3,384) → Conv(3×3,256) → MaxPool → FC(4096) → FC(4096) → FC(1000, softmax). ReLU solved vanishing gradients; dropout prevented co-adaptation. The deeper lesson: learned features >> hand-engineered features. Every vision model since (ResNet, ViT, diffusion U-Nets) descends from AlexNet.",
    year: 2012,
    sources: ["alexnet-2012"],
    tags: ["deep-learning", "vision", "breakthrough"],
  },
  {
    id: "gpus",
    name: "GPUs & Compute",
    era: "deep-learning",
    tagline: "The hardware that made deep learning possible.",
    simple:
      "GPUs (graphics processing units) were designed to render video games — doing thousands of simple calculations in parallel. Researchers realized the same parallelism is perfect for training neural networks. GPUs made deep learning 100x faster.",
    deeper:
      "Neural networks are matrix multiplications — embarrassingly parallel. A CPU does ~1000 operations in parallel; a GPU does ~10,000. CUDA (2006) made GPU programming accessible. The scaling laws (2020) showed performance scales predictably with compute. The AI hardware race (NVIDIA, TPUs, custom ASICs) is now a $100B+ industry.",
    deepest:
      "A GPU has thousands of CUDA cores executing SIMT (single instruction, multiple threads). Matrix multiplication decomposes into tiled parallel operations using shared memory and tensor cores (mixed-precision FP16/INT8). Roofline model: neural nets are compute-bound at scale. Training GPT-4-scale models needs ~10²⁵ FLOPs. The economics: training cost doubles ~every 4 months → custom silicon, sparsity, quantization, and distributed training (data/tensor/pipeline parallelism) are the frontier.",
    year: 2012,
    sources: ["alexnet-2012"],
    tags: ["hardware", "compute", "engineering"],
  },
  {
    id: "imagenet",
    name: "ImageNet",
    era: "deep-learning",
    tagline: "The dataset that fed the deep learning revolution.",
    simple:
      "ImageNet was a massive dataset of 14 million labeled images, organized by the WordNet hierarchy. The annual ImageNet competition (ILSVRC) became the Olympics of computer vision — the benchmark that proved deep learning was the future.",
    deeper:
      "Fei-Fei Li created ImageNet (2009) as a bet that data mattered more than algorithms. It had 22,000 categories. The ILSVRC challenge (2010–2017) drove rapid progress: error rates fell from 28% (2011) to 2% (2017). The 2012 AlexNet win was the turning point. ImageNet validated the 'big data + deep learning' paradigm.",
    deepest:
      "ImageNet's design: 1.2M training images, 50K validation, 100K test across 1000 classes. The error metric is top-5 (correct label in top 5 predictions). The 'ImageNet moment' (2012) is the canonical example of a paradigm shift — convolutional features, pre-trained on ImageNet, transfer to almost every vision task. ImageNet also revealed dataset bias (mostly Western images) and label noise — motivating more careful dataset curation (ImageNet-21K, LAION).",
    year: 2009,
    sources: ["alexnet-2012"],
    tags: ["data", "benchmark", "vision"],
  },
  {
    id: "resnet",
    name: "ResNet & Skip Connections",
    era: "deep-learning",
    tagline: "How to train networks 100 layers deep — just add shortcuts.",
    simple:
      "ResNet (2015) solved the problem of training very deep networks. As networks get deeper, they should perform better — but they often get worse. ResNet added 'skip connections' that let information jump over layers, making it possible to train networks with 152+ layers.",
    deeper:
      "The degradation problem: deeper networks have higher training error (not overfitting — optimization failure). ResNet's residual block: output = F(x) + x. The network learns residual functions (corrections), not full transformations. If a layer is useless, F(x) → 0 and the signal passes through unchanged. This enabled 152-layer (and later 1000+) networks.",
    deepest:
      "The residual connection y = F(x, W) + x creates an implicit ensemble of paths (Veit et al., 2016) — like an exponential number of shallow networks. It also preserves gradient flow: ∂L/∂x = ∂L/∂y·(1 + ∂F/∂x), so gradients don't vanish. Modern variants: DenseNet (concatenation), highway networks, and transformer residual connections. The principle: make identity the default, learning the exception.",
    year: 2015,
    sources: ["resnet-2015"],
    tags: ["architecture", "deep-learning", "optimization"],
  },
  {
    id: "lstm",
    name: "LSTM & Sequence Models",
    era: "deep-learning",
    tagline: "Teaching networks to remember — the bridge to transformers.",
    simple:
      "LSTMs (Long Short-Term Memory) are a type of recurrent neural network that can remember information over long sequences. They powered speech recognition, translation, and text generation before transformers replaced them.",
    deeper:
      "Standard RNNs suffer vanishing gradients — they can't learn long-range dependencies. LSTM adds a cell state with gated input/forget/output gates: what to remember, forget, and output. This lets gradients flow unchanged through time. LSTMs dominated sequence modeling (2014–2017) before the Transformer's self-attention replaced recurrence entirely.",
    deepest:
      "LSTM equations: fₜ = σ(W_f·[hₜ₋₁, xₜ] + b_f) (forget), iₜ = σ(W_i·[hₜ₋₁, xₜ] + b_i) (input), C̃ₜ = tanh(W_C·[hₜ₋₁, xₜ] + b_C) (candidate), Cₜ = fₜ⊙Cₜ₋₁ + iₜ⊙C̃ₜ (cell update), oₜ = σ(W_o·[hₜ₋₁, xₜ] + b_o), hₜ = oₜ⊙tanh(Cₜ) (output). The cell state is a gradient highway. GRU (2014) simplifies to 2 gates. Self-attention (2017) replaces recurrence with direct pairwise connections.",
    year: 1997,
    sources: ["transformer-2017"],
    tags: ["sequence", "recurrent", "architecture"],
  },
  {
    id: "dropout",
    name: "Dropout & Regularization",
    era: "deep-learning",
    tagline: "Preventing overfitting by randomly turning off neurons during training.",
    simple:
      "Dropout is a trick: during training, randomly 'turn off' a fraction of neurons (e.g., 50%). This prevents the network from relying on any single neuron — it must learn redundant, robust features. It was key to AlexNet's success and is still widely used.",
    deeper:
      "Dropout is ensemble learning: each training step trains a different 'thinned' network; at test time, the full network averages them. It reduces co-adaptation (neurons depending on specific other neurons). Dropout rate p=0.5 is typical. Modern alternatives: weight decay, batch norm, data augmentation, early stopping. In transformers, dropout is applied to attention weights and feedforward layers.",
    deepest:
      "Dropout (Srivastava et al., 2014) can be viewed as approximate Bayesian inference — the mask distribution induces a posterior over weights. At test time, scaling by (1−p) approximates the ensemble mean. DropConnect generalizes to weights. Variational dropout uses the same mask across time steps. The lottery ticket hypothesis (Frankle & Carbin, 2019): sparse subnetworks that train well — dropout may find them.",
    year: 2012,
    sources: ["alexnet-2012"],
    tags: ["regularization", "training", "deep-learning"],
  },
  {
    id: "word2vec",
    name: "Word2Vec & Embeddings",
    era: "deep-learning",
    tagline: "Turning words into numbers that capture meaning.",
    simple:
      "Word2Vec (2013) turned words into lists of numbers (vectors) such that similar words are close together. 'King' − 'man' + 'woman' ≈ 'queen'. These word embeddings became the default way to feed text into neural networks and influenced everything after.",
    deeper:
      "Mikolov's Word2Vec used two architectures: CBOW (predict word from context) and skip-gram (predict context from word). The vectors are learned by a simple classifier. The semantic arithmetic (king − man + woman ≈ queen) showed embeddings capture analogies. They enabled transfer learning: pre-trained embeddings on huge corpora, fine-tuned on downstream tasks.",
    deepest:
      "Word2Vec is a shallow neural net: input one-hot word → embedding matrix → output softmax over vocabulary. The embedding matrix (learned) becomes the vectors. The skip-gram with negative sampling objective approximates PMI matrix factorization (Levy & Goldberg, 2013) — embeddings = word co-occurrence statistics. Modern contextual embeddings (BERT, GPT) produce different vectors per context — 'bank' in 'river bank' vs 'bank account' — a richer representation.",
    year: 2013,
    sources: ["transformer-2017"],
    tags: ["nlp", "embeddings", "representation"],
  },
  {
    id: "transformer",
    name: "The Transformer",
    era: "transformer",
    tagline: "Attention is all you need — the architecture of modern AI.",
    simple:
      "The Transformer (2017) is the neural network architecture behind GPT, BERT, and every modern AI. It processes all words in a sentence at once using 'self-attention' — letting each word look at every other word to understand context. It's faster and more powerful than previous approaches.",
    deeper:
      "Before Transformers, models processed text left-to-right (recurrent). The Transformer replaced this with self-attention: each word computes a weighted combination of all words, where weights reflect relevance. Multi-head attention runs several attention patterns in parallel. Positional encodings inject word order. The architecture is fully parallel — perfect for GPUs. It's the foundation of ChatGPT, Gemini, Claude, and all LLMs.",
    deepest:
      "Self-attention: Attention(Q,K,V) = softmax(QKᵀ/√dₖ)V. Q (query), K (key), V (value) are linear projections of inputs. Scaled dot-product attention computes pairwise relevance. Multi-head: h parallel attention heads with different projections — capturing different relationship types. Positional encoding: sin/cos functions inject order (later: RoPE, ALiBi). Encoder-decoder architecture: encoder builds representation, decoder generates output autoregressively. GPT uses decoder-only; BERT encoder-only; T5 encoder-decoder.",
    year: 2017,
    sources: ["transformer-2017"],
    tags: ["architecture", "attention", "nlp", "foundation"],
  },
  {
    id: "attention",
    name: "Attention Mechanism",
    era: "transformer",
    tagline: "Letting models focus on what matters.",
    simple:
      "Attention is how a model decides which parts of the input to focus on. When translating 'the cat sat on the mat', the word 'cat' attends to itself; 'sat' attends to 'cat'. It's like a spotlight that shines on the relevant words. Self-attention (Transformer) is the most powerful form.",
    deeper:
      "Attention computes a weighted sum: outputᵢ = Σⱼ αᵢⱼ·vⱼ where αᵢⱼ = softmax(qᵢ·kⱼ/√d). The query (what I'm looking for) matches keys (what each word offers) to produce weights (how much to attend). Bahdanau attention (2014) added attention to seq2seq. Luong attention is a variant. Multi-head attention runs h parallel attentions. Cross-attention lets the decoder attend to encoder outputs.",
    deepest:
      "Attention is a soft dictionary lookup: queries and keys are matched by dot product, values are retrieved. The √dₖ scaling prevents softmax saturation. Attention is permutation-equivariant (needs positional encoding). Complexity is O(n²) — the motivation for efficient attention (Linformer, FlashAttention, Mamba/SSMs). Attention is all you need — but the interpretability question (what does attention actually compute?) remains open.",
    year: 2017,
    sources: ["transformer-2017"],
    tags: ["attention", "architecture", "mechanism"],
  },
  {
    id: "bert",
    name: "BERT",
    era: "transformer",
    tagline: "Bidirectional understanding — reading text both ways at once.",
    simple:
      "BERT (Google, 2018) was the first big pre-trained transformer for language understanding. It reads entire sentences at once (left-to-right AND right-to-left) and is pre-trained on two tasks: fill in the blank (masked language model) and predict the next sentence. It set new records on every language task.",
    deeper:
      "BERT is encoder-only. Pre-training: masked language modeling (mask 15% of tokens, predict them) + next sentence prediction. Fine-tuning: add a task-specific head on top and fine-tune. BERT-base (110M params) and BERT-large (340M) dominated GLUE, SQuAD, and all NLP benchmarks. It established the pre-train → fine-transfer paradigm that defines modern NLP.",
    deepest:
      "BERT's masked LM is a denoising autoencoder: input = corrupted text, target = original. The [MASK] token is never seen at fine-tuning time — pre-training uses 80/10/10% mask/random/unchanged to mitigate this. Bidirectionality: the encoder sees full context, unlike GPT's left-to-right. BERT showed that deep bidirectional representations capture syntax, semantics, and world knowledge. The 'BERTology' field studies what BERT learns — probing tasks reveal it encodes parse trees and coreference.",
    year: 2018,
    sources: ["bert-2018"],
    tags: ["nlp", "pre-training", "transformer"],
  },
  {
    id: "gpt",
    name: "GPT — Generative Pre-trained Transformer",
    era: "transformer",
    tagline: "Predict the next word, and intelligence emerges.",
    simple:
      "GPT is a language model: it predicts the next word in a sequence. GPT-1 (2018) showed that a transformer pre-trained on lots of text could be fine-tuned for any task. GPT-2 (2019) was 'too dangerous to release.' GPT-3 (2020) had 175 billion parameters and could do tasks it wasn't trained on — just by being shown examples.",
    deeper:
      "GPT is decoder-only: autoregressive, left-to-right. Pre-training: predict next token. Fine-tuning: supervised fine-tuning (SFT) + RLHF (reinforcement learning from human feedback). GPT-3's key discovery: in-context learning — the model adapts to new tasks from a few examples in the prompt, no gradient updates. This 'emergent ability' at scale changed everything.",
    deepest:
      "Autoregressive LM: P(x) = Π P(xᵢ | xᵢ₋₁, ..., x₁). The causal attention mask ensures token i attends only to ≤i. GPT-3's 175B params, trained on ~300B tokens, exhibits emergent abilities: few-shot learning, chain-of-thought, arithmetic — not present at smaller scales. RLHF (Christiano et al., 2017; Stiennon et al., 2020; Ouyang et al., 2022) aligns the model to human preferences via reward models and PPO. The scaling hypothesis: capabilities emerge from scale.",
    year: 2018,
    sources: ["gpt-2018", "gpt3-2020"],
    tags: ["llm", "transformer", "generative"],
  },
  {
    id: "self-attention",
    name: "Self-Attention Deep Dive",
    era: "transformer",
    tagline: "The mathematical heart of the Transformer.",
    simple:
      "Self-attention lets each word in a sentence look at all other words to build its representation. It computes: for each word, how much should it pay attention to every other word? This creates a dynamic, context-sensitive representation.",
    deeper:
      "Three matrices: Q (queries), K (keys), V (values). Attention(Q,K,V) = softmax(QKᵀ/√d)V. Each word's query matches all keys → attention weights → weighted sum of values. Multi-head: 8–128 parallel attention heads, each capturing different relationships (syntax, semantics, position). The output is projected and fed forward.",
    deepest:
      "Self-attention is a content-based memory retrieval. The QKᵀ matrix is n×n (n = sequence length) — the attention map. The √dₖ scaling prevents large dot products from pushing softmax into regions with tiny gradients. FlashAttention (Dao, 2022) makes attention memory-efficient by tiling and online softmax. The O(n²) complexity drives research into linear attention, state-space models (Mamba), and sparse attention.",
    year: 2017,
    sources: ["transformer-2017"],
    tags: ["attention", "mathematics", "architecture"],
  },
  {
    id: "transfer-learning",
    name: "Transfer Learning",
    era: "transformer",
    tagline: "Learn once, apply everywhere — the pre-train/fine-tune paradigm.",
    simple:
      "Transfer learning means training a model on a large general dataset first (pre-training), then adapting it to a specific task with a small dataset (fine-tuning). It's like learning general knowledge in school, then specializing in a job. This is how modern AI works.",
    deeper:
      "Pre-training on diverse text gives the model general language, reasoning, and world knowledge. Fine-tuning adapts it to specific tasks (translation, classification, QA) with task-specific data. The frozen-feature approach (use pre-trained model as a feature extractor) vs full fine-tuning. Prompting (in-context learning) is zero-shot transfer — no fine-tuning needed. Modern: pre-train → SFT → RLHF.",
    deepest:
      "Transfer learning works because pre-trained representations are universal: lower layers capture syntax, middle layers semantics, higher layers task-specific features. The 'lottery ticket' and 'representation similarity' (CKA) literature studies why. Catastrophic forgetting (fine-tuning erases pre-training knowledge) is mitigated by LoRA, adapters, and regularization. The emerging view: base models are general-purpose; capabilities are unlocked by post-training.",
    year: 2018,
    sources: ["bert-2018", "gpt3-2020"],
    tags: ["transfer-learning", "pre-training", "paradigm"],
  },
  {
    id: "scaling-laws",
    name: "Scaling Laws",
    era: "llm",
    tagline: "Bigger = better, predictably. The AI industry's playbook.",
    simple:
      "Scaling laws (2020) showed that AI model performance improves predictably as you increase model size, dataset size, and compute — following a power law. This gave the industry a formula: throw more compute at the problem, get predictable improvements. It justified the multi-billion-dollar race to build bigger models.",
    deeper:
      "Kaplan et al. (2020, OpenAI) found loss L ∝ N⁻ᵅ · D⁻ᵝ · C⁻ᵞ (N=params, D=data, C=compute). Compute-optimal training (Hoffmann et al., 2022, Chinchilla): for a given compute budget, balance params and tokens — most models were undertrained. Scaling laws enabled predicting results before training. The implication: AGI might just need more scale.",
    deepest:
      "The loss is a power law in each variable with exponents ~0.07–0.1. The 'compute-optimal' frontier: N_opt ∝ C⁰·⁵³, D_opt ∝ C⁰·⁴⁷ — parameters and tokens should scale together. Emergent abilities (Wei et al., 2022) appear abruptly at scale — but this is partly a metric artifact (Schaeffer et al., 2023). The debate: do scaling laws plateau? Kaplan vs. Hoffmann disagreed on the exponent. The industry bet: scale + data + better algorithms = continued progress.",
    year: 2020,
    sources: ["scaling-2020", "gpt3-2020"],
    tags: ["scaling", "compute", "economics"],
  },
  {
    id: "rlhf",
    name: "RLHF — Reinforcement Learning from Human Feedback",
    era: "llm",
    tagline: "Aligning AI with human preferences — how ChatGPT became helpful.",
    simple:
      "RLHF is how AI models are trained to be helpful, harmless, and honest. First, humans rank the model's responses. Then a reward model learns to predict what humans prefer. Finally, the language model is fine-tuned to maximize that reward using reinforcement learning. It's what made ChatGPT actually usable.",
    deeper:
      "Three stages: (1) supervised fine-tuning on demonstrations, (2) train a reward model on human comparisons (which response is better), (3) optimize the policy (LM) against the reward model with PPO/GRPO, with a KL penalty to stay close to the SFT model. InstructGPT (2022) showed RLHF dramatically improved helpfulness and reduced harm. It's the standard alignment technique.",
    deepest:
      "The reward model is trained with Bradley-Terry loss on pairwise preferences. PPO optimizes the policy: maximize E[r(x,y)] − β·KL(π || π_SFT). The KL penalty prevents reward hacking (the policy exploiting the reward model's flaws). DPO (Direct Preference Optimization, 2023) simplifies this — no explicit reward model or RL, just a classification objective on preferences. Constitutional AI (Anthropic) uses AI feedback instead of human labels. The open problem: reward models are imperfect proxies for human values.",
    year: 2022,
    sources: ["gpt3-2020", "chatgpt-2022"],
    tags: ["alignment", "rlhf", "training"],
  },
  {
    id: "chain-of-thought",
    name: "Chain-of-Thought",
    era: "llm",
    tagline: "Letting AI show its work — dramatically better reasoning.",
    simple:
      "Chain-of-thought (CoT) is when an AI model writes out its reasoning step by step before giving the final answer. Instead of jumping to '42', it writes 'First, 7×6=42, so...' This simple trick dramatically improves performance on math, logic, and reasoning tasks.",
    deeper:
      "Wei et al. (2022) showed that prompting LLMs with 'let's think step by step' or few-shot CoT examples unlocks complex reasoning. CoT is an emergent ability at scale. It externalizes reasoning into the text stream, letting the model use its own intermediate outputs as input. Zero-shot CoT ('let's think step by step') works without examples. Self-consistency samples multiple CoT paths and votes.",
    deepest:
      "CoT works because it decomposes computation: each step is simpler, and the model's autoregressive generation provides working memory. It's related to external scratchpads and algorithmic reasoning. The 'faithfulness' problem: does CoT reflect the model's actual computation, or is it a post-hoc rationalization? (Turpin et al., 2023). Test-time compute scaling (o1, R1) extends this: longer CoT → better performance, turning inference into search.",
    year: 2022,
    sources: ["gpt3-2020", "o1-2024"],
    tags: ["reasoning", "prompting", "emergent"],
  },
  {
    id: "diffusion",
    name: "Diffusion Models",
    era: "llm",
    tagline: "Creating images from noise — the math behind AI art.",
    simple:
      "Diffusion models generate images by learning to reverse a process that gradually adds noise to an image until it's pure random. Then, starting from random noise, they reverse the process step by step to create a coherent image. It's like sculpting from a block of marble — removing noise reveals the image.",
    deeper:
      "The forward process: add Gaussian noise over T steps. The learning task: predict the noise at each step. The reverse process: denoise step by step. DDPM (Ho et al., 2020) made this practical. Latent diffusion (Rombach et al., 2022) does it in a compressed space — powering Stable Diffusion. Classifier-free guidance controls the text-image trade-off. Diffusion now powers image, video, audio, and 3D generation.",
    deepest:
      "The forward process q(xₜ|x₀) = N(xₜ; √ᾱₜx₀, (1−ᾱₜ)I) is a Markov chain. The model ε_θ(xₜ, t) predicts the noise. The variational lower bound reduces to a simple denoising score matching objective. Score-based models (Song & Ermon, 2019) connect diffusion to Langevin dynamics. Classifier-free guidance: ε̂ = ε_uncond + w(ε_cond − ε_uncond), interpolating between unconditional and conditional. Flow matching (Lipman et al., 2023) and rectified flow simplify the training.",
    year: 2020,
    sources: ["stablediffusion-2022"],
    tags: ["generative", "images", "diffusion"],
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    era: "llm",
    tagline: "The moment AI went viral — 100 million users in 2 months.",
    simple:
      "ChatGPT (Nov 2022) was OpenAI's chat interface over GPT-3.5, fine-tuned with RLHF. It could hold conversations, write code, explain concepts, and admit mistakes. It reached 100 million users faster than any product in history and made AI a mainstream conversation.",
    deeper:
      "ChatGPT = GPT-3.5 + RLHF + dialogue formatting. It made LLMs accessible — no prompting expertise needed. It triggered the AI race: Google (Bard/Gemini), Anthropic (Claude), Meta (LLaMA), OpenAI (GPT-4). It transformed education, programming, and knowledge work overnight. The 'ChatGPT moment' is the defining event of the current AI era.",
    deepest:
      "ChatGPT's success is RLHF at scale: the reward model captures human judgments, PPO optimizes against it. The system prompt, safety filters, and refusal training shape behavior. The 'alignment tax' (refusing helpful queries) vs 'helpfulness' trade-off is managed via constitutional principles. The long-term question: can RLHF scale to superhuman systems? Debate continues on whether current alignment techniques generalize.",
    year: 2022,
    sources: ["chatgpt-2022", "gpt3-2020"],
    tags: ["product", "chatgpt", "mainstream"],
  },
  {
    id: "agents",
    name: "AI Agents",
    era: "agents",
    tagline: "Models that act — planning, tool use, and autonomy.",
    simple:
      "AI agents are systems that don't just answer questions — they take actions. They can browse the web, write and run code, call APIs, and break complex tasks into steps. An agent can 'book me a flight' — not just tell you how.",
    deeper:
      "Architecture: LLM (brain) + planning (task decomposition) + tools (actions) + memory (context). ReAct (Reason + Act) alternates reasoning and action. Frameworks: LangChain, CrewAI, AutoGen, OpenAI Agents SDK. Agents can reflect, self-correct, and collaborate (multi-agent systems). The frontier: long-horizon autonomy — agents working for hours or days.",
    deepest:
      "The agent loop: observe → think (plan) → act → observe → ... The planning module decomposes goals (task trees, hierarchical planning). Tool use is function calling — the model outputs structured JSON that the system executes. Memory: short-term (context window) + long-term (vector DB). The 'agentic' challenge: error compounds over long trajectories — reflection, verification, and guardrails are critical. Multi-agent: role specialization, debate, and orchestration.",
    year: 2023,
    sources: ["mcp-2024"],
    tags: ["agents", "autonomy", "tools"],
  },
  {
    id: "rag",
    name: "RAG — Retrieval-Augmented Generation",
    era: "agents",
    tagline: "Grounding AI in real knowledge — stop the hallucinations.",
    simple:
      "RAG (Retrieval-Augmented Generation) gives an AI model access to external knowledge. When you ask a question, the system searches a database for relevant documents, then feeds those to the model along with your question. The model answers based on real sources, not just its training data.",
    deeper:
      "Pipeline: chunk documents → embed (vectorize) chunks → store in vector DB → at query time, embed query → retrieve top-k similar chunks → prepend to prompt → model generates grounded answer. It solves hallucination, staleness, and domain-specific knowledge. RAG is cheaper and more flexible than fine-tuning. Modern: hybrid search (sparse + dense), reranking, agentic RAG.",
    deepest:
      "Embeddings map text to vectors where similarity ≈ semantic similarity. ANN search (HNSW, IVF) retrieves neighbors in sublinear time. The chunking strategy (size, overlap, structure) critically affects quality. Rerankers (cross-encoders) re-score retrieved chunks for precision. GraphRAG (Microsoft, 2024) adds knowledge graphs for global context. The open problem: retrieval quality is the bottleneck — 'lost in the middle' (models ignore long context) and multi-hop reasoning.",
    year: 2023,
    sources: ["mcp-2024"],
    tags: ["rag", "retrieval", "grounding"],
  },
  {
    id: "o1",
    name: "Test-Time Compute & o1",
    era: "agents",
    tagline: "Letting AI think longer — scaling inference instead of training.",
    simple:
      "OpenAI's o1 (2024) showed that if you let an AI model spend more time 'thinking' before answering — generating long internal reasoning — it solves much harder problems. This is 'test-time compute': instead of making models bigger, you let them think longer at answer time.",
    deeper:
      "o1 uses reinforcement learning to generate long chain-of-thought before the final answer. It allocates more compute to harder problems — a form of adaptive inference scaling. On math, coding, and science benchmarks, it dramatically outperforms GPT-4. The insight: just as training compute scales capability, so can inference compute. This is a new scaling axis.",
    deepest:
      "o1's training: RL with verifiable rewards (math answers, code tests) to produce long CoT. The policy learns to allocate thinking budget — easy problems get short reasoning, hard problems get long. The 'compute-optimal inference' framework: minimize cost for a target accuracy. It reveals that reasoning = search (over thoughts) and test-time compute = more search. DeepSeek-R1 (2025) open-sources this paradigm, showing it emerges with the right RL recipe.",
    year: 2024,
    sources: ["o1-2024", "deepseek-r1-2025"],
    tags: ["reasoning", "test-time-compute", "scaling"],
  },
  {
    id: "reasoning",
    name: "Reasoning Models",
    era: "agents",
    tagline: "o1, DeepSeek-R1, and the science of machine thought.",
    simple:
      "Reasoning models are AI systems trained to think step by step — breaking problems into logical steps, checking their work, and exploring multiple approaches. They're dramatically better at math, logic, and complex problem-solving than standard models.",
    deeper:
      "Standard LLMs predict the next token greedily. Reasoning models (o1, o3, DeepSeek-R1, QwQ) are trained with RL to produce long, verifiable reasoning traces. The training signal: correctness of final answer + process rewards. They use search (best-of-n, tree search over thoughts) and self-verification. The trade-off: slower and more expensive, but much more capable on hard problems.",
    deepest:
      "The RL recipe for reasoning: start with a base model, generate many reasoning traces, filter for correct answers, fine-test on correct traces (STILL) or use RL with outcome rewards (RLVR). DeepSeek-R1 showed that RL alone (without SFT) can elicit reasoning — 'aha moments' where the model learns to say 'wait, let me reconsider.' The emergent behaviors: self-reflection, backtracking, verification. Open question: are these models actually reasoning or just pattern-matching reasoning-like text? The mechanistic evidence suggests real algorithmic search.",
    year: 2024,
    sources: ["o1-2024", "deepseek-r1-2025"],
    tags: ["reasoning", "rl", "test-time-compute"],
  },
  {
    id: "multimodal",
    name: "Multimodal AI",
    era: "agents",
    tagline: "One model, every medium — text, image, audio, video.",
    simple:
      "Multimodal AI models can understand and generate across different types of content — text, images, audio, and video — in a single model. You can show a photo and ask a question, or describe an image and have it created. GPT-4o, Gemini, and Claude are multimodal.",
    deeper:
      "Architecture: encoders map each modality (vision, audio) into a shared representation space that the language model understands. Vision transformers (ViT) patchify images. Contrastive learning (CLIP) aligns image and text embeddings. The frontier: any-to-any models that generate any modality from any input. Real-time voice (GPT-4o) and video understanding (Gemini) are the latest.",
    deepest:
      "The key insight: all modalities can be tokenized into sequences. Images → ViT patches → tokens; audio → mel-spectrogram → tokens (Whisper); video → frame patches → tokens. A single transformer processes the unified token stream. The 'tokenization is all you need' hypothesis: language, vision, and audio are just different token distributions. Challenges: modality alignment, temporal coherence, and the fact that images/audio are denser than text → compute cost.",
    year: 2024,
    sources: ["gpt4-2023"],
    tags: ["multimodal", "vision", "audio"],
  },
  {
    id: "mcp",
    name: "MCP — Model Context Protocol",
    era: "agents",
    tagline: "USB-C for AI — one protocol to connect any model to any tool.",
    simple:
      "MCP (Model Context Protocol, Anthropic, 2024) is an open standard that lets AI models connect to any tool, database, or data source with one universal protocol. Instead of building a custom integration for every tool, developers build one MCP server — and every AI app can use it.",
    deeper:
      "MCP defines how models request context (resources, prompts, tools) and how servers provide it. It's client-server: the AI app is the client, the tool is the server. It's like USB-C — one connector for everything. The ecosystem exploded: thousands of MCP servers for GitHub, databases, browsers, IDEs. It's becoming the standard interface between AI and the world.",
    deepest:
      "MCP is built on JSON-RPC 2.0 with three primitives: resources (data the model can read), tools (functions the model can call), and prompts (pre-built templates). The protocol is transport-stdio (local) or HTTP+SSE (remote). The security model: servers declare capabilities, clients grant permissions. The 'agentic web' vision: MCP as the protocol layer for AI-to-AI and AI-to-tool communication. The standard is evolving under the Linux Foundation's governance.",
    year: 2024,
    sources: ["mcp-2024"],
    tags: ["protocol", "tools", "standard"],
  },
  {
    id: "tool-use",
    name: "Function Calling & Tool Use",
    era: "agents",
    tagline: "Teaching AI to use tools — from search to code execution.",
    simple:
      "Function calling lets an AI model use external tools — search the web, run code, call APIs. Instead of just generating text, the model outputs a structured request like 'search(\"weather in Tokyo\")' and the system executes it and feeds the result back. It's how AI takes real actions.",
    deeper:
      "The model is fine-tuned to output JSON (function name + arguments) when a tool is needed. The system executes the function and returns the result as a new message. Parallel function calls, tool descriptions in the system prompt, and structured outputs make this reliable. The 'tool-use' paradigm turns LLMs from text generators into agents that can interact with the world.",
    deepest:
      "Function calling is structured generation: the model is constrained to output valid JSON matching a JSON Schema. The training data is (query, tool call) pairs synthesized from demonstrations. ReAct integrates this with reasoning: the model alternates thought/action/observation. The 'toolFormer' showed models can learn when and how to call tools. The frontier: hierarchical tools (tools that call other tools), tool creation, and self-correction when tools fail.",
    year: 2023,
    sources: ["mcp-2024"],
    tags: ["tools", "function-calling", "agents"],
  },
  {
    id: "world-models",
    name: "World Models",
    era: "present",
    tagline: "AI that understands how the world works — the path to physical intelligence.",
    simple:
      "World models are AI systems that learn an internal model of how the world works — physics, cause and effect, object interactions. They can predict what happens next in a video or simulate scenarios. They're key to robotics, autonomous systems, and understanding.",
    deeper:
      "World models learn a latent dynamics model: given state sₜ and action aₜ, predict sₜ₊₁. They're trained on video (learning physics from pixels), simulation, or interactive environments. Genie (DeepMind, 2024) generates interactive worlds. Sora generates physically plausible video. The hypothesis: intelligence requires a world model — not just pattern matching.",
    deepest:
      "The 'LeCun vs Ng' debate: LeCun argues world models (joint embedding predictive architectures, V-JEPA) are the path to human-level intelligence — learning representations that predict abstract features, not pixels. The 'world models as generative simulators' view: models like Sora learn implicit physics. The robotics connection: vision-language-action (VLA) models use world models to plan and control. The open problem: can world models learn true causal structure, or just correlations?",
    year: 2024,
    sources: ["gpt4-2023"],
    tags: ["world-models", "robotics", "simulation"],
  },
  {
    id: "agi",
    name: "The Path to AGI",
    era: "present",
    tagline: "Artificial General Intelligence — the destination, or the horizon?",
    simple:
      "AGI means AI that can do any intellectual task a human can — not just one thing like chess or translation, but anything. We don't have AGI yet. Whether it's years or decades away — or even possible — is the biggest open question in AI.",
    deeper:
      "The 'AGI is near' camp (Altman, LeCun, Hassabis) points to rapid progress in reasoning, agents, and multimodal understanding. The 'AGI is far' camp (Gary Marcus, Melanie Mitchell) argues current systems lack true understanding, robustness, and causal reasoning. The 'AGI is impossible' camp (Brook's 'intelligence is embodied') argues cognition requires biological grounding. The honest answer: nobody knows.",
    deepest:
      "AGI definitions vary: the 'Copenhagen Interpretation' (can do most jobs), the 'Turing test 2.0' (passes any test), or the 'cognitive' definition (general learning). The 'intelligence is a chimera' view: intelligence isn't one thing — it's a collection of capabilities (Gardener's multiple intelligences). The 'scaling is enough' bet: current architectures, scaled, will generalize. The 'we need new paradigms' bet: something beyond transformers (neuro-symbolic, world models, embodiment). The journey continues.",
    year: 2025,
    sources: ["gpt4-2023"],
    tags: ["agi", "philosophy", "future"],
  },
  {
    id: "robotics",
    name: "AI in Robotics",
    era: "present",
    tagline: "When AI leaves the screen and enters the physical world.",
    simple:
      "AI-powered robots can now see, plan, and act in the physical world — picking up objects, walking through warehouses, assisting in surgery. Vision-language-action models let robots understand instructions ('put the cup on the shelf') and figure out how to do them.",
    deeper:
      "The VLA (Vision-Language-Action) paradigm: a single model processes camera input + language instruction → motor commands. RT-2 (Google, 2023) showed this works. Humanoid robots (Figure, Tesla Optimus, Unitree) combine locomotion, manipulation, and AI. Sim-to-real transfer (training in simulation, deploying in reality) is key. The challenge: the real world is messy, unforgiving, and expensive to train in.",
    deepest:
      "The robotics stack: perception (vision, touch) → world model (predict consequences) → planner (task and motion planning) → controller (PID, MPC, learned policies). The 'moravec paradox': easy things (chess) are hard for robots, hard things (walking) are easy — inverted in the AI era. Foundation models for robotics: RT-X, OpenVLA, π0. The 'data problem': robotics lacks internet-scale data → simulation, teleoperation, and video pre-training. The economics: when robots cost less than human labor, the world changes.",
    year: 2025,
    sources: ["gpt4-2023"],
    tags: ["robotics", "embodiment", "physical-ai"],
  },
  {
    id: "long-horizon",
    name: "Long-Horizon Autonomy",
    era: "present",
    tagline: "Agents that work for hours, days, weeks — not just seconds.",
    simple:
    "The current frontier: AI agents that can work autonomously on complex tasks for hours or days — writing a full application, conducting research, managing projects. They can make decisions, handle unexpected problems, and keep going without human supervision.",
    deeper:
      "The challenges: error compounds over long trajectories, context windows fill up, and models lose the thread. Solutions: hierarchical planning (manager + worker agents), memory systems (persistent state, skill libraries), verification loops (check work before proceeding), and self-correction. The 'autonomy spectrum': from human-in-the-loop to fully autonomous. The frontier: agents that reliably complete multi-day software projects.",
    deepest:
      "The 'agent reliability' problem: at 95% per-step accuracy, a 100-step task succeeds only 0.95¹⁰⁰ ≈ 0.6%. Solutions: (1) shorter critical paths, (2) verification at each step, (3) rollback and retry, (4) ensemble voting, (5) human checkpoints. The 'context engineering' problem: managing what the model remembers across a long task. The 'economic' question: when agent labor costs less than human labor, the economy transforms. The 'alignment' question: how do we ensure long-horizon goals stay aligned?",
    year: 2025,
    sources: ["mcp-2024"],
    tags: ["agents", "autonomy", "long-horizon"],
  },
  {
    id: "microblocks",
    name: "Microblocks & Microworlds",
    era: "golden",
    tagline: "Simplified worlds where AI could learn to reason.",
    simple:
      "Early AI researchers built simplified 'microworlds' — like a world of colored blocks on a table — where they could test reasoning without the mess of reality. SHRDLU (1970) could understand 'put the red block on the green block' in such a world.",
    deeper:
      "SHRDLU (Winograd, 1970) was the star of microworlds: it understood natural language commands about a blocks world, planned actions, and explained its reasoning. It showed that language understanding + reasoning + planning could work — in a restricted domain. The lesson: simplification enables progress, but scaling to the real world is the hard part (the 'real world is messy' problem).",
    deepest:
      "SHRDLU's architecture: language understanding (semantic grammar) → planner (means-end analysis) → world model (state representation) → executor (robot arm simulation). It was the first integrated AI system. The 'blocks world' taught a lesson that echoes today: systems that work in constrained domains (microworlds, benchmarks) often fail in the open world. Modern parallel: LLMs that ace benchmarks but struggle with real-world robustness. The field keeps rediscovering the sim-to-real gap.",
    year: 1970,
    sources: ["dartmouth-1956"],
    tags: ["microworlds", "planning", "history"],
  },
  {
    id: "lighthill",
    name: "The Lighthill Report",
    era: "winter1",
    tagline: "The report that helped freeze AI funding in the UK.",
    simple:
      "In 1973, mathematician James Lighthill wrote a report for the UK government that was highly critical of AI research. He argued that AI had failed to deliver on its promises and that the combinatorial explosion made real-world problems impossible. It led to massive funding cuts.",
    deeper:
      "Lighthill's core argument: AI worked in microworlds but would fail in the real world because the number of possible states explodes combinatorially. He attacked the '组合爆炸' (combinational explosion) problem. The report split the UK AI community. It became a template for how governments kill AI funding — and a lesson in how evaluations can shape a field's fate.",
    deepest:
      "Lighthill's report is a case study in the sociology of science. His 'combinatorial explosion' argument was technically correct for the methods of the time — but it was used to justify killing research that would later succeed. The lesson: pessimism about a field's current methods becomes a self-fulfilling prophecy. The parallel today: every 'AI has plateaued' argument echoes Lighthill. The counter: deep learning's success came from scaling, not new theory — exactly what Lighthill couldn't foresee.",
    year: 1973,
    sources: ["minsky-papert-1969"],
    tags: ["history", "policy", "funding"],
  },
  {
    id: "random-forests",
    name: "Random Forests",
    era: "quiet",
    tagline: "The ensemble method that dominated tabular data for a decade.",
    simple:
      "Random forests combine many decision trees, each trained on random subsets of data and features. The final answer is a vote across all trees. They're simple, robust, and were the go-to method for structured data before deep learning.",
    deeper:
      "Breiman (2001) formalized random forests: bagging (bootstrap aggregating) + random feature subsets at each split. Each tree is weak (high variance), but the ensemble is strong (low variance, low bias). They handle missing data, need little tuning, and give feature importance. They dominated Kaggle competitions and industry tabular ML (2010–2018).",
    deepest:
      "A decision tree recursively partitions feature space via axis-aligned splits (Gini/entropy). Random forests decorrelate trees by (1) bootstrap sampling and (2) random feature subsets (√p features per split for classification). The out-of-bag error estimate is built-in. The 'random forest is a universal approximator' result (Biau, 2008). Modern gradient-boosted trees (XGBoost, LightGBM) often outperform random forests on tabular data — the 'no free lunch' of ML.",
    year: 2001,
    sources: ["hinton-2006"],
    tags: ["machine-learning", "ensemble", "trees"],
  },
  {
    id: "batch-norm",
    name: "Batch Normalization",
    era: "deep-learning",
    tagline: "Stabilizing deep network training with a simple trick.",
    simple:
      "Batch normalization normalizes the inputs to each layer during training — keeping them in a healthy range. This prevents the 'internal covariate shift' problem where layer inputs drift wildly. It made training deep networks much faster and more stable.",
    deeper:
      "For each mini-batch, normalize: x̂ = (x − μ)/σ, then scale and shift: y = γx̂ + β. The normalization is differentiable — gradients flow through it. It acts as a regularizer (adding noise via batch statistics). Layer norm (for sequences) and group norm (for vision) are variants. Batch norm is in most vision and language models.",
    deepest:
      "Batch norm's effect is debated: it's not just covariate shift reduction (Santurkar et al., 2018 — it smooths the loss landscape). The normalization makes the loss landscape smoother → larger learning rates → faster convergence. The γ/β parameters let the network undo the normalization if needed. The batch-size dependency (statistics per batch) is a limitation → layer norm (Ba et al., 2016) normalizes per-sample, essential for transformers and small batches.",
    year: 2015,
    sources: ["resnet-2015"],
    tags: ["training", "normalization", "deep-learning"],
  },
  {
    id: "statistics",
    name: "Statistics & Probabilistic AI",
    era: "winter2",
    tagline: "The quiet revolution — AI rebuilt itself on uncertainty, not certainty.",
    simple:
      "After expert systems collapsed, researchers stopped writing rules and started using statistics. Instead of saying 'this IS a cat', a statistical model says 'this is 94% likely a cat'. Methods like Bayesian inference and maximum likelihood let machines learn from messy, incomplete, noisy real-world data — and admit when they are not sure.",
    deeper:
      "The second AI winter forced a methodological turn: from rule-based symbol manipulation to probabilistic inference. Bayesian networks (Pearl, 1988) represented uncertainty as conditional independence graphs. Discriminative models (SVMs, conditional random fields) learned decision boundaries instead of modelling the world explicitly. Generative models learned p(x,y) and derived predictions by inference. Crucially, statistics supplied the guarantees that intuition could not: sample complexity, generalization bounds, and convergence theory.",
    deepest:
      "Maximum likelihood estimation became the default training principle, connecting frequentist and Bayesian practice through the EM algorithm (Dempster et al., 1977). The probit/logit link function generalises the perceptron's threshold. The bias-variance tradeoff became the central lens on model capacity. This period also produced conditional random fields (Lafferty et al., 2001), which let structured prediction borrow strength across neighbouring labels — the direct ancestor of modern sequence labelling. Statistics is the layer that made deep learning possible later: backprop is just gradient-based maximum likelihood.",
    year: 1988,
    sources: ["hinton-2006", "lecun-1998"],
    tags: ["statistics", "probability", "uncertainty", "foundations"],
  },
  {
    id: "instructgpt",
    name: "InstructGPT & RLHF's Debut",
    era: "llm",
    tagline: "The paper that made GPT-3 useful — and invented the modern alignment recipe.",
    simple:
      "GPT-3 was an impressive text generator but hard to use: you had to know how to prompt it like a completion task. InstructGPT (2022) fixed this by fine-tuning GPT-3 on human-written instructions and then reinforcing it with human preferences. The result was ChatGPT. This is the moment AI stopped being a research demo and became a product anyone could use.",
    deeper:
      "InstructGPT introduced a three-step pipeline that became the industry standard: supervised fine-tuning on demonstrations, training a reward model from human rankings, then optimising the policy against that reward with PPO and a KL penalty. The paper's central finding was counterintuitive — a 1.3B model trained with RLHF was preferred by human raters over a 175B base model. Alignment, not scale alone, determined usefulness.",
    deepest:
      "The paper (Ouyang et al., 2022) reported that RLHF models were less truthful but produced outputs with higher perceived quality and harmlessness. It formalised the alignment tax: optimising for preference diverges from pre-training distribution. Three key ablations matter: (1) the reward model saturates quickly, (2) the KL coefficient β controls the helpfulness-harmfulness tradeoff, (3) value-head initialisation from the reward model matters. This pipeline directly produced ChatGPT and every major assistant since. Its weaknesses — reward hacking, brittleness, judge bias — are the active research frontier.",
    year: 2022,
    sources: ["chatgpt-2022", "gpt3-2020"],
    tags: ["alignment", "rlhf", "llm", "turning-point"],
  },
  {
    id: "stable-diffusion",
    name: "Stable Diffusion",
    era: "llm",
    tagline: "Open-source image generation — the moment anyone could create with AI.",
    simple:
      "Stable Diffusion (2022) generates images from text descriptions. It is a diffusion model: it starts with pure random noise and repeatedly removes noise until a picture emerges. Unlike earlier systems like DALL·E 2 that ran only on paid servers, Stable Diffusion was open-sourced and ran on a normal gaming graphics card — which is why it became the foundation of an entire creative ecosystem.",
    deeper:
      "Rombach et al. made two decisive contributions. First, latent diffusion: instead of denoising in pixel space, they compressed images into a 48×48 latent space with a pretrained VAE and ran the diffusion process there, cutting compute by ~48×. Second, they released the weights openly and shipped a safety checker. The result was fast (512×512 in seconds on a consumer GPU), cheap to fine-tune, and forkable — spawning Stable Diffusion XL, SD3, ControlNet, LoRA fine-tunes, and ComfyUI workflows.",
    deepest:
      "The architecture: a VAE encoder maps pixels to latents; U-Net denoises latents conditioned on CLIP text embeddings via cross-attention; a VAE decoder returns pixels. Training follows Ho et al.'s ε-prediction objective with the DDPM noise schedule. Classifier-free guidance (Ho & Salimans, 2022) — training with the condition randomly dropped, then extrapolating between unconditional and conditional noise predictions — removed the need for a separate classifier and is why guidance strength is a single scalar knob. Latent diffusion is now the backbone of essentially all text-to-image and text-to-video generation.",
    year: 2022,
    sources: ["stablediffusion-2022", "blog-google-gemini"],
    tags: ["generative", "diffusion", "images", "open-source"],
  },
  {
    id: "midjourney",
    name: "Midjourney",
    era: "llm",
    tagline: "The model that proved generative AI could be art — and a business.",
    simple:
      "Midjourney (2022) generates striking images from text prompts. It was one of the first image generators to make AI art genuinely beautiful rather than uncanny, and it launched on Discord rather than as a normal website. Its closed, curated aesthetic made it a cultural phenomenon: millions of users, a waiting list, and fierce arguments about whether AI images are art.",
    deeper:
      "Midjourney's significance is partly technical — it arrived during the latent-diffusion wave and tuned aesthetics aggressively — but mostly aesthetic and economic. It demonstrated that the quality of a generative model is bounded by curation and taste, not only architecture. Closed-weight and Discord-native, it proved a model could succeed without publishing weights or an API. Its influence is visible in every later image model's emphasis on prompt engineering and aesthetic scoring.",
    deepest:
      "Midjourney reinforced two industry shifts: (1) aesthetic alignment via human preference, the same idea RLHF applies to language models, transferred to visual models; and (2) product-led growth over research publication — Discord-first distribution created network effects and low acquisition cost with almost no marketing. The aesthetic debate it triggered — training data consent, artist style imitation, the status of AI-generated work as creative expression — remains unresolved and now shapes image-model licensing, lawsuits, and provenance standards like C2PA watermarking.",
    year: 2022,
    sources: ["stablediffusion-2022"],
    tags: ["generative", "images", "culture", "product"],
  },
  {
    id: "function-calling",
    name: "Function Calling & Tool Use",
    era: "agents",
    tagline: "The bridge from language to action — how models learned to use software.",
    simple:
      "Function calling lets a model use external tools. Instead of only producing text, the model outputs a structured request — for example search(\"weather in Tokyo\") or run_python(code) — and the surrounding application executes it and feeds the result back. This is how an AI assistant reads files, runs searches, executes code, and controls software: it stops talking and starts acting.",
    deeper:
      "The developer describes available tools to the model as JSON Schema definitions. Fine-tuning teaches the model to emit a function name plus arguments when a tool is needed; the runtime executes it and returns the result as a new message in the conversation. Tool calling generalises to parallel calls, built-in web/code execution, and file-system APIs. It is the enabling primitive behind every agent framework and behind MCP.",
    deepest:
      "Function calling is constrained structured generation: the output distribution is shaped to match a schema, so correctness is measured by JSON validity and argument correctness rather than by likelihood. Training data is synthesised from demonstrations, so coverage of the tool-use distribution matters more than raw scale. ToolFormer (Schick et al., 2023) showed models can self-learn when and how to call APIs from raw text. The hard problem is not calling a tool but long-horizon correctness: at 95% per-step accuracy a 100-step task succeeds only 0.6% of the time, which is why verification, rollback, and replanning — not better tool syntax — dominate agent research.",
    year: 2023,
    sources: ["mcp-2024", "blog-swe-bench"],
    tags: ["agents", "tools", "function-calling", "structure"],
  },
  {
    id: "multimodal-agents",
    name: "Multimodal Agents",
    era: "present",
    tagline: "Agents that see, hear, and act in the physical and digital world together.",
    simple:
      "A multimodal agent can look at a screenshot, listen to audio, read a document, and act — all through one model. It can watch a video of a broken device and tell you what is wrong, or drive a browser to complete a task. Multimodality and agents converged recently: models that perceive broadly and act through tools.",
    deeper:
      "Multimodal agents combine a unified perception encoder stack with the agent loop. Tokenising any input as a token stream lets one transformer handle images, audio, video, and text, so a single model can route between perception and action. On computers, agents operate GUIs through screenshots rather than APIs; in robotics, vision-language-action models map camera frames plus an instruction directly to motor commands. Benchmarks such as OSWorld, ScreenSpot, and GAIA measure this end-to-end capability.",
    deepest:
      "The unifying technical move is tokenisation: a ViT patches images into visual tokens, a convolutional/audio encoder slices spectrograms into audio tokens, and the resulting sequence enters the same self-attention stack as text. This enables cross-modal transfer — a model trained on text-image pairs gains world knowledge usable in embodied settings. Three obstacles dominate: (1) modality imbalance, since images carry far more information per token than text, distorting training ratios; (2) temporal coherence in long video and audio contexts; (3) grounding — action requires binding language to physical affordances, which is why robotics remains the hardest multimodal deployment.",
    year: 2025,
    sources: ["blog-rt2", "blog-google-gemini", "gpt4-2023"],
    tags: ["multimodal", "agents", "embodiment", "frontier"],
  },
];

// ═════════════════════════════════════════════════════════════
// SOURCES — Papers, videos, blogs, essays
// ═════════════════════════════════════════════════════════════

export const sources: Source[] = [
  // ── Dream (Pre-1950) ──
  { id: "turing-1936", kind: "paper", title: "On Computable Numbers, with an Application to the Entscheidungsproblem", author: "Alan Turing", year: 1936, url: "https://www.cs.virginia.edu/~robins/Turing_Paper_1936.pdf", description: "The paper that invented the Turing machine and proved the undecidability of the halting problem.", era: "dream" },
  { id: "turing-1950", kind: "paper", title: "Computing Machinery and Intelligence", author: "Alan Turing", year: 1950, url: "https://academic.oup.com/mind/article/LIX/236/4333968", description: "The Turing Test paper — 'Can machines think?'", era: "dream" },
  { id: "wiener-1948", kind: "book", title: "Cybernetics: Or Control and Communication in the Animal and the Machine", author: "Norbert Wiener", year: 1948, url: "https://en.wikipedia.org/wiki/Cybernetics", description: "The foundational text of cybernetics — feedback, control, and communication.", era: "dream" },
  { id: "searle-1980", kind: "essay", title: "Minds, Brains, and Programs", author: "John Searle", year: 1980, url: "https://cse.buffalo.edu/~rapaport/57500/searle80.pdf", description: "The Chinese Room argument — the most famous critique of the Turing Test.", era: "dream" },

  // ── Birth (1956–1969) ──
  { id: "dartmouth-1956", kind: "paper", title: "A Proposal for the Dartmouth Summer Research Project on Artificial Intelligence", author: "McCarthy, Minsky, Shannon, Rochester", year: 1956, url: "https://ojs.aaai.org/index.php/aimagazine/article/view/1904/1802", description: "The founding document of AI as a field.", era: "birth" },
  { id: "rosenblatt-1957", kind: "paper", title: "The Perceptron: A Probabilistic Model for Information Storage and Organization in the Brain", author: "Frank Rosenblatt", year: 1957, url: "https://en.wikipedia.org/wiki/Perceptron", description: "The original perceptron paper — the first learning machine.", era: "birth" },
  { id: "minsky-papert-1969", kind: "book", title: "Perceptrons: An Introduction to Computational Geometry", author: "Marvin Minsky & Seymour Papert", year: 1969, url: "https://en.wikipedia.org/wiki/Perceptrons_(book)", description: "The book that exposed the limits of perceptrons and helped trigger the first AI winter.", era: "birth" },
  { id: "weizenbaum-1966", kind: "paper", title: "ELIZA — A Computer Program for the Study of Natural Language Communication Between Man and Machine", author: "Joseph Weizenbaum", year: 1966, url: "https://dl.acm.org/doi/10.1145/365153.365168", description: "The ELIZA paper — the first chatbot and the ELIZA effect.", era: "birth" },

  // ── Golden Age ──
  { id: "lighthill-report", kind: "paper", title: "Artificial Intelligence: A General Survey", author: "James Lighthill", year: 1973, url: "https://en.wikipedia.org/wiki/Lighthill_report", description: "The Lighthill Report — the UK government review that froze AI funding.", era: "winter1" },

  // ── Expert Systems ──
  { id: "backprop-1986", kind: "paper", title: "Learning Representations by Back-Propagating Errors", author: "Rumelhart, Hinton & Williams", year: 1986, url: "https://www.nature.com/articles/323533a0", description: "The paper that popularized backpropagation — the algorithm that made deep learning possible.", era: "expert" },
  { id: "lecun-1989", kind: "paper", title: "Backpropagation Applied to Handwritten Zip Code Recognition", author: "Yann LeCun et al.", year: 1989, url: "https://ieeexplore.ieee.org/document/726791", description: "Convolutional networks + backprop for real-world pattern recognition.", era: "winter2" },

  // ── Quiet Revolution ──
  { id: "lecun-1998", kind: "paper", title: "Gradient-Based Learning Applied to Document Recognition", author: "LeCun, Bottou, Bengio, Haffner", year: 1998, url: "https://ieeexplore.ieee.org/document/726791", description: "LeNet-5 — the CNN that read ZIP codes.", era: "quiet" },
  { id: "hinton-2006", kind: "paper", title: "A Fast Learning Algorithm for Deep Belief Nets", author: "Hinton, Osindero & Teh", year: 2006, url: "https://www.cs.toronto.edu/~hinton/absps/fastnc.pdf", description: "Deep belief networks — the spark that reignited deep learning.", era: "quiet" },

  // ── Deep Learning Explosion ──
  { id: "alexnet-2012", kind: "paper", title: "ImageNet Classification with Deep Convolutional Neural Networks", author: "Krizhevsky, Sutskever & Hinton", year: 2012, url: "https://papers.nips.cc/paper/2012/hash/c399862d3b9d6b76c8436e924a68c45b-Abstract.html", description: "AlexNet — the ImageNet moment that launched the deep learning era.", era: "deep-learning" },
  { id: "gan-2014", kind: "paper", title: "Generative Adversarial Networks", author: "Goodfellow et al.", year: 2014, url: "https://arxiv.org/abs/1406.2661", description: "GANs — two networks competing to generate realistic data.", era: "deep-learning" },
  { id: "resnet-2015", kind: "paper", title: "Deep Residual Learning for Image Recognition", author: "He et al.", year: 2015, url: "https://arxiv.org/abs/1512.03385", description: "ResNet — skip connections that enabled 100+ layer networks.", era: "deep-learning" },
  { id: "alphago-2016", kind: "paper", title: "Mastering the Game of Go with Deep Neural Networks and Tree Search", author: "Silver et al.", year: 2016, url: "https://www.nature.com/articles/nature16961", description: "AlphaGo — deep learning + MCTS defeats the world Go champion.", era: "deep-learning" },

  // ── Transformer Era ──
  { id: "transformer-2017", kind: "paper", title: "Attention Is All You Need", author: "Vaswani et al.", year: 2017, url: "https://arxiv.org/abs/1706.03762", description: "The Transformer paper — the architecture of modern AI.", era: "transformer" },
  { id: "bert-2018", kind: "paper", title: "BERT: Pre-training of Deep Bidirectional Transformers for Language Understanding", author: "Devlin et al.", year: 2018, url: "https://arxiv.org/abs/1810.04805", description: "BERT — bidirectional pre-training that transformed NLP.", era: "transformer" },
  { id: "gpt-2018", kind: "paper", title: "Improving Language Understanding by Generative Pre-Training", author: "Radford et al.", year: 2018, url: "https://cdn.openai.com/better-language-models/language_models_are_unsupervised_multitask_learners.pdf", description: "GPT-1 — the first generative pre-trained transformer.", era: "transformer" },
  { id: "gpt3-2020", kind: "paper", title: "Language Models are Few-Shot Learners", author: "Brown et al.", year: 2020, url: "https://arxiv.org/abs/2005.14165", description: "GPT-3 — 175B parameters, in-context learning emerges.", era: "transformer" },

  // ── LLM Era ──
  { id: "scaling-2020", kind: "paper", title: "Scaling Laws for Neural Language Models", author: "Kaplan et al.", year: 2020, url: "https://arxiv.org/abs/2001.08361", description: "Scaling laws — predictable performance from scale.", era: "llm" },
  { id: "stablediffusion-2022", kind: "paper", title: "High-Resolution Image Synthesis with Latent Diffusion Models", author: "Rombach et al.", year: 2022, url: "https://arxiv.org/abs/2112.10752", description: "Stable Diffusion — open-source latent diffusion for image generation.", era: "llm" },
  { id: "chatgpt-2022", kind: "article", title: "Introducing ChatGPT", author: "OpenAI", year: 2022, url: "https://openai.com/index/chatgpt/", description: "The ChatGPT announcement — 100M users in 2 months.", era: "llm" },
  { id: "gpt4-2023", kind: "paper", title: "GPT-4 Technical Report", author: "OpenAI", year: 2023, url: "https://arxiv.org/abs/2303.08774", description: "GPT-4 — multimodal, more capable, more aligned.", era: "llm" },

  // ── Agent Era ──
  { id: "o1-2024", kind: "article", title: "Learning to Reason with LLMs (o1)", author: "OpenAI", year: 2024, url: "https://openai.com/index/learning-to-reason-with-llms/", description: "o1 — test-time compute scaling for reasoning.", era: "agents" },
  { id: "deepseek-r1-2025", kind: "paper", title: "DeepSeek-R1: Incentivizing Reasoning Capability in LLMs via Reinforcement Learning", author: "DeepSeek", year: 2025, url: "https://arxiv.org/abs/2501.12948", description: "DeepSeek-R1 — open weights reasoning that matches o1.", era: "agents" },
  { id: "mcp-2024", kind: "article", title: "Introducing the Model Context Protocol", author: "Anthropic", year: 2024, url: "https://www.anthropic.com/news/model-context-protocol", description: "MCP — the universal protocol for connecting AI to tools.", era: "agents" },

  // ── Video Sources ──
  { id: "yt-3b1b-neural", kind: "video", title: "But what is a neural network? — Deep learning, chapter 1", author: "3Blue1Brown", year: 2017, url: "https://www.youtube.com/watch?v=aircAruvnKk", description: "The most intuitive visual explanation of neural networks ever made.", era: "deep-learning" },
  { id: "yt-3b1b-backprop", kind: "video", title: "What is backpropagation really doing? — Deep learning, chapter 3", author: "3Blue1Brown", year: 2017, url: "https://www.youtube.com/watch?v=Ilg3gGewQ5U", description: "Visual intuition for the backpropagation algorithm.", era: "expert" },
  { id: "yt-3b1b-gradient", kind: "video", title: "Gradient descent, how neural networks learn — chapter 2", author: "3Blue1Brown", year: 2017, url: "https://www.youtube.com/watch?v=IHZwWFHWa-w", description: "Gradient descent explained visually.", era: "deep-learning" },
  { id: "yt-3b1b-transformer", kind: "video", title: "But what is a GPT? Visual intro to Transformers", author: "3Blue1Brown", year: 2023, url: "https://www.youtube.com/watch?v=wjZofJX0v4A", description: "The best visual introduction to Transformers and GPT.", era: "transformer" },
  { id: "yt-3b1b-attention", kind: "video", title: "Attention in Transformers, visually explained", author: "3Blue1Brown", year: 2023, url: "https://www.youtube.com/watch?v=eMlx5fFNoYc", description: "Self-attention explained with stunning visuals.", era: "transformer" },
  { id: "yt-lex-deeplearning", kind: "video", title: "Deep Learning — Full Course", author: "Lex Fridman", year: 2017, url: "https://www.youtube.com/watch?v=O5xeyoRL95U", description: "A deep dive into deep learning concepts.", era: "deep-learning" },
  { id: "yt-lex-hinton", kind: "talk", title: "Geoffrey Hinton: The History of Deep Learning", author: "Lex Fridman Podcast", year: 2023, url: "https://www.youtube.com/watch?v=mgIDG19F3mY", description: "Hinton on the history and future of deep learning.", era: "quiet" },
  { id: "yt-lex-altman", kind: "talk", title: "Sam Altman: OpenAI, GPT-5, and the Future of AI", author: "Lex Fridman Podcast", year: 2024, url: "https://www.youtube.com/watch?v=jvqFAi7vkBc", description: "Altman on the path to AGI and the future of OpenAI.", era: "agents" },
  { id: "yt-lex-karpathy", kind: "video", title: "Let's build GPT: from scratch, in code, spelled out", author: "Andrej Karpathy", year: 2023, url: "https://www.youtube.com/watch?v=kCc8FmEb1nY", description: "Karpathy builds GPT from scratch — the best technical explanation.", era: "transformer" },
  { id: "yt-lex-karpathy-llm", kind: "video", title: "State of GPT — Andrej Karpathy", author: "Andrej Karpathy", year: 2023, url: "https://www.youtube.com/watch?v=bZQun8Y4L2A", description: "Karpathy on the state of LLMs and their training.", era: "llm" },
  { id: "yt-lex-ng", kind: "talk", title: "Andrew Ng: AI for Everyone", author: "DeepLearning.AI", year: 2020, url: "https://www.youtube.com/watch?v=ofM06DzfKsA", description: "Andrew Ng's accessible introduction to AI's impact.", era: "quiet" },
  { id: "yt-lex-lecun", kind: "talk", title: "Yann LeCun: The Autonomous Machine Intelligence", author: "Lex Fridman Podcast", year: 2024, url: "https://www.youtube.com/watch?v=K7OF9oD_x8w", description: "LeCun on world models and the path to autonomous AI.", era: "present" },
  { id: "yt-lex-deepseek", kind: "talk", title: "DeepSeek-R1 and the future of reasoning models", author: "Various", year: 2025, url: "https://www.youtube.com/results?search_query=deepseek+r1+reasoning", description: "Analysis of the DeepSeek-R1 breakthrough.", era: "agents" },
  { id: "yt-lex-hassabis", kind: "talk", title: "Demis Hassabis: DeepMind, AlphaGo, and the future of AI", author: "Lex Fridman Podcast", year: 2024, url: "https://www.youtube.com/watch?v=Gfr0MyVuCk8", description: "Hassabis on DeepMind's quest for AGI.", era: "agents" },
  { id: "yt-lex-feifei", kind: "talk", title: "Fei-Fei Li: The Story of ImageNet and Computer Vision", author: "Lex Fridman Podcast", year: 2023, url: "https://www.youtube.com/watch?v=SDsg9dOLFWE", description: "Fei-Fei Li on ImageNet and the data revolution.", era: "deep-learning" },
  { id: "yt-lex-goodfellow", kind: "talk", title: "Ian Goodfellow: Generative Adversarial Networks (GANs)", author: "Various", year: 2017, url: "https://www.youtube.com/results?search_query=ian+goodfellow+gan+explained", description: "Goodfellow explains GANs — the adversarial approach to generation.", era: "deep-learning" },
  { id: "yt-lex-sutskever", kind: "talk", title: "Ilya Sutskever: The Story of GPT and OpenAI", author: "Various", year: 2023, url: "https://www.youtube.com/results?search_query=ilya+sutskever+gpt+history", description: "Sutskever on the history of GPT and deep learning.", era: "transformer" },
  { id: "yt-lex-marcus", kind: "talk", title: "Gary Marcus: The Case Against Deep Learning", author: "Lex Fridman Podcast", year: 2022, url: "https://www.youtube.com/watch?v=1he1CvJ4l3k", description: "The most prominent critic of deep learning makes his case.", era: "agents" },
  { id: "yt-lex-bengio", kind: "talk", title: "Yoshua Bengio: Deep Learning and the Path to AGI", author: "Various", year: 2023, url: "https://www.youtube.com/results?search_query=yoshua+bengio+deep+learning+agi", description: "Bengio on deep learning theory and AI safety.", era: "agents" },
  { id: "yt-lex-ng-endgame", kind: "talk", title: "The Endgame of AI — Sam Altman", author: "All-In Podcast", year: 2023, url: "https://www.youtube.com/watch?v=L_Guz73e6fw", description: "Altman on the endgame of AI development.", era: "agents" },
  { id: "yt-lex-tegmark", kind: "talk", title: "Max Tegmark: Life 3.0 and the Future of AI", author: "Lex Fridman Podcast", year: 2018, url: "https://www.youtube.com/watch?v=6IyI8s4qGvE", description: "Tegmark on AI's impact on life and civilization.", era: "llm" },
  { id: "yt-lex-bostrom", kind: "talk", title: "Nick Bostrom: Superintelligence and the Future of Humanity", author: "Various", year: 2014, url: "https://www.youtube.com/results?search_query=nick+bostrom+superintelligence", description: "Bostrom on the risks of superintelligence.", era: "llm" },

  // ── Blog / Essay Sources ──
  { id: "blog-eff-1m", kind: "blog", title: "1,000,000 AI Researchers", author: "Epoch AI", year: 2024, url: "https://epoch.ai/blog/1000000-ai-researchers", description: "A data-driven look at the growth of AI research.", era: "llm" },
  { id: "blog-stateofai", kind: "blog", title: "State of AI Report 2024", author: "Nathan Benaich & Ian Hogarth", year: 2024, url: "https://www.stateofai.report/", description: "The annual comprehensive report on AI progress.", era: "llm" },
  { id: "blog-alignment", kind: "essay", title: "The Alignment Problem", author: "Brian Christian", year: 2020, url: "https://brianchristian.org/the-alignment-problem/", description: "The definitive book-length essay on AI alignment.", era: "agents" },
  { id: "blog-superintelligence", kind: "book", title: "Superintelligence: Paths, Dangers, Strategies", author: "Nick Bostrom", year: 2014, url: "https://en.wikipedia.org/wiki/Superintelligence:_Paths,_Dangers,_Strategies", description: "The book that put AI existential risk on the map.", era: "llm" },
  { id: "blog-life30", kind: "book", title: "Life 3.0: Being Human in the Age of Artificial Intelligence", author: "Max Tegmark", year: 2017, url: "https://en.wikipedia.org/wiki/Life_3.0", description: "Tegmark on how AI will transform life.", era: "llm" },
  { id: "blog-anthropic-constitution", kind: "essay", title: "Constitutional AI: Harmlessness from AI Feedback", author: "Anthropic", year: 2022, url: "https://www.anthropic.com/research/constitutional-ai-harmlessness-from-ai-feedback", description: "Anthropic's approach to harmlessness via AI feedback.", era: "llm" },
  { id: "blog-openai-charter", kind: "essay", title: "OpenAI Charter", author: "OpenAI", year: 2018, url: "https://openai.com/charter/", description: "OpenAI's charter — the principles guiding their AGI development.", era: "agents" },
  { id: "blog-metro", kind: "blog", title: "The False Promise of Imitating Proprietary LLMs", author: "Various", year: 2023, url: "https://arxiv.org/abs/2305.15365", description: "Analysis of the open-source vs proprietary LLM landscape.", era: "llm" },
  { id: "blog-lora", kind: "paper", title: "LoRA: Low-Rank Adaptation of Large Language Models", author: "Hu et al.", year: 2021, url: "https://arxiv.org/abs/2106.09685", description: "LoRA — the efficient fine-tuning method that democratized LLM adaptation.", era: "llm" },
  { id: "blog-mamba", kind: "paper", title: "Mamba: Linear-Time Sequence Modeling with Selective State Spaces", author: "Gu & Dao", year: 2023, url: "https://arxiv.org/abs/2312.00752", description: "Mamba — the state-space model challenging transformers.", era: "agents" },
  { id: "blog-jepa", kind: "paper", title: "A Path Towards Autonomous Machine Intelligence", author: "Yann LeCun", year: 2022, url: "https://openreview.net/forum?id=BZ5a1r-kVsf", description: "LeCun's blueprint for autonomous AI via world models.", era: "present" },
  { id: "blog-v-jepa", kind: "paper", title: "V-JEPA: Video Joint Embedding Predictive Architecture", author: "Bardes et al.", year: 2024, url: "https://ai.meta.com/research/publications/v-jepa-video-joint-embedding-predictive-architecture-2/", description: "Meta's video pre-training for world models.", era: "present" },
  { id: "blog-rt2", kind: "paper", title: "RT-2: Vision-Language-Action Models Transfer Web Knowledge to Robotic Control", author: "Brohan et al.", year: 2023, url: "https://arxiv.org/abs/2307.15818", description: "RT-2 — Google's vision-language-action model for robots.", era: "present" },
  { id: "blog-figure", kind: "blog", title: "Figure 01: The Future of Humanoid Robots", author: "Figure AI", year: 2024, url: "https://www.figure.ai/", description: "Figure's humanoid robots powered by end-to-end AI.", era: "present" },
  { id: "blog-sora", kind: "blog", title: "Sora: Creating video from text", author: "OpenAI", year: 2024, url: "https://openai.com/sora", description: "OpenAI's video generation world model.", era: "present" },
  { id: "blog-genie", kind: "blog", title: "Genie: Generative Interactive Environments", author: "DeepMind", year: 2024, url: "https://deepmind.google/discover/blog/genie-2-generative-interactive-environments/", description: "DeepMind's generative interactive world model.", era: "present" },
  { id: "blog-worldlab", kind: "blog", title: "World Labs: Spatial Intelligence", author: "Fei-Fei Li", year: 2024, url: "https://www.worldlabs.ai/", description: "Fei-Fei Li's new company building spatial intelligence.", era: "present" },
  { id: "blog-anthropic-claude", kind: "blog", title: "Claude's Character", author: "Anthropic", year: 2024, url: "https://www.anthropic.com/research/claudes-character", description: "Anthropic on Claude's personality and values.", era: "agents" },
  { id: "blog-google-gemini", kind: "blog", title: "Gemini: A Family of Highly Capable Multimodal Models", author: "Google DeepMind", year: 2023, url: "https://blog.google/technology/ai/google-gemini-ai/", description: "Google's Gemini — natively multimodal from the start.", era: "agents" },
  { id: "blog-llama", kind: "blog", title: "LLaMA: Open and Efficient Foundation Language Models", author: "Meta AI", year: 2023, url: "https://ai.meta.com/blog/large-language-model-llama-meta-ai/", description: "Meta's open LLaMA — the open-source LLM revolution.", era: "llm" },
  { id: "blog-mistral", kind: "blog", title: "Mistral 7B: The Best 7B Model", author: "Mistral AI", year: 2023, url: "https://mistral.ai/news/announcing-mistral-7b/", description: "Mistral — efficient open-source LLMs from Europe.", era: "llm" },
  { id: "blog-qwen", kind: "blog", title: "Qwen: The Open-Source LLM from China", author: "Alibaba", year: 2023, url: "https://qwenlm.github.io/blog/qwen/", description: "Alibaba's Qwen — the leading Chinese open-source LLM.", era: "llm" },
  { id: "blog-deepseek", kind: "blog", title: "DeepSeek-V3: The 671B MoE Model", author: "DeepSeek", year: 2024, url: "https://www.deepseek.com/", description: "DeepSeek-V3 — a 671B mixture-of-experts model that rivals GPT-4 at a fraction of the cost.", era: "llm" },
  { id: "blog-swe-bench", kind: "paper", title: "SWE-bench: Can Language Models Resolve Real-World GitHub Issues?", author: "Jimenez et al.", year: 2023, url: "https://arxiv.org/abs/2310.06770", description: "SWE-bench — the benchmark for AI software engineering.", era: "agents" },
  { id: "blog-agent-bench", kind: "paper", title: "GAIA: A Benchmark for General AI Assistants", author: "Mialon et al.", year: 2023, url: "https://arxiv.org/abs/2311.12983", description: "GAIA — testing AI assistants on real-world tasks.", era: "agents" },
  { id: "blog-humaneval", kind: "paper", title: "Evaluating Large Language Models Trained on Code", author: "Chen et al.", year: 2021, url: "https://arxiv.org/abs/2107.03374", description: "HumanEval — the code generation benchmark.", era: "llm" },
  { id: "blog-mmlu", kind: "paper", title: "Measuring Massive Multitask Language Understanding", author: "Hendrycks et al.", year: 2020, url: "https://arxiv.org/abs/2009.03300", description: "MMLU — the standard LLM knowledge benchmark.", era: "llm" },
  { id: "blog-gsm8k", kind: "paper", title: "Training Verifiers to Solve Math Word Problems", author: "Cobbe et al.", year: 2021, url: "https://arxiv.org/abs/2110.14168", description: "GSM8K — grade school math for testing reasoning.", era: "agents" },
  { id: "blog-math", kind: "paper", title: "Measuring Mathematical Problem Solving With the MATH Dataset", author: "Hendrycks et al.", year: 2021, url: "https://arxiv.org/abs/2103.03874", description: "MATH — the hard math benchmark.", era: "agents" },
  { id: "blog-arc", kind: "paper", title: "Think you have Solved Question Answering? Try ARC, the AI2 Reasoning Challenge", author: "Clark et al.", year: 2018, url: "https://arxiv.org/abs/1803.05457", description: "ARC — abstract reasoning comprehension.", era: "llm" },
  { id: "blog-bigbench", kind: "paper", title: "Beyond the Imitation Game Benchmark (BIG-bench)", author: "Srivastava et al.", year: 2022, url: "https://arxiv.org/abs/2206.04615", description: "BIG-bench — 200+ tasks for probing LLM capabilities.", era: "llm" },
  { id: "blog-truthfulqa", kind: "paper", title: "TruthfulQA: Measuring How Models Mimic Human Falsehoods", author: "Lin et al.", year: 2021, url: "https://arxiv.org/abs/2109.07958", description: "TruthfulQA — testing whether models tell the truth.", era: "llm" },
  { id: "blog-hellaswag", kind: "paper", title: "HellaSwag: Can a Machine Really Finish Your Sentence?", author: "Zellers et al.", year: 2019, url: "https://arxiv.org/abs/1905.07830", description: "HellaSwag — commonsense sentence completion.", era: "transformer" },
  { id: "blog-wino", kind: "paper", title: "WinoGrande: An Adversarial Winograd Schema Challenge at Scale", author: "Sakaguchi et al.", year: 2019, url: "https://arxiv.org/abs/1907.10641", description: "WinoGrande — commonsense reasoning at scale.", era: "transformer" },
  { id: "blog-piqa", kind: "paper", title: "PIQA: Reasoning about Physical Commonsense in Natural Language", author: "Bisk et al.", year: 2019, url: "https://arxiv.org/abs/1911.11641", description: "PIQA — physical commonsense reasoning.", era: "transformer" },
  { id: "blog-siqa", kind: "paper", title: "SIQA: Social Commonsense Intelligence", author: "Sap et al.", year: 2019, url: "https://arxiv.org/abs/1904.09728", description: "SIQA — social commonsense reasoning.", era: "transformer" },
  { id: "blog-copa", kind: "paper", title: "COPA: Reasoning about Causal Relations", author: "Roemmele et al.", year: 2011, url: "https://arxiv.org/abs/2106.08918", description: "COPA — causal reasoning.", era: "quiet" },
  { id: "blog-rte", kind: "paper", title: "Recognizing Textual Entailment: Rationale and Evaluation", author: "Dagan et al.", year: 2005, url: "https://link.springer.com/chapter/10.1007/11736790_8", description: "RTE — textual entailment recognition.", era: "quiet" },
  { id: "blog-glue", kind: "paper", title: "GLUE: A Multi-Task Benchmark and Analysis Platform for Natural Language Understanding", author: "Wang et al.", year: 2018, url: "https://arxiv.org/abs/1804.07461", description: "GLUE — the standard NLP benchmark suite.", era: "transformer" },
  { id: "blog-superglue", kind: "paper", title: "SuperGLUE: A Stickier Benchmark for General-Purpose Language Understanding Systems", author: "Wang et al.", year: 2019, url: "https://arxiv.org/abs/1905.00537", description: "SuperGLUE — harder NLP benchmarks.", era: "transformer" },
  { id: "blog-squad", kind: "paper", title: "SQuAD: 100,000+ Questions for Machine Comprehension of Text", author: "Rajpurkar et al.", year: 2016, url: "https://arxiv.org/abs/1606.05250", description: "SQuAD — reading comprehension benchmark.", era: "transformer" },
  { id: "blog-triviaqa", kind: "paper", title: "TriviaQA: A Large Scale Distantly Supervised Challenge Dataset for Reading Comprehension", author: "Joshi et al.", year: 2017, url: "https://arxiv.org/abs/1705.00385", description: "TriviaQA — large-scale reading comprehension.", era: "transformer" },
  { id: "blog-naturalqs", kind: "paper", title: "Natural Questions: A Benchmark for Question Answering Research", author: "Kwiatkowski et al.", year: 2019, url: "https://arxiv.org/abs/1901.08066", description: "Natural Questions — real Google search queries.", era: "transformer" },
  { id: "blog-msmarco", kind: "paper", title: "MS MARCO: A Human Generated MAchine Reading COmprehension Dataset", author: "Nguyen et al.", year: 2016, url: "https://arxiv.org/abs/1611.09268", description: "MS MARCO — large-scale passage ranking.", era: "transformer" },
  { id: "blog-hotpotqa", kind: "paper", title: "HotpotQA: A Dataset for Diverse, Explainable Multi-hop Question Answering", author: "Yang et al.", year: 2018, url: "https://arxiv.org/abs/1809.09600", description: "HotpotQA — multi-hop reasoning.", era: "transformer" },
  { id: "blog-bamboogle", kind: "paper", title: "Bamboogle: A Simple, Effective and Efficient Baseline for Multi-Document Question Answering", author: "Press et al.", year: 2020, url: "https://arxiv.org/abs/2005.00450", description: "Bamboogle — multi-document QA baseline.", era: "transformer" },
];

// ═════════════════════════════════════════════════════════════
// KNOWLEDGE GRAPH — Nodes & Edges
// ═════════════════════════════════════════════════════════════

export const graphNodes: GraphNode[] = [
  // Era nodes
  { id: "era-dream", label: "The Dream", era: "dream", x: 0, y: 0, size: 40, color: "#8b5cf6", kind: "era", description: "Pre-1950: Turing, cybernetics, logic" },
  { id: "era-birth", label: "Birth of AI", era: "birth", x: 200, y: -100, size: 40, color: "#6366f1", kind: "era", description: "1956-1969: Dartmouth, LISP, Perceptron" },
  { id: "era-golden", label: "Golden Age", era: "golden", x: 400, y: 0, size: 40, color: "#3b82f6", kind: "era", description: "1956-1974: Symbolic AI, search" },
  { id: "era-winter1", label: "First Winter", era: "winter1", x: 600, y: 100, size: 35, color: "#64748b", kind: "era", description: "1974-1980: Funding freeze" },
  { id: "era-expert", label: "Expert Systems", era: "expert", x: 800, y: 0, size: 40, color: "#10b981", kind: "era", description: "1980-1987: Rules, MYCIN" },
  { id: "era-winter2", label: "Second Winter", era: "winter2", x: 1000, y: 100, size: 35, color: "#64748b", kind: "era", description: "1987-1993: Collapse" },
  { id: "era-quiet", label: "Quiet Revolution", era: "quiet", x: 1200, y: 0, size: 40, color: "#f59e0b", kind: "era", description: "1993-2011: SVMs, Deep Blue" },
  { id: "era-deep", label: "Deep Learning", era: "deep-learning", x: 1400, y: -100, size: 45, color: "#ef4444", kind: "era", description: "2012-2017: AlexNet, GPUs" },
  { id: "era-transformer", label: "Transformer", era: "transformer", x: 1600, y: 0, size: 45, color: "#ec4899", kind: "era", description: "2017-2020: Attention, BERT, GPT" },
  { id: "era-llm", label: "LLM Era", era: "llm", x: 1800, y: -100, size: 45, color: "#a855f7", kind: "era", description: "2020-2023: Scale, RLHF, ChatGPT" },
  { id: "era-agents", label: "Agent Era", era: "agents", x: 2000, y: 0, size: 45, color: "#06b6d4", kind: "era", description: "2023-2025: Agents, reasoning" },
  { id: "era-present", label: "Present & Beyond", era: "present", x: 2200, y: -100, size: 50, color: "#22d3ee", kind: "era", description: "2025+: World models, AGI" },

  // Key concept nodes
  { id: "c-turing", label: "Turing Machine", era: "dream", x: 50, y: 150, size: 25, color: "#a78bfa", kind: "concept", description: "The abstract machine that defined computation" },
  { id: "c-turing-test", label: "Turing Test", era: "dream", x: 100, y: 250, size: 25, color: "#a78bfa", kind: "concept", description: "Can a machine fool you?" },
  { id: "c-cybernetics", label: "Cybernetics", era: "dream", x: 0, y: 250, size: 22, color: "#a78bfa", kind: "concept", description: "Feedback, control, communication" },
  { id: "c-dartmouth", label: "Dartmouth", era: "birth", x: 200, y: -200, size: 25, color: "#818cf8", kind: "concept", description: "The workshop that named AI" },
  { id: "c-perceptron", label: "Perceptron", era: "birth", x: 250, y: -250, size: 25, color: "#818cf8", kind: "concept", description: "The first learning machine" },
  { id: "c-lisp", label: "LISP", era: "birth", x: 150, y: -250, size: 22, color: "#818cf8", kind: "concept", description: "The AI language" },
  { id: "c-eliza", label: "ELIZA", era: "birth", x: 300, y: -200, size: 22, color: "#818cf8", kind: "concept", description: "The first chatbot" },
  { id: "c-symbolic", label: "Symbolic AI", era: "golden", x: 400, y: 150, size: 25, color: "#60a5fa", kind: "concept", description: "Intelligence as symbol manipulation" },
  { id: "c-search", label: "Search", era: "golden", x: 450, y: 250, size: 22, color: "#60a5fa", kind: "concept", description: "Finding paths through possibility" },
  { id: "c-expert", label: "Expert Systems", era: "expert", x: 800, y: 150, size: 25, color: "#34d399", kind: "concept", description: "Rules as knowledge" },
  { id: "c-backprop", label: "Backprop", era: "expert", x: 850, y: 250, size: 25, color: "#34d399", kind: "concept", description: "The learning algorithm" },
  { id: "c-svm", label: "SVMs", era: "quiet", x: 1200, y: 150, size: 22, color: "#fbbf24", kind: "concept", description: "Margin maximization" },
  { id: "c-deepblue", label: "Deep Blue", era: "quiet", x: 1250, y: 250, size: 22, color: "#fbbf24", kind: "concept", description: "Beats Kasparov" },
  { id: "c-alexnet", label: "AlexNet", era: "deep-learning", x: 1400, y: -200, size: 28, color: "#f87171", kind: "concept", description: "The ImageNet moment" },
  { id: "c-gpu", label: "GPUs", era: "deep-learning", x: 1350, y: -250, size: 25, color: "#f87171", kind: "concept", description: "Parallel compute" },
  { id: "c-resnet", label: "ResNet", era: "deep-learning", x: 1450, y: -250, size: 25, color: "#f87171", kind: "concept", description: "Skip connections" },
  { id: "c-transformer", label: "Transformer", era: "transformer", x: 1600, y: 150, size: 30, color: "#f472b6", kind: "concept", description: "Attention is all you need" },
  { id: "c-attention", label: "Attention", era: "transformer", x: 1650, y: 250, size: 25, color: "#f472b6", kind: "concept", description: "Focus on what matters" },
  { id: "c-bert", label: "BERT", era: "transformer", x: 1550, y: 250, size: 25, color: "#f472b6", kind: "concept", description: "Bidirectional understanding" },
  { id: "c-gpt", label: "GPT", era: "transformer", x: 1700, y: 250, size: 28, color: "#f472b6", kind: "concept", description: "Predict the next word" },
  { id: "c-scaling", label: "Scaling Laws", era: "llm", x: 1800, y: -200, size: 25, color: "#c084fc", kind: "concept", description: "Bigger = better" },
  { id: "c-rlhf", label: "RLHF", era: "llm", x: 1850, y: -250, size: 25, color: "#c084fc", kind: "concept", description: "Human feedback alignment" },
  { id: "c-chatgpt", label: "ChatGPT", era: "llm", x: 1750, y: -250, size: 28, color: "#c084fc", kind: "concept", description: "AI goes viral" },
  { id: "c-diffusion", label: "Diffusion", era: "llm", x: 1900, y: -250, size: 25, color: "#c084fc", kind: "concept", description: "Images from noise" },
  { id: "c-agents", label: "Agents", era: "agents", x: 2000, y: 150, size: 28, color: "#22d3ee", kind: "concept", description: "Models that act" },
  { id: "c-rag", label: "RAG", era: "agents", x: 2050, y: 250, size: 25, color: "#22d3ee", kind: "concept", description: "Grounded generation" },
  { id: "c-o1", label: "o1 / Reasoning", era: "agents", x: 1950, y: 250, size: 28, color: "#22d3ee", kind: "concept", description: "Test-time compute" },
  { id: "c-mcp", label: "MCP", era: "agents", x: 2100, y: 250, size: 22, color: "#22d3ee", kind: "concept", description: "Universal tool protocol" },
  { id: "c-world", label: "World Models", era: "present", x: 2200, y: -200, size: 28, color: "#67e8f9", kind: "concept", description: "Understanding physics" },
  { id: "c-agi", label: "AGI", era: "present", x: 2300, y: -250, size: 30, color: "#67e8f9", kind: "concept", description: "The destination" },
  { id: "c-robotics", label: "Robotics", era: "present", x: 2150, y: -250, size: 25, color: "#67e8f9", kind: "concept", description: "AI in the physical world" },

  // Person nodes
  { id: "p-turing", label: "Alan Turing", era: "dream", x: -50, y: 100, size: 20, color: "#c4b5fd", kind: "person", description: "Father of computer science" },
  { id: "p-mccarthy", label: "John McCarthy", era: "birth", x: 150, y: -150, size: 20, color: "#a5b4fc", kind: "person", description: "Coined 'AI', invented LISP" },
  { id: "p-minsky", label: "Marvin Minsky", era: "birth", x: 350, y: -150, size: 20, color: "#a5b4fc", kind: "person", description: "Co-founder of MIT AI Lab" },
  { id: "p-rosenblatt", label: "Frank Rosenblatt", era: "birth", x: 200, y: -300, size: 18, color: "#a5b4fc", kind: "person", description: "Built the Perceptron" },
  { id: "p-hinton", label: "Geoffrey Hinton", era: "quiet", x: 1150, y: -50, size: 22, color: "#fcd34d", kind: "person", description: "Godfather of deep learning" },
  { id: "p-lecun", label: "Yann LeCun", era: "quiet", x: 1100, y: 50, size: 20, color: "#fcd34d", kind: "person", description: "CNN pioneer" },
  { id: "p-bengio", label: "Yoshua Bengio", era: "quiet", x: 1150, y: 100, size: 20, color: "#fcd34d", kind: "person", description: "Deep learning pioneer" },
  { id: "p-karpathy", label: "Andrej Karpathy", era: "transformer", x: 1550, y: 100, size: 20, color: "#f9a8d4", kind: "person", description: "GPT educator" },
  { id: "p-altman", label: "Sam Altman", era: "llm", x: 1750, y: -150, size: 20, color: "#d8b4fe", kind: "person", description: "OpenAI CEO" },
  { id: "p-hassabis", label: "Demis Hassabis", era: "agents", x: 1950, y: 100, size: 20, color: "#a5f3fc", kind: "person", description: "DeepMind CEO" },
];

export const graphEdges: GraphEdge[] = [
  // Era progression
  { source: "era-dream", target: "era-birth", label: "leads to", weight: 3 },
  { source: "era-birth", target: "era-golden", label: "expands", weight: 3 },
  { source: "era-golden", target: "era-winter1", label: "collapses", weight: 2 },
  { source: "era-winter1", target: "era-expert", label: "rebirth", weight: 2 },
  { source: "era-expert", target: "era-winter2", label: "collapses", weight: 2 },
  { source: "era-winter2", target: "era-quiet", label: "rebuild", weight: 2 },
  { source: "era-quiet", target: "era-deep", label: "ignites", weight: 3 },
  { source: "era-deep", target: "era-transformer", label: "evolves", weight: 3 },
  { source: "era-transformer", target: "era-llm", label: "scales", weight: 3 },
  { source: "era-llm", target: "era-agents", label: "enables", weight: 3 },
  { source: "era-agents", target: "era-present", label: "frontier", weight: 3 },

  // Concept connections
  { source: "c-turing", target: "c-turing-test", label: "proposes", weight: 2 },
  { source: "c-turing", target: "c-cybernetics", label: "inspires", weight: 1 },
  { source: "c-dartmouth", target: "c-perceptron", label: "same era", weight: 1 },
  { source: "c-dartmouth", target: "c-lisp", label: "invents", weight: 2 },
  { source: "c-perceptron", target: "c-backprop", label: "evolves into", weight: 3 },
  { source: "c-symbolic", target: "c-search", label: "uses", weight: 2 },
  { source: "c-expert", target: "c-backprop", label: "competes with", weight: 2 },
  { source: "c-backprop", target: "c-alexnet", label: "enables", weight: 3 },
  { source: "c-gpu", target: "c-alexnet", label: "powers", weight: 3 },
  { source: "c-alexnet", target: "c-resnet", label: "evolves", weight: 2 },
  { source: "c-alexnet", target: "c-transformer", label: "inspires", weight: 2 },
  { source: "c-transformer", target: "c-attention", label: "introduces", weight: 3 },
  { source: "c-transformer", target: "c-bert", label: "enables", weight: 2 },
  { source: "c-transformer", target: "c-gpt", label: "enables", weight: 3 },
  { source: "c-gpt", target: "c-scaling", label: "reveals", weight: 2 },
  { source: "c-gpt", target: "c-rlhf", label: "aligned by", weight: 2 },
  { source: "c-rlhf", target: "c-chatgpt", label: "powers", weight: 3 },
  { source: "c-scaling", target: "c-chatgpt", label: "justifies", weight: 2 },
  { source: "c-chatgpt", target: "c-agents", label: "enables", weight: 3 },
  { source: "c-agents", target: "c-rag", label: "uses", weight: 2 },
  { source: "c-agents", target: "c-o1", label: "extends", weight: 2 },
  { source: "c-agents", target: "c-mcp", label: "connects via", weight: 2 },
  { source: "c-o1", target: "c-world", label: "inspires", weight: 2 },
  { source: "c-world", target: "c-agi", label: "path to", weight: 3 },
  { source: "c-robotics", target: "c-world", label: "needs", weight: 2 },
  { source: "c-agi", target: "c-robotics", label: "requires", weight: 2 },

  // Person connections
  { source: "p-turing", target: "c-turing", label: "creates", weight: 3 },
  { source: "p-turing", target: "c-turing-test", label: "proposes", weight: 3 },
  { source: "p-mccarthy", target: "c-dartmouth", label: "organizes", weight: 3 },
  { source: "p-mccarthy", target: "c-lisp", label: "invents", weight: 3 },
  { source: "p-minsky", target: "c-symbolic", label: "champions", weight: 2 },
  { source: "p-rosenblatt", target: "c-perceptron", label: "builds", weight: 3 },
  { source: "p-hinton", target: "c-backprop", label: "popularizes", weight: 3 },
  { source: "p-hinton", target: "c-alexnet", label: "co-authors", weight: 3 },
  { source: "p-lecun", target: "c-alexnet", label: "inspires", weight: 2 },
  { source: "p-bengio", target: "c-backprop", label: "co-authors", weight: 2 },
  { source: "p-karpathy", target: "c-gpt", label: "educates", weight: 2 },
  { source: "p-altman", target: "c-chatgpt", label: "launches", weight: 3 },
  { source: "p-hassabis", target: "c-agents", label: "leads", weight: 2 },
];

// ═════════════════════════════════════════════════════════════
// COURSE CHAPTERS — Structured learning path
// ═════════════════════════════════════════════════════════════

export const chapters: Chapter[] = [
  { id: "ch-1", index: 1, title: "What is Intelligence?", subtitle: "The dream before the machine", era: "dream", conceptIds: ["turing-machine", "turing-test", "cybernetics", "logic"], sources: ["turing-1936", "turing-1950", "wiener-1948", "searle-1980"], duration: "45 min", level: "simple" },
  { id: "ch-2", index: 2, title: "The Birth of AI", subtitle: "Dartmouth and the naming of a field", era: "birth", conceptIds: ["dartmouth", "lisp", "perceptron", "general-problem-solver", "eliza"], sources: ["dartmouth-1956", "rosenblatt-1957", "weizenbaum-1966"], duration: "60 min", level: "simple" },
  { id: "ch-3", index: 3, title: "Symbolic AI & The Golden Age", subtitle: "The mind as a symbol manipulator", era: "golden", conceptIds: ["symbolic-ai", "search", "logic-theorist", "microblocks"], sources: ["minsky-papert-1969"], duration: "50 min", level: "deeper" },
  { id: "ch-4", index: 4, title: "The AI Winters", subtitle: "When hype collapses", era: "winter1", conceptIds: ["ai-winter", "lighthill"], sources: ["minsky-papert-1969"], duration: "30 min", level: "simple" },
  { id: "ch-5", index: 5, title: "Expert Systems & Backpropagation", subtitle: "Rules, then learning", era: "expert", conceptIds: ["expert-systems", "mycin", "backpropagation", "connectionism"], sources: ["backprop-1986"], duration: "55 min", level: "deeper" },
  { id: "ch-6", index: 6, title: "The Quiet Revolution", subtitle: "AI rebuilds with math", era: "quiet", conceptIds: ["svm", "deep-blue", "bayesian", "random-forests", "hinton"], sources: ["hinton-2006", "lecun-1998"], duration: "60 min", level: "deeper" },
  { id: "ch-7", index: 7, title: "The Deep Learning Explosion", subtitle: "AlexNet and the GPU revolution", era: "deep-learning", conceptIds: ["alexnet", "gpus", "imagenet", "resnet", "lstm", "dropout", "word2vec", "batch-norm"], sources: ["alexnet-2012", "resnet-2015", "gan-2014", "alphago-2016"], duration: "75 min", level: "deeper" },
  { id: "ch-8", index: 8, title: "The Transformer Era", subtitle: "Attention is all you need", era: "transformer", conceptIds: ["transformer", "attention", "bert", "gpt", "self-attention", "transfer-learning"], sources: ["transformer-2017", "bert-2018", "gpt-2018", "gpt3-2020"], duration: "70 min", level: "deepest" },
  { id: "ch-9", index: 9, title: "The LLM & Foundation Model Era", subtitle: "Scale, alignment, and ChatGPT", era: "llm", conceptIds: ["scaling-laws", "rlhf", "chain-of-thought", "diffusion", "chatgpt"], sources: ["scaling-2020", "gpt3-2020", "stablediffusion-2022", "chatgpt-2022", "gpt4-2023"], duration: "80 min", level: "deepest" },
  { id: "ch-10", index: 10, title: "The Agent & Reasoning Era", subtitle: "Models that act and think", era: "agents", conceptIds: ["agents", "rag", "function-calling", "o1", "reasoning", "multimodal", "mcp", "tool-use"], sources: ["o1-2024", "deepseek-r1-2025", "mcp-2024"], duration: "75 min", level: "deepest" },
  { id: "ch-11", index: 11, title: "The Present & Beyond", subtitle: "World models, robotics, and the path to AGI", era: "present", conceptIds: ["world-models", "agi", "robotics", "long-horizon"], sources: ["gpt4-2023"], duration: "60 min", level: "deepest" },
];

// ═════════════════════════════════════════════════════════════
// FLOWCHARTS — Visual process diagrams
// ═════════════════════════════════════════════════════════════

export interface FlowchartNode {
  id: string;
  label: string;
  x: number;
  y: number;
  type: "start" | "process" | "decision" | "end" | "data";
}

export interface FlowchartEdge {
  from: string;
  to: string;
  label?: string;
}

export interface Flowchart {
  id: string;
  title: string;
  description: string;
  nodes: FlowchartNode[];
  edges: FlowchartEdge[];
}

export const flowcharts: Flowchart[] = [
  {
    id: "fc-training",
    title: "How a Neural Network Learns",
    description: "The training loop — forward pass, loss, backprop, update",
    nodes: [
      { id: "start", label: "Training Data", x: 200, y: 0, type: "start" },
      { id: "forward", label: "Forward Pass\n(input → output)", x: 200, y: 100, type: "process" },
      { id: "loss", label: "Compute Loss\n(error)", x: 200, y: 200, type: "process" },
      { id: "decision", label: "Loss < threshold?", x: 200, y: 300, type: "decision" },
      { id: "backprop", label: "Backpropagation\n(∂E/∂w)", x: 400, y: 300, type: "process" },
      { id: "update", label: "Update Weights\nw ← w − η·∂E/∂w", x: 400, y: 200, type: "process" },
      { id: "end", label: "Trained Model", x: 200, y: 400, type: "end" },
    ],
    edges: [
      { from: "start", to: "forward" },
      { from: "forward", to: "loss" },
      { from: "loss", to: "decision" },
      { from: "decision", to: "backprop", label: "No" },
      { from: "backprop", to: "update" },
      { from: "update", to: "forward", label: "repeat" },
      { from: "decision", to: "end", label: "Yes" },
    ],
  },
  {
    id: "fc-transformer",
    title: "Transformer Architecture",
    description: "How the Transformer processes input → output",
    nodes: [
      { id: "input", label: "Input Tokens", x: 200, y: 0, type: "start" },
      { id: "embed", label: "Token + Position\nEmbedding", x: 200, y: 100, type: "process" },
      { id: "attention", label: "Multi-Head\nSelf-Attention", x: 200, y: 200, type: "process" },
      { id: "addnorm1", label: "Add & Norm\n(residual)", x: 200, y: 300, type: "process" },
      { id: "ffn", label: "Feed-Forward\nNetwork", x: 200, y: 400, type: "process" },
      { id: "addnorm2", label: "Add & Norm\n(residual)", x: 200, y: 500, type: "process" },
      { id: "repeat", label: "× N layers", x: 400, y: 300, type: "decision" },
      { id: "output", label: "Output\n(softmax)", x: 200, y: 600, type: "end" },
    ],
    edges: [
      { from: "input", to: "embed" },
      { from: "embed", to: "attention" },
      { from: "attention", to: "addnorm1" },
      { from: "addnorm1", to: "ffn" },
      { from: "ffn", to: "addnorm2" },
      { from: "addnorm2", to: "repeat" },
      { from: "repeat", to: "attention", label: "next layer" },
      { from: "repeat", to: "output", label: "done" },
    ],
  },
  {
    id: "fc-rlhf",
    title: "RLHF Training Pipeline",
    description: "How ChatGPT was aligned with human preferences",
    nodes: [
      { id: "pretrain", label: "Pre-trained LLM\n(GPT)", x: 200, y: 0, type: "start" },
      { id: "sft", label: "Supervised\nFine-Tuning", x: 200, y: 100, type: "process" },
      { id: "collect", label: "Collect Human\nRankings", x: 200, y: 200, type: "data" },
      { id: "reward", label: "Train Reward\nModel", x: 200, y: 300, type: "process" },
      { id: "ppo", label: "PPO Optimization\n(policy ↑ reward)", x: 200, y: 400, type: "process" },
      { id: "kl", label: "KL Penalty\n(stay close)", x: 400, y: 400, type: "process" },
      { id: "chatgpt", label: "Aligned Model\n(ChatGPT)", x: 200, y: 500, type: "end" },
    ],
    edges: [
      { from: "pretrain", to: "sft" },
      { from: "sft", to: "collect" },
      { from: "collect", to: "reward" },
      { from: "reward", to: "ppo" },
      { from: "ppo", to: "kl" },
      { from: "kl", to: "ppo", label: "constrain" },
      { from: "ppo", to: "chatgpt" },
    ],
  },
  {
    id: "fc-agent",
    title: "AI Agent Loop",
    description: "How an AI agent reasons, acts, and learns",
    nodes: [
      { id: "goal", label: "User Goal", x: 200, y: 0, type: "start" },
      { id: "plan", label: "Plan\n(decompose)", x: 200, y: 100, type: "process" },
      { id: "act", label: "Act\n(tool call)", x: 200, y: 200, type: "process" },
      { id: "observe", label: "Observe\n(result)", x: 200, y: 300, type: "data" },
      { id: "check", label: "Goal met?", x: 200, y: 400, type: "decision" },
      { id: "reflect", label: "Reflect\n(self-correct)", x: 400, y: 400, type: "process" },
      { id: "done", label: "Final Answer", x: 200, y: 500, type: "end" },
    ],
    edges: [
      { from: "goal", to: "plan" },
      { from: "plan", to: "act" },
      { from: "act", to: "observe" },
      { from: "observe", to: "check" },
      { from: "check", to: "reflect", label: "No" },
      { from: "reflect", to: "plan", label: "retry" },
      { from: "check", to: "done", label: "Yes" },
    ],
  },
  {
    id: "fc-diffusion",
    title: "Diffusion Generation",
    description: "How AI creates images from noise",
    nodes: [
      { id: "noise", label: "Random Noise\nxT", x: 200, y: 0, type: "start" },
      { id: "denoise1", label: "Denoise Step\n(predict noise)", x: 200, y: 100, type: "process" },
      { id: "step", label: "Step t → t-1", x: 200, y: 200, type: "process" },
      { id: "check", label: "t = 0?", x: 200, y: 300, type: "decision" },
      { id: "image", label: "Generated Image\nx0", x: 200, y: 400, type: "end" },
    ],
    edges: [
      { from: "noise", to: "denoise1" },
      { from: "denoise1", to: "step" },
      { from: "step", to: "check" },
      { from: "check", to: "denoise1", label: "No" },
      { from: "check", to: "image", label: "Yes" },
    ],
  },
  {
    id: "fc-rag",
    title: "RAG Pipeline",
    description: "Retrieval-Augmented Generation — grounding AI in facts",
    nodes: [
      { id: "query", label: "User Query", x: 200, y: 0, type: "start" },
      { id: "embed", label: "Embed Query\n(vector)", x: 200, y: 100, type: "process" },
      { id: "retrieve", label: "Retrieve Top-K\n(vector DB)", x: 200, y: 200, type: "data" },
      { id: "rerank", label: "Rerank\n(cross-encoder)", x: 200, y: 300, type: "process" },
      { id: "prompt", label: "Build Prompt\n(context + query)", x: 200, y: 400, type: "process" },
      { id: "generate", label: "LLM Generates\nGrounded Answer", x: 200, y: 500, type: "end" },
    ],
    edges: [
      { from: "query", to: "embed" },
      { from: "embed", to: "retrieve" },
      { from: "retrieve", to: "rerank" },
      { from: "rerank", to: "prompt" },
      { from: "prompt", to: "generate" },
    ],
  },
];

// ═════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═════════════════════════════════════════════════════════════

export function getEra(id: string): Era | undefined {
  return eras.find((e) => e.id === id);
}

export function getConcept(id: string): Concept | undefined {
  return concepts.find((c) => c.id === id);
}

export function getSource(id: string): Source | undefined {
  return sources.find((s) => s.id === id);
}

export function getConceptsForEra(eraId: string): Concept[] {
  const era = getEra(eraId);
  if (!era) return [];
  return era.concepts.map((id) => getConcept(id)).filter(Boolean) as Concept[];
}

export function getSourcesForEra(eraId: string): Source[] {
  return sources.filter((s) => s.era === eraId);
}

export function getSourcesForConcept(conceptId: string): Source[] {
  const concept = getConcept(conceptId);
  if (!concept) return [];
  return concept.sources.map((id) => getSource(id)).filter(Boolean) as Source[];
}

export function searchAll(query: string): { concepts: Concept[]; sources: Source[]; eras: Era[] } {
  const q = query.toLowerCase();
  return {
    concepts: concepts.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.tagline.toLowerCase().includes(q) ||
        c.simple.toLowerCase().includes(q) ||
        c.tags.some((t) => t.includes(q))
    ),
    sources: sources.filter(
      (s) =>
        s.title.toLowerCase().includes(q) ||
        s.author.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q)
    ),
    eras: eras.filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.tagline.toLowerCase().includes(q) ||
        e.summary.toLowerCase().includes(q)
    ),
  };
}

export const sourceKindColors: Record<string, string> = {
  paper: "#60a5fa",
  video: "#f87171",
  blog: "#34d399",
  essay: "#fbbf24",
  article: "#c084fc",
  book: "#f472b6",
  talk: "#22d3ee",
  code: "#a3e635",
};

export const sourceKindIcons: Record<string, string> = {
  paper: "FileText",
  video: "Play",
  blog: "PenLine",
  essay: "BookOpen",
  article: "Newspaper",
  book: "Library",
  talk: "Mic",
  code: "Code",
}