import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";

export default function CreatePlanner({ destruct, folderId }) {
  return (
    <>
      {destruct.map((subject) => (
        <option
          value={{
            folderId,
            subjectId: subject.subjectId,
            topicId: subject.topicId,
          }}
        >
          {subject.subjectName} - {subject.topicName}
        </option>
      ))}
    </>
  );
}

const HomeSection = styled.section`
  margin-top: 60px;
  width: 95%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
