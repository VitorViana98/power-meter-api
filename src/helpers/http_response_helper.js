// SUCCESS

const ok = (res, content) =>
  res.status(200).json({
    code: 'OK',
    content,
  });

// CLIENT ERROR

const badRequest = (res, description) =>
  res.status(400).json({
    code: 'BAD_REQUEST_ERROR',
    description,
  });


const unauthorized = res =>
  res.status(401).json({
    code: 'UNAUTHORIZED',
    message: 'Not allowed to perform this action.',
  });


const notFound = (res, description) =>
  res.status(404).json({
    code: 'NOT_FOUND_ERROR',
    description,
  });


const conflict = (res, message) =>
  res.status(409).json({
    code: 'CONFLICT',
    message,
  });


const requiredField = (res, message) =>
  res.status(422).json({
    code: 'REQUIRED_FIELD_MISSING',
    message
  });


// SERVER ERROR
const serverError = (res, message = 'Something wrong happened.', query) => {
  res.status(500).json({
    code: 'SERVER_ERROR',
    message,
    ...(query || undefined),
  });
};

module.exports = {
  badRequest,
  conflict,
  notFound,
  ok,
  requiredField,
  serverError,
  unauthorized,
};
