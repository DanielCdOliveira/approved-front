import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { BiPlusCircle } from "react-icons/bi";

export default function Topic({ subject, config }) {
  const [newTopic, setNewTopic] = useState("");
  const [ShowTopics, setShowTopics] = useState(false);
  console.log(subject);

  function createNewTopic(e) {
    e.preventDefault();
    axios
      .post(URL + "/topic", {}, config)
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <SubjectContainer>
      <SubjectItem>
        <h2
          onClick={() => {
            setShowTopics(!ShowTopics);
          }}
        >
          {subject.name}
        </h2>
      </SubjectItem>
    </SubjectContainer>
  );
}
const SubjectContainer = styled.li`
  width: 100%;
  height: fit-content;
  /* background-color: darkblue; */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const SubjectItem = styled.div`
  width: 100%;
  /* background-color: #171717;
  border-radius: 8px;
  color: #fff;
  border: solid 1px #383d3f; */
  h2 {
    font-size: 20px;
    line-height: 40px;
    cursor: pointer;
    padding-left: 8px;
  }
`;