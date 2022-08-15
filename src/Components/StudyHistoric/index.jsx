import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../../Context/Auth";
import HistoricList from "./HistoricList";
import { useParams } from "react-router-dom";
export default function Historic() {
  const { URL } = useContext(AuthContext);
  const [historic, setHistoric] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const folderId = parseInt(useParams().id)
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  useEffect(() => {
    axios
      .get(URL + `/study/${folderId}`, config)
      .then((e) => {
        console.log(e.data);
        setHistoric(e.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  console.log(historic);
  return (
    <HistoricSection>
      <TitleContainer>
        <h1>Histórico:</h1>
      </TitleContainer>
      <HistoricList historic={historic} URL={URL} config={config}/>
    </HistoricSection>
  );
}

const HistoricSection = styled.section`
  width: 30%;
  height: 80vh;
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
  h1 {
    font-size: 30px;
    font-weight: 700;
    line-height: 50px;
    color: #fff;
  }
`;