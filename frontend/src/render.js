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
        muscleButton.dataset.musclesForWorkouts = musclesForWorkouts
        muscleButton.dataset.musclesForImage = musclesForImage
    }
    muslceButtonsEventListener()
}

//
const muslceButtonsEventListener = () => {
    const removePressed = () => {
        const muscleGroupsButtons = document.getElementsByClassName("muscle-groups-button")
        console.log(muscleGroupsButtons)
        // const clickedButton = Array.from(muscleGroupsButtons).filter((button) => {
        //     button.classList.includes("pressed")
        // })
        Array.from(muscleGroupsButtons).forEach((button) => {
            button.classList.remove("pressed")
        })
        console.log(Array.from(muscleGroupsButtons).map(ele => ele.classList))
    }
    // let isPressed = false
    muscleGroups.addEventListener("click", e => {
        e.preventDefault()
        // isPressed = !isPressed
        removePressed()
        e.target.classList.add('pressed')
        // if (isPressed) {
        //     e.target.classList.add('pressed')
            clearWorkouts()
            clearWorkoutInfo()
            api.getImage(e.target.dataset.musclesForImage).then((muscleData) => {renderMuscleImg(muscleData)})
            api.getWorkouts(e.target.dataset.musclesForWorkouts).then((workoutNames) => {renderWorkouts(workoutNames)}) 
        // } else {
        //     e.target.classList.remove('pressed')
        //     clearWorkouts()
        //     clearWorkoutInfo()
        //     api.getBaseImage()
        //         .then((baseImage) => {
        //             renderBaseImg(baseImage)
        //         })
        // }
    })
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
    const title = workouts.appendChild(document.createElement("h2"))
    title.textContent = "Workouts"
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
            const closePage = workoutDisplay.appendChild(document.createElement("button"))
            const title = workoutDisplay.appendChild(document.createElement("h2"))
            const typeTitle = workoutDisplay.appendChild(document.createElement("h3"))
            const type = workoutDisplay.appendChild(document.createElement("p"))
            const equipmentTitle = workoutDisplay.appendChild(document.createElement("h3"))
            const equipment = workoutDisplay.appendChild(document.createElement("p"))
            const descriptionTitle = workoutDisplay.appendChild(document.createElement("h3"))
            const description = workoutDisplay.appendChild(document.createElement("p"))
            const videoTitle = workoutDisplay.appendChild(document.createElement("h3"))
            const link = workoutDisplay.appendChild(document.createElement("a"))
            typeTitle.textContent = "Type"
            equipmentTitle.textContent = "Equipment Needed"
            descriptionTitle.textContent = "Description"
            videoTitle.textContent = "Video Search"
            link.target = "blank"
            link.href = "https://www.youtube.com/results?search_query=" + workout.name
            link.textContent = workout.name
            closePage.type = "button"
            closePage.className = "close-page"
            closePage.textContent = "x"
            closePage.addEventListener("click", e => {
                clearWorkoutInfo()
                display.closeDisplay()
            })
            title.textContent =  workout.name
            type.textContent = filter.filterType(workout.type)
            equipment.textContent = filter.filterEquipment(workout.equipment)
            description.textContent = workout.instructions
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


