// Fetches

import * as render from './render.js'


// pulls an array of muscle groups and sents the result to renderMuscleGroups in render.js
// gets called on index.js
export const getMuscleGroups = async () => {
    // const url = process.env.NODE_ENV === 'production' ? '/muscleGroups' : 'http://localhost:5001/muscleGroups';
    const url = "https://fitness-project.onrender.com/muscleGroups"
    try {
        const response = await fetch(url, {
            method: 'GET'
        });
        let muscleGroups
        if(response.ok) {
            muscleGroups = await response.json()
            return muscleGroups
        } else {
            throw response
        }
    } catch (error) {
        console.error(error);
    }
}

// pulls the stock image of the body model with no muscles highlighted and sends it to renderBaseImage in render.js
// gets called on index.js
export const getBaseImage = async () => {
    // const url = process.env.NODE_ENV === 'production' ? '/baseImage' : 'http://localhost:5001/baseImage';
    const url = "https://fitness-project.onrender.com/baseImage"
    try {
        const response = await fetch(url, {
            method: 'GET' 
        });
        let baseImage
        if (response.ok) {
            baseImage = await response.blob();
            return baseImage
        } else {
            throw response
        }
    } catch (error) {
        console.error(error);
    }
}

// gets the apporpritae image with the muscle group that is sent into it highlighted and sends it to renderMuscleImage in render.js
// gets called in the eventListeners in renderMuscleGroup in render.js when the appropriate muscle group is selected
export const getImage = async (muscleGroup) => {
    // const url = process.env.NODE_ENV === 'production' ? '/image' : 'http://localhost:5001/image';
    const url = "https://fitness-project.onrender.com/image"
    try {
        const response = await fetch(url, {
            method: 'GET',
	        headers: {
                muscleGroup: muscleGroup
            }
        });
        let muscleData
        if (response.ok) {
            muscleData = await response.blob();
            return muscleData
        } else {
            throw response
        }
    } catch (error) {
        console.error(error);
    }
}

// gets the array of workout objects based on the muscle name sent in and send its to renderWorkouts in render.js where only the name key value pair is used to create the workout buttons
// gets called in renderMuscleGroups in render.js when the appropriate muscle group is selected
export const getWorkouts = async (muscle) => {
    // const url = process.env.NODE_ENV === 'production' ? '/workoutNames' : 'http://localhost:5001/workoutNames';
    const url = "https://fitness-project.onrender.com/workoutNames"
    try {
        const response = await fetch(url, {
            method: 'GET',
	        headers: {
                muscle: muscle
	        }
        });
        let workouts
        if (response.ok) {
            workouts = await response.json();
            return workouts
        } else {
            throw response
        }
    } catch (error) {
        console.error(error);
    }
}

// gets the array of workout objects which is sent to renderWorkoutInfo in render.js where the appropriate info is selected.
// gets called in renderWorkouts in render.js if the appropiate workout button is pressed.
export const getWorkoutInfo = async (muscle) => {
    // const url = process.env.NODE_ENV === 'production' ? '/workoutInfo' : 'http://localhost:5001/workoutInfo';
    const url = "https://fitness-project.onrender.com/workoutInfo"
    try {
        const response = await fetch(url, {
            method: 'GET',
	        headers: {
                muscle: muscle
	        }
        });
        let workoutInfo
        if (response.ok) {
            workoutInfo = await response.json();
            return workoutInfo
        } else {
            throw response
        }
    } catch (error) {
        console.error(error);
    }
}