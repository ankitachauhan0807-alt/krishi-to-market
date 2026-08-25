import mongoose from 'mongoose';
const schema=new mongoose.Schema({consumer:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},product:{type:mongoose.Schema.Types.ObjectId,ref:'Product',required:true},farmer:{type:mongoose.Schema.Types.ObjectId,ref:'FarmerProfile',required:true},rating:{type:Number,min:1,max:5,required:true},comment:{type:String,trim:true,maxlength:1000},createdAt:{type:Date,default:Date.now}},{timestamps:true});
schema.index({consumer:1,product:1},{unique:true});
export default mongoose.model('Review',schema);
