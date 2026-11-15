import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { Footer } from './components/Footer';
import { SvgSprite } from './components/SvgSprite';

// Production Replicas matching all 24 Authoritative Screenshots
import { IndexDashboard } from './pages/production/IndexDashboard';
import { CoursesPage } from './pages/production/CoursesPage';
import { MockTestsPage } from './pages/production/MockTestsPage';
import { UpscPage } from './pages/production/UpscPage';
import { PrevYearsPage } from './pages/production/PrevYearsPage';
import { CategoryPage } from './pages/production/CategoryPage';
import { NotesPage } from './pages/production/NotesPage';
import { MnemonicsPage } from './pages/production/MnemonicsPage';
import { TipsPage } from './pages/production/TipsPage';
import { AudioVideoPage } from './pages/production/AudioVideoPage';
import { MyScorePage } from './pages/production/MyScorePage';
import { BookmarksPage } from './pages/production/BookmarksPage';
import { ReportedQuestionsPage } from './pages/production/ReportedQuestionsPage';
import { ForumPage } from './pages/production/ForumPage';
import { MyWalletPage } from './pages/production/MyWalletPage';
import { MembershipPage } from './pages/production/MembershipPage';
import { BooksPage } from './pages/production/BooksPage';
import { InvitesPage } from './pages/production/InvitesPage';
import { MyProfilePage } from './pages/production/MyProfilePage';
import { AboutPage } from './pages/production/AboutPage';
import { ContactPage } from './pages/production/ContactPage';

// Interactive Test & Lecture Engines
import { CourseDetail } from './pages/CourseDetail';
import { LecturePlayer } from './pages/LecturePlayer';
import { QuizList } from './pages/QuizList';
import { QuizView } from './pages/QuizView';
import { QuizResults } from './pages/QuizResults';
import { Diagnostics } from './pages/Diagnostics';
import { TestingViewerPage } from './pages/TestingViewerPage';
import { DeveloperPreviewPage } from './pages/DeveloperPreviewPage';
import { api } from './api/client';
import { User } from './types';

export const App: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState<User | undefined>(undefined);

  useEffect(() => {
    api.getDashboard()
      .then(d => setUser(d.user))
      .catch(console.error);
  }, []);

  return (
    <BrowserRouter>
      <div className="wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#f4f6f9' }}>
        {/* Production SVG Icons Sprite */}
        <SvgSprite />

        {/* Global Production Header */}
        <Header
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          userName={user?.name || "Rohit"}
        />

        {/* Sliding Sidebar Drawer */}
        <Sidebar
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        {/* Main Content Viewport */}
        <main
          style={{
            flex: 1,
            width: '100%',
            minHeight: 'calc(100vh - 110px)',
            backgroundColor: '#f4f6f9'
          }}
        >
          <Routes>
            {/* Primary Production Routes */}
            <Route path="/" element={<IndexDashboard />} />
            <Route path="/app1.5/index.php" element={<IndexDashboard />} />
            <Route path="/app1.5/courses.php" element={<CoursesPage />} />
            <Route path="/courses" element={<CoursesPage />} />
            <Route path="/app1.5/ayush-npget.php" element={<MockTestsPage />} />
            <Route path="/app1.5/upsc.php" element={<UpscPage />} />
            <Route path="/app1.5/prev-years.php" element={<PrevYearsPage />} />
            <Route path="/app1.5/category.php" element={<CategoryPage />} />
            <Route path="/question-bank" element={<CategoryPage />} />
            <Route path="/app1.5/notes.php" element={<NotesPage />} />
            <Route path="/notes" element={<NotesPage />} />
            <Route path="/app1.5/mnemonics.php" element={<MnemonicsPage />} />
            <Route path="/app1.5/tips.php" element={<TipsPage />} />
            <Route path="/app1.5/audio-video.php" element={<AudioVideoPage />} />
            <Route path="/app1.5/myScore.php" element={<MyScorePage />} />
            <Route path="/scorecard" element={<MyScorePage />} />
            <Route path="/app1.5/bookmarks.php" element={<BookmarksPage />} />
            <Route path="/bookmarks" element={<BookmarksPage />} />
            <Route path="/app1.5/reported_questions.php" element={<ReportedQuestionsPage />} />
            <Route path="/app1.5/forum.php" element={<ForumPage />} />
            <Route path="/app1.5/myWallet.php" element={<MyWalletPage />} />
            <Route path="/wallet" element={<MyWalletPage />} />
            <Route path="/app1.5/membership.php" element={<MembershipPage />} />
            <Route path="/app1.5/books.php" element={<BooksPage />} />
            <Route path="/app1.5/invites.php" element={<InvitesPage />} />
            <Route path="/app1.5/myProfile.php" element={<MyProfilePage />} />
            <Route path="/app1.5/about.php" element={<AboutPage />} />
            <Route path="/app1.5/contact.php" element={<ContactPage />} />

            {/* Test Series & Daily Tests Aliases */}
            <Route path="/app1.5/daily-tests.php" element={<MockTestsPage />} />
            <Route path="/app1.5/test-series.php" element={<MockTestsPage />} />

            {/* Interactive Learning Engines */}
            <Route path="/courses/:id" element={<CourseDetail />} />
            <Route path="/lecture/:courseId/:lectureId" element={<LecturePlayer />} />
            <Route path="/quizzes" element={<QuizList />} />
            <Route path="/quiz/:id" element={<QuizView />} />
            <Route path="/quiz/:id/results" element={<QuizResults />} />
            <Route path="/quiz/practice" element={<QuizView />} />
            <Route path="/dev/diagnostics" element={<Diagnostics />} />
            <Route path="/testing" element={<TestingViewerPage />} />
            <Route path="/app1.5/testing.php" element={<TestingViewerPage />} />
            <Route path="/preview" element={<DeveloperPreviewPage />} />
            <Route path="/preview-test-series" element={<DeveloperPreviewPage />} />

            {/* Catch-all Fallback */}
            <Route path="*" element={<Navigate to="/app1.5/index.php" replace />} />
          </Routes>
        </main>

        {/* Global Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
};
