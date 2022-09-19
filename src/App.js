import logo from "./logo.svg";
import "./App.css";
import Home from "./pages/Home/Home";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";

function App() {
  return (
    <div className="App">
      <Home />
      <SignUpPage />
      <br></br>
      <br></br>
      <br></br>
      <LoginPage />
    </div>
  );
}

export default App;
