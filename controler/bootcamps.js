const ErrorResponse = require('../util/err_respons')
const Bootcamp = require('../models/Bootcamps')
//@desc get all the bootcamps 
//@route get request/api/v1/bootcamps
//@acess pu
exports.getbootcamps= async (req,res,next)=>
{
    try {
       
       const bootcamps = await Bootcamp.find(); 
       res.status(200).json({sucess:true,count : bootcamps.length,  data:bootcamps})
    } catch (error) {
       next(error)
    }
   
}


//@desc get all the bootcamps
//@route get request/api/v1/bootcamps:id
//@acess public
exports.getbootcamp= async (req,res, next)=>
{
    try {
        const bootcamp = await Bootcamp.findById(req.params.id);

        if(!bootcamp){
         return next(new ErrorResponse(`bootcamp id of ${req.params.id}`,404))
        }

        res.status(200).json({sucess:true , data: bootcamp})

    } catch (err) {
        next(err)
            
    }
};

//creat bootcamp methd
//@desc post request
//@routes post/api/v1/bootcamps:id
//private 
exports.createBootcamp= async (req,res,next)=>
{
    try {
        const bootcamp= await Bootcamp.create(req.body);
  res.status(201).json({
      sucess: true ,
      data:bootcamp,
  });
    } catch (error) {
     next(error)  
    }
  
};
// update 
exports.updatebootcamp= async (req,res,next)=>
{
   try {
       
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
        new :true,
        runValidators:true 
    })

    if(!bootcamp){
        return next(new ErrorResponse(`bootcamp id of ${req.params.id}`,404))
        
    }

   } catch (error) {
     next(err)  
   }
   
  
}
//delete
exports.deletbootcamp= async (req,res,next)=>
{
    try {
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
      
        res.status(200).json({success:true ,data :{} })

        if(!bootcamp){
            return next(new ErrorResponse(`bootcamp id of ${req.params.id}`,404))
            
        }

    } 
    catch (error) {
        next(err)
    }

}



