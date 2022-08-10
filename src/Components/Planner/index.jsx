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
  const [create, setCreate] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const folderId = useParams().id;
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  console.log(folder)
  useEffect(() => {
    axios
      .get(URL + `/folder/${folderId}`, config)
      .then((e) => {
        setFolder(e.data);
        setCreate(!create);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  if (create) {
    return (
      <FolderSection>
        <TitleContainer>
          <h1>Planner </h1>
          <h2>09/08/2022</h2>
        </TitleContainer>
        <PlannerList>
        <CreatePlanner create={create} folderId={folderId} folder={folder}/>



          {/* {week.map((day) => {
            return (
              <li>
                <h1>{day}</h1>
                <select name="" id="">
                  <CreatePlanner destruct={destruct} folderId={folderId} />
                </select>
                <button>Adicionar Tópico</button>
              </li>
            );
          })} */}
        </PlannerList>
        <Buttons>
          <Button>
            <h3>Adicionar estudo</h3>
            <FaPlus />
          </Button>
          <Button>
            <h3>Agendar revisão</h3>
            <FaPlus />
          </Button>
        </Buttons>
      </FolderSection>
    );
  } else {
    return <></>;
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
  margin-top: 60px;
  width: 95%;
  height: fit-content;
  background-color: blue;
  li {
    font-size: 22px;
    font-weight: 700;
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
    font-size: 23px;
    margin-right: 20px;
  }
  svg {
    font-size: 30px;
  }
`;
