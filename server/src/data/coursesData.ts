export interface Lecture {
  id: number;
  title: string;
  hindiTitle?: string;
  duration: string;
  durationSeconds: number;
  speaker: string;
  mediaType: "video" | "audio";
  mediaUrl: string;
  thumbnail: string;
  subject: string;
  chapter: string;
  isDemo: boolean;
  notesPdf?: string;
  overview?: string;
}

export interface Course {
  id: string;
  title: string;
  subTitle: string;
  targetExam: "aiapget" | "upsc" | "state_psc" | "revision";
  year: string;
  badge: string;
  banner: string;
  coverImage: string;
  totalLectures: number;
  totalAudio: number;
  totalQuestions: number;
  totalTests: number;
  description: string;
  features: string[];
  modules: {
    name: string;
    description: string;
    icon: string;
    lectureCount: number;
    lectures: Lecture[];
  }[];
}

export const courses: Course[] = [
  {
    id: "aiapget-2027",
    title: "AIAPGET 2027 Comprehensive Course",
    subTitle: "Lectures, Question Bank & Revision Test Series",
    targetExam: "aiapget",
    year: "2027",
    badge: "Most Popular",
    banner: "assets/images/courses/uppsc.png",
    coverImage: "assets/images/courses/cover/new_revision_lectures_qbank-aiapget-2027.jpg",
    totalLectures: 350,
    totalAudio: 180,
    totalQuestions: 15000,
    totalTests: 120,
    description: "Complete preparation package for AIAPGET entrance examination covering Brihattrayi, Laghuttrayi, Dravyaguna, Rasa Shastra, and modern clinical subjects with chapterwise MCQs and test series.",
    features: [
      "350+ Chapterwise Video Lectures with slide presentations",
      "180+ High-yield Revision Audio Lectures for on-the-go recall",
      "15,000+ Subjectwise, Samhitawise & Sthanwise Practice MCQs",
      "Weekly AIAPGET Mock Tests simulating National Testing Agency (NTA) interface",
      "Detailed reference commentary from Charaka, Sushruta, and Vagbhata"
    ],
    modules: [
      {
        name: "Charaka Samhita Sutrasthana",
        description: "Core fundamental principles of Ayurveda, Dinacharya, and Roganusutpatti",
        icon: "flaticon-samhitas",
        lectureCount: 30,
        lectures: [
          {
            id: 1001,
            title: "Dirghanjivitiya Adhyaya - Descent of Ayurveda & Trisutra",
            hindiTitle: "दीर्घञ्जीवितीय अध्याय (सूत्र १)",
            duration: "42:15",
            durationSeconds: 2535,
            speaker: "Dr. Aniruddh Sharma (MD Ayu)",
            mediaType: "video",
            mediaUrl: "https://vimeo.com/event/3686781/embed",
            thumbnail: "assets/images/courses/video_lectures/samhita_video_lectures.jpg",
            subject: "Charaka Samhita",
            chapter: "Sutra Sthana Ch. 1",
            isDemo: true,
            notesPdf: "assets/pdf/detailed_lecture_course_2023_final.pdf",
            overview: "In-depth exposition on Bharadvaja's quest to Indra, the hexad of Padarthas (Samanya, Vishesha, Dravya, Guna, Karma, Samavaya), and the fundamental definition of Ayu."
          },
          {
            id: 1002,
            title: "Apamarga Tanduliya - Emetic & Purgative Pharmacopoeia",
            hindiTitle: "अपामार्ग तण्डुलीय अध्याय (सूत्र २)",
            duration: "38:40",
            durationSeconds: 2320,
            speaker: "Dr. Aniruddh Sharma (MD Ayu)",
            mediaType: "video",
            mediaUrl: "https://vimeo.com/event/3686781/embed",
            thumbnail: "assets/images/courses/video_lectures/samhita_video_lectures.jpg",
            subject: "Charaka Samhita",
            chapter: "Sutra Sthana Ch. 2",
            isDemo: true,
            notesPdf: "assets/pdf/detailed_lecture_course_2023_final.pdf",
            overview: "Classification of drugs for Shiro-virechana, Vamana, Virechana, and Asthapana Basti. Indications for Panchakarma cleansing formulations."
          },
          {
            id: 1003,
            title: "Aragvadhiya Adhyaya - External Cleansing & Lepas",
            hindiTitle: "आरग्वधीय अध्याय (सूत्र ३)",
            duration: "34:10",
            durationSeconds: 2050,
            speaker: "Dr. Aniruddh Sharma (MD Ayu)",
            mediaType: "video",
            mediaUrl: "https://vimeo.com/event/3686781/embed",
            thumbnail: "assets/images/courses/video_lectures/samhita_video_lectures.jpg",
            subject: "Charaka Samhita",
            chapter: "Sutra Sthana Ch. 3",
            isDemo: false,
            notesPdf: "assets/pdf/detailed_lecture_course_2023_final.pdf",
            overview: "32 Pradeha and Lepa formulations for Kushtha, Shotha, Vatarakta, and skin afflictions."
          },
          {
            id: 1004,
            title: "Shadvirechanashatashritiya - 50 Mahakashayas",
            hindiTitle: "षड्विरेचनशताश्रितीय अध्याय (सूत्र ४)",
            duration: "55:20",
            durationSeconds: 3320,
            speaker: "Dr. Priya Varma (MD Ayu)",
            mediaType: "video",
            mediaUrl: "https://vimeo.com/event/3686781/embed",
            thumbnail: "assets/images/courses/video_lectures/samhita_video_lectures.jpg",
            subject: "Charaka Samhita",
            chapter: "Sutra Sthana Ch. 4",
            isDemo: false,
            notesPdf: "assets/pdf/detailed_lecture_course_2023_final.pdf",
            overview: "Systematic memorization strategies for all 50 Mahakashayas (Jivaniya, Brimhaniya, Lekhaniya, etc.) with botanical correlations."
          }
        ]
      },
      {
        name: "Sushruta Samhita Sutrasthana & Shalyatantra",
        description: "Surgical instruments, Kshara, Agnikarma, and wound management",
        icon: "flaticon-samhitas",
        lectureCount: 25,
        lectures: [
          {
            id: 2001,
            title: "Vedotpatti Adhyaya - Origin of Surgery & Ashta-anga Ayurveda",
            hindiTitle: "वेदोत्पत्ति अध्याय (सूत्र १)",
            duration: "45:30",
            durationSeconds: 2730,
            speaker: "Dr. K. R. Nambiar (MS Shalya)",
            mediaType: "video",
            mediaUrl: "https://vimeo.com/event/3686781/embed",
            thumbnail: "assets/images/courses/video_lectures/samhita_video_lectures.jpg",
            subject: "Sushruta Samhita",
            chapter: "Sutra Sthana Ch. 1",
            isDemo: true,
            notesPdf: "assets/pdf/detailed_lecture_course_2023_final.pdf",
            overview: "Divodasa Dhanvantari's pedagogy to Sushruta. Primacy of Shalyatantra among the eight clinical branches."
          },
          {
            id: 2002,
            title: "Yantra & Shastra Vidhi - 101 Blunt & 20 Sharp Instruments",
            hindiTitle: "यन्त्र एवं शस्त्र विधि",
            duration: "52:10",
            durationSeconds: 3130,
            speaker: "Dr. K. R. Nambiar (MS Shalya)",
            mediaType: "video",
            mediaUrl: "https://vimeo.com/event/3686781/embed",
            thumbnail: "assets/images/courses/video_lectures/samhita_video_lectures.jpg",
            subject: "Sushruta Samhita",
            chapter: "Sutra Sthana Ch. 7 & 8",
            isDemo: false,
            notesPdf: "assets/pdf/detailed_lecture_course_2023_final.pdf",
            overview: "Dimensions, shapes, materials, and surgical handling of Swastika, Sandamsha, Tala, Nadi, Shalaka, and Upayantras."
          }
        ]
      },
      {
        name: "High-Yield Audio Revision Series",
        description: "Rapid audio summaries for commuting and daily memory consolidation",
        icon: "flaticon-audio-video",
        lectureCount: 20,
        lectures: [
          {
            id: 3001,
            title: "Charaka Kalpa & Siddhi Rapid Audio Revision",
            hindiTitle: "चरक कल्प एवं सिद्धि शीघ्र पुनरावलोकन",
            duration: "28:15",
            durationSeconds: 1695,
            speaker: "Dr. Aniruddh Sharma",
            mediaType: "audio",
            mediaUrl: "assets/audio/correct-enhanced-v2-90p.mp3",
            thumbnail: "assets/images/courses/video_lectures/samhita_audio_lectures.jpg",
            subject: "Charaka Samhita",
            chapter: "Kalpa & Siddhi Sthana",
            isDemo: true,
            overview: "Mnemonic recall of Madana Phala yogas (133), Jimutaka (39), Ikshvaku (45), Dhamargava (60), Vatsaka (18), and Kritavedhana (60)."
          },
          {
            id: 3002,
            title: "Dravyaguna Karmas & Rasapanchaka Audio Capsule",
            hindiTitle: "द्रव्यगुण रसपञ्चक ऑडियो कैप्सूल",
            duration: "31:40",
            durationSeconds: 1900,
            speaker: "Dr. Priya Varma",
            mediaType: "audio",
            mediaUrl: "assets/audio/correct-enhanced-v2-90p.mp3",
            thumbnail: "assets/images/courses/video_lectures/subject_audio_lectures.jpg",
            subject: "Dravyaguna Vijnana",
            chapter: "Fundamental Principles",
            isDemo: true,
            overview: "Vipaka determination, Virya theories (Ashtavidha vs Dvividha), and Prabhavajanya actions of key classical herbs."
          }
        ]
      }
    ]
  },
  {
    id: "aiapget-2028",
    title: "AIAPGET 2028 Foundation & Mastery Course",
    subTitle: "Two-Year Long-Term Program for Undergraduate Scholars",
    targetExam: "aiapget",
    year: "2028",
    badge: "Foundation",
    banner: "assets/images/courses/uppsc.png",
    coverImage: "assets/images/courses/cover/new_lectures_qbank-aiapget-2028.jpg",
    totalLectures: 420,
    totalAudio: 210,
    totalQuestions: 18000,
    totalTests: 150,
    description: "Built for third-year and final-year BAMS students as well as interns targeting top ranking in AIAPGET 2028. Covers comprehensive textbook analysis and clinical integration.",
    features: [
      "Sequential multi-year study calendar aligned with university syllabus",
      "Line-by-line reading of Charaka, Sushruta, and Vagbhata with commentaries (Chakrapani, Dalhana, Arundatta)",
      "Continuous progress evaluations and adaptive revision schedules",
      "Dedicated doubt resolution forums with post-graduate toppers"
    ],
    modules: [
      {
        name: "Brihattrayi Fundamental Study",
        description: "Detailed foundational readings",
        icon: "flaticon-samhitas",
        lectureCount: 40,
        lectures: [
          {
            id: 4001,
            title: "Tridosha Vidnyana - Physiological Mechanics",
            duration: "48:00",
            durationSeconds: 2880,
            speaker: "Dr. Aniruddh Sharma",
            mediaType: "video",
            mediaUrl: "https://vimeo.com/event/3686781/embed",
            thumbnail: "assets/images/courses/video_lectures/subject_video_lectures.jpg",
            subject: "Kriya Sharira",
            chapter: "Dosha Guna & Karma",
            isDemo: true
          }
        ]
      }
    ]
  },
  {
    id: "upsc-2025",
    title: "UPSC & State PSC Ayurveda Medical Officer 2025-2026",
    subTitle: "Specialized Course for MO, GDMO & Research Officer Examinations",
    targetExam: "upsc",
    year: "2025-2026",
    badge: "UPSC Special",
    banner: "assets/images/courses/uppsc.png",
    coverImage: "assets/images/courses/cover/new_revision_lectures_qbank_upsc-2025.jpg",
    totalLectures: 280,
    totalAudio: 140,
    totalQuestions: 12000,
    totalTests: 80,
    description: "Specially calibrated for UPSC Central Medical Officer and State PSC examinations (UPPSC, HPSC, JKPSC, MPPSC, RPSC) emphasizing clinical diagnosis, public health, national health programmes, and Samhita questions.",
    features: [
      "Coverage of UPSC previous year questions with analytical solutions",
      "Special emphasis on Ayurvedic Public Health, Swasthavritta & Epidemics",
      "Negative marking drill tests according to UPSC examination criteria",
      "State-specific Ayurveda Acts, regulatory policies, and pharmacopoeial standards"
    ],
    modules: [
      {
        name: "UPSC Clinical Ayurveda & Medicine",
        description: "Differential diagnosis and protocol management",
        icon: "flaticon-upsc",
        lectureCount: 35,
        lectures: [
          {
            id: 5001,
            title: "Jvara Chikitsa - Pathophysiology to Classical Formulations",
            duration: "54:30",
            durationSeconds: 3270,
            speaker: "Dr. Rajesh Gupta (MD Ayu)",
            mediaType: "video",
            mediaUrl: "https://vimeo.com/event/3686781/embed",
            thumbnail: "assets/images/courses/video_lectures/samhita_video_lectures.jpg",
            subject: "Kaya Chikitsa",
            chapter: "Charaka Chikitsa Ch. 3",
            isDemo: true
          }
        ]
      }
    ]
  },
  {
    id: "audio-lectures",
    title: "AyurQuest Exclusive Revision Audio Lectures",
    subTitle: "On-the-go MP3 Lectures Covering All 16 Classical Samhitas",
    targetExam: "revision",
    year: "2026",
    badge: "Audio Series",
    banner: "assets/images/courses/revision-audio-lectures.png",
    coverImage: "assets/images/courses/cover/aq-revision-audio-lectures.jpg",
    totalLectures: 180,
    totalAudio: 180,
    totalQuestions: 5000,
    totalTests: 40,
    description: "AyurQuest's flagship voice series created by MD experts to make revision effortless during daily travels, clinic hours, and bed time.",
    features: [
      "Crystal clear audio explanations of all tough shlokas and classifications",
      "Offline playback capability with continuous chapter streaming",
      "Time-stamped topics and printable PDF companion summaries"
    ],
    modules: [
      {
        name: "Samhita Rapid Shloka Breakdown",
        description: "Key shlokas memorization audio",
        icon: "flaticon-audio-video",
        lectureCount: 50,
        lectures: [
          {
            id: 6001,
            title: "Ashtanga Hridaya Sutrasthana Top 100 Examination Shlokas",
            duration: "35:15",
            durationSeconds: 2115,
            speaker: "Dr. Aniruddh Sharma",
            mediaType: "audio",
            mediaUrl: "assets/audio/correct-enhanced-v2-90p.mp3",
            thumbnail: "assets/images/courses/video_lectures/pareek_audio_lectures.jpg",
            subject: "Ashtanga Hridaya",
            chapter: "Sutrasthana Highlights",
            isDemo: true
          }
        ]
      }
    ]
  }
];

