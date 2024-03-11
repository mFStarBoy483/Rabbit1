import mongoose from "mongoose";

const productSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true,'Please enter product name'],
        maxLength: [200,"Product name cannot exceed 200 characters"] ,
    },
    price: {
        type: Number,
        required: [true,'Please enter product price'],
        maxLength: [5,"Product price cannot exceed 5 characters"] ,
    },
    description: {
        type: String,
        required: [true,'Please enter product  description'],
    },
    ratings: {
        type: Number,
        default: 0,
    },
    images:[ 
        {
        public_id:{
            type: String,
            required: true,
        },
        url:{
            type: String,
            required: true,
        },
        },
    ],
    category: {
         type: String,
        required: [true,"Please enter product category"],
        enum: {
        values: [
            "Fruits",
            "Vegetables",
            "Dairy products",
            "Home",
           ],
        message: "Please select correct category",
        },
    },
    seller: {
        type: String,
        required: [true,'Please enter product seller'],
        },
    stock: {
        type: Number,
        required: [true,'Please enter product stock'],
    },
    numofReviews: {
        type: Number,
        default:0,
    },
    reviews:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref:"User",
                required: true,
            },
            rating:{
                type: Number,
                required: true,
            },
            comment:{
                type: String,
                required: true,
            },
        },
    ],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: false,
    },
},
{ timestamps: true }
);


export default mongoose.model("product", productSchema );