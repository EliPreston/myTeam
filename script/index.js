// function getTimeEpoch() {
    //     x = new Date().getTime().toString(); 
    //     console.log(x)                            
    // }
    
    
    $(document).ready(function () {
        $(".modal").modal();
    });
    
    
    // const users = {
    //     user1:"password1",
    //     user2:"password2",
    //     user3:"password3",
    //     user4:"password4",
    //     user5:"password5",
    //     user6:"password6"
    // }
    // for (let i in users) {
    //     console.log(i + " " +users[i])
    // } 


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



function createUser() {

    var emailSignUp = document.getElementById("emailS").value
    var passwordSignUp = document.getElementById("passwordS").value
    console.log(emailSignUp, passwordSignUp)
    
    firebase.auth().createUserWithEmailAndPassword(emailSignUp, passwordSignUp).then((userCredential) => {
        // Signed in 
        var user = userCredential.user;
        console.log(user)
        window.location.href = "myTeam.github.io/roster.html";
        // ...
    }).catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
            // ..
        });

    
}

function checkLogin() {

    var emailLogin = document.getElementById("emailL").value
    var passwordLogin = document.getElementById("passwordL").value
    
    console.log(emailLogin, passwordLogin)

    firebase.auth().signInWithEmailAndPassword(emailLogin, passwordLogin).then((userCredential) => {
    // Signed in
    var user = userCredential.user;
    console.log(user)
    window.location.href = "myTeam.github.io/roster.html";


    // ...
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
        window.location.href = "myTeam.github.io/index.html";

    }, function(error) {
        console.error('Sign Out Error', error);
    });
}










// function checkLogin() {

//     var e = document.getElementById("emailL").value
//     var p = document.getElementById("passwordL").value

//     //


    

        
    
//     if (u in users) {
//         console.log("user exists")

//         if (users[u] == p) {
//             console.log("logged in")

//             // similar behavior as an HTTP redirect
//             // window.location.replace("http://stackoverflow.com");

//             // similar behavior as clicking on a link
//             // window.location.href = "/fileUploads.html";
//         }
//         else {
//             console.log("incorrect password")
//         }
//     }
//     else {
//         console.log("user does not exist")
//     }
//     document.getElementById("loginForm").reset()
// }

// function createUser() {
//     var u = document.getElementById("usernameS").value
//     var e = document.getElementById("emailS").value
//     var p = document.getElementById("passwordS").value

//     firebase.database().ref('users/' + u).set({
//         username: u,
//         email: e,
//         password: p
//     });
//     console.log("Data set to database")


//     console.log(u, e, p)
//     document.getElementById("signupForm").reset()
// }

// function createUser() {


//     var addUser = document.getElementById('usernameS').value
//     var addEmail = document.getElementById("emailS").value
//     var addPassword = document.getElementById('passwordS').value


//     firebase.database().ref('users/' + addUser).set({
//         username: addUser,
//         email: addEmail,
//         password: addPassword
//     });
//     console.log("Data set to database")
// } 

