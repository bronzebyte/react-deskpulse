import Cookies from "js-cookie";

const ProtectedComponent = ({ children, fallback }) => {

  const token = Cookies.get("token");
  return token ? children : fallback;
};

export default ProtectedComponent;
