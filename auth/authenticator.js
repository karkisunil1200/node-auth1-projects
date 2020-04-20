module.exports = (req, res, next) => {
  console.log(req.session.loggedIn);

  if (req.session.loggedIn) {
    next();
  } else {
    res.status(401).json({message: 'you are not able to pass'});
  }
};
