import fs from 'fs';
import path from 'path';

const dbFilePath = path.resolve(process.cwd(), 'local_store.json');

export interface UserState {
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
    examTarget: string;
    membershipPlan: string;
    isPremium: boolean;
  };
  bookmarks: number[]; // Question IDs
  notes: Record<number, string[]>; // ques_id -> notes array
  reports: { quesId: number; comment: string; date: string }[];
  attempts: Record<number, {
    selectedAnswer: number;
    isCorrect: boolean;
    timeTaken: string;
    timestamp: number;
    guess: boolean;
  }>;
  quizResults: {
    uuid: string;
    quizId: number;
    quizName: string;
    score: number;
    total: number;
    percentage: number;
    solvedAt: string;
    userAnswers: Record<number, number>;
  }[];
  wallet: {
    points: number;
    history: { date: string; description: string; points: number }[];
  };
}

const defaultState: UserState = {
  user: {
    id: 10086,
    name: "Dr. Ayur Scholar",
    email: "scholar@ayurquest.local",
    phone: "+91 9876543210",
    examTarget: "AIAPGET 2027",
    membershipPlan: "AyurQuest Pro All-Access (Local Dev)",
    isPremium: true
  },
  bookmarks: [102, 105, 109],
  notes: {
    101: ["Important: 30 chapters divided into 7 chatushkas + 2 samgraha dwaya."]
  },
  reports: [],
  attempts: {},
  quizResults: [
    {
      uuid: "test-uuid-502-solved",
      quizId: 502,
      quizName: "Daily Test 2 - Sushruta Samhita & Surgical Fundamentals",
      score: 8,
      total: 10,
      percentage: 80,
      solvedAt: "2026-11-13 09:30",
      userAnswers: { 103: 2, 106: 2, 108: 2 }
    }
  ],
  wallet: {
    points: 1250,
    history: [
      { date: "2026-11-14", description: "Daily login bonus points", points: 50 },
      { date: "2026-11-13", description: "Daily Test 2 completion", points: 50 },
      { date: "2026-11-12", description: "Rapid Fire MCQ Challenge winner", points: 150 }
    ]
  }
};

class LocalDB {
  private state: UserState;

  constructor() {
    this.state = this.load();
  }

  private load(): UserState {
    try {
      if (fs.existsSync(dbFilePath)) {
        const raw = fs.readFileSync(dbFilePath, 'utf-8');
        return JSON.parse(raw);
      }
    } catch (e) {
      console.warn("Could not load local_store.json, using defaults", e);
    }
    return JSON.parse(JSON.stringify(defaultState));
  }

  public save(): void {
    try {
      fs.writeFileSync(dbFilePath, JSON.stringify(this.state, null, 2), 'utf-8');
    } catch (e) {
      console.error("Error saving local_store.json:", e);
    }
  }

  public getState(): UserState {
    return this.state;
  }

  public toggleBookmark(quesId: number): boolean {
    const idx = this.state.bookmarks.indexOf(quesId);
    if (idx > -1) {
      this.state.bookmarks.splice(idx, 1);
      this.save();
      return false; // Removed
    } else {
      this.state.bookmarks.push(quesId);
      this.save();
      return true; // Added
    }
  }

  public isBookmarked(quesId: number): boolean {
    return this.state.bookmarks.includes(quesId);
  }

  public addNote(quesId: number, noteText: string): void {
    if (!this.state.notes[quesId]) {
      this.state.notes[quesId] = [];
    }
    this.state.notes[quesId].push(noteText);
    this.save();
  }

  public getNotes(quesId: number): string[] {
    return this.state.notes[quesId] || [];
  }

  public addReport(quesId: number, comment: string): void {
    this.state.reports.push({
      quesId,
      comment,
      date: new Date().toISOString()
    });
    this.save();
  }

  public recordAttempt(quesId: number, selectedAnswer: number, isCorrect: boolean, timeTaken: string = "00:15", guess: boolean = false): void {
    this.state.attempts[quesId] = {
      selectedAnswer,
      isCorrect,
      timeTaken,
      timestamp: Date.now(),
      guess
    };
    if (isCorrect) {
      this.state.wallet.points += 5;
      this.state.wallet.history.unshift({
        date: new Date().toISOString().slice(0, 10),
        description: `Solved MCQ #${quesId} correctly`,
        points: 5
      });
    }
    this.save();
  }

  public saveQuizResult(result: UserState['quizResults'][0]): void {
    this.state.quizResults.unshift(result);
    this.state.wallet.points += 50;
    this.state.wallet.history.unshift({
      date: new Date().toISOString().slice(0, 10),
      description: `Completed Quiz: ${result.quizName}`,
      points: 50
    });
    this.save();
  }
}

export const localDB = new LocalDB();
