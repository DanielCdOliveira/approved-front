import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import {IoCloseSharp} from "react-icons/io5"
import DeleteModal from "../Modal/DeleteModal"
export default function Topic({ topic, config , URL, refresh, setRefresh}) {
  const [ShowTopics, setShowTopics] = useState(false);
  const [modalIsOpen, setIsOpen] = useState(false);
  function openDeleteModal() {
    setIsOpen(true);
  }
  function closeDeleteModal() {
    setIsOpen(false);
  }
  function deleteTopic(){
    axios
    .delete(URL + `/topic/${topic.id}`, config)
    .then((e) => {
      console.log(e);
      setRefresh(!refresh)
    })
    .catch((e) => {
      console.log(e);
    });
  }
  return (
    <TopicContainer>
      <TopicItem>
        <h2
          onClick={() => {
            setShowTopics(!ShowTopics);
          }}
        >
          {topic.name}
        </h2>
        <IoCloseSharp onClick={()=>{openDeleteModal()}}/>
      </TopicItem>
      <DeleteModal
        modalIsOpen={modalIsOpen}
        closeDeleteModal={closeDeleteModal}
        openStudyModal={openDeleteModal}
        functionDelete={deleteTopic}
        textModal={"esse tópico"}
      />
    </TopicContainer>
  );
}
const TopicContainer = styled.li`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TopicItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  h2 {
    max-width: 90%;
    font-size: 20px;
    line-height: 40px;
    cursor: pointer;
    padding-left: 8px;
  }
  svg{
    font-size: 28px;
    color: #af2727;
    padding-left: 5px;
    cursor: pointer;
  }
`;