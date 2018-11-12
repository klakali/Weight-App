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
const button = document.querySelector(".todaysWeight__buttonAdd");
var allWeightResults = [
    {
        weight: 79
    },
    {
        weight: 79
    },
    {
        weight: 79
    }];
console.log(allWeightResults[0].weight)

function addWeight() {
    var weightToday = document.querySelector(".todaysWeight__writeWeight");
    if (weightToday.value.length === 0) {
        alert("Please add the weight");
    } else if (weightToday.value <= 69) /*weight to small */ {
        alert("Hmm, it seems to be incorrect");
    } else {
        allWeightResults.push(parseInt(weightToday.value));
        weightToday.value = "";

        updateAverageWeight(); //update averageWeight after adding a weight
    }
}

button.addEventListener('click', addWeight);
// END Add weight //

// Weight average //
function getAverage(a, b) {
    return a + b;
}

function updateAverageWeight() {
    var weightAverageField = document.querySelector(".weightResult__average");
    //var weightAverage = (allWeightResults.weight.reduce(getAverage) / allWeightResults.length).toFixed(1);

    // weightAverageField.innerHTML = weightAverage;
};
updateAverageWeight();

// END Weight average //
