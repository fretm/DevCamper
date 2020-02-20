const ErrorResponse = require('../util/err_respons')
const asyncHandler = require ('../middleware/async')
const geocoder = require('../util/geocoder')
const Bootcamp = require('../models/Bootcamps')
//@desc get all the bootcamps 
//@route get req=uest/api/v1/bootcamps
//@acess pu
exports.getbootcamps=  asyncHandler (async (req,res,next)=>
{
   
       console.log(req.query)
       const bootcamps = await Bootcamp.find(req.query); 
       res.status(200).json({sucess:true,count : bootcamps.length,  data:bootcamps})
    })


//@desc get all the bootcamps
//@route get request/api/v1/bootcamps:id
//@acess public
exports.getbootcamp=  asyncHandler (async (req,res, next)=>
{
    
        const bootcamp = await Bootcamp.findById(req.params.id);

        if(!bootcamp){
         return next(new ErrorResponse(`bootcamp id of ${req.params.id}`,404))
        }

        res.status(200).json({sucess:true , data: bootcamp})

    })


//creat bootcamp methd
//@desc post request
//@routes post/api/v1/bootcamps:id
//private 
exports.createBootcamp= asyncHandler( async (req,res,next)=>
{
    
        const bootcamp= await Bootcamp.create(req.body);
  res.status(201).json({
      sucess: true ,
      data:bootcamp,
  });
  
});
// update 
exports.updatebootcamp=asyncHandler( async (req,res,next)=>
{
       
    const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id,req.body,{
        new :true,
        runValidators:true 
    })

    if(!bootcamp){
        return next(new ErrorResponse(`bootcamp id of ${req.params.id}`,404))
        
    }

   } )
   
  

//delete
exports.deletbootcamp=asyncHandler ( async (req,res,next)=>
{
        const bootcamp = await Bootcamp.findByIdAndDelete(req.params.id);
      
        res.status(200).json({success:true ,data :{} })

        if(!bootcamp){
            return next(new ErrorResponse(`bootcamp id of ${req.params.id}`,404))
            
        }

    } )
   


//get bootcamp within a radius 
//@routes GET/api/v1/bootcamps/radius/:zipcode/distance
//private 
exports.getbootcampsInradius= asyncHandler( async (req,res,next)=>
{
     
    const {zipcode ,distance}=req.params;

    //get  lat/lang from geocoder 
 const loc= await geocoder.geocode(zipcode);
 const lat = loc[0].latitude;
 const lng= loc[0].longitude
 
 //calculate radius  using radians;
 //divide distance by radius of earth 
 //earth radius = 3,963;

 const radius = distance / 3963;

 const bootcamps =  await Bootcamp.find({
     location:{$geoWithin: { $centerSphere : [[lng ,lat],radius]}}
 })

  res.status(200).json({
      success:true,
      count : bootcamps.length,
      data :bootcamps
  })
  });

