import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/style.css";
import Main from "./pages/main/Main";
import CreatePost from "./pages/createpost/CreatePost";
import NavBar from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/createpost" element={<CreatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
