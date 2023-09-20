require('buffer/').Buffer;
import * as api from './api.js'
import * as filter from './filter.js'
import * as display from './display.js'

//Query Selectors ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
const muscleDisplay = document.querySelector(".muscle-image")
const muscleGroups = document.querySelector('.muscle-groups')
const workouts = document.querySelector(".workouts")
const workoutDisplay = document.querySelector(".workout-display")


// RENDERS ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// renders the appropriate muscle group buttons based on the API info passed into it from getMuscleGroups
// adds event listeners to those buttons that call both getImage and getWorkouts to display both
export const renderMuscleGroups = (array) => {
    for (let i = 0; i < array.length; i++) {
        let musclesForWorkouts = filter.filterMsucleNames(array[i])
        let musclesForImage = array[i]
        const muscleButton = muscleGroups.appendChild(document.createElement("input"))
        muscleButton.type = 'submit'
        muscleButton.value = filter.filterForMuscleDisplay(musclesForImage)
        muscleButton.className = "muscle-groups-button"
        muscleButton.id = musclesForImage
        muscleButton.addEventListener('click', e => {
            e.preventDefault();
            clearWorkouts()
            clearWorkoutInfo()
            api.getImage(musclesForImage).then((muscleData) => {renderMuscleImg(muscleData)})
            api.getWorkouts(musclesForWorkouts).then((workoutNames) => {renderWorkouts(workoutNames)})
        })
    }
}


// renders the stock image with no muscle group selected
export const renderBaseImg = buffer => {
    const imageUrl = URL.createObjectURL(buffer)
    const newImg = document.querySelector(".muscle-image")
    muscleDisplay.src = imageUrl
}


// renders the muscle image with the appropriate muscles highlighted
export const renderMuscleImg = buffer => {
    const imageUrl = URL.createObjectURL(buffer)
    const newImg = document.querySelector(".muscle-image")
    newImg.src = imageUrl
}


// renders the apporpiate workout buttons based on which muscle groups where selected from getWorkouts
// adds an eventListener to each button that calls getWorkoutInfo, which then displays that workout info based on the muscle and workout name that is sent in
export const renderWorkouts = array => {
    for (let i = 0; i < array.length; i++) {
        let workout = array[i]
        const workoutButton = workouts.appendChild(document.createElement("input"))
        workoutButton.type = "submit"
        workoutButton.className = "workout-buttons"
        workoutButton.value = workout.name
        workoutButton.id = workout.name
        workoutButton.addEventListener('click', e => {
            e.preventDefault()
            display.openDisplay()
            api.getWorkoutInfo(workout.muscle).then((workoutInfo) => {renderWorkoutInfo(workoutInfo, workout.name)})
        })
    }
}


// renders the workout information that called from getWorkoutInfo and displays the name of the workout, the type, the equipment needed, and the workout instructions
export const renderWorkoutInfo = (array, name) => {
    clearWorkoutInfo()
    for (let i = 0; i < array.length; i++) {
        let workout = array[i]
        if(workout.name === name) {
            const title = workoutDisplay.appendChild(document.createElement("h3"))
            const type = workoutDisplay.appendChild(document.createElement("p"))
            const equipment = workoutDisplay.appendChild(document.createElement("p"))
            const description = workoutDisplay.appendChild(document.createElement("p"))
            const closePage = workoutDisplay.appendChild(document.createElement("button"))
            closePage.type = "button"
            closePage.className = "close-page"
            closePage.textContent = "x"
            closePage.addEventListener("click", e => {
                clearWorkoutInfo()
                display.closeDisplay()
            })
            title.textContent =  workout.name
            type.textContent = "type: " + filter.filterType(workout.type)
            equipment.textContent = "equipment needed: " + filter.filterEquipment(workout.equipment)
            description.textContent = "instructions: " + workout.instructions
        }      
    } 
}




//clear buttons ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// called in renderMuscleGroups
// clears the curretly displayed workouts
export const clearWorkouts = () => {
    while (workouts.firstChild) {
        workouts.removeChild(workouts.firstChild);
    }
}

//called in renderMuscleGroups and renderWorkoutInfo
//clears currently displayed workout info 
export const clearWorkoutInfo = () => {
    while(workoutDisplay.firstChild) {
        workoutDisplay.removeChild(workoutDisplay.firstChild)
    }
}


