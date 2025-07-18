import { User,Student} from "../models/teacher.js";
import { Class,Media } from "../models/database.js";
import { StatusCodes } from "http-status-codes";
export const getCurrentUser = async (req, res) => {  
  if(req.user.role==='legend')
  {
    const user = await User.findOne({ _id: req.user.userId });
    const userWithoutPassword = user.toJSON();
    const uploadedCount = await User.countDocuments({});
    const verifiedmediacount=await Media.countDocuments({})
    res.status(StatusCodes.OK)
    .json({ user:userWithoutPassword,uploadedCount, verifiedmediacount });

  }
  else
  {  
  const user = await User.findOne({ _id: req.user.userId });
  const userWithoutPassword = user.toJSON();
  const verifiedMediaCount = await Media.countDocuments({
    teacher: req.user.userId,
    verified: true,
  });
  const uploadedCount = await Media.countDocuments({
    teacher: req.user.userId,
  });
  res
    .status(StatusCodes.OK)
    .json({ user: userWithoutPassword, uploadedCount,verifiedMediaCount });
}
};

export const updateUser = async (req, res) => {
    const obj={...req.body};
    delete obj.password;
  const updateduser = await User.findByIdAndUpdate(req.user.userId, obj);
  console.log(updateduser);
  res.status(StatusCodes.OK).json({ msg: 'user updated' });
};

export const getApplicationStats = async (req, res) => {
  const classCount= await Class.countDocuments();
  
  res.status(StatusCodes.OK).json({ classCount });
};