$(document).ready(function(){
    $('.sidenav').sidenav();
    $('.fixed-action-btn').floatingActionButton();

});

function reloadPage() {
    location.reload()
}



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
                // console.log(coachAccess)
                
                // js object for the coach --> contains contact info, name, & userID elements
                var coachKey2 = data[nameTEAM][coachAccess]
                // console.log(coachKey2)

                var coachKey3 = Object.getOwnPropertyNames(coachKey2)
                var coachID = coachKey3[2]
                // console.log(coachID)


                if (coachKey2[coachID] == uid) {
                    console.log(nameTEAM)
                    currentTeam = nameTEAM
                    console.log("coach of current team is signed in")

                    var teamNavName = document.getElementById("teamLogoName")
                    teamNavName.innerHTML = nameTEAM
                    
                    // return TRUE that current user is coach of current team being checked
                    coachVerification = true
                    console.log(coachVerification)
                    // console.log(currentTeam)

                    // var videoUploadScript = `<script id="videoUploadScript"></script>`





                    var uploadBtn = document.getElementById("uploadDiv")
                    var insertBtn = ""

                    var floatingAction = `
                        <div class="fixed-action-btn">
                            <a class="btn-floating btn-large cyan darken-2">
                                <i class="large material-icons">add</i>
                            </a>
                            <ul>
                                <li><a class="btn-floating red" onclick="activateGetImage()"><i class="material-icons">photo_library</i></a></li>
                                <li><a class="btn-floating yellow darken-1" onclick="activateGetPDF()"><i class="material-icons">picture_as_pdf</i></a></li>
                            </ul>
                        </div>`

                    insertBtn = insertBtn + floatingAction
                    uploadBtn.innerHTML = insertBtn

                    $('.fixed-action-btn').floatingActionButton();

                    var uploadModals = document.getElementById("coachUploadDiv")
                    var insertModals = ""

                    var modalInsert = `
                        <div class="modal" id="addImageModal">
                        <div class="modal-content">
                            <h4>Upload Image</h4>
                            <form action="" id="addImageForm">
                            <div class="input-field">
                                <i class="material-icons prefix">title</i>
                                <input type="text" id="nameIMG">
                                <label for="nameIMG">Please name/title this file...</label>
                            </div>
                            <div class="input-field">
                                <i class="material-icons prefix">short_text</i>
                                <input type="text" id="notesIMG">
                                <label for="notesIMG">Write any notes here...</label>
                            </div>
                            <div>
                                <!-- <label class="btn green" for="imageFileBtn" style="cursor: pointer;">Upload Image/Any File</label> -->
                                <input type="file" accept="image/*" name="image" id="imageFileBtn" >
                            </div>
                            
                            </form>
                            <div class="modal-footer">
                                <a href="#" class="modal-close btn red" onclick="addImage()">Add File</a>
                            </div>
                        </div>
                    </div>

                    <div class="modal" id="addPDFModal">
                        <div class="modal-content">
                            <h4>Upload PDF</h4>
                            <form action="" id="addPDFForm">
                            <div class="input-field">
                                <i class="material-icons prefix">title</i>
                                <input type="text" id="namePDF">
                                <label for="namePDF">Please name/title this file...</label>
                            </div>
                            <div>
                                <!-- <label class="btn green" for="imageFileBtn" style="cursor: pointer;">Upload Image/Any File</label> -->
                                <input type="file" accept="application/pdf" name="image" id="pdfFileButton"  >
                            </div>
                            
                            </form>
                            <div class="modal-footer">
                                <a href="#" class="modal-close btn yellow darken-1" onclick="addPDF()">Add File</a>
                            </div>
                        </div>
                    </div>
                    `

                    insertModals = insertModals + modalInsert
                    uploadModals.innerHTML = insertModals



                    $('.modal').modal();
                    getImages()
                    getPDFs()

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
                            currentTeam = userTeam


                            var teamNavName = document.getElementById("teamLogoName")
                            teamNavName.innerHTML = userTeam

                            getImages()
                            getPDFs()


                            
                
                            return
                            
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





// GETTING & DISPLAYING IMAGES
function addImage() {

    if (document.getElementById("nameIMG").value.length == 0 || 
        document.getElementById("notesIMG").value.length == 0 || 
        document.getElementById("imageFileBtn").value.length == 0) {

        alert("Please make sure there is a file selected, and a valid title written. Thank you.")
        document.getElementById("addImageForm").reset();
        return
    }

    var imageTitle = document.getElementById("nameIMG").value
    var imageNotes = document.getElementById("notesIMG").value


    // var date = new Date();
    // var [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    // var [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];  
    // var fileUploadDate = month.toString() + '-' + day.toString() +  '-' + year.toString()


    var file = document.getElementById('imageFileBtn').files[0]
    // console.log(file)

    var name = imageTitle
    var metadata = { contentType: file.type }


    var storageRef = firebase.storage().ref('Teams/' + currentTeam + '/images');
    var task = storageRef.child(name).put(file, metadata)

    firebase.database().ref('teams/' + currentTeam + '/03files/' + imageTitle).set({
        notes: imageNotes,
    });

    alert("Image File Added")

    document.getElementById("addImageForm").reset();

    // var waiting = setTimeout(reloadPage, 3500);



    
}

function getImages() {
    console.log("getting images")


    // Create a Reference to file folder:
    var storageRef = firebase.storage().ref('Teams/' + currentTeam + '/images');

    // Now we get the references of these images
    storageRef.listAll().then(function(result) {

        result.items.forEach(function(imageRef) {            
        

            displayImages(imageRef)
        });
        // getVideos()
    }).catch(function(error) {
        // Handle errors here
    })
}


function getMetaData(imageRef, url) {

    dataStrIMG = ""

    imageRef.getMetadata().then(function(metaData) {

        // console.log(imageRef)
        // console.log(url)


        var fileName = metaData['name']
        var fileNotes = ""

        var gettingData = firebase.database().ref('teams/' + currentTeam + '/03files/' + fileName);

        gettingData.once('value', (snapshot) => { 
            const dataIMG = snapshot.val();
            // console.log(data['notes'])

            fileNotes = dataIMG['notes']

        })



        imageCard = createImageCard(url, fileName, fileNotes)
        dataStrIMG = dataStrIMG + imageCard
        
    }).then(function() {

        imageDisplay.innerHTML = dataStrIMG 

    })
}

function displayImages(imageRef) {
    var imageDisplay = document.getElementById("imageDisplay");

    imageRef.getDownloadURL().then(function(url) {

        
        document.getElementById('imageDisplay').src = url
        // console.log(url)

        getMetaData(imageRef, url)

    }).catch(function(error) {
        // Handle errors here
    })
}

function createImageCard(imageURL, fileName, fileNotes) {
    var card = `
        <div class="col s12 m6 l4">
            <div class="card responsive blue-grey darken-1">
                <div class="card-content white-text">
                    <span class="card-title">${fileName}</span>
                    <img class="materialboxed responsive-img" style="max-wdith: 50%; max-height: 45%;" src="${imageURL}"/>
                    <p>${fileNotes}</p>
                </div>
            
            </div>
        </div>
    `

    return card;
}




// GETTING & DISPLAYING PDFs

function addPDF() {

    if (document.getElementById("namePDF").value.length == 0 || document.getElementById("pdfFileButton").value.length == 0) {
            
        alert("Please make sure there is a file selected, and a valid title written. Thank you.")
        document.getElementById("addPDFForm").reset();
        return
    }
    
    var pdfTitle = document.getElementById("namePDF").value

    // var date = new Date(); 
    // var [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    // var [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];  
    // var fileUploadDate = month.toString() + '-' + day.toString() +  '-' + year.toString()

    var file = document.getElementById('pdfFileButton').files[0]

    var name = pdfTitle
    var metadata = { contentType: file.type }

    // // console.log(file)
    // console.log(name)

    var storageRef = firebase.storage().ref('Teams/' + currentTeam + '/PDFs');
    var task = storageRef.child(name).put(file, metadata)



    alert("PDF File Added")
    document.getElementById("addPDFForm").reset();

    // var waiting = setTimeout(reloadPage, 3500);

    
    

}







function activateGetImage() {
    $('#addImageModal').modal('open');
}

function activateGetVideo() {
    $('#addVideoModal').modal('open');
}

function activateGetPDF() {
        $('#addPDFModal').modal('open');
}




function addLI(pdfURL, fileDisplayName) {
    var li = `
        <li style="display: list-item; list-style-type: circle;"><a href="${pdfURL}" target="_blank">${fileDisplayName}</></li>
    `;

    return li;
}

function addHTML(pdfRef) {

    var pdfDisplay = document.getElementById("pdfDisplay");
    dataStrPDF = ""

    pdfRef.getDownloadURL().then(function(url) {
        
        document.getElementById('pdfDisplay').src = url
        // console.log(url)        

        pdfRef.getMetadata().then((metadata) => {
            // console.log(metadata.name)
            var fileDisplayName = metadata.name

            pdfLi = addLI(url, fileDisplayName)
            dataStrPDF = dataStrPDF + pdfLi

        }).then(function() {
            pdfDisplay.innerHTML = dataStrPDF 

        }).catch(function(error) {
            alert("error")
        })
    })
}


function getPDFs() {

    console.log("getting pdfs")


    // Create a Reference to file folder:
    var additionalInfoStorageRef = firebase.storage().ref('Teams/' + currentTeam + '/PDFs');

    // Now we get the references of these images
    additionalInfoStorageRef.listAll().then(function(result) {
        result.items.forEach(function(pdfRef) {         

            // console.log(pdfRef)

            addHTML(pdfRef)
        });
    }).catch(function(error) {
        alert("error")
        console.log(error)
    })
}