function userDOMbuild(user) {
    //delete current elements   
    let welcomeElement = document.querySelector(".welcome");
    let welcomeElementText = document.querySelector(".welcome__welcomeText");
    welcomeElementText.textContent = "Hello, " + user.displayName + ".";

    let loginToBeRemoved = document.querySelector(".loginArea");
    document.body.removeChild(loginToBeRemoved);

    //build header and welcome text    
    let main = document.querySelector(".main");

    //build today's weight area   
    let todaysWeightElement = document.createElement("section");
    let addWeightTextElement = document.createElement("h3");
    let formAddWeight = document.createElement("form");
    let addWeightInputA = document.createElement("input");
    let addWeightInputB = document.createElement("input");

    todaysWeightElement.classList.add("todaysWeight");
    formAddWeight.classList.add("todaysWeightForm");
    addWeightTextElement.classList.add("todaysWeight__addWeightText");
    addWeightInputA.classList.add("todaysWeight__writeWeight");
    addWeightInputA.setAttribute("placeholder", "Weight...");
    addWeightInputA.setAttribute("type", "text");
    addWeightInputA.setAttribute("name", "weightTodayInput");
    addWeightInputB.classList.add("todaysWeight__buttonAdd");
    addWeightInputB.setAttribute("value", "Add");
    addWeightInputB.setAttribute("type", "button");

    let todaysWeightText = document.createTextNode("Today's results");

    todaysWeightElement.appendChild(addWeightTextElement);
    formAddWeight.appendChild(addWeightInputA);
    formAddWeight.appendChild(addWeightInputB);
    todaysWeightElement.appendChild(formAddWeight);
    addWeightTextElement.appendChild(todaysWeightText);
    main.appendChild(todaysWeightElement);

    //build weight display area
    let moreResultsElement = document.createElement("section");
    let viewMoreElement = document.createElement("p");
    let allResultsElementUL = document.createElement("ul");

    moreResultsElement.classList.add("moreResults");
    viewMoreElement.classList.add("moreResults_viewMore");
    allResultsElementUL.classList.add("allResults");

    let viewMoreText = document.createTextNode("View more");

    viewMoreElement.appendChild(viewMoreText);
    moreResultsElement.appendChild(viewMoreElement);
    moreResultsElement.appendChild(allResultsElementUL);
    main.appendChild(moreResultsElement);
}
