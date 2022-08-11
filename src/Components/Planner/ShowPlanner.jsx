import styled from "styled-components";

import {BsArrowReturnRight,BsCircleFill} from "react-icons/bs"
export default function ShowPlanner({ index, plannerDay }) {
  console.log(index, plannerDay);
  if (index === plannerDay.weekDay) {
    return (
      <PlannerItem>
        <BsArrowReturnRight/>
        <SubjectName>{plannerDay.subjectName}:</SubjectName>
        <TopicName>{plannerDay.topicName}</TopicName>
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
    svg{
        width: auto;
       padding-left:18px;
       
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
