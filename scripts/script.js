// Generate text motivation //
var textMotivation = document.querySelector(".welcome__motivationalText");

var textMotivationAll = [
    "So it goes.",
    "Everything happens for a reason.",
    "Try and fail, but never fail to try.",
    "Life is like riding a bicycle. To keep your balance you must keep moving.",
    "If you dream it, you can do it.",
    "Never, never, never give up.",
    "Don’t wait. The time will never be just right.",
    "Do what you can, with what you have, where you are.",
    "Action is the foundational key to all success.",
    "Don’t regret the past, just learn from it.",
    "Believe you can and you’re halfway there.",
    "To be the best, you must be able to handle the worst."
];

(function motivationGenerated() {
    let quoteForToday = textMotivationAll[Math.floor(Math.random() * textMotivationAll.length)]
    textMotivation.innerHTML = quoteForToday;
})();
// END Generate text motivation //

// Add weight //
var today = new Date();
var dateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
};

const button = document.querySelector(".todaysWeight__buttonAdd");

var allWeightResults = [
    {
        date: new Date(),
        dateViewStyle: new Date().toLocaleDateString("en-GB", dateOptions),
        weight: 79
    },
    {
        date: new Date(),
        dateViewStyle: new Date().toLocaleDateString("en-GB", dateOptions),
        weight: 80
    },
    {
        date: new Date(),
        dateViewStyle: new Date().toLocaleDateString("en-GB", dateOptions),
        weight: 81
    }];

var weightToday = document.querySelector(".todaysWeight__writeWeight");

function addWeight() {
    viewMoreRefresh(); //update the array with results
    let object = {
        date: today,
        dateViewStyle: today.toLocaleDateString("en-GB", dateOptions),
        weight: parseInt(weightToday.value)
    };

    if (weightToday.value.length === 0) {
        alert("Please add the weight");
    } else if (weightToday.value <= 69) /*weight to small */ {
        alert("Hmm, it seems to be incorrect - weight to small");
    } else if (weightToday.value > 99) /*weight to large */ {
        alert("Hmm, it seems to be incorrect - weight to large");
    } else {
        allWeightResults.push(object);
        updateAverageWeight(); //update averageWeight after adding a weight
        viewMoreCreate(allWeightResults.length - 1, allWeightResults.length); //add only the pushed object
        weightToday.value = "";
    }
}

button.addEventListener('click', addWeight);
// END Add weight //

// Weight average //
function updateAverageWeight() {
    var sumWeight = 0;

    for (let i = 0; i < allWeightResults.length; i++) {
        sumWeight += allWeightResults[i].weight;
    }

    var weightAverageField = document.querySelector(".weightResult__average");
    var weightAverage = (sumWeight / allWeightResults.length).toFixed(1);

    weightAverageField.innerHTML = weightAverage;
};

updateAverageWeight();
// END Weight average //

// Previous Results //
const addPreviousButton = document.querySelector(".moreResults__addprevious");
const addPreviousWeightButton = document.querySelector(".previousWeight__buttonAdd");
const addPreviousForm = document.querySelector(".previousWeight__form");
var dateControl = document.querySelector('input[type="date"]');

var isPrevios = false;

function addPrevious() {
    if (isPrevios === false) {
        addPreviousForm.style.display = "block";
        isPrevios = true;
    } else {
        addPreviousForm.style.display = "none"
        isPrevios = false;
    }
}

var weightPrevious = document.querySelector(".previousWeight__writeWeight");

function addPreviousWeight() {
    let object = {
        dateViewStyle: Date.parse(dateControl.value),
        //dateViewStyle: dateControl.value,
        weight: parseInt(weightPrevious.value)
    };
    console.log(weightPrevious)
    if (weightPrevious.value.length === 0 && dateControl.value.length === 0) {
        alert("Please add a weight and a date");
    } /* else if (weightPrevious.value.length === 0) {
        alert("Please add a weight");
    } else if (dateControl.value.length === 0) {
        alert("Please add a date");
    } else if (weightPrevious.value <= 69) {
        alert("Hmm, it seems to be incorrect - weight to small");
    } else if (weightPrevious.value > 99) {
        alert("Hmm, it seems to be incorrect - weight to large");
    } */ else {
        allWeightResults.push(object);
        updateAverageWeight(); //update averageWeight after adding a weight
        viewMoreCreate(allWeightResults.length - 1, allWeightResults.length); //add only the pushed object
        weightPrevious.value = "";
        dateControl.value = "";
    }
}

addPreviousButton.addEventListener('click', addPrevious);
addPreviousWeightButton.addEventListener('click', addPreviousWeight);

// END Previous Results //

// View all results //
const viewMoreButton = document.querySelector(".moreResults_viewMore");
const allResults = document.querySelector(".allResults");


function viewMoreRefresh() {
    if (isMoreRefreshed === false) {
        viewMoreCreate(0, allWeightResults.length);
        isMoreRefreshed = true;
    }
    return;
}

function viewMoreCreate(start, length) {
    for (let i = start; i < length; i++) {
        var listFull = allWeightResults[i].dateViewStyle + ": " + allWeightResults[i].weight;

        let singleWeightResultParent = document.createElement("div");
        singleWeightResultParent.classList.add("allResults__groupResults");;
        allResults.appendChild(singleWeightResultParent);

        let singleWeightResultElement = document.createElement("p");
        singleWeightResultElement.classList.add("allResults__results");
        let singleWeightResultElementText = document.createTextNode(listFull);
        singleWeightResultElement.appendChild(singleWeightResultElementText);
        singleWeightResultParent.appendChild(singleWeightResultElement);

        let singleWeightResultEdit = document.createElement("p");
        let singleWeightResultEditText = document.createTextNode("Edit");
        singleWeightResultEdit.classList.add("allResults__resultEdit");
        singleWeightResultEdit.appendChild(singleWeightResultEditText);
        singleWeightResultParent.appendChild(singleWeightResultEdit);

        let singleWeightResultRemove = document.createElement("p");
        let singleWeightResultRemoveText = document.createTextNode("Remove");
        singleWeightResultRemove.classList.add("allResults__resultRemove");
        singleWeightResultRemove.appendChild(singleWeightResultRemoveText);
        singleWeightResultParent.appendChild(singleWeightResultRemove);

        singleWeightResultRemove.addEventListener("click", removeSingleResult) // remove function
        singleWeightResultEdit.addEventListener("click", editSungleResult) // remove function

    }
    return;
}

var isMoreRefreshed = false;
var isMoreVisible = false;

function viewMore() {
    viewMoreRefresh();
    if (isMoreVisible === true) {
        allResults.style.display = "none";
        isMoreVisible = false;
    } else if (isMoreVisible === false) {
        allResults.style.display = "block";
        isMoreVisible = true;
    }
}

viewMoreButton.addEventListener('click', viewMore);

// END view all results //

// Remove & Edit weight results //
function removeSingleResult() {
    var confirmation = confirm('Are you sure?');
    if (confirmation == true) {
        this.parentNode.remove();
    }
}

function editSungleResult() {
    this.previousSibling.style.display = "none";
}

//toBeRemoved.forEach(remove => remove.addEventListener('click', removeWeight))
// END Delete & remove weight results //
