const createError = require("http-errors");

// 404 error handler
exports.notFound = (req, res, next) => {
  next(createError(404));
};

// Error handler
exports.errorHandler = (err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err });
};
