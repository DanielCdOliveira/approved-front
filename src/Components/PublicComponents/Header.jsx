import styled from "styled-components";
import { IoIosArrowDown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FiSearch } from "react-icons/fi";
import { BiLogIn } from "react-icons/bi";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/Auth";
import axios from "axios"

import logo from "../../Assets/logo.jpg"

export default function Header() {
  const { URL } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [showLogout, setShowLogout] = useState(false);
  const navigate = useNavigate();

  function logout() {
    localStorage.removeItem("user");
    navigate("/");
  }
  function goToTimeline(){
    navigate("/Home");
  }

  function goToProfile(){
    navigate(`/user/${user.userId}`)
    window.location.reload()
  }


  return (
    <MainHeader
      showLogout={showLogout}
    >
      <img onClick={() => goToTimeline()} src={logo}/>
      
      <nav className="profile" onClick={() => setShowLogout(!showLogout)}>
        <h2>Olá, {user.name}</h2>
        <IoIosArrowDown />
        
      </nav>

      <div className="logout">
        <div onClick={goToProfile}>
          <CgProfile/>
          <p>Profile</p>
        </div>
        <div onClick={logout}>
          <BiLogIn/>
          <p>Logout</p>
        </div>
      </div>

    </MainHeader>
  );
}

const MainHeader = styled.header`
  background-color: #151515;
  width: 100vw;
  height: 72px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 5;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 17px 0 28px;
  box-sizing: border-box;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  img{
    height: 100%;
  }
  h2{
    color: #ffffff;
    font-size: 28px;
    padding-right: 10px;
  }
  .profile {
    display: flex;
    align-items: center;
    cursor: pointer;
    svg {
    font-size: 40px;
    color: #ffffff;
    margin-right: 15px;
    transition: all 0.5s;
    ${(props) => (props.showLogout ? "transform: rotateX(-180deg);" : "")}
  }
  svg {
    font-size: 40px;
    color: #ffffff;
    margin-right: 15px;
    transition: all 0.5s;
  }
}
  .logout {
    display: flex;
    flex-direction: column;
    width: 147px;
    background-color: #171717;
    border-radius: 0 0 0 20px;
    position: absolute;
    right: 0;
    top: 72px;
    z-index: 3;
    overflow-y: hidden;
    ${(props) => (props.showLogout ? "height:75px;" : "height:0;")}
    transition: all 0.5s;
    display: flex;
    align-items: center;
    cursor: pointer;

    box-shadow: inset -10px 4px 4px rgba(0, 0, 0, 0.25), 0px 4px 4px rgba(0, 0, 0, 0.25) ;
    p {
      font-family: "Lato", sans-serif;
      font-weight: 700;
      font-size: 17px;
      color: #ffffff;
      padding-top: 10px;
      padding-bottom: 7px;
    }
  } 
  div {
    display: flex;
    align-items: center;
  }
  svg {
    color: white;
    margin-right: 14px;
    font-size: 22px;
  }
`