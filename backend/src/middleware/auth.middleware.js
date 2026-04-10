export const protectRoute = (req,res,next) => {
  if(!req.auth().isAuthenticated){
    return res.status(401).json({
      message: "You are not authorized you need to be logged in Bro!"
    })
  }

  next();
}