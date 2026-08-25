import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true},email:{type:String,required:true,unique:true,lowercase:true,trim:true,index:true},password:{type:String,required:true,select:false},phone:{type:String,trim:true},role:{type:String,enum:['consumer','farmer','admin'],default:'consumer',index:true},profile:{avatar:String,address:String,city:String,state:String,pincode:String}}, {timestamps:true});
export default mongoose.model('User',schema);
