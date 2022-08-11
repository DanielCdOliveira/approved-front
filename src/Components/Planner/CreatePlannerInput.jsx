import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/Auth";

export default function CreatePlannerInput({ subject, folderId, setOption }) {
  return (
    <>
      {subject.topics.map((topic) => {
        return (
          <option value={`${folderId} ${subject.id} ${topic.id}`}>
            {subject.name} - {topic.name}
          </option>
        );
      })}
    </>
  );
}
