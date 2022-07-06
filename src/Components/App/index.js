import { BrowserRouter, Routes, Route } from "react-router-dom";

import GlobalStyle from "../../Utilities/GlobalStyle.jsx"
import AuthProvider from "../../Context/Auth.jsx";
import Login from "../Login/index.jsx";
import Signup from "../Signup/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GlobalStyle />
        <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/sign-up" element={<Signup />}></Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;