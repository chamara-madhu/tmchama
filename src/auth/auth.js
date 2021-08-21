exports.auth_token = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("auth_token")) {
      return localStorage.getItem("auth_token");
    } else {
      return false;
    }
  } else {
    return false;
  }
};

exports.userId = () => {
  if (typeof window !== "undefined") {
    if (localStorage.getItem("user_data")) {
      return JSON.parse(localStorage.getItem("user_data")).id;
    } else {
      return false;
    }
  } else {
    return false;
  }
};
