import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./Register";
import Profile from "./Profile";
import Login from "./Login";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile/:email" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
