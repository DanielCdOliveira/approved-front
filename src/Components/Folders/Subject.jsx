import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { BiPlusCircle } from "react-icons/bi";

import Topic from "./Topic";

export default function Subject({ subject, config }) {
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
      {ShowTopics ? (
        <TopicsList>
          <div>
            {/* <TopicForm onSubmit={createNewTopic}>
              <input
                type="text"
                name=""
                id=""
                placeholder="Criar novo tópico..."
                onChange={(e) => {
                  setNewTopic(e.target.value);
                }}
              />
              <button className="add-button" type="submit">
                <BiPlusCircle />
              </button>
            </TopicForm> */}
            <div>
              {subject.topics.length > 0 ? (
                subject.topics.map((subject) => (
                  <Topic subject={subject} config={config} />
                ))
              ) : (
                <h1>dadsada</h1>
              )}
            </div>
          </div>
        </TopicsList>
      ) : (
        <></>
      )}
    </SubjectContainer>
  );
}
const SubjectContainer = styled.li`
  width: 100%;
  height: fit-content;
  /* background-color: royalblue; */
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
    line-height: 50px;
    font-weight: 600;
    cursor: pointer;
  }
`;
const TopicsList = styled.div`
  width: 95%;
  height: auto;
  display: flex;
  /* background-color: yellow; */
  display: flex;
  flex-direction: column;
  /* align-items: flex-end; */
`;

const TopicForm = styled.div`
  width: 100%;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    height: 100%;
    width: 80%;
    font-size: 20px;
    border: none;
    outline: none;
    padding-left: 8px;
    border-radius: 8px 0 0 8px;
    border: solid 1px #fff;
  }
  input::placeholder {
    font-style: italic;
  }
  .add-button {
    font-family: "Oswald", sans-serif;
    width: 20%;
    height: 100%;
    background-color: #3d3d3d;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 8px 8px 0;
    border: none;
    border: solid 1px #fff;
    cursor: pointer;
    svg {
      font-size: 30px;
      color: #fff;
    }
  }
`;
