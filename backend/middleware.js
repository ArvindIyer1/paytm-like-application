const {JWT_SECRET} = require("../config");
const jwt = require("jsonwebtoken");

const authMiddleware = (req,res,next) => {
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith('Bearer')){
    res.status(403).json({
      msg:"Invalid tkn"
    })
  }

  const token = authHeader.split(' ')[1];

  try{
    const decoded = jwt.verify(token,JWT_SECRET);
    if(decode.userId){
      req.userId = decoded.userId;
      next();
    }else{
      return res.status(403).json({
        msg:"Invalid"
      })
    }
    
  }catch(err){
    return res.status(403).json({
      msg : "Invalid token"
    });
  }
};

module.exports = {
  authMiddleware
}
