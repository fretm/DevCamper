
const express =require(`express`);

const{
    getbootcamps,
    getbootcamp,
    createBootcamp,
    updatebootcamp,
    deletbootcamp,
} = require ('../controler/bootcamps')
const router = express.Router()

router.route('/')
.get(getbootcamps)
.post(createBootcamp);

router.route('/:id').get(getbootcamp)
.put(updatebootcamp)
.delete(deletbootcamp) 


module.exports=router