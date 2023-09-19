import * as api from './api.js'
import * as render from './render.js'


//homepage

//both are calle from api.js
api.getMuscleGroups()
api.getBaseImage()
    .then((baseImage) => {
        const blob = new Blob([baseImage], {type:'image/png'})
        console.log(blob)
        render.renderBaseImg(blob)
    })

