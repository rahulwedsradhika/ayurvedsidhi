# AyurQuest APK Replica & Canonical Question Bank (`apk_clone/`)

A 100% faithful replication of the **AyurQuest Android APK** (`com.hostingwebdesigns.ayurquest`) web shell, UX, navigation flow, styling, and student practice engine.

---

## 🌟 Key Capabilities & Features

### 1. 100% Faithful UI & UX Design
- **Exact APK Styling**: Powered by the authentic `style.css`, `home_ribbon.css`, `bootstrap 3.3.7`, and FontAwesome 4.7.
- **Flaticon Icon System**: Bundled vector font files (`Flaticon.woff`, `Flaticon.ttf`, `Flaticon.svg`) providing the exact APK tab icons (`flaticon-samhitas`, `flaticon-subjects`, `flaticon-dashboard`, `flaticon-test-series`, `flaticon-audio-video`, etc.).
- **Responsive Drawer & Top Navbar**: Authentic `#sidebar` sliding drawer with all 24 menu items, active state tracking, and user profile header (`Hi Rohit !`).
- **Interactive Dashboard**: Authentic splash banner with motivational quote, "Go to Dashboard" accordion expander, featured course banners, and all 23 home navigation tiles with ribbons.

### 2. Complete Question Bank Ingested (57,473 MCQs)
- Stored locally in SQLite (`server/data/ayurquest.db`) with zero external latency.
- Every question includes:
  - Bilingual Hindi & English question stems
  - Bilingual options A, B, C, D
  - Verified official answer keys
  - Classical Sanskrit references & chapter citations (e.g. *Charaka Sutra 1/15*, *Sushruta Nidana 3/4*)
  - Detailed faculty explanations

### 3. Classical Samhita Hierarchy Multi-Level Drilldown (`samhitas.html`)
- **16 Samhitas Covered**:
  - **Major Brihat Trayi**:
    - **Charaka Samhita** (11,175 Qs across 8 Sthanas & 120 Chapters)
    - **Sushruta Samhita** (8,709 Qs across 6 Sthanas & 186 Chapters)
    - **Ashtanga Hridaya** (6,229 Qs across 8 Sthanas & 120 Chapters)
    - **Ashtanga Samgrah** (2,164 Qs across 7 Sthanas)
  - **12 Minor Classical Texts**: Kashyapa Samhita, Madhava Nidana, Sharangadhara, Bhavaprakash, Chakradatta, Yog Ratnakar, Bhaishajya Ratnavali, Ras Ratan Sammuchaya, Ras Tarangini, Harita, Bhel, Ras Saar Samgraha.
- Multi-level interactive selector:
  1. Select Samhita
  2. Select Sthana (Sutra, Nidana, Vimana, Sharira, Indriya, Chikitsa, Kalpa, Siddhi, Uttaratantra)
  3. Select Chapter / Subchapter
  4. Practice MCQs with the authentic jQuery `student.jquery.catquiz.js` engine!

### 4. Subjectwise Practice Portal (`subjects.html`)
- All **38 Subjects** listed with official question counts:
  - Kayachikitsa (6,759 Qs)
  - Rog Nidana (6,263 Qs)
  - Dravyaguna Vigyan (5,974 Qs)
  - Shalya Tantra (4,292 Qs)
  - Shalakya Tantra (3,331 Qs)
  - Miscellaneous (3,126 Qs)
  - Panchkarma (2,976 Qs)
  - Swasthvrita (2,166 Qs)
  - Sharir Rachna (2,138 Qs)
  - Sharir Kriya (2,115 Qs)
  - Prasuti & Stri Roga (2,064 Qs)
  - Ras Shastra (2,055 Qs)
  - Bhaishajya Kalpna (1,875 Qs)
  - Padarth Vigyan (1,790 Qs)
  - ... all 38 subjects totaling **57,375 questions**!
- Search filter & 100-MCQ batch selector (Serial 1, Serial 2, ...).
- Question Jump Palette modal (1-100).

### 5. Exam-Specific Test Series (`test_series.html`)
- All **35 Full AIAPGET Mock Tests** (4,200 MCQs) from Session 2026-2027.
- Two distinct modes per test:
  1. **Practice Mode**: Immediate green/red answer reveal, time per question, and classical references.
  2. **AIAPGET Exam Simulation**: Full NTA/AIAPGET interface with 120-minute countdown timer, question palette (1-120) with colored status indicators (Answered, Not Answered, Marked for Review, Not Visited), +4 / -1 marking scheme, and comprehensive scorecard at completion.

### 6. AIAPGET & UPSC Mock Tests Portal (`mock_tests.html`)
- Tests organized across 4 academic years (2024, 2025, 2026, 2027).
- Solved / Unsolved filter tabs.
- Full interactive exam player and review sheet.

### 7. Bookmarks & Notes (`bookmarks.html`, `notes.html`)
- Save difficult questions while practicing; review and practice bookmarked questions in a dedicated session.
- Add sticky notes and review high-yield classical concepts with accordion reference sheets.

---

## 🚀 How to Run the Cloned Application

The standalone backend server uses Node.js's built-in `node:sqlite` with **zero npm dependencies**:

```bash
# Navigate to the workspace root and start the server
node apk_clone/server.js
```

Then open in your browser:
- **Dashboard**: [http://localhost:3001/index.html](http://localhost:3001/index.html)
- **Samhitawise MCQs**: [http://localhost:3001/samhitas.html](http://localhost:3001/samhitas.html)
- **Subjectwise MCQs**: [http://localhost:3001/subjects.html](http://localhost:3001/subjects.html)
- **35 Test Series**: [http://localhost:3001/test_series.html](http://localhost:3001/test_series.html)
- **Mock Tests**: [http://localhost:3001/mock_tests.html](http://localhost:3001/mock_tests.html)
- **Bookmarks**: [http://localhost:3001/bookmarks.html](http://localhost:3001/bookmarks.html)
- **Notes**: [http://localhost:3001/notes.html](http://localhost:3001/notes.html)
