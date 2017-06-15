const parseCookies = (req, res, next) => {
  if (req.headers.cookie) {
    var cookie = {};
    req.headers.cookie.split('; ').forEach((chunk) => {
      var split = chunk.split('=');
      cookie[split[0]] = split[1];
    });
    req.cookies = cookie;
  } else {
    req.cookies = {};
  }
  next();
};

module.exports = parseCookies;