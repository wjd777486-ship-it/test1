import fs from "fs";
import path from "path";

const dataFile = path.join(process.cwd(), "data", "guestbook.json");

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  emoji: string;
  createdAt: string;
}

function ensureDataFile() {
  const dir = path.dirname(dataFile);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify([]));
}

export function getEntries(): GuestbookEntry[] {
  ensureDataFile();
  const raw = fs.readFileSync(dataFile, "utf8");
  return JSON.parse(raw) as GuestbookEntry[];
}

export function addEntry(entry: Omit<GuestbookEntry, "id" | "createdAt">): GuestbookEntry {
  const entries = getEntries();
  const newEntry: GuestbookEntry = {
    ...entry,
    id: Date.now().toString(),
    createdAt: new Date().toISOString(),
  };
  entries.unshift(newEntry);
  fs.writeFileSync(dataFile, JSON.stringify(entries, null, 2));
  return newEntry;
}
