import React from "react";
import { useState } from "react";
import axios from "axios";
const initialState = {
  uname: "",
  upassword: "",
};

const SignUpPage = () => {
  const [state, setState] = useState(initialState);
  const { uname, upassword } = state;
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/api/register", {
        uname,
        upassword,
      })
      .then(() => {
        setState(initialState);
      })
      .catch((error) => console.log(error));
    console.log({ state });
  };
  console.log(state);
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "440px" }}
      >
        <input
          type="text"
          onChange={handleChange}
          name="uname"
          placeholder="Name..."
          value={uname}
        />
        <input
          type="password"
          onChange={handleChange}
          name="upassword"
          placeholder="Password..."
          value={upassword}
        />
        <button>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpPage;
