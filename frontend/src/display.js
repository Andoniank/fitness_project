let muscleDisplay = document.getElementById("workout-display")
const muscleGroupsButtons = document.getElementsByClassName("muscle-group-buttons")

export const openDisplay = () => {
    muscleDisplay.classList.add("open-display")
}

export const closeDisplay = () => {
    muscleDisplay.classList.remove("open-display")
}

export const removePressed = () => {
    console.log("hello")
    Array.from(muscleGroupsButtons).forEach((button) => {
        button.classList.remove("pressed")
    })
    console.log(Array.from(muscleGroupsButtons).map(ele => ele.classList))
}