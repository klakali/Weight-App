// Generate text motivation //
function motivationGenerated() {
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

   let quoteForToday = textMotivationAll[Math.floor(Math.random() * textMotivationAll.length)]
    textMotivation.innerHTML = quoteForToday;
};

motivationGenerated()
// END Generate text motivation //
