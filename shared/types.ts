/**
 * LifeOS Shared Types
 */

export enum LogType {
  EXPENSE = "expense",
  HEALTH = "health",
  MOOD = "mood",
  IDEA = "idea",
  MEMORY = "memory",
  ROUTINE = "routine",
  JOURNAL = "journal",
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL?: string;
  createdAt: number;
}

export interface ActivityLog {
  id: string;
  userId: string;
  type: LogType;
  content: string;
  metadata: Record<string, any>;
  timestamp: number;
}

export interface Memory {
  id: string;
  userId: string;
  content: string;
  embedding?: number[]; // For pgvector
  importance: number; // 0-1
  tags: string[];
  createdAt: number;
}

export interface Task {
  id: string;
  userId: string;
  title: string;
  description?: string;
  dueDate: number;
  isCompleted: boolean;
  recurringRule?: string; // cron or custom format
  reminders: ReminderSession[];
}

export interface ReminderSession {
  type: "push" | "email" | "whatsapp" | "call";
  scheduledAt: number;
  status: "pending" | "sent" | "failed";
}

export enum FamilyRole {
  OWNER = "owner",
  MEMBER = "member",
  DELEGATE = "delegate",
}

export interface FamilyPermission {
  category: "expenses" | "health" | "tasks" | "calendar" | "location";
  level: "none" | "read" | "comment" | "edit";
}

export interface FamilyMember {
  userId: string;
  role: FamilyRole;
  permissions: FamilyPermission[];
}

export interface Household {
  id: string;
  name: string;
  members: FamilyMember[];
}
