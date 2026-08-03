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
updateStandings();

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

function updateStandings() {
  const teams = JSON.parse(localStorage.getItem("teams")) || [];
  const matches = JSON.parse(localStorage.getItem("matches")) || [];

  let table = {};

  teams.forEach(team => {
    table[team] = {
      played: 0,
      won: 0,
      draw: 0,
      lost: 0,
      points: 0
    };
  });

  matches.forEach(match => {
    const a = table[match.teamA];
    const b = table[match.teamB];

    if (!a || !b) return;

    a.played++;
    b.played++;

    const scoreA = Number(match.scoreA);
    const scoreB = Number(match.scoreB);

    if (scoreA > scoreB) {
      a.won++;
      a.points += 3;
      b.lost++;
    } else if (scoreA < scoreB) {
      b.won++;
      b.points += 3;
      a.lost++;
    } else {
      a.draw++;
      b.draw++;
      a.points++;
      b.points++;
    }
  });

  const tbody = document.getElementById("standingsBody");
  tbody.innerHTML = "";

  Object.keys(table)
    .sort((x, y) => table[y].points - table[x].points)
    .forEach(team => {
      tbody.innerHTML += `
      <tr>
        <td>${team}</td>
        <td>${table[team].played}</td>
        <td>${table[team].won}</td>
        <td>${table[team].draw}</td>
        <td>${table[team].lost}</td>
        <td>${table[team].points}</td>
      </tr>`;
    });
}

updateStandings();

const saveScorerBtn = document.getElementById("saveScorerBtn");

function loadScorers() {
    const scorers = JSON.parse(localStorage.getItem("scorers")) || [];

    const tbody = document.getElementById("scorerTableBody");

    tbody.innerHTML = "";

    scorers
        .sort((a, b) => b.goals - a.goals)
        .forEach(player => {

            tbody.innerHTML += `
            <tr>
                <td>${player.name}</td>
                <td>${player.team}</td>
                <td>${player.goals}</td>
            </tr>`;
        });
}

loadScorers();

saveScorerBtn.addEventListener("click", () => {

    const name = document.getElementById("playerName").value;
    const team = document.getElementById("playerTeam").value;
    const goals = Number(document.getElementById("playerGoals").value);

    if (!name || !team) {
        alert("Fill all fields");
        return;
    }

    const scorers = JSON.parse(localStorage.getItem("scorers")) || [];

    scorers.push({
        name,
        team,
        goals
    });

    localStorage.setItem("scorers", JSON.stringify(scorers));

    loadScorers();
});
