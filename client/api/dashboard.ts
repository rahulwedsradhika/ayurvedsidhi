import { dataCounts, previewGet } from '../serverless/previewDb';

export default function handler(req: any, res: any): void {
  previewGet(req, res, () => {
    const counts = dataCounts();
    return {
      user: {
        id: 0,
        name: 'Preview Tester',
        email: '',
        phone: '',
        examTarget: 'AIAPGET',
        membershipPlan: 'Developer preview only',
        isPremium: false,
        subscription: 'PREVIEW',
      },
      stats: {
        totalCourses: 0,
        totalSamhitas: 0,
        totalQuestions: counts.questions,
        totalTests: counts.tests,
        bookmarkedCount: 0,
        notesCount: 0,
        solvedCount: 0,
        accuracy: 0,
        walletPoints: 0,
        subscription: 'PREVIEW',
      },
      featuredCourses: [],
    };
  });
}
