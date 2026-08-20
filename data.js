(function () {
  "use strict";

  window.siteData = {
    profile: {
      name: "Wei (James) Chen",
      nameZh: "陳暐",
      role: {
        en: "Behavioral economist · NTU",
        zh: "行為經濟學者 · 國立臺灣大學",
      },
      title: {
        en: "Assistant Professor, Department of Agricultural Economics",
        zh: "國立臺灣大學農業經濟學系助理教授",
      },
      email: "jamesweichen@ntu.edu.tw",
      image: "./assets/people/james-chen.png",
      department: "http://www.agec.ntu.edu.tw/",
      facebook: "https://www.facebook.com/profile.php?id=100045836090802",
      cv: "./cv-wei.pdf",
      distinction: {
        label: { en: "Selected distinction", zh: "重要學術榮譽" },
        years: "2020–2024",
        title: { en: "Einstein Program awardee", zh: "愛因斯坦培植計畫獲選學者" },
        program: { en: "MOST Young Scholar Fellowship", zh: "科技部年輕學者養成計畫" },
        agency: {
          en: "Ministry of Science and Technology → National Science and Technology Council (2022)",
          zh: "科技部 → 國家科學及技術委員會（2022 年改制）",
        },
      },
    },

    bio: {
      en: [
        "I am an assistant professor in the Department of Agricultural Economics at National Taiwan University. I received my Ph.D. in Economics from The Ohio State University.",
        "Our lab combines experimental economics, neuroeconomics, and data science to study how people learn, decide, and respond to institutional environments. Across projects on intertemporal choice, voting behavior, synthetic subjects, and scientific institutions, we examine how cognition, rules, and research design jointly shape economic behavior.",
      ],
      zh: [
        "我是國立臺灣大學農業經濟學系助理教授，博士畢業於美國俄亥俄州立大學經濟學系。",
        "我的研究結合實驗經濟學、神經經濟學與資料科學，探討人們如何學習、做決定，以及制度如何影響行為。研究題目包括跨期選擇、投票、合成受試者與科學制度。",
      ],
    },

    themes: [
      {
        id: "learning",
        number: "01",
        title: { en: "Learning & decision", zh: "學習與決策" },
        text: {
          en: "How beliefs, attention, and moments of insight change choice.",
          zh: "研究信念、注意力與頓悟如何影響選擇。",
        },
        tags: ["Epiphany learning", "Monty Hall", "Decision theory"],
      },
      {
        id: "process",
        number: "02",
        title: { en: "Process tracing", zh: "決策歷程追蹤" },
        text: {
          en: "Using gaze, pupil dilation, mouse trajectories, EEG, and fMRI to study choice as it unfolds.",
          zh: "用眼動、瞳孔、滑鼠軌跡、EEG 與 fMRI 觀察決策過程。",
        },
        tags: ["Eye tracking", "Mouse tracking", "Neuroeconomics"],
      },
      {
        id: "institutions",
        number: "03",
        title: { en: "Institutions & policy", zh: "制度與政策" },
        text: {
          en: "Experimental evidence on elections, carbon policy, litigation, and scientific institutions.",
          zh: "透過實驗研究選舉、碳政策、訴訟與科學制度。",
        },
        tags: ["Political economy", "Environmental economics", "Institutions"],
      },
      {
        id: "computation",
        number: "04",
        title: { en: "Models & synthetic subjects", zh: "模型與合成受試者" },
        text: {
          en: "Computational models and large language models as tools for behavioral science.",
          zh: "用計算模型與大型語言模型研究行為。",
        },
        tags: ["Data science", "LLM simulation", "Behavioral modeling"],
      },
    ],

    methods: [
      {
        id: "behavioral",
        number: "01",
        title: { en: "Behavioral experiments", zh: "行為實驗" },
        text: {
          en: "Lab and online experiments that reveal choice, learning, and strategic behavior.",
          zh: "透過實驗室與線上實驗研究選擇、學習和策略行為。",
        },
        tags: { en: "Lab · Online · Games", zh: "實驗室 · 線上 · 賽局" },
      },
      {
        id: "tracking",
        number: "02",
        title: { en: "Process tracing", zh: "決策歷程追蹤" },
        text: {
          en: "Follow the hidden process of choice through eyes, pupils, and cursor movement.",
          zh: "從眼動、瞳孔與滑鼠軌跡觀察選擇如何形成。",
        },
        tags: { en: "Eye · Pupil · Mouse", zh: "眼動 · 瞳孔 · 滑鼠" },
      },
      {
        id: "computational",
        number: "03",
        title: { en: "Computational modeling", zh: "計算模型" },
        text: {
          en: "Use formal models, behavioral data, and synthetic subjects to explain decisions.",
          zh: "用形式模型、行為資料與合成受試者解釋決策。",
        },
        tags: { en: "Models · Data · LLM", zh: "模型 · 資料 · LLM" },
      },
      {
        id: "field",
        number: "04",
        title: { en: "Field & quasi-experiments", zh: "田野與準實驗" },
        text: {
          en: "Connect causal evidence to classrooms, farms, policy, and other real settings.",
          zh: "在課堂、農業與政策等真實場域檢驗因果關係。",
        },
        tags: { en: "Field · Policy · Education", zh: "田野 · 政策 · 教育" },
      },
      {
        id: "metascience",
        number: "05",
        title: { en: "Research design", zh: "研究設計" },
        text: {
          en: "Study reproducibility, peer review, and the institutions that shape evidence.",
          zh: "研究可重現性、同儕審查，以及產出科學證據的制度。",
        },
        tags: { en: "Meta-science · Peer review", zh: "後設科學 · 同儕審查" },
      },
    ],

    featuredFindings: [
      {
        number: "85",
        unit: { en: "% at least as high", zh: "% 未降低" },
        category: { en: "Strategic reasoning", zh: "策略推理" },
        title: {
          en: "Measuring Higher-Order Rationality with Belief Control",
          zh: "以信念控制衡量高階理性",
        },
        authors: "Wei James Chen, Meng-Jhang Fong, and Po-Hsuan Lin",
        venue: "Experimental Economics, 2025",
        finding: {
          en: "When opponents were fully rational computers, 85% of participants showed rationality levels at least as high as when responding to recorded human choices. Belief control also made individual reasoning levels more stable across games.",
          zh: "面對完全理性的電腦對手時，85% 的參與者所展現的理性層級，不低於他們回應人類過往選擇時的表現。控制對手信念後，同一人在不同賽局中的推理層級也更穩定。",
        },
        link: "https://www.cambridge.org/core/journals/experimental-economics/article/measuring-higherorder-rationality-with-belief-control/1A47976B734D6647D7D2B1FC4CF5AC0E",
      },
      {
        number: "95.3",
        unit: { en: "% reproducible", zh: "% 可重現" },
        category: { en: "Scientific institutions", zh: "科學制度" },
        title: {
          en: "Reproducibility in Management Science",
          zh: "《Management Science》的研究可重現性",
        },
        authors: "Miloš Fišar et al. and the Management Science Reproducibility Collaboration",
        venue: "Management Science, 2024",
        finding: {
          en: "After Management Science introduced mandatory data and code disclosure, reviewers fully or largely reproduced 95.3% of articles they could verify. Counting articles blocked by inaccessible data or computing requirements lowers the rate to 67.5%.",
          zh: "《Management Science》規定作者公開資料與程式碼後，在可驗證的論文中，95.3% 能完整或大致重現。若把因資料、軟體或硬體限制而無法驗證的論文也納入，比例為 67.5%。",
        },
        link: "https://pubsonline.informs.org/doi/10.1287/mnsc.2023.03556",
      },
      {
        number: "+9",
        unit: { en: "percentage points", zh: "個百分點" },
        category: { en: "Decision learning", zh: "決策學習" },
        title: {
          en: "A Modified Monty Hall Problem",
          zh: "改良版蒙提霍爾問題",
        },
        authors: "Wei James Chen and Joseph Tao-yi Wang",
        venue: "Theory and Decision, 2020",
        finding: {
          en: "After 15 rounds of the 100-door problem, participants switched on 86% of later three-door trials, compared with 77% in the control group. Starting with the easier example helped transfer the optimal strategy to the original problem.",
          zh: "先玩 15 回合的 100 扇門版本後，參與者在三門版本中的換門率為 86%，控制組則是 77%。先從較容易看出答案的例子開始，有助於把最佳策略帶回原本的問題。",
        },
        link: "https://link.springer.com/article/10.1007/s11238-020-09757-1",
      },
      {
        number: "94",
        unit: { en: "% agreement", zh: "% 分類一致" },
        category: { en: "Learning & insight", zh: "學習與頓悟" },
        title: {
          en: "Computational Modeling of Epiphany Learning",
          zh: "頓悟學習的計算模型",
        },
        authors: "Wei James Chen and Ian Krajbich",
        venue: "PNAS, 2017",
        finding: {
          en: "Among participants whose choices eventually converged on the optimal strategy, both the change-point test and model comparison classified 94% as epiphany learners. Eye movements and pupil responses also tracked the underlying evidence-accumulation process.",
          zh: "在最後收斂到最佳策略的參與者中，變點檢定與模型比較都把 94% 判定為頓悟學習者。眼動與瞳孔反應也反映出決策前累積證據的過程。",
        },
        link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC5422778/",
      },
      {
        number: "6",
        unit: { en: "recent trials", zh: "回合記憶範圍" },
        category: { en: "Behavioral modeling", zh: "行為模型" },
        title: {
          en: "Bounded Memory, Inertia, Sampling and Weighting Model for Market Entry Games",
          zh: "市場進入賽局的有限記憶、慣性、抽樣與加權模型",
        },
        authors: "Wei James Chen, Shu-Yu Liu, Chih-Han Chen, and Yi-Shan Lee",
        venue: "Games, 2011",
        finding: {
          en: "The BI-SAW model assumes that detailed recall is limited to the six most recent trials. That bounded-memory change improved out-of-sample prediction over I-SAW and won the 2010 Market Entry Prediction Competition.",
          zh: "BI-SAW 模型假設，人們只能精確回想最近六回合的經驗。這項有限記憶的設定，使模型的樣本外預測優於 I-SAW，並在 2010 年市場進入預測競賽中排名第一。",
        },
        link: "https://www.mdpi.com/2073-4336/2/1/187",
      },
    ],

    publications: [
      {
        year: 2025,
        status: "published",
        title: "Measuring Higher-Order Rationality with Belief Control",
        authors: "Wei James Chen, Meng-Jhang Fong, and Po-Hsuan Lin",
        venue: "Experimental Economics, 28(3), 804-831",
        link: "https://www.cambridge.org/core/journals/experimental-economics/article/measuring-higherorder-rationality-with-belief-control/1A47976B734D6647D7D2B1FC4CF5AC0E",
        theme: "learning",
        method: "behavioral",
      },
      {
        year: 2024,
        status: "published",
        title: "Reproducibility in Management Science",
        authors: "Miloš Fišar, Ben Greiner, Christoph Huber, Elena Katok, Ali I. Ozkes, and the Management Science Reproducibility Collaboration",
        venue: "Management Science, 70(3), 1343-1356",
        link: "https://doi.org/10.1287/mnsc.2023.03556",
        theme: "institutions",
        method: "metascience",
      },
      {
        year: 2020,
        status: "published",
        title: "A Modified Monty Hall Problem",
        authors: "Wei James Chen and Joseph Tao-yi Wang",
        venue: "Theory and Decision, 89, 151-156",
        link: "https://link.springer.com/article/10.1007/s11238-020-09757-1",
        theme: "learning",
        method: "behavioral",
      },
      {
        year: 2017,
        status: "published",
        title: "Computational Modeling of Epiphany Learning",
        authors: "Wei James Chen and Ian Krajbich",
        venue: "Proceedings of the National Academy of Sciences, 114(18), 4637-4642",
        link: "https://www.pnas.org/doi/10.1073/pnas.1618161114",
        theme: "process",
        method: "computational",
      },
      {
        year: 2011,
        status: "published",
        title: "Bounded Memory, Inertia, Sampling and Weighting Model for Market Entry Games",
        authors: "Wei Chen, Shu-Yu Liu, Chih-Han Chen, and Yi-Shan Lee",
        venue: "Games, 2(1), 187-199",
        link: "https://www.mdpi.com/2073-4336/2/1/187",
        theme: "learning",
        method: "computational",
      },
    ],

    workingPapers: [
      {
        year: 2026,
        status: "working",
        title: "Research Design as Evidence: Information and Incentives in Peer Review",
        authors: "Wei-Cheng Chen, Wei James Chen, and Greg Chih-Hsin Sheen",
        venue: "Working paper",
        theme: "institutions",
        method: "metascience",
      },
      {
        year: 2026,
        status: "working",
        title: "From Individuals to Populations: Eliciting Human Behaviour from Large Language Models",
        authors: "Zhi-Hong Howie Jian and Wei James Chen",
        venue: "Working paper",
        theme: "computation",
        method: "computational",
        abstract: "When using large language models (LLMs) to simulate population-level human behaviour, researchers typically generate one decision per model call, a procedure we call atomic elicitation. We propose chunked elicitation, in which each call simulates multiple participants and returns their decisions. Across several widely studied economic games and frontier LLMs, chunked elicitation substantially improves distributional fit to human benchmarks. Control tasks show that this improvement is not merely due to indiscriminate noise. The elicitation protocol therefore shapes how closely LLM outputs match human behavioural distributions and should itself be validated.",
      },
      {
        year: 2026,
        status: "rr",
        title: "The Transparent-Door Monty Hall Problem: An Experimental Study of Learning and Bias",
        authors: "Wei James Chen and Joseph Tao-yi Wang",
        venue: "R&R, Journal of Economic Psychology",
        theme: "learning",
        method: "behavioral",
      },
      {
        year: 2025,
        status: "working",
        title: "Cap or Tax? Experimental Evidence on Carbon Policy under Market Power and Real Emissions",
        authors: "Wei James Chen and Ya-Ting Chuang",
        venue: "Working paper",
        theme: "institutions",
        method: "behavioral",
      },
      {
        year: 2024,
        status: "working",
        title: "Third-Party Litigation Funding on Settlement: An Experimental Study",
        authors: "Wei James Chen and Wei-Cheng Chen",
        venue: "Working paper",
        theme: "institutions",
        method: "behavioral",
      },
      {
        year: 2026,
        status: "rr",
        title: "Interactive Game-Based Pedagogy: A Quasi-Experimental Study in Microeconomics",
        authors: "Wei James Chen, Zhi Li, and Joseph Tao-yi Wang",
        venue: "R&R, International Review of Economics Education",
        theme: "institutions",
        method: "field",
      },
      {
        year: 2023,
        status: "working",
        title: "Modeling Epiphany Learning Behavior in the Two-Person Beauty Contest",
        authors: "Wei James Chen and Meng-Jhang Fong",
        venue: "Working paper",
        theme: "learning",
        method: "computational",
      },
      {
        year: 2023,
        status: "working",
        title: "Pupil Dilation Amplifies Gaze Bias in Value-Based Choice",
        authors: "Wei James Chen and Ian Krajbich",
        venue: "Working paper",
        theme: "process",
        method: "tracking",
      },
      {
        year: 2023,
        status: "working",
        title: "“Will” It Be Seen? Using Eye Tracking to Reexamine the Future Tense Effect in Intertemporal Choices",
        authors: "Jiang-Shiang Hu, Josie I Chen, and Wei James Chen",
        venue: "Working paper",
        theme: "process",
        method: "tracking",
      },
      {
        year: 2023,
        status: "working",
        title: "Exploring the Impact of Representative Systems on Decision Making",
        authors: "Ching-Yuan Kao and Wei James Chen",
        venue: "Working paper",
        theme: "institutions",
        method: "behavioral",
      },
      {
        year: 2022,
        status: "working",
        title: "A Broader Window of Cognition: Eye Tracking and Mouse Tracking in Spatial Beauty Contest Games",
        authors: "Yu-Hsiang Wang, Joseph Tao-yi Wang, and Wei James Chen",
        venue: "Working paper",
        theme: "process",
        method: "tracking",
      },
      {
        year: 2022,
        status: "working",
        title: "Does Combining General Election and Electoral Referendum Increase Voter Turnout?",
        authors: "Yu-Pei Chen, Wei James Chen, and Greg Chih-Hsin Sheen",
        venue: "Working paper",
        theme: "institutions",
        method: "behavioral",
      },
      {
        year: 2026,
        status: "rr",
        title: "Does Disaster Relief Encourage High-Risk Planting? Evidence from Banana Farmers’ Planting Timing in Taiwan",
        authors: "Wei James Chen and Yan Han",
        venue: "R&R, Taiwan Economic Forecast and Policy",
        theme: "institutions",
        method: "field",
      },
    ],

    people: {
      current: [
        {
          name: "Adiyasuren Otgon",
          nameZh: "艾迪雅",
          role: { en: "International M.A. student", zh: "國際碩士專班學生" },
          bio: {
            en: "International Master's Program in Agricultural Economics; from Mongolia.",
            zh: "就讀農業經濟學系國際碩士專班，來自蒙古。",
          },
        },
        {
          name: "Shi Han Huang",
          nameZh: "黃詩涵",
          role: { en: "M.A. student", zh: "碩士生" },
          bio: {
            en: "Interested in economics and data analysis; works primarily with Python.",
            zh: "研究興趣是經濟學與資料分析，主要使用 Python。",
          },
        },
        {
          name: "Weichen Lee",
          nameZh: "李維宸",
          role: { en: "M.A. student", zh: "碩士生" },
          bio: {
            en: "Interested in data analysis and experimental economics.",
            zh: "對資料分析和實驗經濟學有興趣。",
          },
        },
        {
          name: "Yen Han",
          nameZh: "韓硯",
          role: { en: "M.A. student", zh: "碩士生" },
          bio: {
            en: "Graduate student in the in-service M.A. program in Agricultural Economics.",
            zh: "就讀農業經濟學系碩士在職專班。",
          },
        },
        {
          name: "Ying Chen Lin",
          nameZh: "林映辰",
          role: { en: "M.A. student", zh: "碩士生" },
          bio: {
            en: "Studies experimental economics and the design and execution of economic experiments.",
            zh: "研究實驗經濟學，也學習如何設計與執行經濟實驗。",
          },
        },
      ],
      formerStudents: [
        {
          name: "Asta Chen (陳玉配)",
          title: { en: "M.A. student", zh: "碩士畢業生" },
          awards: [{ category: "policy", level: "honorable" }],
        },
        {
          name: "Ching Yuan Kao (高敬媛)",
          title: { en: "M.A. student", zh: "碩士畢業生" },
          current: {
            en: "Ph.D. student in the Department of Agricultural Economics at Texas A&M University",
            zh: "德州農工大學農業經濟學系博士生",
          },
          awards: [{ category: "policy", level: "honorable" }],
        },
        {
          name: "Jiang-Shiang Hu (胡將相)",
          title: { en: "M.A. student", zh: "碩士畢業生" },
          current: {
            en: "Ph.D. student in the Department of Economics at National Taiwan University",
            zh: "國立臺灣大學經濟學系博士生",
          },
          awards: [{ category: "general", level: "first" }],
        },
        {
          name: "Shih Chuan Chu (朱世全)",
          title: { en: "M.A. student", zh: "碩士畢業生" },
          awards: [
            { category: "general", level: "honorable" },
            { category: "policy", level: "honorable" },
          ],
        },
      ],
      formerResearchAssistants: [
        {
          name: "Gustave Yang (楊仲)",
          title: { en: "B.A. research assistant", zh: "學士級研究助理" },
          current: {
            en: "Ph.D. student in the Department of Economics at Harvard University",
            zh: "哈佛大學經濟學博士生",
          },
        },
        { name: "Ping Yi Wu (吳品儀)", title: { en: "B.A. research assistant", zh: "學士級研究助理" } },
        { name: "Rita Liao (廖行慈)", title: { en: "B.A. research assistant", zh: "學士級研究助理" } },
        { name: "Song Duo Ma (馬松鐸)", title: { en: "B.A. research assistant", zh: "學士級研究助理" } },
        { name: "Vivian Weng (翁如萱)", title: { en: "B.A. research assistant", zh: "學士級研究助理" } },
        { name: "Wei Chen Chang (張瑋宸)", title: { en: "B.A. research assistant", zh: "學士級研究助理" } },
        { name: "Wei Ming Fu (傅韋銘)", title: { en: "M.A. research assistant", zh: "碩士級研究助理" } },
        { name: "Wei Ping Fang (方唯蘋)", title: { en: "B.A. research assistant", zh: "學士級研究助理" } },
        { name: "Yao Yi Ruan (阮耀誼)", title: { en: "B.A. research assistant", zh: "學士級研究助理" } },
        { name: "Yi Wun Liao (廖羿雯)", title: { en: "M.A. research assistant", zh: "碩士級研究助理" } },
        { name: "Yong Syun Lin (林咏壎)", title: { en: "M.A. research assistant", zh: "碩士級研究助理" } },
        { name: "I-SIN CHIU (邱奕馨)", title: { en: "B.A. research assistant", zh: "學士級研究助理" } },
      ],
    },

    // Conference presentation entry template:
    // { year: 2026, title: "...", event: "...", location: "City, Country" }
    presentations: [
      {
        year: "Forthcoming",
        title: "The Sampling Unit Shapes Behavioural Similarity in Large Language Model Simulations",
        event: "Workshop on the Impact of AI on Human Learning",
        location: "Nice, France",
      },
      {
        year: 2026,
        title: "Carbon Footprint Labels and Food and Beverage Choice: Eye-Tracking Evidence from MaaDDM",
        event: "Economic Science Association World Meeting",
        location: "Los Angeles, USA",
      },
      {
        year: 2026,
        title: "The Sampling Unit Shapes Behavioural Similarity in Large Language Model Simulations",
        event: "Asian Meeting of Behavioral and Experimental Research",
        location: "Osaka, Japan",
      },
      {
        year: 2026,
        title: "Allocation Rules and Market Power in Carbon Trading: Evidence from Laboratory Experiments",
        event: "Asia-Pacific Economic Science Association Meeting",
        location: "Melbourne, Australia",
      },
      {
        year: 2025,
        title: "Cap or Tax? Experimental Evidence on Carbon Policy under Market Power with Real Emissions",
        event: "North American Economic Science Association Meeting",
        location: "Tucson, USA",
      },
      {
        year: 2025,
        title: "The Sampling Unit Shapes Behavioural Similarity in Large Language Model Simulations",
        event: "Asia-Pacific Economic Science Association Meeting",
        location: "Osaka, Japan",
      },
      {
        year: 2024,
        title: "Neural Bases of Epiphany Learning: An fMRI Study Using a Race Game (Poster Presentation)",
        event: "Society for Neuroeconomics Annual Meeting",
        location: "Cascais, Portugal",
      },
      {
        year: 2024,
        title: "Exploring the Impact of Representative Systems on Decision Making: An Experimental Study on the Tendency to Favor Options with High Probability but Small Impact",
        event: "Asian Law and Economics Association Annual Conference",
        location: "Tainan, Taiwan",
      },
      {
        year: 2024,
        title: "Insights into Epiphany Learning Across Different Games: An Experimental Approach",
        event: "Learning, Evolution and Games Conference",
        location: "Brisbane, Australia",
      },
      {
        year: 2024,
        title: "Exploring the Impact of Representative Systems on Decision Making: An Experimental Study on the Tendency to Favor Options with High Probability but Small Impact",
        event: "Foundations of Utility and Risk Conference",
        location: "Brisbane, Australia",
      },
      {
        year: 2024,
        title: "The Impact of Pre-Quorum Information on Voter Turnout",
        event: "Asia-Pacific Economic Science Association Meeting",
        location: "Singapore",
      },
      {
        year: 2023,
        title: '“Will” it be Seen? Using Eye Tracking to Reexamine the Future Tense Effect in Intertemporal Choices',
        event: "International Workshop on Experimental Economics",
        location: "Osaka, Japan",
      },
      {
        year: 2023,
        title: '“Will” it be Seen? Using Eye Tracking to Reexamine the Future Tense Effect in Intertemporal Choices (Poster Spotlight)',
        event: "Society for Neuroeconomics Annual Meeting",
        location: "Vancouver, Canada",
      },
      {
        year: 2023,
        title: "Does combining general election and electoral referendum increase the voter turnout? A gamified experimental study",
        event: "Asia-Pacific Economic Science Association Conference",
        location: "Seoul, South Korea",
      },
      {
        year: 2019,
        title: "Pupil dilation and attention in value-based choice",
        event: "Decision: Theory, Experiments, and Application",
        location: "Chengdu, China",
      },
      {
        year: 2018,
        title: "Pupil dilation and attention in value-based choice",
        event: "International Conference for Neuromanagement and Neuroeconomics",
        location: "Hangzhou, China",
      },
      {
        year: 2016,
        title: "Pupil dilation and attention in value-based choice",
        event: "North American Economic Science Association Conference",
        location: "Tucson, USA",
      },
      {
        year: 2016,
        title: "Pupil dilation and attention in value-based choice (Poster Sessions)",
        event: "Society for Neuroeconomics Annual Meeting",
        location: "Berlin, Germany",
      },
      {
        year: 2016,
        title: "Pupil dilation and attention in value-based choice",
        event: "TIBER Symposium on Psychology and Economics",
        location: "Tilburg, Netherlands",
      },
      {
        year: 2015,
        title: "Epiphany Learning, Attention and Arousal",
        event: "North American Economic Science Association Conference",
        location: "Dallas, USA",
      },
      {
        year: 2015,
        title: "Epiphany Learning, Attention and Arousal (Poster Sessions)",
        event: "Society for Neuroeconomics Annual Meeting",
        location: "Miami, USA",
      },
      {
        year: 2013,
        title: "Epiphany Learning Model",
        event: "Asia-Pacific Economic Science Association Conference",
        location: "Tokyo, Japan",
      },
      {
        year: 2010,
        title: "Bounded Memory, Inertia, Sampling and Weighting Model in Market Entry Games",
        event: "North American Economic Science Association Conference",
        location: "Tucson, USA",
      },
      {
        year: 2009,
        title: "Learning to Solve the Monty Hall Problem With An 100-door Treatment",
        event: "International Economic Science Association Conference",
        location: "Washington, DC, USA",
      },
    ],

    teaching: {
      featured: {
        title: {
          en: "A Journey Through Calculus in the Business World",
          zh: "商業世界的微積分之旅",
        },
        description: {
          en: "A self-paced online course that builds calculus from the ground up and applies differentiation and integration to economic and management problems.",
          zh: "從基礎數學開始，介紹微分與積分，以及這些工具在經濟與管理問題中的用法。",
        },
        provider: {
          en: "NTU School of Professional Education and Continuing Studies",
          zh: "國立臺灣大學進修推廣學院",
        },
        duration: { en: "3 hr 23 min", zh: "3 小時 23 分" },
        url: "https://online.ntuspecs.ntu.edu.tw/%E5%95%86%E6%A5%AD%E4%B8%96%E7%95%8C%E7%9A%84%E5%BE%AE%E7%A9%8D%E5%88%86%E4%B9%8B%E6%97%85",
      },
      youtube: {
        handle: "@James_Chen",
        description: {
          en: "Additional teaching videos and public learning resources are available on my YouTube channel.",
          zh: "YouTube 頻道另有教學影片與公開學習資源。",
        },
        url: "https://www.youtube.com/@James_Chen",
      },
      ntu: [
        {
          code: "DSSI",
          title: { en: "Data Science and Social Inquiry", zh: "資料科學與社會研究" },
          note: { en: "Co-taught", zh: "共同授課" },
        },
        {
          code: "AGEC 7022",
          title: { en: "Macroeconomic Theory", zh: "總體經濟理論" },
        },
        {
          code: "AGEC 7130",
          title: { en: "Managerial Economics Analysis", zh: "管理經濟分析" },
        },
        {
          code: "BICD 6003",
          title: { en: "Principles of Microeconomics", zh: "個體經濟學原理" },
        },
        {
          code: "AGEC 1005",
          title: { en: "Principle of Economics (I)", zh: "經濟學原理（一）" },
        },
        {
          code: "AGEC 1006",
          title: { en: "Principle of Economics (II)", zh: "經濟學原理（二）" },
        },
        {
          code: "AGEC 3032 / 7147",
          title: { en: "Applied Game Theory", zh: "應用賽局理論" },
        },
        {
          code: "AGEC 7021",
          title: { en: "Microeconomic Theory (II)", zh: "個體經濟理論（二）" },
        },
        {
          code: "AGEC 8011",
          title: { en: "Production Economics (II)", zh: "生產經濟學（二）" },
        },
        {
          code: "SW 5046",
          title: {
            en: "Theories and Social Applications of Behavioral Economics",
            zh: "行為經濟之理論與社會應用",
          },
          note: { en: "Co-taught", zh: "共同授課" },
        },
      ],
      ncu: [
        {
          code: "BA 3070",
          title: { en: "Microeconomics", zh: "個體經濟學" },
        },
        {
          code: "BA 7018",
          title: { en: "Behavioral Decision Theory", zh: "行為決策理論" },
        },
        {
          code: "MT 1011",
          title: { en: "Economics", zh: "經濟學" },
        },
      ],
    },

    news: [
      {
        date: "2025.06.30",
        datetime: "2025-06-30",
        en: "The lab received an NSTC Young Scholar Research Grant for the project “The Impact of Carbon Footprint and Nutrition Labels on Consumer Choices: An Eye-Tracking Experiment.”",
        zh: "實驗室獲得國科會新進人員研究計畫「碳足跡與營養標籤對消費選擇的影響：基於眼動追蹤的實驗研究」。",
      },
      {
        date: "2024.12.04",
        datetime: "2024-12-04",
        en: "The lab received a joint research grant from Academia Sinica and NTU for the project “Experimental Insights into Carbon Policy: Evaluating the Environmental and Economic Impacts of Carbon Taxes and Emissions Trading Systems.”",
        zh: "實驗室獲得中研院與臺大補助計畫「碳政策的實驗洞察：評估碳稅與碳權交易制度對環境與經濟的影響」。",
      },
      {
        date: "2024.11.15",
        datetime: "2024-11-15",
        en: "Supervised master’s student Shih Chuan Chu (朱世全) received Honorable Mention in both the General and Policy categories of the Taiwan Economic Association Best Master’s Thesis Award.",
        zh: "指導碩士生 Shih Chuan Chu（朱世全）獲得臺灣經濟學會最佳碩士論文獎佳作（一般類與政策類雙料）。",
      },
      {
        date: "2023.11.15",
        datetime: "2023-11-15",
        en: "Co-supervised master’s student Jiang-Shiang Hu received First Prize in the General category of the Taiwan Economic Association Best Master’s Thesis Award.",
        zh: "共同指導碩士生胡將相獲得臺灣經濟學會最佳碩士論文獎最佳獎（一般類）。",
      },
      {
        date: "2023.11.15",
        datetime: "2023-11-15",
        en: "Supervised master’s student Ching Yuan Kao (高敬媛) received Honorable Mention in the Policy category of the Taiwan Economic Association Best Master’s Thesis Award.",
        zh: "指導碩士生 Ching Yuan Kao（高敬媛）獲得臺灣經濟學會最佳碩士論文獎佳作（政策類）。",
      },
      {
        date: "2022.11.15",
        datetime: "2022-11-15",
        en: "Supervised master’s student Asta Chen (陳玉配) received Honorable Mention in the Policy category of the Taiwan Economic Association Best Master’s Thesis Award.",
        zh: "指導碩士生 Asta Chen（陳玉配）獲得臺灣經濟學會最佳碩士論文獎佳作（政策類）。",
      },
      {
        date: "2021.10.15",
        datetime: "2021-10-15",
        en: "The NSTC YSFXWORLD channel featured a video introducing research by Wei James Chen (陳暐) on epiphany learning.",
        zh: "國科會 YSFXWORLD 頻道刊登介紹 Wei James Chen（陳暐）頓悟學習研究的影片。",
      },
    ],
  };
})();
