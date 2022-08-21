import styled from "styled-components";
import { IoCloseSharp } from "react-icons/io5";
import { useState } from "react";
import { BsArrowReturnRight } from "react-icons/bs";
import axios from "axios";
import DeleteModal from "../Modal/DeleteModal"
export default function ShowPlanner({ index, plannerDay,config,URL,setRefresh, refresh }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  function deletePlanner(){
    axios
    .delete(URL + `/planner/${plannerDay.id}`, config)
    .then((e) => {
      console.log(e);
      setRefresh(!refresh)
    })
    .catch((e) => {
      console.log(e);
    });
  }
  function openDeleteModal() {
    setIsOpen(true);
  }
  function closeDeleteModal() {
    setIsOpen(false);
  }
  if (index === plannerDay.weekDay) {
    return (
      <PlannerItem>
        <BsArrowReturnRight />
        <SubjectName>{plannerDay.subjectName}:</SubjectName>
        <TopicName>{plannerDay.topicName}</TopicName>
        <IoCloseSharp className="delete" onClick={()=>{openDeleteModal()}}/>
        <DeleteModal
        modalIsOpen={modalIsOpen}
        closeDeleteModal={closeDeleteModal}
        openStudyModal={openDeleteModal}
        functionDelete={deletePlanner}
        textModal={"esse planner"}
      />
      </PlannerItem>
    );
  } else {
    return <></>;
  }
}

const PlannerItem = styled.li`
  display: flex;
  align-items: center;
  text-align: center;
  height: 30px;
  svg {
    width: auto;
    padding-left: 18px;
  }
  .delete{
    font-size: 28px;
    color: #af2727;
    padding-left: 5px;
    cursor: pointer;
  }
`;

const SubjectName = styled.span`
  font-size: 16px;
  font-weight: 700;
  padding-left: 5px;
`;
const TopicName = styled.span`
  padding-left: 8px;
  font-size: 16px;
  font-weight: 400;
`;
