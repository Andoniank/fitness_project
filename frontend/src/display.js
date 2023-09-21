const workoutDisplay = document.getElementById("workout-display")
const modal = document.getElementById("modal");


export const openDisplay = () => {
    workoutDisplay.style.zIndex = 3;
    workoutDisplay.classList.add("open-display");
    modal.style.visibility = "visible"
}

export const closeDisplay = () => {
    workoutDisplay.classList.remove("open-display")
    modal.style.visibility = "hidden"
}

