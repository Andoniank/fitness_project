//homepage
import * as api from './api.js'
import * as render from './render.js'


//muscle groups
const muscles = ["abs", "abductors", "adductors", "biceps", "calfs", "chest", "forearms", "gluteus", "hamstring", "latissimus", "back_lower", "neck", "quadriceps", "triceps", "back_upper"]

//renders muscles groups and the base image on the website load
render.renderMuscleGroups(muscles)
api.getBaseImage()
    .then((baseImage) => {
        render.renderBaseImg(baseImage)
    })

