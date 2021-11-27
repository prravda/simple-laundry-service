const exceptions = (err, req, res, next) => {
  // TODO 공통 Exception 코드를 작성 해주세요

  const status = err.status || 500;
  const message = err.message;

  res.status(status).send({
    status,
    message,
  });

  next();
};
export default exceptions;
