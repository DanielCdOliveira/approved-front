import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../../Context/Auth";
import {FaPlus} from "react-icons/fa"

export default function Today() {
  const { URL } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  return (
    <FolderSection>
      <TitleContainer>
        <h1>Segunda-Feira</h1>
        <h2>09/08/2022</h2>
      </TitleContainer>
      <TodayList>
        <StudiesList></StudiesList>
        <ReviewsList></ReviewsList>
      </TodayList>
      <Buttons>
        <Button>
          <h3>Adicionar estudo</h3>
          <FaPlus/>
        </Button>
        <Button>
          <h3>Agendar revisão</h3>
          <FaPlus/>
        </Button>
      </Buttons>
    </FolderSection>
  );
}

const FolderSection = styled.section`
  width: 35%;
  height: 85vh;
  background-color: #171717;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 16px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
  border: solid 1px #383d3f;
  color: #fff;
  position: relative;
`;
const TitleContainer = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 40px;
    font-weight: 700;
    line-height: 60px;
    color: #fff;
  }
  h2{
    font-size: 25px;
    font-weight: 200;
    line-height: 45px;
  }
`;
const TodayList = styled.ul`
  margin-top: 15px;
  width: 95%;
  height: fit-content;
`;
const StudiesList = styled.ul`

`;const ReviewsList = styled.ul`

`;
const Buttons = styled.div`
width: 90%;
  height: 80px;
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  bottom: 40px;
`
const Button = styled.div`
  background-color: #333333;
  border: solid 1px #A3A3A3;
  width: 48%;
  height: 80px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  h3{
    font-size: 23px;
    margin-right: 20px;
  }
  svg{
    font-size: 30px;
  }
`