export interface SubjectMeta {
  id: number;
  name: string;
  count: number;
  token: string;
}

export interface SamhitaMeta {
  id: number;
  name: string;
  count: number;
  hindiName?: string;
}

export const QBANK_SUBJECTS: SubjectMeta[] = [
  { id: 1, name: "Kayachikitsa", count: 6759, token: "Vm8zSTR2N0JYWUE4ZC8zQmNnSGFUZz09" },
  { id: 2, name: "Rog Nidana", count: 6263, token: "dVIwVU92dTZ3VXRuUTdnTzZySkFvQT09" },
  { id: 3, name: "Dravyaguna Vigyan", count: 5974, token: "Y2lPVkJUUlVZWUdqdXcrYmlGNFZTZz09" },
  { id: 4, name: "Shalya Tantra", count: 4292, token: "MlRpVWM5RHZ4aHpqMlFuT0d4aGpqQT09" },
  { id: 5, name: "Shalakya Tantra", count: 3331, token: "NlFJTkYzK2FycTlLekFrcGJxUnNBZz09" },
  { id: 6, name: "Miscellaneous", count: 3126, token: "RXVYRmxLWWZWYUJPcTFLSi8vTi9rQT09" },
  { id: 7, name: "Panchkarma", count: 2976, token: "aTJ2eUpIb0lFb1ZCUEs4bWtBWGhxZz09" },
  { id: 8, name: "Swasthvrita", count: 2166, token: "ZUMxNGpJR0pQbThvMWZjTGFnSEEwZz09" },
  { id: 9, name: "Sharir Rachna", count: 2138, token: "YVlOYnBYV05IcjFsL0UxeDFHZDZwQT09" },
  { id: 10, name: "Sharir Kriya", count: 2115, token: "Q0NtL3hNVlcwVDVyNExWWnJ3bGxsZz09" },
  { id: 11, name: "Prasuti Tantra & Stri Roga", count: 2064, token: "OFo4d1lRcTRMT1FrZlM1blEwSmVyQT09" },
  { id: 12, name: "Ras Shastra", count: 2055, token: "cVF2TnRwSVBoVXAyM3N3RUxPV3QwZz09" },
  { id: 13, name: "Bhaishajya Kalpna", count: 1875, token: "UlRaQTQ0VjZzZENzOWZ2YlJUckxKdz09" },
  { id: 14, name: "Padarth Vigyan", count: 1790, token: "alR2VnFzd0NlcXhTV3oxWkI0cDJaUT09" },
  { id: 15, name: "History of Ayurveda", count: 1518, token: "TkllSmR4elZDRmJyWng1am5ubmFKQT09" },
  { id: 16, name: "Agad  Tantra & Vyavhar Ayurveda", count: 1494, token: "VzMvc0FSMysyZHJtUGtJOUV6bmxEUT09" },
  { id: 17, name: "Bal Roga", count: 1324, token: "eDl6cjlpbHJLc3ludW0xZklKTDlBdz09" },
  { id: 18, name: "General Knowledge", count: 1312, token: "VUlFeVNTeHBkOXR2bzdrcXJHN1A1dz09" },
  { id: 19, name: "Pathology", count: 650, token: "OVJXWnNBaGRqazc4NEdvdkVidWt4Zz09" },
  { id: 20, name: "Anatomy", count: 536, token: "dXVSZGtrTHdKV0gxWkNjWWRaeUpzZz09" },
  { id: 21, name: "Physiology", count: 460, token: "NVpLVW54K003dzAzTXRKQ2F5aTJCUT09" },
  { id: 22, name: "Medicine", count: 392, token: "TmpJdFRXeDJTMnRMbFc4WnpWUHNDZz09" },
  { id: 23, name: "Obstetrics & Gynecology", count: 387, token: "Nm5VZ3MycHhRdFB3ejVJNFEvd1JJQT09" },
  { id: 24, name: "Rasayana Tantra", count: 294, token: "SFp2ZHJIYTZrVGlpemtMRXBxcW1Vdz09" },
  { id: 25, name: "Research & Statistics", count: 270, token: "b21ZdmpyQ0xJRy9jNC9uVEdZQXE0dz09" },
  { id: 26, name: "Sanskrit", count: 242, token: "eXBtVk1HSkVaRDdZT2xhUHFnL0dqQT09" },
  { id: 27, name: "Paediatrics", count: 221, token: "SStncUxBaDQzUE5oVmhOaEsxQVhOZz09" },
  { id: 28, name: "Preventive and Social Medicine", count: 218, token: "dEt2VDgvcElXR0dxalJWRFQyeVEwZz09" },
  { id: 29, name: "Forensic Medicine & Toxicology", count: 214, token: "QWY0dVJnZ2xISXFlMFdJREdncjJTUT09" },
  { id: 30, name: "Ayush General Knowledge", count: 191, token: "aHl2NUR4eUMvOGZRWVpWMFpDVld1QT09" },
  { id: 31, name: "Surgery", count: 173, token: "QWNDR0g5bWM2enFtVk81NlFPT0R3Zz09" },
  { id: 32, name: "Pharmacology", count: 168, token: "QUVxeE0wRXRIUHAralc2T0huSUdPQT09" },
  { id: 33, name: "Ophthalmology", count: 136, token: "QndKUTVZWTdLdnpqNytKSWVaY2tvQT09" },
  { id: 34, name: "Vaajikarana Tantra", count: 102, token: "dlE1OUgyK0JKd2w3RFUrdy96WEVLUT09" },
  { id: 35, name: "Ear, Nose, and Throat", count: 70, token: "MGJsbDFtS05uV3dHMXhqb0h4cm1GUT09" },
  { id: 36, name: "Medical Ethics", count: 59, token: "eGczWkVvZFVxZExxVjk2alpZK3k1QT09" },
  { id: 37, name: "Health Regulations", count: 12, token: "THNqdVZJQUJ1Z0o4aThCRkdTeVNpdz09" },
  { id: 38, name: "Orthopaedics", count: 8, token: "aXhJTnZJRXBLaXF2NkowSFR0VlYwQT09" }
];

export const TOTAL_QBANK_COUNT = 57375;

export const QBANK_SAMHITAS: SamhitaMeta[] = [
  { id: 1, name: "Charaka Samhita", hindiName: "चरक संहिता", count: 11175 },
  { id: 2, name: "Sushruta Samhita", hindiName: "सुश्रुत संहिता", count: 8709 },
  { id: 3, name: "Ashtanga Hridaya", hindiName: "अष्टांग हृदय", count: 6229 },
  { id: 4, name: "Ashtanga Samgrah", hindiName: "अष्टांग संग्रह", count: 2164 },
  { id: 5, name: "Chakradatt Samhita", hindiName: "चक्रदत्त संहिता", count: 25 },
  { id: 6, name: "Madhava Nidana", hindiName: "माधव निदान", count: 1057 },
  { id: 7, name: "Yog Ratnakar", hindiName: "योग रत्नाकर", count: 207 },
  { id: 8, name: "Sharangadhara Samhita", hindiName: "शारंगधर संहिता", count: 1197 },
  { id: 9, name: "Bhavaprakash Samhita", hindiName: "भावप्रकाश संहिता", count: 471 },
  { id: 10, name: "Kashyapa Samhita", hindiName: "काश्यप संहिता", count: 980 },
  { id: 11, name: "Harita Samhita", hindiName: "हारीत संहिता", count: 79 },
  { id: 12, name: "Bhel Samhita", hindiName: "भेल संहिता", count: 50 },
  { id: 13, name: "Bhaishjya Ratnavali", hindiName: "भैषज्य रत्नावली", count: 319 },
  { id: 14, name: "Ras Ratan Sammuchaya", hindiName: "रस रत्न समुच्चय", count: 423 },
  { id: 15, name: "Ras Tarangini", hindiName: "रस तरंगिणी", count: 120 },
  { id: 16, name: "Ras Saar Samgraha", hindiName: "रस सार संग्रह", count: 3 }
];
