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
var todayPreviousMax = today.toLocaleDateString("en-GB").split("/").reverse("/").join("-"); //max prvious date att. Added to match the default style of 'date' input

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
        weight: 80
    },
    {
        date: new Date(),
        dateViewStyle: new Date().toLocaleDateString("en-GB", dateOptions),
        weight: 85
    },
    {
        date: new Date(),
        dateViewStyle: new Date().toLocaleDateString("en-GB", dateOptions),
        weight: 83
    },
    {
        date: new Date(),
        dateViewStyle: new Date().toLocaleDateString("en-GB", dateOptions),
        weight: 82
    },
    {
        date: new Date(),
        dateViewStyle: new Date().toLocaleDateString("en-GB", dateOptions),
        weight: 85
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
    },
    {
        date: new Date(),
        dateViewStyle: new Date().toLocaleDateString("en-GB", dateOptions),
        weight: 79
    },
    {
        date: new Date(),
        dateViewStyle: new Date().toLocaleDateString("en-GB", dateOptions),
        weight: 79
    },
    {
        date: new Date(),
        dateViewStyle: new Date().toLocaleDateString("en-GB", dateOptions),
        weight: 75
    },
    {
        date: new Date(),
        dateViewStyle: new Date().toLocaleDateString("en-GB", dateOptions),
        weight: 78
    }
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
    var ifItExists = false; //to check the database
    let object = {
        date: new Date(Date.parse(dateControl.value)),
        dateViewStyle: new Date(Date.parse(dateControl.value)).toLocaleDateString("en-GB", dateOptions),
        weight: parseFloat(weightPrevious.value)
    };
    if (weightPrevious.value.length === 0 && dateControl.value.length === 0) {
        alert("Please add a weight and a date");
    } else if (isNaN(weightPrevious.value)) {
        alert("Please add number");
    } else if (weightPrevious.value.length === 0) {
        alert("Please add a weight");
    } else if (dateControl.value.length === 0) {
        alert("Please add a date");
    } else if (weightPrevious.value <= 69) {
        alert("Hmm, it seems to be incorrect - weight to small");
    } else if (weightPrevious.value > 99) {
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
            viewMoreUpdate(); //refresh the list / sort
            allWeightResults.push(object);
            updateAverageWeight(); //update averageWeight after adding a weight
            sortByDate();
            viewMoreCreate(0, allWeightResults.length);
            weightPrevious.value = "";
            dateControl.value = "";
        }
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

        singleWeightResultParent.setAttribute("order", i); //'edit function' purpose - show the edited date & weight

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

viewMoreCreate(0, allWeightResults.length); //to create the list after the page was loaded

function viewMoreUpdate() {
    var parentToBeUpdated = document.querySelectorAll(".allResults__groupResults");
    var parentParentToBeUpdated = document.querySelectorAll(".allResults");

    parentParentToBeUpdated.forEach(function (parent) {
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
    let resultToBeUpdated = this.parentNode;
    let resultAttribute = resultToBeUpdated.getAttribute("order");

    var confirmation = confirm('Are you sure?');
    if (confirmation == true) {
        this.parentNode.remove();
        allWeightResults.splice(resultAttribute, 1);

        viewMoreUpdate(); //refresh the list / sort
        updateAverageWeight(); //update averageWeight after adding a weight
        sortByDate(); //sort before creating
        viewMoreCreate(0, allWeightResults.length); //create the view
    }
}

function removeEditForm(e) {
    let thisParent = this.currentTarget.parentElement;
    let editWeight__writeWeight = document.querySelector(".editWeight__form");

    thisParent.removeChild(editWeight__writeWeight);
}

function cancelEdit(e) {
    let weightOrder = this.parentNode.getAttribute("order");
    this.previousSibling.style.display = "block";
    this.innerHTML = "Edit";
    this.removeEventListener("click", cancelEdit);
    this.style.color = "#fff";
    this.addEventListener("click", editSungleResult);

    this.parentNode.removeChild(this.parentNode.lastChild);
}

function editWeight() {
    let weightUpdated = parseFloat(this.parentNode.childNodes[0].value);
    let datetUpdated = this.parentNode.childNodes[1].value;

    let resultToBeUpdated = this.parentNode.parentNode;
    let resultAttribute = resultToBeUpdated.getAttribute("order");

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
        allWeightResults[resultAttribute] = object;
        updateAverageWeight(); //update averageWeight after adding a weight

        let thisParent = this.parentNode.parentNode;
        let editWeight__writeWeight = document.querySelector(".editWeight__form");
        thisParent.removeChild(editWeight__writeWeight);

        thisParent.firstChild.style.display = "block";
        thisParent.children[1].style.color = "#fff";
        thisParent.children[1].innerHTML = "Edit";
        thisParent.children[1].addEventListener("click", editSungleResult);

        viewMoreUpdate();
        updateAverageWeight();
        sortByDate();
        viewMoreCreate(0, allWeightResults.length);
    }
}

var resultEditButtons = Array.from(document.querySelectorAll(".allResults__resultEdit"));

function editSungleResult() { // main EDIT function
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
    editWeight__form.setAttribute("order", weightOrder);

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

// Canvas & Graph //
// f added to make the arc looks smooth www.html5rocks.com/en/tutorials/canvas/hidpi/
var scaleStartEnd = 60;
var elementsY = [85, 80, 75, 70];
var elementsYsub = elementsY[0] - elementsY[1];

function setupCanvas(canvas) {
    // Get the device pixel ratio, falling back to 1.
    var dpr = window.devicePixelRatio || 1;
    // Get the size of the canvas in CSS pixels.
    var rect = canvas.getBoundingClientRect();
    // Give the canvas pixel dimensions of their CSS
    // size * the device pixel ratio.
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    var ctx = canvas.getContext('2d');
    ctx.scale(dpr, dpr);

    // Scale all drawing operations by the dpr, so you
    // don't have to worry about the difference.

    //custom graph: 
    let distance = Math.ceil((canvas.width - scaleStartEnd) / 30);
    weightPoint(ctx, canvas.width, canvas.height, distance); //points on the graph
    xAxis(ctx, canvas.height - 10, distance); //the xAxis scale creator - '10' for height
    drawCanvasArea(ctx, canvas.width - scaleStartEnd, canvas.height - scaleStartEnd, distance); //the main graph, inside canvas

    return ctx;
}
var ctx = setupCanvas(document.querySelector(".weightGraph"));
ctx.fillStyle = "#fff";

function drawCanvasArea(ctx, width, height, distance) {
    ctx.rect(scaleStartEnd / 2, scaleStartEnd / 2, width, height);
    ctx.stroke();
}

function xAxis(ctx, height, distance) {
    var elementsX = ['30', '29', '28', '27', '26', '25', '24', '23', '22', '21', '20', '19', '18', '17', '16', '15', '14', '13', '12', '11', '10', '09', '08', '07', '06', '05', '04', '03', '02', '01']
    for (var i = 0; i < elementsX.length; i++) {
        ctx.fillText(elementsX[i], (i * distance) + scaleStartEnd / 2, height);
    }
}

function yAxis(ctx, height, width, distanceY) {
    for (var i = 0; i <= elementsY.length - 1; i++) {
        ctx.fillText(elementsY[i], 9, (distanceY * i) + scaleStartEnd / 2);
        drawLine(ctx, scaleStartEnd / 2, (distanceY * i) + scaleStartEnd / 2, width - scaleStartEnd / 2, (distanceY * i) + scaleStartEnd / 2);
    }
}

function drawLine(ctx, startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = "#fff";
    ctx.stroke();
    ctx.restore();
}

function weightPoint(ctx, width, height, distance) {
    ctx.fillStyle = "#fff";
    let distanceY = (height - scaleStartEnd) / elementsY.length;
    yAxis(ctx, height, width, distanceY); //the yAxis scale creator
    let scaleBase = (elementsY[0] + elementsYsub) - elementsY[elementsY.length - 1];
    console.log(scaleBase)
    let originY = height - scaleStartEnd;
    let scaleBaseHeight = originY / scaleBase;
    console.log(scaleBaseHeight)

    for (let i = allWeightResults.length - 1; i >= 0; i--) {
        let yPointCalc = originY - ((allWeightResults[i].weight - 65) * scaleBaseHeight);
        let plusOne = i + 1;
        ctx.beginPath();
        ctx.fillStyle = "#fff";
        ctx.arc((i * distance) + scaleStartEnd / 2, yPointCalc + scaleStartEnd / 2, 4, 0, 2 * Math.PI);

        if (i < allWeightResults.length - 1) {
            let yPointCalcScale = originY - ((allWeightResults[plusOne].weight - 65) * scaleBaseHeight);
            ctx.lineTo(((i + 1) * distance) + scaleStartEnd / 2, yPointCalcScale + scaleStartEnd / 2);

        }
        ctx.stroke();
        ctx.fill();
    }
}
// END Canvas & Graph //
