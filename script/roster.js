$(document).ready(function () {
    $(".modal").modal();
});

// Set the configuration for your app
const config = {
    apiKey: "AIzaSyBSac1uGXP_H_oWhmYpWVQn25k6fqHhbgQ",
    authDomain: "myteam-e7094.firebaseapp.com",
    projectId: "myteam-e7094",
    storageBucket: "myteam-e7094.appspot.com",
    messagingSenderId: "1078189958144",
    appId: "1:1078189958144:web:1e30cfa6778468169e24e5",
    measurementId: "G-2V0FFY6ZVF"
};
firebase.initializeApp(config);

// Get a reference to the database service
var database = firebase.database();

firebase.auth().onAuthStateChanged((user) => {
    console.log(user)
    
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      var uid = user.uid;
      console.log(uid)
      // ...
    } else {
      // User is signed out
      // ...
    }
});

/**
 * Description: 
 * Parameters:
 * Pre-condition(s):
 * Post-condition(s):
 */
function addPlayer() {

    var playerName = document.getElementById('playerName').value
    var playerPosition = document.getElementById('playerPosition').value
    var playerAge = document.getElementById('playerAge').value
    var playerContact = document.getElementById('playerContactInfo').value
    
    console.log(playerName, playerPosition, playerAge, playerContact)
    addPlayerToTeam(playerName, playerPosition, playerAge, playerContact)

}

function addPlayerToTeam(playerName, playerPosition, playerAge, playerContact) {
    firebase.database().ref('players/' + playerName).set({
        name: playerName,
        position: playerPosition,
        age: playerAge,
        contactInfo: playerContact
    });
    console.log("Data set to database")
} 


/**
 * Description: 
 * Parameters:
 * Pre-condition(s):
 * Post-condition(s):
 */
function createTableRow(p) {

    var currentRow = document.createElement('tr')
    console.log(p)
 
    for (x in p) {
        console.log(p[x])
        var dataPoint = document.createElement('td')
        dataPoint.innerHTML = p[x]

        currentRow.appendChild(dataPoint)
    }

    return currentRow


}

/**
 * Description: 
 * Parameters:
 * Pre-condition(s):
 * Post-condition(s):
 */
function getData() {
    var gettingData = firebase.database().ref('players/');

    gettingData.on('value', (snapshot) => {
        const data = snapshot.val();
        // console.log(data)

        dataSTR = JSON.stringify(data)
        dataJSON = JSON.parse(dataSTR)
        objectPropertiesDATA = Object.getOwnPropertyNames(dataJSON)
        

        for (i = 0; i < objectPropertiesDATA.length; i++) {

            playerObjectAccess = objectPropertiesDATA[i]            
            player = dataJSON[playerObjectAccess]
            objectPropertiesPlayer = Object.getOwnPropertyNames(player)

            // var playerInfo = {
            //     player1Info: [],
            //     player2Info: []
            // }
            
            var playerInfo = []


            for (n = 0; n < objectPropertiesPlayer.length; n++) {
                playerInformation = objectPropertiesPlayer[n]
                playerInfo.push(player[playerInformation])
                // console.log(player[playerInformation])
                
            }
            
            var newRow = createTableRow(playerInfo)
            var tbody = document.getElementById("playerTableBody")
            tbody.appendChild(newRow);


            var playerInfo = []


        }
    });
}