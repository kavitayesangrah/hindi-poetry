function savePoem() {
  const poet = document.getElementById("poet").value.trim();
  const title = document.getElementById("title").value.trim();
  const poem = document.getElementById("poem").value.trim();
  if (!poet || !title || !poem) return alert("कृपया सभी फ़ील्ड भरें।");

  const entry = { poet, title, poem, time: new Date().toLocaleString() };
  const poems = JSON.parse(localStorage.getItem("hindiPoems")) || [];
  poems.unshift(entry);
  localStorage.setItem("hindiPoems", JSON.stringify(poems));

  document.getElementById("poet").value = "";
  document.getElementById("title").value = "";
  document.getElementById("poem").value = "";
  displayPoems();
  displayPoets();
}
function displayTitles() {
  const poems = JSON.parse(localStorage.getItem("hindiPoems")) || [];
  const titleList = document.getElementById("titleList");
  titleList.innerHTML = "";

  poems.forEach(entry => {
    const link = document.createElement("span");
    link.className = "title-link";
    link.textContent = entry.title;
    link.onclick = () => displayPoems(null, entry.title);
    titleList.appendChild(link);
  });
}
function searchPoems() {
  const query = document.getElementById("search").value.trim();
  displayPoems(null, query);
}

function displayPoems(filterPoet = null) {
  const poems = JSON.parse(localStorage.getItem("hindiPoems")) || [];
  const list = document.getElementById("poemList");
  list.innerHTML = "";
  const filtered = filterPoet ? poems.filter(p => p.poet === filterPoet) : poems;

  filtered.forEach(entry => {
    const card = document.createElement("div");
    card.className = "poem-card";
    card.innerHTML = `
      <h3>✍️ ${entry.poet}</h3>
      <h4>📖 ${entry.title}</h4>
      <p>${entry.poem}</p>
      <small style="color:gray;">🕒 ${entry.time}</small>
    `;
    list.appendChild(card);
  });
}

function displayPoets() {
  const poems = JSON.parse(localStorage.getItem("hindiPoems")) || [];
  const poetSet = new Set(poems.map(p => p.poet));
  const poetList = document.getElementById("poetList");
  poetList.innerHTML = "";

  poetSet.forEach(poet => {
    const link = document.createElement("span");
    link.className = "poet-link";
    link.textContent = poet;
    link.onclick = () => displayPoems(poet);
    poetList.appendChild(link);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayPoems();
  displayPoets();
});
