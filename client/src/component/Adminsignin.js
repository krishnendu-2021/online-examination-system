import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css"

const Signin = () => {

  const navigate = useNavigate("");
  const [credentials, setcredentials] = useState({
    email: "",
    password: "",
  });
  console.log(credentials);

  const onchange = (e) => {
    setcredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const submitForm = async (e) => {
    e.preventDefault();
    const { email, password } = credentials;
    if (!email || !password) {
      alert("enter required fields");
    }
    
      let response = await fetch("/admin/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...credentials }),
      });

      let result = await response.json();
      if (response.status === 400) {
        console.log("error");
        alert("enter valid credentials")
      } else {
        console.log(result);
        sessionStorage.setItem("admin", email)
        alert("signin successfull");
        setcredentials({ email: "", password: "" });
        navigate("/admin/home");
      }    
  };

  return (
    <div className="container formContainer" style={{ minHeight: "84vh" }}>
      <div
        className="container my-3 "
        style={{  border: "2px solid black", padding: "25px" }}
      >
        <div
          className="text-center"
          style={{ fontWeight: "bold", fontSize: "20px" }}
        >
          Signin
        </div>
        <form
          className="needs-validation"
          style={{  margin: "auto auto" }}
        >
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="email"
              name="email"
              value={credentials.email}
              onChange={onchange}
              placeholder="admin@root.com"
              required
            />
            <div className="invalid-feedback">Please provide a valid city.</div>
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="admin"
              value={credentials.password}
              onChange={onchange}
              required
            />
          </div>

          <div className="mb-3 text-center">
            <button className="btn btn-dark" type="submit" onClick={submitForm}>
              Submit form
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
