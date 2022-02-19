$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.dropdown-trigger').dropdown();
    $('.collapsible').collapsible();

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

var coachVerification = false
var currentTeam = ""

firebase.auth().onAuthStateChanged((user) => {
  // console.log(user)

    if (user) {
        
        var uid = user.uid;
        console.log(uid)

        var gettingData = firebase.database().ref('teams/');

        gettingData.on('value', (snapshot) => {
            
            const data = snapshot.val();
            // console.log(data)
            
            var keys = Object.getOwnPropertyNames(data)
            for (key in keys) {

                // Name of current team
                var nameTEAM = keys[key]

                // js object for the team --> contains head coach object and player object
                var coachAtTeam = data[nameTEAM]

                // Gets the access key for the head coach object
                var coachKey = Object.getOwnPropertyNames(coachAtTeam)
                var coachAccess = coachKey[0]
                
                // js object for the coach --> contains contact info, name, & userID elements
                var coachKey2 = data[nameTEAM][coachAccess]
                // console.log(coachKey2)

                var coachKey3 = Object.getOwnPropertyNames(coachKey2)
                var coachID = coachKey3[2]


                if (coachKey2[coachID] == uid) {

                    // console.log(nameTEAM)
                    currentTeam = nameTEAM
                    
                    var teamNavName = document.getElementById("teamLogoName")
                    teamNavName.innerHTML = nameTEAM

                    console.log("coach of current team is signed in")
                    
                    // return TRUE that current user is coach of current team being checked
                    coachVerification = true
                    console.log(coachVerification)

                    var addEventDiv = document.getElementById("addEventDiv")

                    var insertAddEvent = `

                        <div class="center">
                            <h4 class="left">Add Event</h3>


                            <div class="input-field col s12">
                                <select id="eventType">
                                    <option value="" disabled selected>Select Event Type</option>
                                    <option value="1">Game</option>
                                    <option value="2">Practice</option>
                                    <option value="3">Team Event (party, trip, etc.)</option>
                                </select>
                            </div>
    
                            <div>
                                <input id="eventDate" type="date" id="start" min="2000-01-01" max="2999-12-31">
                                <!-- <label for="start">Select Date</label> -->
                            </div>

                            <div class="input-field">
                                <input type="text" id="eventNotes" class="">
                                <label for="eventNotes">Event Notes</label>
                            </div>
                                            
                            <div class="right">
                                <a type="text" class="btn red" onclick="addEvent()">Add Event</a>
                            </div>
                        </div>
                    
                    `

                    addEventDiv.innerHTML = insertAddEvent
                    $('select').formSelect();



                    getTeamPhoto()
                    getTeamEvents()

                    return
                }
            }

            if (!coachVerification) {
        
                var matchTeam = firebase.database().ref('02players/');
                matchTeam.on('value', (snapshot) => {
        
                    const data2 = snapshot.val();
                    // console.log(data2)
        
                    var userIDList = Object.getOwnPropertyNames(data2)
        
                    for (i in userIDList) {
                        var userIDAccess = userIDList[i]
        
                        var userTeamList = Object.getOwnPropertyNames(data2[userIDAccess])
                        var userTeam = data2[userIDAccess][userTeamList]
        
                        if (userIDAccess == uid) {
                            console.log("match found, exiting function")
                            console.log("current team is " + userTeam)
                            var teamNavName = document.getElementById("teamLogoName")
                            teamNavName.innerHTML = userTeam
                            currentTeam = userTeam
                            getTeamPhoto()
                            getTeamEvents()

                            return
                            
                        } else {
                            console.log(uid + " not a match")
                        }    
                    }
                });
                console.log(coachVerification)

            } else {
                console.log("no user found")
            }
        });

    // ...
    } else {
        window.location.replace("index.html");

    // User is signed out
    // ...
    }
});

function signOut() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        // window.location.replace("index.html");
        window.location.href = "index.html";



    }, function(error) {
        console.error('Sign Out Error', error);
    });
}


function getTeamPhoto() {

    var storageRef = firebase.storage().ref('Teams/' + currentTeam + '/teamPhoto');

    storageRef.listAll().then((res) => {

        res.items.forEach((itemRef) => {

            displayTeamPhoto(itemRef)
            M.toast({html: 'Scroll down to see team events.'})

        // All the items under listRef.
        });
    }).catch((error) => {
    // Uh-oh, an error occurred!
    });
    

}


function displayTeamPhoto(itemRef) {


    var parallaxDiv = document.getElementById("currentTeamParallax")

    dataStrPARA = ""

    itemRef.getDownloadURL().then(function(url) {
        
        document.getElementById('currentTeamParallax').src = url
        // console.log(url)

        var photoInsert = `<img class="responsive-img" src="${url}" style="max-height: 75%;">`
        dataStrPARA += photoInsert


    }).then(function() {
        parallaxDiv.innerHTML = dataStrPARA
        $('.parallax').parallax();


    }).catch(function(error) {
        // Handle errors here
    })

}


function addEvent() {

    var eventTypeSelector = document.getElementById("eventType")
    var eventType = eventTypeSelector.options[eventTypeSelector.selectedIndex].text
    var eventDate = document.getElementById("eventDate").value
    var eventNotes = document.getElementById("eventNotes").value


    console.log(eventType, eventDate, eventNotes)

    firebase.database().ref('teams/' + currentTeam + '/04events/' + eventDate).set({
        type: eventType,
        notes: eventNotes

    });
}

function createDropDown(eventType, eventNotes, eventDate) {

    
    var dropDownElement = `

        <li>
            <div class="collapsible-header">${eventType} - ${eventDate}</div>
            <div class="collapsible-body">
                <h6>Details:</h6>
                <span class="grey-text">${eventNotes}</span>
            </div>
        </li>
    
    `

    return dropDownElement
}

function getTeamEvents() {

    var gettingData = firebase.database().ref('teams/' + currentTeam + '/04events');

    gettingData.on('value', (snapshot) => {
        const data = snapshot.val();
        // console.log(data)

        var keys = Object.getOwnPropertyNames(data)
        // console.log(keys)

        var insertDropDownSTR = ""

        for (key in keys) {
            var eventObject = data[keys[key]]

            var eventDate = keys[key]
            var eventNotes = eventObject['notes']
            var eventType = eventObject['type']

            insertDropDownSTR += createDropDown(eventType, eventNotes, eventDate)

        }

        var dropDownDiv = document.getElementById("teamEventList")
        dropDownDiv.innerHTML = insertDropDownSTR

    });



}