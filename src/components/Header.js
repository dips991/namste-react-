import { LOGO_URL } from "../utils/constants";
import { useState , useContext } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";

const Header = () => {
  const [btnNameReact , setBtnNameReact] = useState("Login");

  const onlineStatus = useOnlineStatus();

  const data = useContext(UserContext);

    return (
        <div className="flex justify-between bg-pink-200 shadow-lg sm:bg-yellow-100 lg:bg-gray-200">
            <div className="logo-container">
                <img 
                className="w-56" 
                src={LOGO_URL}
                />
            </div>
          <div className="flex items-center">
          <ul className="flex p-4 m-4">
            <li className="px-4">
              Online Status : {onlineStatus ? "✅" : "🔴"}
            </li>
          <li className="px-4">
              <Link to="/">Home</Link>
              </li>
              <li className="px-4">
              <Link to="/About">About Us</Link>
              </li>
            <li className="px-4">
              <Link to="/Contact">Contact Us</Link>
              </li>
              <li className="px-4">
              <Link to="/grocery">Grocery</Link>
              </li>
            <li className="px-4">Cart</li>
            <button
            className="login" 
            onClick={ ()=> {
             btnNameReact==="Login"
             ? setBtnNameReact("Logout") 
             : setBtnNameReact("Login");
              }}
              >
              {btnNameReact}
              </button>
          </ul>
          </div>
        </div>
    );
};
export default Header;