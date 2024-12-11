export default (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (token === process.env.OCPI_TOKEN) {
    next();
  } else {
    res.status(401).json({ status_code: 2001, message: "Unauthorized" });
  }
};
