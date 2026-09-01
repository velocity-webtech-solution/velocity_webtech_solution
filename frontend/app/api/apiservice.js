const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "http://127.0.0.1:8000/api/velocity-webtech";

const ACCOUNTS_API_BASE_URL =
  process.env.NEXT_PUBLIC_ACCOUNTS_API_BASE_URL ||
  "http://127.0.0.1:8000/api/accounts";

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
