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
    },

    bio: {
      en: [
        "I am an assistant professor in the Department of Agricultural Economics at National Taiwan University. I received my Ph.D. in Economics from The Ohio State University.",
        "Our lab combines experimental economics, neuroeconomics, and data science to study how people learn, decide, and respond to institutional environments. Across projects on intertemporal choice, voting behavior, synthetic subjects, and scientific institutions, we examine how cognition, rules, and research design jointly shape economic behavior.",
      ],
      zh: [
        "我是國立臺灣大學農業經濟學系助理教授，並取得美國俄亥俄州立大學經濟學博士學位。",
        "本實驗室結合實驗經濟學、神經經濟學與資料科學，研究人們如何學習、決策，以及如何回應不同制度環境。我們的研究涵蓋跨期選擇、投票行為、合成受試者與科學制度，關注認知、制度規則與研究設計如何共同形塑經濟行為。",
      ],
    },

    themes: [
      {
        id: "learning",
        number: "01",
        title: { en: "Learning & decision", zh: "學習與決策" },
        text: {
          en: "How beliefs, attention, and moments of insight change choice.",
          zh: "探討信念、注意力與頓悟如何改變選擇。",
        },
        tags: ["Epiphany learning", "Monty Hall", "Decision theory"],
      },
      {
        id: "process",
        number: "02",
        title: { en: "Process tracing", zh: "決策歷程追蹤" },
        text: {
          en: "Using gaze, pupil dilation, mouse trajectories, EEG, and fMRI to study choice as it unfolds.",
          zh: "運用眼動、瞳孔變化、滑鼠軌跡、EEG 與 fMRI，觀察決策形成的過程。",
        },
        tags: ["Eye tracking", "Mouse tracking", "Neuroeconomics"],
      },
      {
        id: "institutions",
        number: "03",
        title: { en: "Institutions & policy", zh: "制度與政策" },
        text: {
          en: "Experimental evidence on elections, carbon policy, litigation, and scientific institutions.",
          zh: "以實驗方法研究選舉、碳政策、訴訟與科學制度。",
        },
        tags: ["Political economy", "Environmental economics", "Institutions"],
      },
      {
        id: "computation",
        number: "04",
        title: { en: "Models & synthetic subjects", zh: "模型與合成受試者" },
        text: {
          en: "Computational models and large language models as tools for behavioral science.",
          zh: "將計算模型與大型語言模型應用於行為科學研究。",
        },
        tags: ["Data science", "LLM simulation", "Behavioral modeling"],
      },
    ],

    publications: [
      {
        year: 2025,
        status: "published",
        title: "Measuring Higher-Order Rationality with Belief Control",
        authors: "Wei James Chen, Meng-Jhang Fong, and Po-Hsuan Lin",
        venue: "Experimental Economics, published online, 1-28",
        link: "https://www.cambridge.org/core/journals/experimental-economics/article/measuring-higherorder-rationality-with-belief-control/1A47976B734D6647D7D2B1FC4CF5AC0E",
        theme: "learning",
      },
      {
        year: 2023,
        status: "published",
        title: "Reproducibility in Management Science",
        authors: "Management Science Reproducibility Collaboration",
        venue: "Management Science, 70(3), 1343-1356",
        link: "https://doi.org/10.1287/mnsc.2023.03556",
        theme: "institutions",
      },
      {
        year: 2020,
        status: "published",
        title: "A Modified Monty Hall Problem",
        authors: "Wei James Chen and Joseph Tao-yi Wang",
        venue: "Theory and Decision, 89, 151-156",
        link: "https://link.springer.com/article/10.1007/s11238-020-09757-1",
        theme: "learning",
      },
      {
        year: 2017,
        status: "published",
        title: "Computational Modeling of Epiphany Learning",
        authors: "Wei James Chen and Ian Krajbich",
        venue: "Proceedings of the National Academy of Sciences, 114(18), 4637-4642",
        link: "https://www.pnas.org/doi/10.1073/pnas.1618161114",
        theme: "process",
      },
      {
        year: 2011,
        status: "published",
        title: "Bounded Memory, Inertia, Sampling and Weighting Model for Market Entry Games",
        authors: "Wei Chen, Shu-Yu Liu, Chih-Han Chen, and Yi-Shan Lee",
        venue: "Games, 2(1), 187-199",
        link: "https://www.mdpi.com/2073-4336/2/1/187",
        theme: "learning",
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
      },
      {
        year: 2026,
        status: "working",
        title: "The Sampling Unit Shapes Behavioural Similarity in Large Language Model Simulations",
        authors: "Zhi-Hong Howie Jian and Wei James Chen",
        venue: "Working paper",
        theme: "computation",
      },
      {
        year: 2026,
        status: "rr",
        title: "The Transparent-Door Monty Hall Problem: An Experimental Study of Learning and Bias",
        authors: "Wei James Chen and Joseph Tao-yi Wang",
        venue: "R&R, Journal of Economic Psychology",
        theme: "learning",
      },
      {
        year: 2025,
        status: "working",
        title: "Cap or Tax? Experimental Evidence on Carbon Policy under Market Power and Real Emissions",
        authors: "Wei James Chen and Ya-Ting Chuang",
        venue: "Working paper",
        theme: "institutions",
      },
      {
        year: 2024,
        status: "working",
        title: "Third-Party Litigation Funding on Settlement: An Experimental Study",
        authors: "Wei James Chen and Wei-Cheng Chen",
        venue: "Working paper",
        theme: "institutions",
      },
      {
        year: 2023,
        status: "rr",
        title: "Interactive Game-Based Pedagogy: A Quasi-Experimental Study in Microeconomics",
        authors: "Wei James Chen, Zhi Li, and Joseph Tao-yi Wang",
        venue: "R&R, International Review of Economics Education",
        theme: "institutions",
      },
      {
        year: 2023,
        status: "working",
        title: "Modeling Epiphany Learning Behavior in the Two-Person Beauty Contest",
        authors: "Wei James Chen and Meng-Jhang Fong",
        venue: "Working paper",
        theme: "learning",
      },
      {
        year: 2023,
        status: "working",
        title: "Pupil Dilation Amplifies Gaze Bias in Value-Based Choice",
        authors: "Wei James Chen and Ian Krajbich",
        venue: "Working paper",
        theme: "process",
      },
      {
        year: 2023,
        status: "working",
        title: "“Will” It Be Seen? Using Eye Tracking to Reexamine the Future Tense Effect in Intertemporal Choices",
        authors: "Jiang-Shiang Hu, Josie I Chen, and Wei James Chen",
        venue: "Working paper",
        theme: "process",
      },
      {
        year: 2023,
        status: "working",
        title: "Exploring the Impact of Representative Systems on Decision Making",
        authors: "Ching-Yuan Kao and Wei James Chen",
        venue: "Working paper",
        theme: "institutions",
      },
      {
        year: 2022,
        status: "working",
        title: "A Broader Window of Cognition: Eye Tracking and Mouse Tracking in Spatial Beauty Contest Games",
        authors: "Yu-Hsiang Wang, Joseph Tao-yi Wang, and Wei James Chen",
        venue: "Working paper",
        theme: "process",
      },
      {
        year: 2022,
        status: "working",
        title: "Does Combining General Election and Electoral Referendum Increase Voter Turnout?",
        authors: "Yu-Pei Chen, Wei James Chen, and Greg Chih-Hsin Sheen",
        venue: "Working paper",
        theme: "institutions",
      },
      {
        year: null,
        status: "rr",
        title: "Does Disaster Relief Encourage High-Risk Planting? Evidence from Banana Farmers’ Planting Timing in Taiwan",
        authors: "Wei James Chen and Yan Han",
        venue: "R&R, Taiwan Economic Forecast and Policy",
        theme: "institutions",
      },
    ],

    people: {
      current: [
        {
          name: "Shi Han Huang",
          nameZh: "黃詩涵",
          role: { en: "M.A. student", zh: "碩士生" },
          bio: {
            en: "Interested in economics and data analysis; works primarily with Python.",
            zh: "研究興趣包含經濟學與資料分析，主要使用 Python。",
          },
        },
        {
          name: "Weichen Lee",
          nameZh: "李維宸",
          role: { en: "M.A. student", zh: "碩士生" },
          bio: {
            en: "Interested in data analysis and experimental economics.",
            zh: "對資料分析與實驗經濟學感興趣。",
          },
        },
        {
          name: "Yen Han",
          nameZh: "韓硯",
          role: { en: "M.A. student", zh: "碩士生" },
          bio: {
            en: "Graduate student in the in-service M.A. program in Agricultural Economics.",
            zh: "農業經濟學系碩士在職專班研究生。",
          },
        },
        {
          name: "Ying Chen Lin",
          nameZh: "林映辰",
          role: { en: "M.A. student", zh: "碩士生" },
          bio: {
            en: "Studies experimental economics and the design and execution of economic experiments.",
            zh: "研究實驗經濟學，並學習經濟實驗的設計與執行。",
          },
        },
      ],
      alumni: [
        "Asta Chen (陳玉配)",
        "Ching Yuan Kao (高敬媛)",
        "Shih Chuan Chu (朱世全)",
        "Gustave Yang (楊仲)",
        "Ping Yi Wu (吳品儀)",
        "Rita Liao (廖行慈)",
        "Song Duo Ma (馬松鐸)",
        "Vivian Weng (翁如萱)",
        "Wei Chen Chang (張瑋宸)",
        "Wei Ming Fu (傅韋銘)",
        "Wei Ping Fang (方唯蘋)",
        "Yao Yi Ruan (阮耀誼)",
        "Yi Wun Liao (廖羿雯)",
        "Yong Syun Lin (林咏壎)",
        "邱奕馨",
      ],
    },

    teaching: {
      ntu: [
        "Capstone Project for Data Science and Social Inquiry (co-taught)",
        "Macroeconomic Theory",
        "Microeconomic Theory (II)",
        "Management of Economic Analysis",
        "Applied Game Theory",
        "Principles of Microeconomics",
        "Principles of Economics (I) and (II)",
        "Theories and Social Applications of Behavioral Economics (co-taught)",
      ],
      ncu: [
        "Intermediate Microeconomics",
        "Behavioral Decision Theory",
        "Principles of Economics",
      ],
    },

    news: [
      {
        date: "2025.06",
        en: "The lab received an NSTC Young Scholar Research Grant for an eye-tracking study of carbon-footprint and nutrition labels.",
        zh: "實驗室獲得國科會新進人員研究計畫，以眼動追蹤研究碳足跡與營養標籤對消費選擇的影響。",
      },
      {
        date: "2024.12",
        en: "The lab received a joint Academia Sinica-NTU grant to study carbon taxes and emissions trading with experiments.",
        zh: "實驗室獲得中研院與臺大創新性合作計畫補助，以實驗方法評估碳稅與碳權交易制度。",
      },
      {
        date: "2024.11",
        en: "Supervised master’s student Shih Chuan Chu received two honorable mentions in the Taiwan Economic Association Best Master’s Thesis Award.",
        zh: "指導碩士生朱世全獲臺灣經濟學會最佳碩士論文獎一般類與政策類雙料佳作。",
      },
      {
        date: "2023.11",
        en: "Lab students received first prize and honorable mentions in the Taiwan Economic Association Best Master’s Thesis Award.",
        zh: "實驗室學生獲臺灣經濟學會最佳碩士論文獎最佳獎與佳作。",
      },
    ],
  };
})();
