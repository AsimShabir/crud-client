import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
const Home = () => {
  const initialState = {
    id: "",
    name: "",
    email: "",
    contact: "",
  };
  const [data, setData] = useState([]);
  const [state, setState] = useState(initialState);
  const loadData = async () => {
    const respnse = await axios.get("http://localhost:3000/api/get");
    console.log({ respnse });
    setData(respnse.data);
  };
  useEffect(() => {
    let jwt_token = localStorage.getItem("token") || null;
    axios.defaults.headers.common["x-auth-token"] = jwt_token;
    jwt_token && loadData();
  }, []);

  console.log({ data });
  const { id, name, email, contact } = state;
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!state.id) {
      axios
        .post("http://localhost:3000/api/post", {
          name,
          email,
          contact,
        })
        .then(() => {
          setState(initialState);
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .put(`http://localhost:3000/api/update/${state.id}`, {
          id,
          name,
          email,
          contact,
        })
        .then(() => {
          setState(initialState);
        })
        .catch((error) => console.log(error));
    }

    setTimeout(() => {
      loadData();
    }, 50);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  console.log(state);
  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/remove/${id}`);

    setTimeout(() => {
      loadData();
    }, 50);
  };

  const handleEdit = (data) => {
    console.log({ data });
    setState({
      ...state,
      id: data.id,
      name: data.name,
      email: data.email,
      contact: data.contact,
    });

    // axios
    //   .get(`http://localhost:3000/api/get/${id}`)
    //   .then((res) => setState({ ...res.data[0] }));
  };
  //   useEffect(() => {
  //     handleEdit();
  //   }, []);
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "440px" }}
      >
        <input
          type="hidden"
          name="id"
          value={id || ""}
          placeholder="id"
          onChange={handleChange}
        />
        <input
          type="text"
          name="name"
          value={name || ""}
          placeholder="Name"
          onChange={handleChange}
        />
        <input
          type="text"
          name="email"
          value={email || ""}
          placeholder="Email"
          onChange={handleChange}
        />
        <input
          type="text"
          name="contact"
          value={contact || ""}
          placeholder="Contact"
          onChange={handleChange}
        />
        <input type="submit" value={state.id ? "Update" : "Save"} />
      </form>
      <h1>Detail</h1>
      {data.length >= 1 &&
        data?.map((item, index) => (
          <div
            key={index}
            style={{ display: "flex", justifyContent: "space-around" }}
          >
            <h3>{item.id}</h3>
            <h3>{item.name}</h3>
            <h3>{item.email}</h3>
            <h3>{item.contact}</h3>
            <button
              style={{ width: "100px", height: "40px" }}
              onClick={() => handleEdit(item)}
            >
              Edit
            </button>
            <button
              style={{ width: "100px", height: "40px" }}
              onClick={() => handleDelete(item.id)}
            >
              Delete
            </button>
          </div>
        ))}
    </div>
  );
};

export default Home;
