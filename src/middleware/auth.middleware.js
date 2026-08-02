const { model } = require("mongoose");
const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const tokenBlackListModel=require("../models/Blacklist.model.js")

async function authMiddleware(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "unauthosrized access ,token is missing",
    });
  }

  const isblacklist=await tokenBlackListModel.findOne({token})

  if(isblacklist){
    return res.status(401).json({
      message:"Unauthorized access, token is invalid"
    })
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId);

    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({
      message: "unauthosrized access ,token is missing",
    });
  }
}

async function authSystemMiddleware(req, res, next) {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      message: "unauthosrized access ,token is missing",
    });
  }


 const isblacklist=await tokenBlackListModel.findOne({token})

  if(isblacklist){
    return res.status(401).json({
      message:"Unauthorized access, token is invalid"
    })
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.userId).select("+systemUser");
    if (!user.systemUser) {
      return res.status(403).json({
        message: "forbidden access, not a system user",
      });
    }
    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({
      message: "unauthosrized access ,token is missing",
    });
  }
}

module.exports = {
  authMiddleware,
  authSystemMiddleware
};
