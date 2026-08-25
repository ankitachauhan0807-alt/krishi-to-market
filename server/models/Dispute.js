import mongoose from 'mongoose';
const schema=new mongoose.Schema({order:{type:mongoose.Schema.Types.ObjectId,ref:'Order',required:true},consumer:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},reason:String,description:String,status:{type:String,enum:['open','investigating','resolved','rejected'],default:'open'},adminResponse:String},{timestamps:true});
export default mongoose.model('Dispute',schema);
