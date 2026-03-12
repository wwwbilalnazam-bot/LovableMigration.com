// Simple admin auth – for production use a proper auth system
const ADMIN_USERNAME = process.env.ADMIN_USERNAME || "admin";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "MigrateToSupabase2025!";
const SESSION_SECRET = process.env.SESSION_SECRET || "super-secret-key-change-in-production";

export function validateCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}

export function createToken(username: string): string {
  // Simple base64 token for demo – use JWT/NextAuth in production
  const payload = { username, exp: Date.now() + 24 * 60 * 60 * 1000 };
  return Buffer.from(JSON.stringify(payload)).toString("base64");
}

export function validateToken(token: string): boolean {
  try {
    const payload = JSON.parse(Buffer.from(token, "base64").toString());
    return payload.exp > Date.now();
  } catch {
    return false;
  }
}

export { SESSION_SECRET };
