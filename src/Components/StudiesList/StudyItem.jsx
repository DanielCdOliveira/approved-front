import styled from "styled-components";
import {BsArrowReturnRight} from "react-icons/bs"

export default function StudyItem({planner, dayOfWeek}) {
    
    if (dayOfWeek === planner.weekDay) {
        return (
          <PlannerItem>
            <FolderName>{planner.folderName}</FolderName>
            <div> <BsArrowReturnRight/>
            <SubjectName>{planner.subjectName}:</SubjectName>
            <TopicName>{planner.topicName}</TopicName></div>
           
          </PlannerItem>
        );
      } else {
        return <></>;
      }

    
}
const PlannerItem = styled.li`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    text-align: center;
    justify-content: flex-start;
    svg{
        width: auto;
       padding-left:18px;
    }
`;
const FolderName = styled.span`
  font-size: 20px;
  font-weight: 700;
  padding-left: 5px;
  margin-top: 10px;
`;
const SubjectName = styled.span`
  font-size: 18px;
  font-weight: 700;
  padding-left: 5px;
`;
const TopicName = styled.span`
padding-left: 8px;
    font-size: 18px;
    font-weight: 400;
`;