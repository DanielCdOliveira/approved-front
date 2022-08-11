import styled from "styled-components";
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/Auth";
import { FaPlus } from "react-icons/fa";

import CreatePlannerInput from "./CreatePlannerInput";
import ShowPlanner from "./ShowPlanner";
export default function CreatePlanner({ config, folderId, folder, planner }) {
  const [option, setOption] = useState("");
  const { URL } = useContext(AuthContext);
  const week = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  function changeInput(value) {
    if (value === "") {
      setOption("");
    } else {
      const optionData = value.split(" ");
      setOption({
        folderId: parseInt(optionData[0]),
        subjectId: parseInt(optionData[1]),
        topicId: parseInt(optionData[2]),
      });
    }
  }
  function createPlanner(weekDay) {
    console.log({ ...option, weekDay });
    axios
      .post(URL + `/planner`, { ...option, weekDay }, config)
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
  }
  console.log(planner);
  return (
    <>
      {week.map((day, index) => {
        return (
          <WeekDayLi>
            <h1>{day}</h1>
            <SelectContainer>
              <SelectTopic
                name=""
                id=""
                onChange={(e) => changeInput(e.target.value)}
              >
                {folder.subjects.map((subject, index) => {
                  if (index === 0) {
                    return (
                      <>
                        <option value="">Escolha uma opção...</option>
                        <CreatePlannerInput
                          subject={subject}
                          folderId={folderId}
                          setOption={setOption}
                        />
                      </>
                    );
                  } else {
                    return (
                      <CreatePlannerInput
                        subject={subject}
                        folderId={folderId}
                        setOption={setOption}
                      />
                    );
                  }
                })}
              </SelectTopic>
              <CreateButton onClick={() => createPlanner(index)}>
                <FaPlus />
              </CreateButton>
            </SelectContainer>
            <PlannerItems>
              {planner.map((plannerDay) => {
                return <ShowPlanner index={index} plannerDay={plannerDay} />;
              })}
            </PlannerItems>
          </WeekDayLi>
        );
      })}
    </>
  );
}

const WeekDayLi = styled.li`
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 8px;
`;
const SelectContainer = styled.div`
  margin-top: 8px;
  display: flex;
  width: 100%;
  justify-content: center;
`;

const SelectTopic = styled.select`
  font-size: 14px;
  width: 90%;
  background-color: #242424;
  height: 30px;
  border: none;
  color: #fff;
  outline: none;
`;
const CreateButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 10%;
  font-size: 24px;
  line-height: 10px;
  background-color: #3d3d3d;
  cursor: pointer;
`;
const PlannerItems = styled.ul`
margin-top: 8px;
  width: 100%;
  height: fit-content;
`;
