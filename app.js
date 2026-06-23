const sliders = [
    "sleep",
    "mood",
    "energy",
    "stress",
    "activity"
];

sliders.forEach(id => {

    const slider = document.getElementById(id);
    const value = document.getElementById(id + "Value");

    slider.addEventListener("input", () => {
        value.textContent = slider.value;
    });

});
