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
var todayPreviousMax = today.toLocaleDateString("en-GB").split("/").reverse("/").join("-"); //max prvious date att

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
        weight: 79.92
    },
    {
        date: new Date(),
        dateViewStyle: new Date().toLocaleDateString("en-GB", dateOptions),
        weight: 80
    },
    {
        date: new Date(),
        dateViewStyle: new Date().toLocaleDateString("en-GB", dateOptions),
        weight: 78
    }];

var weightToday = document.querySelector(".todaysWeight__writeWeight");

function addWeight() {
    let object = {
        date: today,
        dateViewStyle: today.toLocaleDateString("en-GB", dateOptions),
        weight: parseFloat(weightToday.value),
        node: Node
    };

    if (weightToday.value.length === 0) {
        alert("Please add the weight");
    } else if (isNaN(weightToday.value)) {
        alert("Please add number");
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
const previousWeightDate = document.querySelector(".previousWeight__dateWeight");
previousWeightDate.setAttribute("max", todayPreviousMax);

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
        date: new Date(Date.parse(dateControl.value)),
        dateViewStyle: new Date(Date.parse(dateControl.value)).toLocaleDateString("en-GB", dateOptions),
        weight: parseFloat(weightPrevious.value)
    };
    if (weightPrevious.value.length === 0 && dateControl.value.length === 0) {
        alert("Please add a weight and a date");
    } else if (weightPrevious.value.length === 0) {
        alert("Please add a weight");
    } else if (dateControl.value.length === 0) {
        alert("Please add a date");
    } else if (weightPrevious.value <= 69) {
        alert("Hmm, it seems to be incorrect - weight to small");
    } else if (weightPrevious.value > 99) {
        alert("Hmm, it seems to be incorrect - weight to large");
    } else {
        viewMoreUpdate(); //refresh the list / sort
        allWeightResults.push(object);
        updateAverageWeight(); //update averageWeight after adding a weight
        sortByDate();
        viewMoreCreate(0, allWeightResults.length);
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

function viewMoreCreate(start, length) {
    for (let i = start; i < length; i++) {
        var listFull = allWeightResults[i].dateViewStyle + ": " + allWeightResults[i].weight;

        let singleWeightResultParent = document.createElement("div");
        singleWeightResultParent.classList.add("allResults__groupResults");
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

        singleWeightResultEdit.setAttribute("order", i); //'edit function' purpose - show the edited date & weight

        let singleWeightResultRemove = document.createElement("p");
        let singleWeightResultRemoveText = document.createTextNode("Remove");
        singleWeightResultRemove.classList.add("allResults__resultRemove");
        singleWeightResultRemove.appendChild(singleWeightResultRemoveText);
        singleWeightResultParent.appendChild(singleWeightResultRemove);

        singleWeightResultRemove.addEventListener("click", removeSingleResult) // remove function
        singleWeightResultEdit.addEventListener("click", editSungleResult) // edit function
    }
}

viewMoreCreate(0, allWeightResults.length);

function viewMoreUpdate() {
    var parentToBeUpdated = document.querySelectorAll(".allResults__groupResults");
    parentToBeUpdated.forEach(function (parent) {
        while (parent.firstChild) {
            parent.removeChild(parent.firstChild); //remove weight + edit & remove
        }
    });
}

var isMoreRefreshed = false;
var isMoreVisible = false;

function viewMore() {
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

function removeEditForm() {
    let thisParent = event.currentTarget.parentElement;
    let editWeight__writeWeight = document.querySelector(".editWeight__form");

    thisParent.removeChild(editWeight__writeWeight);
}

function cancelEdit() {
    this.previousSibling.style.display = "block";
    this.innerHTML = "Edit";
    this.removeEventListener("click", cancelEdit);
    this.style.color = "#fff";
    this.addEventListener("click", editSungleResult);
    removeEditForm();
}

function editWeight() {
    let weightUpdated = parseFloat(this.parentNode.childNodes[0].value);
    let datetUpdated = this.parentNode.childNodes[1].value;

    let weightOrder = this.getAttribute("order");
    
    let object = {
        date: new Date(Date.parse(this.parentNode.childNodes[1].value)),
        dateViewStyle: new Date(Date.parse(datetUpdated)).toLocaleDateString("en-GB", dateOptions),
        weight: weightUpdated
    };

    if (weightUpdated === 0) {
        alert("Please add the weight");
    } else if (isNaN(weightUpdated)) {
        alert("Please add number");
    } else if (weightUpdated <= 69) {
        alert("Hmm, it seems to be incorrect - weight to small");
    } else if (weightUpdated > 99) {
        alert("Hmm, it seems to be incorrect - weight to large");
    } else {
        allWeightResults[weightOrder] = object;
        updateAverageWeight(); //update averageWeight after adding a weight
        console.log(this.parentNode.parentNode)
    }

}

function editSungleResult(e) { // main EDIT function
    this.previousSibling.style.display = "none";
    this.removeEventListener("click", editSungleResult);
    this.innerHTML = "Cancel"; // change the button task to stop the function
    this.addEventListener("click", cancelEdit)
    this.style.color = "#e50000";

    let weightOrder = this.getAttribute("order");
    let dateOrderUpdated = allWeightResults[weightOrder].dateViewStyle;
    let defaultDate = dateOrderUpdated.split("/").reverse("/").join("-");

    let defaultWeight = allWeightResults[weightOrder].weight;

    let thisParent = event.currentTarget.parentElement;

    let editWeight__form = document.createElement("form");
    editWeight__form.classList.add("editWeight__form");
    thisParent.appendChild(editWeight__form);

    let editWeight__writeWeight = document.createElement("input");
    editWeight__writeWeight.setAttribute("type", "text");
    editWeight__writeWeight.setAttribute("value", defaultWeight);
    editWeight__writeWeight.classList.add("editWeight__writeWeight");

    let editWeight__dateWeight = document.createElement("input");
    editWeight__dateWeight.setAttribute("type", "date");
    editWeight__dateWeight.setAttribute("value", defaultDate);
    editWeight__dateWeight.setAttribute("max", todayPreviousMax);
    editWeight__dateWeight.classList.add("editWeight__dateWeight");


    let editWeight__buttonAdd = document.createElement("input");
    editWeight__buttonAdd.setAttribute("type", "button");
    editWeight__buttonAdd.setAttribute("value", "Edit");
    editWeight__buttonAdd.setAttribute("order", weightOrder); //'edit function' purpose - show the edited date & weight
    editWeight__buttonAdd.classList.add("editWeight__buttonAdd");
    editWeight__buttonAdd.addEventListener("click", editWeight)

    editWeight__form.appendChild(editWeight__writeWeight);
    editWeight__form.appendChild(editWeight__dateWeight);
    editWeight__form.appendChild(editWeight__buttonAdd);
}
// END Delete & remove weight results //

// Sort the weight results by date //
function sortByDate() {
    function compareDates(a, b) {
        if (a.date > b.date) {
            return 1;
        } else if (a.date < b.date) {
            return -1;
        }
    }
    allWeightResults.sort(compareDates);
}
// END Sort the weight results by date //
