export interface Samhita {
  id: number;
  name: string;
  hindiName: string;
  author: string;
  icon: string;
  totalChapters: number;
  totalQuestions: number;
  sthanas: {
    id: number;
    name: string;
    chapters: number;
    description: string;
  }[];
}

export const samhitas: Samhita[] = [
  {
    id: 1,
    name: "Charaka Samhita",
    hindiName: "चरक संहिता",
    author: "Maharshi Agnivesha / Acharya Charaka",
    icon: "assets/images/samhita_icon/charaka-samhita.png",
    totalChapters: 120,
    totalQuestions: 1250,
    sthanas: [
      { id: 101, name: "Sutra Sthana", chapters: 30, description: "Fundamentals, principles, dietetics, and pharmacopoeia" },
      { id: 102, name: "Nidana Sthana", chapters: 8, description: "Etiology, pathogenesis, and clinical diagnosis" },
      { id: 103, name: "Vimana Sthana", chapters: 8, description: "Methodology of science, taste, dosha measurement, pathology" },
      { id: 104, name: "Sharira Sthana", chapters: 8, description: "Embryology, anatomy, philosophy, and psyche" },
      { id: 105, name: "Indriya Sthana", chapters: 12, description: "Prognosis and fatal signs (Arishta lakshana)" },
      { id: 106, name: "Chikitsa Sthana", chapters: 30, description: "Therapeutics of all systemic diseases" },
      { id: 107, name: "Kalpa Sthana", chapters: 12, description: "Pharmacy and formulation of emetics and purgatives" },
      { id: 108, name: "Siddhi Sthana", chapters: 12, description: "Panchakarma administration, complications, and recipes" }
    ]
  },
  {
    id: 2,
    name: "Sushruta Samhita",
    hindiName: "सुश्रुत संहिता",
    author: "Acharya Sushruta",
    icon: "assets/images/samhita_icon/sushruta-samhita.png",
    totalChapters: 186,
    totalQuestions: 980,
    sthanas: [
      { id: 201, name: "Sutra Sthana", chapters: 46, description: "Surgical principles, instruments, Kshara, Agnikarma" },
      { id: 202, name: "Nidana Sthana", chapters: 16, description: "Pathogenesis of surgical and medical conditions" },
      { id: 203, name: "Sharira Sthana", chapters: 10, description: "Dissection, Marma points, Garbha, and embryology" },
      { id: 204, name: "Chikitsa Sthana", chapters: 40, description: "Operative surgery, wound healing, fractures, rejuvenation" },
      { id: 205, name: "Kalpa Sthana", chapters: 8, description: "Toxicology (Agadatantra), poisons, and antidotes" },
      { id: 206, name: "Uttara Tantra", chapters: 66, description: "Ophthalmology, ENT, Gynecology, Pediatrics, and Kaya Chikitsa" }
    ]
  },
  {
    id: 3,
    name: "Ashtanga Hridaya",
    hindiName: "अष्टाङ्ग हृदय",
    author: "Acharya Vagbhata",
    icon: "assets/images/samhita_icon/ashtanga-hridaya.png",
    totalChapters: 120,
    totalQuestions: 850,
    sthanas: [
      { id: 301, name: "Sutra Sthana", chapters: 30, description: "Concise fundamental principles, dinacharya, ritucharya" },
      { id: 302, name: "Sharira Sthana", chapters: 6, description: "Anatomy, embryology, and constitution" },
      { id: 303, name: "Nidana Sthana", chapters: 16, description: "Diagnosis of sixteen disease categories" },
      { id: 304, name: "Chikitsa Sthana", chapters: 22, description: "Internal medicine therapeutics" },
      { id: 305, name: "Kalpa-Siddhi Sthana", chapters: 6, description: "Formulations and panchakarma protocols" },
      { id: 306, name: "Uttara Tantra", chapters: 40, description: "Specialized clinical disciplines" }
    ]
  },
  {
    id: 4,
    name: "Ashtanga Samgraha",
    hindiName: "अष्टाङ्ग संग्रह",
    author: "Vridha Vagbhata",
    icon: "assets/images/samhita_icon/ashtanga-samgrah.png",
    totalChapters: 150,
    totalQuestions: 620,
    sthanas: [
      { id: 401, name: "Sutra Sthana", chapters: 40, description: "Elaborate fundamentals and principles" },
      { id: 402, name: "Sharira Sthana", chapters: 12, description: "Anatomy, Garbha, and Marma" },
      { id: 403, name: "Nidana Sthana", chapters: 16, description: "Clinical diagnosis" },
      { id: 404, name: "Chikitsa Sthana", chapters: 24, description: "Treatments" },
      { id: 405, name: "Kalpa Sthana", chapters: 8, description: "Panchakarma formulations" },
      { id: 406, name: "Uttara Tantra", chapters: 50, description: "Special clinical branches" }
    ]
  },
  {
    id: 5,
    name: "Kashyapa Samhita",
    hindiName: "काश्यप संहिता",
    author: "Acharya Kashyapa / Vriddha Jivaka",
    icon: "assets/images/samhita_icon/kashyapa-samhita.png",
    totalChapters: 90,
    totalQuestions: 410,
    sthanas: [
      { id: 501, name: "Kaumarbhritya", chapters: 30, description: "Ayurvedic Pediatrics and infant care" },
      { id: 502, name: "Stree Roga", chapters: 20, description: "Gynecology and obstetrics" },
      { id: 503, name: "Khila Sthana", chapters: 40, description: "Supplementary clinical treatise" }
    ]
  },
  {
    id: 6,
    name: "Madhava Nidana",
    hindiName: "माधव निदान",
    author: "Acharya Madhavakara",
    icon: "assets/images/samhita_icon/madhava-nidana.png",
    totalChapters: 69,
    totalQuestions: 550,
    sthanas: [
      { id: 601, name: "Purvardha", chapters: 32, description: "Jvara to Shotha clinical diagnosis" },
      { id: 602, name: "Uttarardha", chapters: 37, description: "Shalakiya, Shalya, and Kshudra Roga" }
    ]
  },
  {
    id: 7,
    name: "Sharangadhara Samhita",
    hindiName: "शार्ङ्गधर संहिता",
    author: "Acharya Sharangadhara",
    icon: "assets/images/samhita_icon/sharangadhara-samhita.png",
    totalChapters: 32,
    totalQuestions: 480,
    sthanas: [
      { id: 701, name: "Prathama Khanda", chapters: 7, description: "Nadi Pariksha, weights & measures, anatomy, digestion" },
      { id: 702, name: "Madhyama Khanda", chapters: 12, description: "Pharmaceutical processing (Bhaishajya Kalpana)" },
      { id: 703, name: "Uttara Khanda", chapters: 13, description: "Panchakarma, Nasya, Dhumapana, Netrakarma" }
    ]
  },
  {
    id: 8,
    name: "Bhavaprakash Samhita",
    hindiName: "भावप्रकाश",
    author: "Acharya Bhavamishra",
    icon: "assets/images/samhita_icon/bhavaprakash-samhita.png",
    totalChapters: 80,
    totalQuestions: 490,
    sthanas: [
      { id: 801, name: "Purva Khanda", chapters: 7, description: "Dravyaguna, pharmacology, nomenclature" },
      { id: 802, name: "Madhya Khanda", chapters: 71, description: "Clinical diseases & therapeutics" },
      { id: 803, name: "Uttara Khanda", chapters: 2, description: "Rasayana & Vajikarana" }
    ]
  },
  {
    id: 9,
    name: "Bhaishajya Ratnavali",
    hindiName: "भैषज्य रत्नावली",
    author: "Govinda Dasa Sen",
    icon: "assets/images/samhita_icon/bhaishjya-ratnavali.png",
    totalChapters: 106,
    totalQuestions: 420,
    sthanas: [
      { id: 901, name: "Formulations & Therapeutics", chapters: 106, description: "Comprehensive pharmacopoeia and classical recipes" }
    ]
  },
  {
    id: 10,
    name: "Rasa Ratna Samuccaya",
    hindiName: "रस रत्न समुच्चय",
    author: "Rasa Vagbhata",
    icon: "assets/images/samhita_icon/ras-ratan-sammuchaya.png",
    totalChapters: 30,
    totalQuestions: 380,
    sthanas: [
      { id: 1001, name: "Rasa Shastra", chapters: 30, description: "Alchemical operations, mineral purification, and Bhasmas" }
    ]
  }
];

