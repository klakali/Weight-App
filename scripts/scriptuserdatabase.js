// END Add weight //
var today = new Date();
var todayPreviousMax = today.toLocaleDateString("en-GB").split("/").reverse("/").join("-"); //max prvious date att. Added to match the default style of 'date' input

var dateOptions = {
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
};

const button = document.querySelector(".todaysWeight__buttonAdd");

var allWeightResults = [
];

var weightToday = document.querySelector(".todaysWeight__writeWeight");

function addWeight() {
    var ifItExists = false; //to check the database
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
        for (var i = 0; i < allWeightResults.length; i++) {
            if (object.dateViewStyle === allWeightResults[i].dateViewStyle) {
                alert("This date is already added");
                ifItExists = true;
                break;
            }
        }
        if (ifItExists === false) {
            allWeightResults.push(object);
            updateAverageWeight(); //update averageWeight after adding a weight
            viewMoreCreate(allWeightResults.length - 1, allWeightResults.length); //add only the pushed object
            weightToday.value = "";
        }
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

// View all results //
const allResults = document.querySelector(".allResults");

function viewMoreCreate(start, length) {
    for (let i = start; i < length; i++) {
        var listFull = allWeightResults[i].dateViewStyle + ": " + allWeightResults[i].weight;

        let singleWeightResultParent = document.createElement("div");
        singleWeightResultParent.classList.add("allResults__groupResults");
        allResults.appendChild(singleWeightResultParent);

        singleWeightResultParent.setAttribute("order", i); //'edit function' purpose - show the edited date & weight

        let singleWeightResultElement = document.createElement("p");
        singleWeightResultElement.classList.add("allResults__results");
        let singleWeightResultElementText = document.createTextNode(listFull);
        singleWeightResultElement.appendChild(singleWeightResultElementText);
        singleWeightResultParent.appendChild(singleWeightResultElement);
    }
}

viewMoreCreate(0, allWeightResults.length); //to create the list after the page was loaded
// END view all results //
