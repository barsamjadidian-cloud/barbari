import bcrypt from "bcryptjs";
import { z } from "zod";

// Secure password hashing
export async function hashPassword(password: string): Promise<string> {
  const salt = await bcrypt.genSalt(12);
  return bcrypt.hash(password, salt);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Validation schemas
export const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(100).regex(/^(?=.*[A-Za-z])(?=.*\d)/, "Must contain letter and number"),
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  phone: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

// Mock user store - replace with real DB query (SQL prepared statements to prevent injection)
export interface User {
  id: string;
  email: string;
  phone?: string;
  firstName: string;
  lastName: string;
  passwordHash: string;
  role: "customer" | "admin";
  emailVerified: boolean;
  loyaltyPoints: number;
}

export const mockUsers: User[] = [
  {
    id: "u1",
    email: "admin@barbari.coffee",
    firstName: "Admin",
    lastName: "Barbari",
    passwordHash: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiLR6a2w5jG", // password: admin1234
    role: "admin",
    emailVerified: true,
    loyaltyPoints: 0,
  },
  {
    id: "u2",
    email: "demo@barbari.coffee",
    firstName: "Demo",
    lastName: "User",
    passwordHash: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewKyNiLR6a2w5jG",
    role: "customer",
    emailVerified: true,
    loyaltyPoints: 120,
  },
];

export function sanitizeUser(user: User) {
  const { passwordHash, ...safe } = user;
  return safe;
}
