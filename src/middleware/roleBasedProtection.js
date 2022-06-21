export const checkEmployer = async (req, res, next) => {
  if (req.user.userRole !== "employer") {
    return res.status(403).json({
      error: "Unauthorized access",
    });
  }
  next();
};

export const checkEmployee = async (req, res, next) => {
  if (req.user.userRole !== "employee") {
    return res.status(403).json({
      error: "Unauthorized access",
    });
  }
  next();
};

export const checkAdimin = async (req, res, next) => {
  if (req.user.userRole !== "admin") {
    return res.status(403).json({
      error: "Unauthorized access",
    });
  }
  next();
};
