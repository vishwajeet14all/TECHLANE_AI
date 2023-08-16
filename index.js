const setupTextarea = document.getElementById("setup-textarea");
const setupInputContainer = document.getElementById("setup-input-container");
const movieBossText = document.getElementById("movie-boss-text");

const apiKey = "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";
const url = "https://api.openai.com/v1/chat/completions";

document.getElementById("send-btn").addEventListener("click", () => {
  if (setupTextarea.value) {
    const userInput = setupTextarea.value;
    setupInputContainer.innerHTML = `<img src="images/loading.svg" class="loading" id="loading">`;
    movieBossText.innerText = `Ok, just wait a second while my digital brain digests that...`;
    fetchBotReply(userInput);
    }  
});

function fetchBotReply(outline) {
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Generate a sort message to "${outline}"` }],    
    }),
  })
    .then((response) => response.json())
    // .then((data) => console.log(data))    
    .then(
      (data) => (movieBossText.innerText = data.choices[0].message.content)
    );
}
