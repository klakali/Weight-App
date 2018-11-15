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
var dd = today.getDate();
var mm = today.getMonth() + 1; //january is 0
var yr = today.getFullYear();

const button = document.querySelector(".todaysWeight__buttonAdd");
var allWeightResults = [
    {
        day: 1,
        month: 11,
        year: 2018,
        weight: 79
    },
    {
        day: 2,
        month: 11,
        year: 2018,
        weight: 80
    },
    {
        day: 3,
        month: 11,
        year: 2018,
        weight: 81
    }];

function addWeight() {
    var weightToday = document.querySelector(".todaysWeight__writeWeight");

    let object = {
        day: dd,
        month: mm,
        year: yr,
        weight: parseInt(weightToday.value)
    };

    if (weightToday.value.length === 0) {
        alert("Please add the weight");
    } else if (weightToday.value <= 69) /*weight to small */ {
        alert("Hmm, it seems to be incorrect - weight to small");
    } else {
        allWeightResults.push(object);
        weightToday.value = "";
        updateAverageWeight(); //update averageWeight after adding a weight
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
const viewMoreButton = document.querySelector(".more");
const allResults = document.querySelector(".allResults");
console.log(allResults)

function viewMore() {
    for (let i = 0; i < allWeightResults.length; i++) {
        var todayFull = dd + "/" + mm + "/" + yr + ": " + allWeightResults[i].weight;
        var singleWeightResultElement = document.createElement("p");
        var singleWeightResultText = document.createTextNode(todayFull);

        singleWeightResultElement.appendChild(singleWeightResultText);
        allResults.appendChild(singleWeightResultElement);

        console.log(todayFull)
    }
}
viewMoreButton.addEventListener('click', viewMore);
// END view all results //
