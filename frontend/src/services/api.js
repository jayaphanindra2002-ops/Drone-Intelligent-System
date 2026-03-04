export const API_BASE  = "https://unverbose-dessie-glacial.ngrok-free.dev"; //need to change the route whenever we create a new backedn link using Ngrok

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