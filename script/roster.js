$(document).ready(function () {
    $(".modal").modal();
    $('.sidenav').sidenav();
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
                    currentTeam = nameTEAM
                    console.log("coach of current team is signed in")

                
                    var teamNavName = document.getElementById("teamLogoName")
                    teamNavName.innerHTML = nameTEAM
                    
                    // return TRUE that current user is coach of current team being checked
                    coachVerification = true
                    console.log(coachVerification)
                    getData(nameTEAM)

                    document.getElementById("additionalInfo").style.display = "block";
                    getAdditionalPlayerInfo()
                    // console.log("here")

                    var uploadBtn = document.getElementById("uploadDiv")
                    var insertBtn = ""

                    var floatingAction = `
                        <div class="fixed-action-btn">
                            <a class="btn-floating btn-large cyan darken-2" onclick="activateAddInfo()">
                                <i class="large material-icons">add</i>
                            </a>
                        </div>`

                    insertBtn = insertBtn + floatingAction
                    uploadBtn.innerHTML = insertBtn

                    $('.fixed-action-btn').floatingActionButton();

                    var uploadModals = document.getElementById("coachUploadDiv")
                    var insertModals = ""

                    var modalInsert = `
                        <div class="modal" id="addAdditionalInfo">
                            <div class="modal-content">
                                <h4>Upload Additional Player Info</h4>
                                <form action="" id="addPlayerInfoForm">
                                <div class="input-field">
                                    <i class="material-icons prefix">title</i>
                                    <input type="text" id="fileName" >
                                    <label for="fileName">Please name/title this file...</label>
                                </div>
                            
                                <div>
                                    <!-- <label class="btn green" for="addFileBtn" style="cursor: pointer;">Upload Any File</label> -->
                                    <input type="file" accept=""application/pd" name="file" id="addFileBtn" >
                                </div>
                                
                                </form>
                                <div class="modal-footer">
                                    <a href="#" class="modal-close btn red" onclick="addAdditionalPlayerInfo()">Add File</a>
                                </div>
                            </div>
                        </div>
                    
                    `

                    insertModals = insertModals + modalInsert
                    uploadModals.innerHTML = insertModals

                    $('.modal').modal();



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
                            console.log(uid + "s current team is " + userTeam)

                            currentTeam = userTeam
                            var teamNavName = document.getElementById("teamLogoName")
                            teamNavName.innerHTML = userTeam


                            getData(userTeam)
                            // console.log("here")


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
        window.location.replace("index.html");

    // User is signed out
    // ...
    }
});

function signOut() {
    firebase.auth().signOut().then(function() {
        console.log('Signed Out');
        window.location.replace("index.html");


    }, function(error) {
        console.error('Sign Out Error', error);
    });
}



/**
 * Description: 
 * Parameters:
 * Pre-condition(s):
 * Post-condition(s):
 */

function createTableRow(currentPlayerName, currentPlayerContact, currentPlayerAge, currentPlayerPosition, currentPlayerNumber) {

    var currentRow = document.createElement('tr')

    var nameDataPoint = document.createElement('td')
    nameDataPoint.innerHTML = currentPlayerName
    currentRow.appendChild(nameDataPoint)

    var ageDataPoint = document.createElement('td')
    ageDataPoint.innerHTML = currentPlayerAge
    currentRow.appendChild(ageDataPoint)

    var contactDataPoint = document.createElement('td')
    contactDataPoint.innerHTML = currentPlayerContact
    currentRow.appendChild(contactDataPoint)

    var positionDataPoint = document.createElement('td')
    positionDataPoint.innerHTML = currentPlayerPosition
    currentRow.appendChild(positionDataPoint)

    var numberDataPoint = document.createElement('td')
    numberDataPoint.innerHTML = currentPlayerNumber
    currentRow.appendChild(numberDataPoint)

    // console.log(currentRow)

    return currentRow


}

/**
 * Description: 
 * Parameters:
 * Pre-condition(s):
 * Post-condition(s):
 */
function getData(currentTeam) {
    var gettingData = firebase.database().ref('teams/' + currentTeam);

    gettingData.on('value', (snapshot) => {
        const data = snapshot.val();
    
        var playersAccessKey = '02players'

        // console.log(data[playersAccessKey])



        for (i in data[playersAccessKey]) {
            var playerObject = data[playersAccessKey][i]
            var playerObjectKeys = Object.getOwnPropertyNames(playerObject)


            var generalAccessKeys = []

            for (playerKey in playerObjectKeys) {
                var currentKey = playerObjectKeys[playerKey]
                generalAccessKeys.push(currentKey)

            }

            var currentPlayerAge = playerObject[generalAccessKeys[0]]
            var currentPlayerContact = playerObject[generalAccessKeys[1]]
            var currentPlayerName = playerObject[generalAccessKeys[2]]
            var currentPlayerPosition = playerObject[generalAccessKeys[3]]
            var currentPlayerNumber = playerObject[generalAccessKeys[4]]



            var newRow = createTableRow(currentPlayerName, currentPlayerContact, currentPlayerAge, currentPlayerPosition, currentPlayerNumber)
            var tbody = document.getElementById("playerTableBody")
            tbody.appendChild(newRow);

            
            
        }

    });
}


function addAdditionalPlayerInfo() {

    if (document.getElementById("fileName").value.length == 0 || document.getElementById("addFileBtn").value.length == 0) {
        alert("Please make sure there is a file selected, and a valid title written. Thank you.")
        document.getElementById("addPlayerInfoForm").reset();
        return
    }

    // console.log('here')

    var fileName = document.getElementById("fileName").value


    var file = document.getElementById('addFileBtn').files[0]
    console.log(file)

    var metadata = { contentType: file.type }


    var storageRef = firebase.storage().ref('Teams/' + currentTeam + '/additionalPlayerInfo');
    var task = storageRef.child(fileName).put(file, metadata)


    // alert("File Added")

    // var waiting = setTimeout(reloadPage, 3500);

    
    

}

function reloadPage() {
    location.reload()
}

function addLI(pdfURL, fileDisplayName) {
    var li = `
        <li style="display: list-item; list-style-type: circle;"><a href="${pdfURL}" target="_blank">${fileDisplayName}</></li>
    `;

    return li;
}

function addHTML(pdfRef) {

    var additionalInfoDisplay = document.getElementById("additionalInfoList");
    dataStrPDF = ""

    pdfRef.getDownloadURL().then(function(url) {
        document.getElementById('additionalInfoList').src = url
        // console.log(url)        

        pdfRef.getMetadata().then((metadata) => {
            // console.log(metadata.name)
            var fileDisplayName = metadata.name

            pdfLi = addLI(url, fileDisplayName)
            dataStrPDF = dataStrPDF + pdfLi

        }).then(function() {
        additionalInfoDisplay.innerHTML = dataStrPDF 

        }).catch(function(error) {
            alert("error")
        })
    })
}


function getAdditionalPlayerInfo() {


    // Create a Reference to file folder:
    var additionalInfoStorageRef = firebase.storage().ref('Teams/' + currentTeam + '/additionalPlayerInfo');

    // Now we get the references of these images
    additionalInfoStorageRef.listAll().then(function(result) {
        result.items.forEach(function(pdfRef) {         

            console.log(pdfRef)

            addHTML(pdfRef)
        });
    }).catch(function(error) {
        alert("error")
        console.log(error)
    })
}

function activateAddInfo() {
    $('#addAdditionalInfo').modal('open');
}

