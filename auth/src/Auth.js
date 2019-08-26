import React, { useState } from "react";


function Auth() {
  

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isFormLogin, setIsFormLogin] = useState(true);
  const [error, setError] = useState("");

  const handleChange = e => {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  };
  const doLogin = async e => {
    e.preventDefault();
    console.log(username, password);
    const res = await fetch(`/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    if (res.status === 200) {
      const json = await res.json();
      // setUser(json.userId);
      console.log('login user id =', json.userId )
      window.location.replace("/");
      // Router.push("/");
      return
    }
    if(res.status === 400) return setError("Bad request");
    if(res.status === 401) {
      setError("uername or password invalid");
    }else{
      setError('Internal server error')
      // console.log("res.status=", res.status);
    }
  };
  const doRegister = async e => {
    e.preventDefault();
    // console.log(username, password);
    const res = await fetch(`/register`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const json = await res.json();
     console.log("res.status=", res.status);
    // console.log("json =", json);
    if (res.status === 201) {
      // setUser(json.userId);
      console.log('new user registred')
      window.location.replace("/");
      // Router.push("/");
    }
    if(res.status === 400) {
      setError(json.error);
    }
    if(res.status === 500) {
      setError(json.error);
    }
  };

  return (
    <div className="container">
      <div className="social-login">
        <button>{isFormLogin ? "Login" : "Register"} with google</button>
        <button>{isFormLogin ? "Login" : "Register"} with github</button>
      </div>
      <div className="local-login">
        <form onSubmit={isFormLogin ? doLogin : doRegister}>
          {error && <div>{error}</div>}
          <input
            name="username"
            type="text"
            placeholder="username"
            value={username}
            onChange={handleChange}
          />
          <input
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={handleChange}
          />
          <input type="submit" value={isFormLogin ? "Login" : "Register"} />
          {isFormLogin && (
            <p>
              Don't have an account yet? Please{" "}
              <span
                onClick={() => {
                  setIsFormLogin(!isFormLogin);
                }}
              >
                Register
              </span>
            </p>
          )}
          {!isFormLogin && (
            <p>
              Do you have an account? Please{" "}
              <span
                onClick={() => {
                  setIsFormLogin(!isFormLogin);
                }}
              >
                Login
              </span>
            </p>
          )}
        </form>
      </div>

     
    </div>
  );
}
export default Auth;
