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
