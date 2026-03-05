export const API_BASE  = "http://127.0.0.1:8000"; //need to change the route whenever we create a new backedn link using Ngrok

export async function sendMessage(message) {
  const response = await fetch(`${API_BASE}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: message,
    }),
  });

  if (!response.ok) {
    throw new Error("API request failed");
  }

  return response.json();
}