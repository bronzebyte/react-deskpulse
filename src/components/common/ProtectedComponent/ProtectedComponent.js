import Cookies from "js-cookie";

const ProtectedComponent = ({ children, fallback }) => {

  const token = Cookies.get("token");
  console.log(token, "token+++")
  return token ? children : fallback;
};

export default ProtectedComponent;
