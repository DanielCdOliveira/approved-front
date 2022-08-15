import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../../Context/Auth";
import { FaPlus } from "react-icons/fa";
import { useParams } from "react-router-dom";

import CreatePlanner from "./CreatePlanner.jsx";

export default function Planner() {
  const { URL } = useContext(AuthContext);
  const [folder, setFolder] = useState({ subjects: [] });
  const [planner, setPlanner] = useState([]);
  const [create, setCreate] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [refresh, setRefresh] = useState(false)
  const folderId = useParams().id;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  useEffect(() => {
    axios
      .get(URL + `/folder/${folderId}`, config)
      .then((e) => {
        setFolder(e.data);
      })
      .catch((e) => {
        console.log(e);
      });
      axios
      .get(URL + `/planner/${folderId}`, config)
      .then((e) => {
        setPlanner(e.data);
      })
      .catch((e) => {
        console.log(e);
      });
      setCreate(!create);
  }, [refresh]);
  if (folder.subjects.length>0) {
    return (
      <FolderSection>
        <TitleContainer>
          <h1>Planner</h1>
        </TitleContainer>
        <PlannerList>
        <CreatePlanner config={config} folderId={folderId} folder={folder} planner={planner} setRefresh={setRefresh} refresh={refresh}/>
        </PlannerList>
      </FolderSection>
    );
  } else {
    return(
      <FolderSection>
        <TitleContainer>
          <h1>Planner</h1>
        </TitleContainer>
        <PlannerList>
        <h3>Não há revisões agendadas!</h3>
        </PlannerList>
      </FolderSection>
    )
  }
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
  h2 {
    font-size: 25px;
    font-weight: 200;
    line-height: 45px;
  }
`;
const PlannerList = styled.ul`
  margin-top: 30px;
  width: 95%;
  height: fit-content;
  max-height: 80%;
  overflow-y: auto;
  h3 {
    margin-top: 20px;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    color: #555555;
  }
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
`;
const Button = styled.div`
  background-color: #333333;
  border: solid 1px #a3a3a3;
  width: 48%;
  height: 80px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: 22px;
    width: 60%;
    margin-right: 20px;
    text-align: center;
  }
  svg {
    font-size: 30px;
  }
`;
