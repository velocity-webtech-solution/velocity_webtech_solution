const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "/api/velocity-webtech";

const ACCOUNTS_API_BASE_URL =
  process.env.NEXT_PUBLIC_ACCOUNTS_API_BASE_URL ||
  "/api/accounts";

export async function submitContactForm(payload) {
  const response = await fetch(`${API_BASE_URL}/contact-submissions/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to submit contact form.");
  }

  return data;
}

export async function fetchContactSubmissions({ page = 1, pageSize = 10 } = {}) {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });

  const response = await fetch(`${API_BASE_URL}/contact-submissions/?${params}`, {
    method: "GET",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch contact submissions.");
  }

  return data;
}

export async function fetchEnquiryEmails({ email, service, message }) {
  const params = new URLSearchParams({
    email,
  });

  if (service) {
    params.set("service", service);
  }

  if (message) {
    params.set("message", message);
  }

  const response = await fetch(`${API_BASE_URL}/contact-submissions/emails/?${params}`, {
    method: "GET",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch enquiry emails.");
  }

  return data;
}

export async function fetchEnquiryReplies(enquiryId) {
  const params = new URLSearchParams({
    enquiry_id: String(enquiryId),
  });

  const response = await fetch(`${API_BASE_URL}/contact-submissions/reply/?${params}`, {
    method: "GET",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch enquiry replies.");
  }

  return data;
}

export async function fetchEnquiryReplyHistoryByEmail(email) {
  const params = new URLSearchParams({
    email,
  });

  const response = await fetch(`${API_BASE_URL}/contact-submissions/reply/?${params}`, {
    method: "GET",
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to fetch enquiry reply history.");
  }

  return data;
}

export async function sendEnquiryReply({
  enquiryId,
  email,
  subject,
  message,
  name,
  phone,
  service,
  submittedAt,
}) {
  const response = await fetch(`${API_BASE_URL}/contact-submissions/reply/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      enquiry_id: enquiryId,
      email,
      subject,
      message,
      name,
      phone,
      service,
      submitted_at: submittedAt,
    }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to send reply email.");
  }

  return data;
}

export async function adminLogin(payload) {
  const response = await fetch(`${ACCOUNTS_API_BASE_URL}/admin-login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.message || "Unable to login.");
  }

  return data;
}
