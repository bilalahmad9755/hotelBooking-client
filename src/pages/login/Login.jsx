import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
import "./login.css";

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: undefined,
    password: undefined,
  });
  const location = useLocation();
  const action = location?.state?.action;
  console.log("action: ", action);

  const { loading, error, dispatch } = useContext(AuthContext);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      let res;
      const config = {
        headers: {
          "Content-Type": "application/json",
          username: credentials.username,
          password: credentials.password,
        },
        withCredentials: true, // This enables sending and receiving cookies.
      };
      console.log("credentials: ", config.headers);
      if (action === "register") {
        console.log("executing register request...");
        res = await axios.post(
          "http://127.0.0.1:3000/auth/register",
          {},
          config
        );
      } else if (action === "login") {
        console.log("executing login request...");
        res = await axios.post("http://127.0.0.1:3000/auth/login", {}, config);
      }
      console.log("response: ", res?.data?.payload);
      dispatch({ type: "LOGIN_SUCCESS", payload: res?.data?.payload });
      navigate("/");
    } catch (err) {
      console.log("error: ", error);
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };

  return (
    <div className="login">
      <div className="lContainer">
        <input
          type="text"
          placeholder="username"
          id="username"
          onChange={handleChange}
          className="lInput"
        />
        <input
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="lInput"
        />
        <button disabled={loading} onClick={handleClick} className="lButton">
          Login
        </button>
        {error && <span>{error.message}</span>}
      </div>
    </div>
  );
};

export default Login;
