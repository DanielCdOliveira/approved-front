import styled from "styled-components";
import {BsArrowReturnRight} from "react-icons/bs"

export default function StudyItem({planner, dayOfWeek}) {
    
    if (dayOfWeek === planner.weekDay) {
        return (
          <PlannerItem>
            <BsArrowReturnRight/>
            <SubjectName>{planner.subjectName}:</SubjectName>
            <TopicName>{planner.topicName}</TopicName>
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