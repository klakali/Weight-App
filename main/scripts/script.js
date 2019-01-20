//firebase//
document.addEventListener("DOMContentLoaded", event => {
    const app = firebase.app();
    //after the page is refreshed, the user remains logged in 
    checkState();
});

const loginGoogleButton = document.querySelector(".loginButtonGoogle");
loginGoogleButton.addEventListener('click', googleLogin)

//the page is build after the 'Login process' - group function
function loadDOM(user) {
    createMoreWeightResult(user, uid);
    userDOMbuild(user);

    viewMoreElement = document.querySelector(".moreResults_viewMore");
    viewMoreElement.addEventListener("click", viewMoreWeightResults);
    
    lol(uid)
}

const user = firebase.auth().currentUser;


//Google login, firebase guidance 
function googleLogin() {
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(function () {
            return firebase.auth().signInWithPopup(provider);
        })
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
        });
}

function checkState(user) {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            uid = user.uid;
            loadDOM(user);
            weightTodayListener(uid);
        } else {
            // No user is signed in.
        }
    });

}
//END firebase//

//Main weight functions
function createMoreWeightResult(user, uid) {
    let allResults = document.querySelector(".allResults")
    db.collection(uid).get().then((snapshot) => {
        snapshot.docs.forEach(doc => {
            createView(doc);
        })
    })
}

function addWeight(e) {
    e.preventDefault;
    let weightToday = document.querySelector(".todaysWeight__writeWeight");

    // if (exisitngData == undefined) {
    db.collection(uid).add({
            date: new Date(),
            weight: parseFloat(weightToday.value)
        })
        .then(function (docRef) {
            weightToday.value = "";
            console.log("Document written with ID: ", docRef.id);
        })
    // } else {
    //     alert("This date already exists!")
    //}
}
function lol(uid) {
db.collection(uid).get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
});
}
