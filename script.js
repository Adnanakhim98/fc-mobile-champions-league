document.addEventListener("DOMContentLoaded", () => {
  const teamInput = document.getElementById("teamName");
  const addTeamBtn = document.getElementById("addTeamBtn");
  const teamList = document.getElementById("teamList");

  // Save teams
  function saveTeams() {
    const teams = [];
    document.querySelectorAll("#teamList li").forEach(li => {
      teams.push(li.textContent);
    });
    localStorage.setItem("teams", JSON.stringify(teams));
  }

  // Load teams
  function loadTeams() {
    const teams = JSON.parse(localStorage.getItem("teams")) || [];

    teams.forEach(team => {
      const li = document.createElement("li");
      li.textContent = team;
      teamList.appendChild(li);
    });
  }

  loadTeams();

  addTeamBtn.addEventListener("click", () => {
    const team = teamInput.value.trim();

    if (team === "") {
      alert("Please enter a team name.");
      return;
    }

    const li = document.createElement("li");
    li.textContent = team;
    teamList.appendChild(li);

    saveTeams();

    teamInput.value = "";
  });
});
const teamASelect = document.getElementById("teamA");
const teamBSelect = document.getElementById("teamB");

function updateTeamDropdowns() {
  const teams = JSON.parse(localStorage.getItem("teams")) || [];

  teamASelect.innerHTML = '<option value="">Select Team A</option>';
  teamBSelect.innerHTML = '<option value="">Select Team B</option>';

  teams.forEach(team => {
    teamASelect.innerHTML += `<option value="${team}">${team}</option>`;
    teamBSelect.innerHTML += `<option value="${team}">${team}</option>`;
  });
}

updateTeamDropdowns();
const saveMatchBtn = document.getElementById("saveMatchBtn");
const matchList = document.getElementById("matchList");

function loadMatches() {
  const matches = JSON.parse(localStorage.getItem("matches")) || [];
  matchList.innerHTML = "";

  matches.forEach(match => {
    const li = document.createElement("li");
    li.textContent = `${match.teamA} ${match.scoreA} - ${match.scoreB} ${match.teamB}`;
    matchList.appendChild(li);
  });
}

loadMatches();

saveMatchBtn.addEventListener("click", () => {
  const teamA = teamASelect.value;
  const teamB = teamBSelect.value;
  const scoreA = document.getElementById("scoreA").value;
  const scoreB = document.getElementById("scoreB").value;

  if (!teamA || !teamB) {
    alert("Please select both teams.");
    return;
  }

  if (teamA === teamB) {
    alert("Please select different teams.");
    return;
  }

  const matches = JSON.parse(localStorage.getItem("matches")) || [];

  matches.push({
    teamA,
    teamB,
    scoreA,
    scoreB
  });

  localStorage.setItem("matches", JSON.stringify(matches));

  loadMatches();

  alert("Match saved successfully!");
});
