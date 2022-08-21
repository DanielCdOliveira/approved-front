import styled from "styled-components";
import { BsArrowReturnRight } from "react-icons/bs";
import { IoCloseSharp } from "react-icons/io5";
import DeleteModal from "../Modal/DeleteModal";
import { useState } from "react";
import axios from "axios";
export default function HistoricList({ historic, URL, config, refresh, setRefresh }) {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [studyId, setStudyId] = useState("")

  function deleteStudy() {
    axios
      .delete(URL + `/study/${studyId}`, config)
      .then((e) => {
        console.log(e);
        setRefresh(!refresh)
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function openDeleteModal(id) {
    setStudyId(id)
    setIsOpen(true);
  }
  function closeDeleteModal() {
    setIsOpen(false);
  }
  if (historic.length > 0) {
    return (
      <List>
        {historic.map((historicItem) => {
          return (
            <ReviewItem>
              <FolderName>
                {historicItem.folderName} - {historicItem.date}
                <IoCloseSharp
                  className="delete"
                  onClick={() => {
                    openDeleteModal(historicItem.id);
                  }}
                />
              </FolderName>

              <div>
                <BsArrowReturnRight />
                <SubjectName>{historicItem.subjectName}:</SubjectName>
                <TopicName>{historicItem.topicName}</TopicName>
              </div>
            </ReviewItem>
          );
        })}
        <DeleteModal
          modalIsOpen={modalIsOpen}
          closeDeleteModal={closeDeleteModal}
          openStudyModal={openDeleteModal}
          functionDelete={deleteStudy}
          textModal={"esse estudo"}
        />
      </List>
    );
  } else {
    return (
      <List>
        <h3>Não há estudos dessa pasta!</h3>
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
