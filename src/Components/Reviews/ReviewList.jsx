import styled from "styled-components";
import { BsArrowReturnRight } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import axios from "axios";
import DeleteModal from "../Modal/DeleteModal";
import { useState } from "react";
export default function ReviewList({ reviews, URL, config, refresh, setRefresh }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [reviewId, setReviewId] = useState("");
  function deleteReview(reviewId) {
    axios
      .delete(URL + `/review/${reviewId}`, config)
      .then((e) => {
        console.log(e);
        setRefresh(!refresh)
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function openDeleteModal(id) {
    setReviewId(id)
    setIsOpen(true);
  }
  function closeDeleteModal() {
    setIsOpen(false);
  }
  console.log(reviewId);
  if (reviews.length > 0) {
    return (
      <List>
        {reviews.map((review) => {
          return (
            <ReviewItem>
              <FolderName>
                {review.folderName} - {review.date}
                <IoCloseSharp
                  className="delete"
                  onClick={() => {
                    openDeleteModal(review.id);
                  }}
                />
              </FolderName>
              <div>
                <BsArrowReturnRight />
                <SubjectName>{review.subjectName}:</SubjectName>
                <TopicName>{review.topicName}</TopicName>
              </div>
            </ReviewItem>
          );
        })}{" "}
        <DeleteModal
          modalIsOpen={modalIsOpen}
          closeDeleteModal={closeDeleteModal}
          openStudyModal={openDeleteModal}
          functionDelete={()=>{deleteReview(reviewId)}}
          textModal={"essa revisão"}
        />
      </List>
    );
  } else {
    return (
      <List>
        <h3>Não há revisões agendadas!</h3>
      </List>
    );
  }
}

const ReviewItem = styled.li`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: center;
  justify-content: flex-start;
  svg {
    width: auto;
    padding-left: 18px;
  }
  .delete {
    font-size: 28px;
    color: #af2727;
    padding-left: 5px;
    cursor: pointer;
  }
`;
const FolderName = styled.span`
  font-size: 20px;
  font-weight: 700;
  padding-left: 5px;
  margin-top: 10px;
  display: flex;
  align-items: center;
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
  width: 100%;
  height: 100px;
  h2 {
    font-size: 22px;
    font-weight: 700;
  }
  h3 {
    margin-top: 20px;
    font-size: 24px;
    font-weight: 700;
    text-align: center;
    color: #555555;
  }
`;
