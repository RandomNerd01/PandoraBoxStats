
// Function to reset all displayed stats and points
function resetAllStats() {
   // Clear all dynamically added player stats
   const playerStatsElements = document.querySelectorAll('span');
   playerStatsElements.forEach(element => {
       element.textContent = ''; // Clear the content of each element
   });


   // Reset team points to 0
   const teamPointsElements1 = document.getElementById('team1Points');
   teamPointsElements1.textContent = 'Team 1 Average Position/Placement: 0';


   const teamPointsElements2 = document.getElementById('team2Points');
       teamPointsElements2.textContent = 'Team 2 Average Position/Placement: 0';


       const teamPointsElements3 = document.getElementById('team3Points');
           teamPointsElements3.textContent = 'Team 3 Average Position/Placement: 0';


           const teamPointsElements4 = document.getElementById('team4Points');
               teamPointsElements4.textContent = 'Team 4 Average Position/Placement: 0';


               const teamPointsElements5 = document.getElementById('team5Points');
                   teamPointsElements5.textContent = 'Team 5 Average Position/Placement: 0';


                   const teamPointsElements6 = document.getElementById('team6Points');
                       teamPointsElements6.textContent = 'Team 6 Average Position/Placement: 0';


                       const teamPointsElements7 = document.getElementById('team7Points');
                           teamPointsElements7.textContent = 'Team 7 Average Position/Placement: 0';


                           const teamPointsElements8 = document.getElementById('team8Points');
                               teamPointsElements8.textContent = 'Team 8 Average Position/Placement: 0';


}


// Select the reset button
const resetButton = document.getElementById('resetButton');


// Add event listener to the reset button
resetButton.addEventListener('click', resetAllStats);

async function fetchPlayerStats(playerName) {
    // Original URL of the external resource
    let originalUrl = 'https://pandoras-box-event.fandom.com/wiki/';
    let corsProxyUrl = 'https://proxy.cors.sh/';
    let urlWithProxy = `${corsProxyUrl}${originalUrl}`;
  urlWithProxy = `${urlWithProxy}${playerName}`;
  console.log("" + urlWithProxy);

    try {
        const response = await fetch(urlWithProxy);
        const data = await response.text();

        const averagePointsIndex = data.indexOf("Average Placement");

        if (averagePointsIndex !== -1) {
            let number = '';
            for (let i = averagePointsIndex + 30; i < data.length; i++) {
                const char = data.charAt(i);
                if (/[0-9,]/.test(char)) {
                    number += char;
                } else if (number !== '') {
                    break;
                }
            }

            console.log("number:", number);
                                            const cleanedNumberString = number.replace(/,/g, ''); // Remove commas
                                            const number1 = parseInt(cleanedNumberString);
                                     console.log("number1:", number1);
                                            return number1;
        } else {
            throw new Error("No occurrence of 'Average Points' found in the HTML content");
        }
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Re-throw the error to be caught by the caller
    }
}
















let stats;

// Function to update team points in the DOM
function updateTeamPoints(teamId) {
   let teamPoints = 0;


   for (let i = 1; i <= 4; i++) {
       const playerName = document.getElementById(`team${teamId}Player${i}`).value.trim();

      fetchPlayerStats(playerName)
                 .then(result => {
                 stats=result;
                     console.log('Player Stats:', stats);
                     teamPoints += stats;
                     const teamPointsElement = document.getElementById(`team${teamId}Points`);
                     teamPointsElement.textContent = `Team ${teamId} Average Position/Placement: ${teamPoints/4}`;
                 })
                 .catch(error => console.error('Error fetching player stats:', error));
         }





   }



// Select all fetchPlayerStatsBtn buttons
const fetchPlayerStatsBtns = document.querySelectorAll('.fetchPlayerStatsBtn');


// Add event listener to each button
fetchPlayerStatsBtns.forEach(btn => {
   btn.addEventListener('click', () => {
       // Get the player name from the corresponding input text box
       const playerName = btn.previousElementSibling.value.trim();


       fetchPlayerStats(playerName)
                  .then(result => {
                       stats = result;
                       console.log('Player Stats Inside:', stats);
                        // Optionally, you can display the stats beside the input box
                                      const playerStatsElement = document.createElement('span');
                                     playerStatsElement.textContent = `Player ${playerName}: Average Position/Placement(${stats})`;
                                      btn.parentNode.appendChild(playerStatsElement); // Append stats element next to the button
                  })
                  .catch(error => console.error('Error fetching player stats:', error));




   });
   });

// Function to compare points of all teams and display in a popup


function compareAllTeams() {
    const teams = [];

    // Use Promise to ensure the code after the first for loop executes after 12 seconds
    const delayPromise = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, 12000); // 12 seconds delay
    });

    // Update team points with a delay
    for (let i = 1; i <= 8; i++) {
        setTimeout(() => {
            updateTeamPoints(i);
        }, i * 1000); // Wait for i seconds (e.g., 1 second for team 1, 2 seconds for team 2, etc.)
    }

    // Wait for the delay promise to resolve before continuing
    delayPromise.then(() => {
        // Loop through each team to get their points and player names
        for (let i = 1; i <= 8; i++) {
            const teamPointsElement = document.getElementById(`team${i}Points`);
            const teamPoints = parseFloat(teamPointsElement.textContent.split(': ')[1]);
            const players = [];
            for (let j = 1; j <= 4; j++) {
                const playerName = document.getElementById(`team${i}Player${j}`).value.trim();
                if (playerName) {
                    players.push(playerName);
                }
            }
            teams.push({ teamId: i, points: teamPoints, players: players });
        }

        // Sort teams by points in descending order
        teams.sort((b, a) => b.points - a.points);

        // Prepare message for the popup
        let message = '<h2>Teams Ranking by Average Position/Placement</h2>';
        teams.forEach(team => {
            message += `<h3>Team ${team.teamId}: ${team.points} Average Position/Placement</h3>`;
            if (team.players.length > 0) {
                message += '<ul>';
                team.players.forEach(player => {
                    message += `<li>${player}</li>`;
                });
                message += '</ul>';
            } else {
                message += '<p>No players found</p>';
            }
        });

        // Display popup
        const popup = window.open('', 'Teams Comparison', 'width=400,height=400');
        popup.document.write(message);
    });
}


// Select the compare all teams button
const compareAllTeamsBtn = document.getElementById('compareAllTeamsBtn');


// Add event listener to the compare all teams button
compareAllTeamsBtn.addEventListener('click', compareAllTeams);


// Add event listeners to fetch team stats buttons to update team stats
const fetchTeamStatsBtns = document.querySelectorAll('.fetchTeamStatsBtn');
fetchTeamStatsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const teamId = btn.dataset.team; // Get the team ID from the button's data attribute
        updateTeamPoints(teamId); // Call updateTeamPoints function with the team ID
    });
});

