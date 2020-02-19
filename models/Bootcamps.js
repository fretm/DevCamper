
const mongoose = require('mongoose')
const slugify = require('slugify')

const geocoder = require('../util/geocoder')
const BootcampSchema = new mongoose.Schema({

    name :{
        type:String ,
        required :[true ,'pleas add a name'],
        ubique:true ,
        trim : true ,
        maxlength:[50,'name can not be morethan 50 characters']
    },
    slug:String,
    description :{
        type :String ,
        required:[true,'pleas add description'],
        maxlength:[500,'describtion cannot be more than 500 characters ']
    },
    website: {
        type: String,
        match: [
          /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/,
          'Please use a valid URL with HTTP or HTTPS'
        ]
      },

      phone: {
        type: String,
        maxlength: [20, 'Phone number can not be longer than 20 characters']
      },
      email: {
        type: String,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          'Please add a valid email'
        ]
      },
      address: {
        type: String,
        required: [true, 'Please add an address']
      },
      location: {
        // GeoJSON Point
        type: {
          type: String,
          enum: ['Point']//points only the available string (value )
        },
        coordinates: {
          type: [Number],
          index: '2dsphere'
        },
        formattedAddress: String,
        street: String,
        city: String,
        state: String,
        zipcode: String,
        country: String
      },
      careers: {
        // Array of strings
        type: [String],
        required: true,
        enum: [
            //this are the only avilable values it can have 
          'Web Development',
          'Mobile Development',
          'UI/UX',
          'Data Science',
          'Business',
          'Other'
        ]
      },
      averageRating: {
        type: Number,
        min: [1, 'Rating must be at least 1'],
        max: [10, 'Rating must can not be more than 10']
      },
      averageCost: Number,
      photo: {
        type: String,
        default: 'no-photo.jpg'
      },
      housing: {
        type: Boolean,
        default: false
      },
      jobAssistance: {
        type: Boolean,
        default: false
      },
      jobGuarantee: {
        type: Boolean,
        default: false
      },
      acceptGi: {
        type: Boolean,
        default: false
      },
      createdAt: {
        type: Date,
        default: Date.now
      }
    });


    BootcampSchema.pre('save', function(next){
this.slug = slugify(this.name ,{lower:true})
next()

    })
     


    //geo code creat location filed 

BootcampSchema.pre('save', async function(next){
  const loc =  await geocoder.geocode(this.address);
  this.location ={
    type:'point',
    coordinates:[loc[0].longitude,loc[0].latitude] ,
    formattedAddress:loc[0].formattedAddress,
    street:loc[0].streetName,
    city:loc[0].city,
    state:loc[0].stateCode,
    zipcode:loc[0].zipcode,
    country: loc[0].countryCode
  }
  
  // do not save addres in db
  this.address = undefined;

  next();
})


    module.exports = mongoose.model('Bootcamp', BootcampSchema);
