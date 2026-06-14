import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_DIR = process.env.DATA_DIR || path.join(process.cwd(), 'data');
const FILE_PATH = path.join(DATA_DIR, 'progress.json');

function ensureDataDir() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

function readProgress() {
  ensureDataDir();
  if (!fs.existsSync(FILE_PATH)) {
    return { mistakes: {}, correct: {} };
  }
  return JSON.parse(fs.readFileSync(FILE_PATH, 'utf-8'));
}

function writeProgress(data: unknown) {
  ensureDataDir();
  fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
}

export async function GET() {
  const data = readProgress();
  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const body = await request.json();
  writeProgress(body);
  return NextResponse.json({ ok: true });
}
