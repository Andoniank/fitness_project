
export const filterMsucleNames = (muscle) => {
    if(muscle === "abs") {
        return "abdominals"
    } else if (muscle === "back_lower") {
        return "lower_back"
    } else if (muscle === "back_upper") {
        return "middle_back"
    } else if (muscle === "calfs") {
        return "calves"
    } else if (muscle === "gluteus") {
        return "glutes"
    } else if (muscle === "hamstring") {
        return "hamstrings"
    } else if (muscle === "latissimus") {
        return "lats"
    } else {
        return muscle
    }
}

export const filterForMuscleDisplay = (muscle) => {
    if (muscle === "abs") {
        return "Abdominals"
    } else if(muscle === "back_lower") {
        return "Lower Back"
    } else if(muscle === "back_upper") {
        return "Upper Back"
    } else {
        return muscle[0].toUpperCase() + muscle.slice(1)
    }
}

export const filterType = (type) => {
    if (type === "olympic_weightlifting") {
        return "Olympic Weightlifting"
    } else {
        return type[0].toUpperCase() + type.slice(1)
    }
}

export const filterEquipment = (equipment) => {
    //body_only, foam_roll, e-z_curl_bar, 
    if (equipment === "body_only") {
        return "None"
    } else if(equipment === "foam_roll") {
        return "Foam Roll"
    } else if( equipment === "e-z_curl_bar") {
        return "EZ Curl Bar"
    } else {
        return equipment[0].toUpperCase() + equipment.slice(1)
    }
}