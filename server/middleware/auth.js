import jwt from 'jsonwebtoken';
import User from '../models/User.js';
export async function protect(req,res,next){
  try{
    const header=req.headers.authorization||'';
    const token=header.startsWith('Bearer ')?header.slice(7):null;
    if(!token) return res.status(401).json({success:false,message:'Authentication required'});
    const decoded=jwt.verify(token,process.env.JWT_SECRET);
    req.user=await User.findById(decoded.id).select('-password');
    if(!req.user) return res.status(401).json({success:false,message:'User no longer exists'});
    next();
  }catch(e){return res.status(401).json({success:false,message:'Invalid or expired token'});}
}
export const allowRoles=(...roles)=>(req,res,next)=>roles.includes(req.user.role)?next():res.status(403).json({success:false,message:'Access denied for this role'});
