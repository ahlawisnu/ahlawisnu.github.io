const TOKEN = "7856398361:AAF0j4mmVC6jm32zNuA879XNnDsD8xwJc5g";
const CHAT_ID = "6629648410";

document.getElementById("chatForm").addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const message = document.getElementById("message").value;

  const text = `
🎮 *MIKU GAME CHAT*
👤 Player: ${name}
💬 Message:
${message}
`;

  fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: text,
      parse_mode: "Markdown"
    })
  }).then(() => {
    alert("Message sent 💙");
    e.target.reset();
  });
});
