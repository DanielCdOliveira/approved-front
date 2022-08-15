import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../../Context/Auth";
import dayjs from "dayjs";
import Modal from "react-modal";

import StudiesList from "../StudiesList";
import StudyModal from "../Modal/StudyModal";
Modal.setAppElement(".root");

export default function Today({ folders }) {
  const { URL } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const [planners, setPlanners] = useState([]);
  const [create, setCreate] = useState(false);
  const [modalOption, setModalOption] = useState("");
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const week = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  const [modalIsOpen, setIsOpen] = useState(false);

  function openStudyModal(value) {
    setIsOpen(true);
    setModalOption(value)
  }
  function closeStudyModal() {
    setIsOpen(false);
  }
  const today = dayjs().format("DD/MM/YYYY");
  const dayOfWeek = dayjs().day();
  const weekDayName = week[dayOfWeek];
  useEffect(() => {
    axios
      .get(URL + `/planner`, config)
      .then((e) => {
        setPlanners(e.data);
      })
      .catch((e) => {
        console.log(e);
      });
    setCreate(!create);
  }, []);
  return (
    <FolderSection>
      <TitleContainer>
        <h1>{weekDayName}</h1>
        <h2>{today}</h2>
      </TitleContainer>
      <TodayList>
        <StudiesList planners={planners} dayOfWeek={dayOfWeek} />
        <ReviewsList></ReviewsList>
      </TodayList>
      <Buttons>
        <Button onClick={() => openStudyModal("study")}>
          <h3>Adicionar estudo</h3>
        </Button>
        <Button onClick={() => openStudyModal("review")}>
          <h3>Agendar revisão</h3>
        </Button>
      </Buttons>
      <StudyModal
        modalIsOpen={modalIsOpen}
        closeStudyModal={closeStudyModal}
        openStudyModal={openStudyModal}
        folders={folders}
        modalOption={modalOption}
      />
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
  @media (max-width: 800px) {
    width: 100%;
    margin-bottom: 25px;
}
`;
const TitleContainer = styled.div`
  width: 90%;
  height: fit-content;
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
  @media (max-width: 600px) {
    h1{
      font-size: 34px;
      line-height: 40px;
    }
    h2{
      font-size: 22px;
      line-height: 30px;
    }
}
`;
const TodayList = styled.ul`
  margin-top: 15px;
  width: 95%;
  height: 65%;
  overflow-y: auto;
`;

const ReviewsList = styled.ul``;
const Buttons = styled.div`
  width: 100%;
  height: 80px;
  border-radius: 10px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  position: absolute;
  bottom: 40px;
  cursor: pointer;
`;
const Button = styled.div`
  background-color: #333333;
  border: solid 1px #a3a3a3;
  width: 40%;
  height: 80px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    text-align: center;
    font-size: 23px;
  }
  svg {
    font-size: 30px;
  }
`;
