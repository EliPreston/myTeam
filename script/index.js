
$(document).ready(function () {
    $(".modal").modal();
    $('.dropdown-trigger').dropdown();
    $('.sidenav').sidenav();
    $('.slider').slider();
    $('.materialboxed').materialbox();

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
var storage = firebase.storage();
var storageRef = storage.ref(); //references the storage bucket of my firebase system


var coachVerification = false
var currentTeam = ""


firebase.auth().onAuthStateChanged((user) => {
    // console.log(user)

    var gettingData = firebase.database().ref('teams/');
    

    gettingData.on('value', (snapshot) => {
        
        const data = snapshot.val();
        // console.log(data)
        
        var keys = Object.getOwnPropertyNames(data)
        var teamSelectDiv = document.getElementById('teamSelectDiv')
        var insertTeamSelect = `<option value="" disabled selected>Select your team...</option>`
        
        insertTeamSelect = insertTeamSelect + content
        for (key in keys) {
            var nameTEAM = keys[key]
            var content = `<option value="${nameTEAM}">${nameTEAM}</option>`
            insertTeamSelect += content
        }
        teamSelectDiv.innerHTML = insertTeamSelect   

        
        var numberSelectDiv = document.getElementById('numberPS')
        var ageSelectDiv = document.getElementById('agePS')
        

        var insertPlayerNumberSelect = `<option value="" disabled selected>Select your player number...</option>`
        var insertPlayerAgeSelect = `<option value="" disabled selected>Age...</option>`


    


        for (i = 1; i < 100; i++) {
            
            var content = `<option value="${i}">${i}</option>`
            var content2 = `<option value="${i+29}">${i+29}</option>`

            insertPlayerNumberSelect += content
            insertPlayerAgeSelect += content
        }

        numberSelectDiv.innerHTML = insertPlayerNumberSelect
        ageSelectDiv.innerHTML = insertPlayerAgeSelect


    });

    
    
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        console.log(uid)

        var gettingData = firebase.database().ref('teams/');

        gettingData.on('value', (snapshot) => {
            
            const data = snapshot.val();
            // console.log(data)
            
            var keys = Object.getOwnPropertyNames(data)
            for (key in keys) {
                // console.log(uid)

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
                    console.log(nameTEAM)
                    console.log("coach of current team is signed in")

                    currentTeam = nameTEAM
                    
                    var teamNavName = document.getElementById("teamLogoName")
                    teamNavName.innerHTML = nameTEAM

                    
                    // return TRUE that current user is coach of current team being checked
                    coachVerification = true
                    console.log(coachVerification)

                    var waiting = setTimeout(redirectPage, 3500);

                    
                    // window.location.replace("homepage.html");
                    
                }
            }

            if (!coachVerification) {
        
                var matchTeam = firebase.database().ref('02players/');
                matchTeam.on('value', (snapshot) => {
        
                    const data2 = snapshot.val();
                    // console.log(data2)
        
                    var userIDList = Object.getOwnPropertyNames(data2)
                    // console.log(data2)
        
                    for (i in userIDList) {
                        var userIDAccess = userIDList[i]
        
                        var userTeamList = Object.getOwnPropertyNames(data2[userIDAccess])
                        var userTeam = data2[userIDAccess][userTeamList]
        
                        if (userIDAccess == uid) {
                            console.log("match found, exiting function")
                            console.log("current team is " + userTeam)

                            currentTeam = userTeam

                            var teamNavName = document.getElementById("teamLogoName")
                            teamNavName.innerHTML = userTeam

                            var waiting = setTimeout(redirectPage, 3500);


                            window.location.replace("homepage.html");

                            return
                            
                        } 
                        // else {
                        //     console.log(uid + " not a match")
                        // }    
                    }
                });
                console.log(coachVerification)

            } else {
                console.log("no user found")
            }
        });

    // ...
    } else {
        console.log("no user signed in")

    // User is signed out
    // ...
    }
    // console.log(coachVerification)

});

function addTeamPhoto(team) {

    var teamPhotoFile = document.getElementById("teamPhoto").files[0]
    console.log(teamPhotoFile)
    console.log("here")

    var name = 'teamPhoto'
    var metadata = { contentType: teamPhotoFile.type }


    var storageRef = firebase.storage().ref('Teams/' + team + '/teamPhoto');
    var task = storageRef.child(name).put(teamPhotoFile, metadata)




}

function createNewTeam(coachName, coachEmail, coachPassword, teamName) {

    firebase.auth().createUserWithEmailAndPassword(coachEmail, coachPassword).then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        var uID = user.uid;
        console.log(uID)
        console.log(coachName, coachEmail, coachPassword, teamName)

        firebase.database().ref('teams/' + teamName + '/01head coach').update({

            name: coachName,
            contactInfo: coachEmail,
            userID: uID,
    
        });


        addTeamPhoto(teamName)
        console.log("Data set to database")

        


    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorCode, errorMessage)
        console.log(errorCode)
        console.log(errorMessage)
        });
} 

function redirectPage() {
    window.location.replace("homepage.html");
}

function coachSignUp() {

    var coachName = document.getElementById("coachName").value
    var emailSignUp = document.getElementById("emailCS").value
    var passwordSignUp = document.getElementById("passwordCS").value
    var newTeamName = document.getElementById("teamName").value


    console.log(coachName, emailSignUp, passwordSignUp, newTeamName)
    createNewTeam(coachName, emailSignUp, passwordSignUp, newTeamName)
    console.log("signed up")
    // redirectPage()
}


function addPlayerTeamPair(playerID, team) {

    firebase.database().ref('02players/' + playerID).set({
        team: team,
    });
    console.log("player set to database")
}


function addPlayerToTeam(playerID, playerEmail) {
    var playerName = document.getElementById("namePS").value
    var playerAge = document.getElementById("agePS").value
    var playerPosition = document.getElementById("positionPS").value
    var playerNumber = document.getElementById("numberPS").value
    var playerTeam = document.getElementById("teamSelectDiv").value
    var playerHeight = document.getElementById("teamSelectDiv").value
    var playerWeight = document.getElementById("teamSelectDiv").value


    
    // console.log(playerName, playerTeam, playerPosition, playerID, playerEmail)



    firebase.database().ref('teams/' + playerTeam + '/02players/' + playerName).set({
        name: playerName,
        age: playerAge,
        position: playerPosition,
        contactInfo: playerEmail,
        number: playerNumber,
        userID: playerID

    });
    // console.log("Data set to database")

    addPlayerTeamPair(playerID, playerTeam)


    
}



function playerSignUp() {

    var playerEmail = document.getElementById("emailPS").value
    var playerPassword = document.getElementById("passwordPS").value

    
    firebase.auth().createUserWithEmailAndPassword(playerEmail, playerPassword).then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        // var playerTeam = document.getElementById("teamSelectDiv").value

        var uid = user.uid;
        console.log(uid)

        addPlayerToTeam(uid, playerEmail)
        window.location.replace("homepage.html");
        
        // ...
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
            // ..
        });

    
}



function signIn() {

    var emailLogin = document.getElementById("emailL").value
    var passwordLogin = document.getElementById("passwordL").value
    
    console.log(emailLogin, passwordLogin)

    firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin).then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user)
    window.location.replace("homepage.html");


    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
    });
}

function signOut() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        window.location.replace("index.html");


    }, function(error) {
        console.error('Sign Out Error', error);
    });
}







// function getTimeEpoch() {
    //     x = new Date().getTime().toString(); 
    //     console.log(x)                            
    // }
    
    

