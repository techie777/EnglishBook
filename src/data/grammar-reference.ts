export interface TenseItem {
  key: string;
  label: string;
  formula: string;
}

export interface TenseGroup {
  categoryName: string;
  tenses: TenseItem[];
}

export const ALL_12_TENSES: TenseGroup[] = [
  {
    categoryName: "Present (वर्तमान काल)",
    tenses: [
      {
        key: "Present Simple",
        label: "Present Simple",
        formula: "V1 / ता है, ती है • Habits & Truths",
      },
      {
        key: "Present Continuous",
        label: "Present Continuous",
        formula: "is/am/are + V-ing / रहा है • Now",
      },
      {
        key: "Present Perfect",
        label: "Present Perfect",
        formula: "has/have + V3 / चुका है, लिया है",
      },
      {
        key: "Present Perfect Continuous",
        label: "Present Perf. Continuous",
        formula: "have been + ing / से रहा है",
      },
    ],
  },
  {
    categoryName: "Past (भूतकाल)",
    tenses: [
      {
        key: "Past Simple",
        label: "Past Simple",
        formula: "V2 / ता था, या, ई • Finished Past",
      },
      {
        key: "Past Continuous",
        label: "Past Continuous",
        formula: "was/were + V-ing / रहा था • Ongoing",
      },
      {
        key: "Past Perfect",
        label: "Past Perfect",
        formula: "had + V3 / चुका था • Past of Past",
      },
      {
        key: "Past Perfect Continuous",
        label: "Past Perf. Continuous",
        formula: "had been + ing / से रहा था",
      },
    ],
  },
  {
    categoryName: "Future (भविष्य काल)",
    tenses: [
      {
        key: "Future Simple",
        label: "Future Simple",
        formula: "will + V1 / गा, गी, गे • Decisions & Plans",
      },
      {
        key: "Future Continuous",
        label: "Future Continuous",
        formula: "will be + V-ing / रहा होगा",
      },
      {
        key: "Future Perfect",
        label: "Future Perfect",
        formula: "will have + V3 / चुका होगा",
      },
      {
        key: "Future Perfect Continuous",
        label: "Future Perf. Continuous",
        formula: "will have been + ing / से रहा होगा",
      },
    ],
  },
];

export interface ModalItem {
  key: string;
  label: string;
  meaning: string;
}

export const ALL_14_MODALS: ModalItem[] = [
  {
    key: "Can",
    label: "Can",
    meaning: "सकता है (Ability / Permission)",
  },
  {
    key: "Could",
    label: "Could",
    meaning: "सकता था / विनम्र निवेदन",
  },
  {
    key: "May",
    label: "May",
    meaning: "शायद / औपचारिक अनुमति",
  },
  {
    key: "Might",
    label: "Might",
    meaning: "शायद ही (कम संभावना – 25%)",
  },
  {
    key: "Will",
    label: "Will",
    meaning: "गा, गे / पक्का इरादा / वादा",
  },
  {
    key: "Would",
    label: "Would",
    meaning: "करता / विनम्र इच्छा / शर्तें",
  },
  {
    key: "Shall",
    label: "Shall",
    meaning: "सुझाव (Shall we?) / दायित्व",
  },
  {
    key: "Should",
    label: "Should",
    meaning: "चाहिए (सलाह / कर्तव्य)",
  },
  {
    key: "Must",
    label: "Must",
    meaning: "अवश्य चाहिए (पक्का नियम)",
  },
  {
    key: "Ought to",
    label: "Ought to",
    meaning: "चाहिए (नैतिक सामाजिक कर्तव्य)",
  },
  {
    key: "Have to / Need to",
    label: "Have to / Need to",
    meaning: "मजबूरी / व्यावहारिक जरूरत",
  },
  {
    key: "Used to",
    label: "Used to",
    meaning: "किया करता था (पुरानी आदत)",
  },
  {
    key: "Had better",
    label: "Had better",
    meaning: "बेहतर होगा (चेतावनी युक्त सलाह)",
  },
  {
    key: "Dare",
    label: "Dare",
    meaning: "हिम्मत करना / साहस (How dare you...)",
  },
];
