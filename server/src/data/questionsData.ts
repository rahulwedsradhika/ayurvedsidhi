import { realProdQuestionsExtracted } from './realProductionQuestionsExtracted.js';

export interface Question {


  id: number;
  Q: string;
  O1: string;
  O2: string;
  O3: string;
  O4: string;
  A: number; // 1, 2, 3, 4
  UA?: number | string; // User's answer or 'AQ_quiz'
  B: string; // '0' or '1' (bookmarked)
  sam_id: number;
  sam: string;
  sth_id: number;
  sth: string;
  sub_id: number;
  sub: string;
  com: string; // Explanation / Commentary
  note?: { notes: string }[];
}

export const questions: Question[] = [
  {
    id: 101,
    Q: "According to Acharya Charaka, how many chapters are included in Sutra Sthana of Charaka Samhita?",
    O1: "28 chapters",
    O2: "30 chapters",
    O3: "32 chapters",
    O4: "36 chapters",
    A: 2,
    UA: "AQ_quiz",
    B: "0",
    sam_id: 1,
    sam: "Charaka Samhita",
    sth_id: 101,
    sth: "Sutra Sthana",
    sub_id: 1,
    sub: "Maulik Siddhanta",
    com: "Charaka Samhita Sutrasthana contains 30 chapters divided into 7 Chatushkas (Bheshaja, Svastha, Nirdesha, Kalpana, Roga, Yojana, and Annapana Chatushka) plus 2 concluding chapters (Samgraha Dwaya)."
  },
  {
    id: 102,
    Q: "Which among the following is the first Mahakashaya mentioned in Charaka Sutra Chapter 4?",
    O1: "Lekhaniya Mahakashaya",
    O2: "Brimhaniya Mahakashaya",
    O3: "Jivaniya Mahakashaya",
    O4: "Bhedaniya Mahakashaya",
    A: 3,
    UA: "AQ_quiz",
    B: "1",
    sam_id: 1,
    sam: "Charaka Samhita",
    sth_id: 101,
    sth: "Sutra Sthana",
    sub_id: 1,
    sub: "Dravyaguna Vijnana",
    com: "In Shadvirechanashatashritiya Adhyaya (Charaka Sutra 4), the first group of 10 drugs is Jivaniya Mahakashaya (Jivaka, Rishabhaka, Meda, Mahameda, Kakoli, Kshirakakoli, Mudgaparni, Mashaparni, Jivanti, and Madhuka)."
  },
  {
    id: 103,
    Q: "According to Sushruta, what is the total number of Shastras (sharp surgical instruments)?",
    O1: "14",
    O2: "20",
    O3: "24",
    O4: "101",
    A: 2,
    UA: "AQ_quiz",
    B: "0",
    sam_id: 2,
    sam: "Sushruta Samhita",
    sth_id: 201,
    sth: "Sutra Sthana",
    sub_id: 2,
    sub: "Shalya Tantra",
    com: "Acharya Sushruta describes 101 blunt instruments (Yantras) and 20 sharp surgical instruments (Shastras) in Sutrasthana Chapter 8 (Shastravacharaniya Adhyaya)."
  },
  {
    id: 104,
    Q: "In Ashtanga Hridaya, which time of day is designated for Abhyanga (oil massage) according to Dinacharya?",
    O1: "Early morning before exercise",
    O2: "After meals at noon",
    O3: "Evening before sunset",
    O4: "Midnight after work",
    A: 1,
    UA: "AQ_quiz",
    B: "0",
    sam_id: 3,
    sam: "Ashtanga Hridaya",
    sth_id: 301,
    sth: "Sutra Sthana",
    sub_id: 3,
    sub: "Swasthavritta",
    com: "Vagbhata states 'Abhyangam acharet nityam sa jarashramavataha' - daily morning application of oil provides anti-aging, relieves fatigue, and pacifies Vata, especially on head, ears, and feet (Shiras, Shravana, Pada)."
  },
  {
    id: 105,
    Q: "What is the primary seat (Pradhana Sthana) of Pitta Dosha according to Charaka and Vagbhata?",
    O1: "Hridaya (Heart)",
    O2: "Amashaya (Stomach / Duodenum)",
    O3: "Pakvashaya (Colon)",
    O4: "Yakrit (Liver)",
    A: 2,
    UA: "AQ_quiz",
    B: "1",
    sam_id: 1,
    sam: "Charaka Samhita",
    sth_id: 101,
    sth: "Sutra Sthana",
    sub_id: 1,
    sub: "Kriya Sharira",
    com: "Pitta seats include Sweda, Rasa, Lasika, Rudhira, and Amashaya, with Amashaya (specifically the lower part / Grahani) being the predominant seat (Pitta Sthanam Amashayah)."
  },
  {
    id: 106,
    Q: "How many Marma points are enumerated in Sushruta Sharira Sthana Chapter 6?",
    O1: "64 Marmas",
    O2: "107 Marmas",
    O3: "108 Marmas",
    O4: "120 Marmas",
    A: 2,
    UA: "AQ_quiz",
    B: "0",
    sam_id: 2,
    sam: "Sushruta Samhita",
    sth_id: 203,
    sth: "Sharira Sthana",
    sub_id: 2,
    sub: "Rachana Sharira",
    com: "Sushruta describes exactly 107 Marmas categorized into Sadhyo Pranahara (19), Kalantara Pranahara (33), Vishalyaghna (3), Vaikalyakara (44), and Rujakara (8)."
  },
  {
    id: 107,
    Q: "Which formulation is famously recommended as the premier Agrya Aushadha for Rasayana in Charaka Chikitsa Sthana?",
    O1: "Amalaki Rasayana",
    O2: "Chyawanprasha Rasayana",
    O3: "Haritaki Rasayana",
    O4: "Brahma Rasayana",
    A: 4,
    UA: "AQ_quiz",
    B: "0",
    sam_id: 1,
    sam: "Charaka Samhita",
    sth_id: 106,
    sth: "Chikitsa Sthana",
    sub_id: 4,
    sub: "Kaya Chikitsa",
    com: "Brahma Rasayana is described as the very first recipe in Charaka Chikitsa Chapter 1 (Abhayamalakiya Pada) imparting longevity, supreme intellect, and freedom from disease."
  },
  {
    id: 108,
    Q: "In Rasa Shastra, which Yantra is predominantly used for Swedana Samskara of Parada (Mercury)?",
    O1: "Damaru Yantra",
    O2: "Dola Yantra",
    O3: "Valuka Yantra",
    O4: "Tiryak Patana Yantra",
    A: 2,
    UA: "AQ_quiz",
    B: "0",
    sam_id: 10,
    sam: "Rasa Ratna Samuccaya",
    sth_id: 1001,
    sth: "Rasa Shastra",
    sub_id: 5,
    sub: "Rasa Shastra & Bhaishajya Kalpana",
    com: "Dola Yantra (suspension in liquid medium via a cloth bundle/Pottali) is the standard apparatus used for Swedana and Shodhana of Parada, Hingula, and poisonous roots."
  },
  {
    id: 109,
    Q: "Which herb is designated by Acharya Charaka as the best Agrya Dravya for 'Vayasthapana' (Rejuvenating / Age-stabilizing)?",
    O1: "Guduchi (Tinospora cordifolia)",
    O2: "Amalaki (Phyllanthus emblica)",
    O3: "Haritaki (Terminalia chebula)",
    O4: "Ashwagandha (Withania somnifera)",
    A: 3,
    UA: "AQ_quiz",
    B: "1",
    sam_id: 1,
    sam: "Charaka Samhita",
    sth_id: 101,
    sth: "Sutra Sthana",
    sub_id: 1,
    sub: "Dravyaguna Vijnana",
    com: "Charaka Sutrasthana 25 states: 'Haritaki Vayasthapananam' (Haritaki is the foremost among age-sustaining substances) and 'Amalaki Vayasthapananam' is also celebrated."
  },
  {
    id: 110,
    Q: "What is the dose of Swarna Prashana given to a newborn as advised by Acharya Kashyapa?",
    O1: "1 Masha",
    O2: "Swarna scraped with honey and ghee on a stone slab",
    O3: "1 Ratti with milk",
    O4: "5 Drops of Swarna Bhasma suspension",
    A: 2,
    UA: "AQ_quiz",
    B: "0",
    sam_id: 5,
    sam: "Kashyapa Samhita",
    sth_id: 501,
    sth: "Kaumarbhritya",
    sub_id: 6,
    sub: "Kaumarbhritya",
    com: "Acharya Kashyapa states in Lehana Adhyaya: Pure gold should be rubbed on a clean stone slab with water, ghee, and honey, and given to the child to enhance Medha (intellect), Agni (digestion), and Bala (immunity)."
  },
  ...realProdQuestionsExtracted
];



