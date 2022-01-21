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



// GETTING & DISPLAYING IMAGES
function addImage() {

    var date = new Date();
    var [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    // var [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];  
    var fileUploadDate = month.toString() + '-' + day.toString() +  '-' + year.toString()

    var file = document.getElementById('imageFileBtn').files[0]
    var name = fileUploadDate + '-' + file.name
    var metadata = { contentType: file.type }

    // // console.log(file)
    // console.log(name)

    var storageRef = firebase.storage().ref("Team Files/Images");
    var task = storageRef.child(name).put(file, metadata)
    alert("File Added")

    // task.then(snapshot => snapshot.ref.getDownloadURL()).then((url) => {
    //         console.log(url)
    //         // document.getElementById("recentUpload").src = url
    //         var displayRecent = document.getElementById("recentUpload")
    //         displayRecent.innerHTML = ` <img src="${url}" style="color: black; padding: 2%; max-height: 50%; max-width: 50%;"/> `;
    //         getImages()

    //     }).catch(function(error) {
    //         // Handle errors here
    //     })
    }

function getImages() {
    console.log("getting images")

    // Create a Reference to file folder:
    var storageRef = firebase.storage().ref("Team Files/Images");

    // Now we get the references of these images
    storageRef.listAll().then(function(result) {

        console.log(result)
        console.log(result.items)
        imageCount = 1

        result.items.forEach(function(imageRef) {            
            // And finally display them Images(imageRef);
            displayImages(imageRef, imageCount)
            // console.log(imageRef)
        });
    }).catch(function(error) {
        // Handle errors here
    })
}

function displayImages(imageRef) {
    var imageDisplay = document.getElementById("imageDisplay");

    dataSTR = ""

    imageRef.getDownloadURL().then(function(url) {
        
        document.getElementById('imageDisplay').src = url
        // console.log(url)
        imageCard = createImageCard(url, imageCount)
        dataSTR = dataSTR + imageCard
        imageCount ++

    }).then(function() {
        imageDisplay.innerHTML = dataSTR 

    }).catch(function(error) {
        // Handle errors here
    })
}

function createImageCard(imageURL, imageCount) {
    var card = `
        <div class="col s12 m6 l4">
        <div class="card responsive blue-grey darken-1">
            <div class="card-content white-text">
                <span class="card-title">Image ${imageCount}</span>
                <img class="materialboxed responsive-img" style="max-wdith: 50%; max-height: 45%;" src="${imageURL}"/>
                <p>Image Displayed Above</p>
            </div>
            <div class="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
            </div>
        </div>
    </div>
    `;

    return card;
}


// GETTING & DISPLAYING VIDEOS

function addVideo() {

    var date = new Date();
    var [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    // var [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];  
    var fileUploadDate = month.toString() + '-' + day.toString() +  '-' + year.toString()

    var file = document.getElementById('videoFileBtn').files[0]
    var name = fileUploadDate + '-' + file.name
    var metadata = { contentType: file.type }

    // // console.log(file)
    // console.log(name)

    var storageRef = firebase.storage().ref("Team Files/Videos");
    var task = storageRef.child(name).put(file, metadata)
    alert("File Added")

    // task.then(snapshot => snapshot.ref.getDownloadURL()).then((url) => {
    //         console.log(url)
    //         // document.getElementById("recentUpload").src = url
    //         // var displayRecent = document.getElementById("recentUpload")
    //         // displayRecent.innerHTML = ` <img src="${url}" style="color: black; padding: 2%; max-height: 50%; max-width: 50%;"/> `;
    //         // getImages()

    //     }).catch(function(error) {
    //         // Handle errors here
    //     })
    }

function getVideos() {
    console.log("getting videos")

    // Create a Reference to file folder:
    var storageRef = firebase.storage().ref("Team Files/Videos");

    // Now we get the references of these images
    storageRef.listAll().then(function(result) {

        videoCount = 1
        result.items.forEach(function(videoRef) {            
            // And finally display themImages(videoRef);
            displayVideos(videoRef, videoCount)
            // console.log(videoRef)
        });
    }).catch(function(error) {
        // Handle errors here
    })
}

function displayVideos(videoRef) {
    var videoDisplay = document.getElementById("videoDisplay");

    dataSTR = ""

    videoRef.getDownloadURL().then(function(url) {
        document.getElementById('videoDisplay').src = url
        // console.log(url)
        videoCard = createVideoCard(url, videoCount)
        dataSTR = dataSTR + videoCard
        videoCount ++

    }).then(function() {
        videoDisplay.innerHTML = dataSTR 

    }).catch(function(error) {
        // Handle errors here
    })
}

function createVideoCard(videoURL, videoCount) {
    var card = `
        <div class="col s12 m6 l4">
        <div class="card medium blue-grey darken-1">
            <div class="card-content white-text">
                <span class="card-title">Video  ${videoCount}</span>
                <video class="responsive-video" controls>
                    <source src="${videoURL}" type="video/mov">
                    <source src="${videoURL}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <p>Image Displayed Above</p>
            </div>
            <div class="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
            </div>
        </div>
    </div>
    `;

    return card;
}


// GETTING & DISPLAYING PDFs

function addPDF() {
    var date = new Date();
    var [month, day, year] = [date.getMonth(), date.getDate(), date.getFullYear()];
    // var [hour, minutes, seconds] = [date.getHours(), date.getMinutes(), date.getSeconds()];  
    var fileUploadDate = month.toString() + '-' + day.toString() +  '-' + year.toString()

    var file = document.getElementById('pdfFileButton').files[0]
    var name = fileUploadDate + '-' + file.name
    var metadata = { contentType: file.type }

    // // console.log(file)
    // console.log(name)

    var storageRef = firebase.storage().ref("Team Files/PDFs");
    var task = storageRef.child(name).put(file, metadata)
    alert("File Added")

    // task.then(snapshot => snapshot.ref.getDownloadURL()).then((url) => {
    //         console.log(url)
    //         // document.getElementById("recentUpload").src = url
    //         // var displayRecent = document.getElementById("recentUpload")
    //         // displayRecent.innerHTML = ` <img src="${url}" style="color: black; padding: 2%; max-height: 50%; max-width: 50%;"/> `;
    //         // getImages()

    //     }).catch(function(error) {
    //         // Handle errors here
    //     })
    }

function getPDFs() {

    console.log("getting PDFs")

    // Create a Reference to file folder:
    var storageRef = firebase.storage().ref("Team Files/PDFs");
    console.log()

    // Now we get the references of these images
    storageRef.listAll().then(function(result) {
        result.items.forEach(function(pdfRef) {            
            // And finally display them Images(pdfRef);
            // var x = pdfRef.getMetaData()

            // pdfRef.getMetadata().then((metadata) => {
            //         console.log(metadata.name)
            //         var fileDisplayName = metadata.name

            
            // }).catch((error) => {
            //     alert("error")
            // });
            displayPDFs(pdfRef)
        });
    }).catch(function(error) {
        alert("error")
    })
}

function displayPDFs(pdfRef, fileDisplayName) {

    var pdfDisplay = document.getElementById("pdfDisplay");
    dataSTR = ""

    pdfRef.getDownloadURL().then(function(url) {
        document.getElementById('pdfDisplay').src = url
        // console.log(url)        

        pdfRef.getMetadata().then((metadata) => {
            console.log(metadata.name)
            var fileDisplayName = metadata.name

            pdfCard = createPDFCard(url, fileDisplayName)
            dataSTR = dataSTR + pdfCard

        }).then(function() {
        pdfDisplay.innerHTML = dataSTR 

        }).catch(function(error) {
            alert("error")
        })
    })
}

function createPDFCard(pdfURL, fileDisplayName) {
    var card = `
        <div class="col s12 m6 l4">
        <div class="card small blue-grey darken-1">
            <div class="card-content white-text">
                <span class="card-title">Card Display of PDFs in Database</span>
                <a href="${pdfURL}" target="_blank">${fileDisplayName}</>
            </div>
            <div class="card-action">
                <a href="#">This is a link</a>
                <a href="#">This is a link</a>
            </div>
        </div>
    </div>
    `;

    return card;
}





// function displayPostComments() {

//     // Generate a reference to a new location and add some data using push()
//     var newPostRef = firebase.database().ref('users/').push({
//         author: "gracehop",
//         title: "Announcing COBOL, a New Programming Language"
//     });

//    // Get the unique ID generated by push() by accessing its key
//     var postID = newPostRef.key;
//     console.log(postID)
// }





// function writeData(userId, name, email, imageUrl) {
//     firebase.database().ref('users/' + userId).set({
//         // username: name,
//         // email: email,
//         // profile_picture : imageUrl
//         name: "andrew",
//         email: "andrew@example.com"
//     });
//     console.log("Data set to database")
// } 


// function getData() {
//     var gettingData = firebase.database().ref('users/');

//     gettingData.on('value', (snapshot) => {
//         const data = snapshot.val();
//         console.log(data)
//     });   
// }