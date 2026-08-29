import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

const dataDir = path.join(process.cwd(), "data");
const dataFile = path.join(dataDir, "contact-submissions.json");

async function readSubmissions() {
  try {
    const file = await readFile(dataFile, "utf8");
    const data = JSON.parse(file);

    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (error.code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

export async function POST(request) {
  const body = await request.json();
  const submission = {
    id: crypto.randomUUID(),
    name: String(body.name || "").trim(),
    phone: String(body.phone || "").trim(),
    email: String(body.email || "").trim(),
    service: String(body.service || "").trim(),
    message: String(body.message || "").trim(),
    createdAt: new Date().toISOString(),
  };

  if (
    !submission.name ||
    !submission.phone ||
    !submission.email ||
    !submission.service ||
    !submission.message
  ) {
    return NextResponse.json(
      { message: "Please fill all contact form fields." },
      { status: 400 }
    );
  }

  await mkdir(dataDir, { recursive: true });
  const submissions = await readSubmissions();
  submissions.push(submission);
  await writeFile(dataFile, JSON.stringify(submissions, null, 2), "utf8");

  return NextResponse.json({
    message: "Contact form submitted successfully.",
  });
}
