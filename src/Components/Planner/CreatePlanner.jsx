import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/Auth";

import CreatePlannerInput from "./CreatePlannerInput";

export default function CreatePlanner({ create, folderId, folder }) {
  const week = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
  ];
  return (
    <>
      {week.map((day) => {
        return (
          <li>
            <h1>{day}</h1>
            <select name="" id="">
              {folder.subjects.map((subject)=>{
                return <CreatePlannerInput subject={subject} folderId={folderId}/>
              })}
            </select>
            <button>Adicionar Tópico</button>
          </li>
        );
      })}
    </>
  );
}