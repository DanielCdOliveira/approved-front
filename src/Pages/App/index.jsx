import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "../../Utils/GlobalStyle.jsx"
import AuthProvider from "../../Context/Auth.jsx";
import Login from "../Login/index.jsx";
import Signup from "../Signup/index.jsx";
import Home from "../Home/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyle />
        <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/home" element={<Home />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;