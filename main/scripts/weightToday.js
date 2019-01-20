function weightTodayListener(uid) {
    let formAddWeight = document.querySelector(".todaysWeightForm");
    let addWeightInputB = document.querySelector(".todaysWeight__buttonAdd");

    formAddWeight.addEventListener("submit", (e) => {
        e.preventDefault();
        addWeight(e);
        console.log("lol")
    });
    addWeightInputB.addEventListener("click", addWeight);
}

var dateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
};

//show and hide the weight list 
//- creating is in the other function to avoid duplication in the weight list
var isViewMoreVisible = false;

function viewMoreWeightResults() {
    let allResults = document.querySelector(".allResults");
    let children = allResults.children;
    let childrenLength = children.length;

    if (childrenLength === 0) {
        alert("The list is empty. Please add a first weight result");
    } else if (isViewMoreVisible === false && childrenLength != 0) {
        allResults.style.display = "block";
        isViewMoreVisible = true;
    } else if (isViewMoreVisible === true && childrenLength != 0) {
        allResults.style.display = "none";
        isViewMoreVisible = false;
    }
}

// supporting functions - creating the list
function createView(doc) {
    var allResults = document.querySelector(".allResults");
    let li = document.createElement("li");
    let date = document.createElement("span");
    let weight = document.createElement("span");

    date.textContent = doc.data().date.toDate().toLocaleDateString("en-GB", dateOptions) + ":  ";
    weight.textContent = doc.data().weight;

    li.appendChild(date)
    li.appendChild(weight)
    allResults.appendChild(li);
}

function createViewSimple() {
    var allResults = document.querySelector(".allResults");
    let li = document.createElement("li");
    let date = document.createElement("span");
    let weight = document.createElement("span");

    date.textContent = doc.data().date.toDate().toLocaleDateString("en-GB", dateOptions) + ":  ";
    weight.textContent = data().weight;

    li.appendChild(date)
    li.appendChild(weight)
    allResults.appendChild(li);
}
