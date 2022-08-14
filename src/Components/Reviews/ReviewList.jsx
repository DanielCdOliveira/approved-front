import styled from "styled-components";
import {BsArrowReturnRight} from "react-icons/bs"
export default function ReviewList({ reviews }) {
  if (reviews.length > 0) {
    return (
      <List>
        {reviews.map((review) => {
          return (
            <PlannerItem>
              <FolderName>{review.folderName} - {review.date}</FolderName>
              <div>
                <BsArrowReturnRight />
                <SubjectName>{review.subjectName}:</SubjectName>
                <TopicName>{review.topicName}</TopicName>
              </div>
            </PlannerItem>
          );
        })}
      </List>
    );
  } else {
    return (
      <List>
        <h2>Estudos do dia:</h2>
        <h3>Não há planos de estudo para hoje!</h3>
      </List>
    );
  }
}

const PlannerItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
  justify-content: flex-start;
  svg {
    width: auto;
    padding-left: 18px;
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
const List = styled.ul`
  margin-top: 15px;
  width: 95%;
  height: fit-content;
`;
