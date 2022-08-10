import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/Auth";

import CreatePlannerInput from "./CreatePlannerInput";

export default function CreatePlanner({ create, folderId, folder }) {
  const [option, setOption] = useState("");
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
    const optionData = value.split(" ");
    setOption({
      folderId: parseInt(optionData[0]),
      subjectId: parseInt(optionData[1]),
      topicId: parseInt(optionData[2]),
    });
  }
  console.log(option);
  return (
    <>
      {week.map((day) => {
        return (
          <li>
            <h1>{day}</h1>
            <select
              name=""
              id=""
              onChange={(e) => changeInput(e.target.value)}
              value={option}
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
            </select>
            <button>Adicionar Tópico</button>
          </li>
        );
      })}
    </>
  );
}
