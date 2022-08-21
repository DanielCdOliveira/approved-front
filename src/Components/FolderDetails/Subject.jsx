import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { BiPlusCircle } from "react-icons/bi";
import { MdOutlineDelete } from "react-icons/md";
import { BiListPlus } from "react-icons/bi";
import { ThreeDots } from "react-loader-spinner";
import DeleteModal from "../Modal/DeleteModal"

import TopicDetails from "./Topic";
import { useParams } from "react-router-dom";

export default function SubjectDetails({ subject, config, URL, refresh, setRefresh,refreshFromFolder,setRefreshFromFolder }) {
  const [newTopic, setNewTopic] = useState("");
  const [showTopics, setShowTopics] = useState(false);
  const [inputSubject, setInputSubject] = useState(false)
  const folderId = parseInt(useParams().id)
  const [disabled, setDisabled] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false);
  function openDeleteModal() {
    setIsOpen(true);
  }
  function closeDeleteModal() {
    setIsOpen(false);
  }
  function createNewTopic() {
    setDisabled(true)
    const data = {
      name: newTopic,
      subjectId: subject.id,
      isDone: false, folderId
    }
    axios
      .post(URL + "/topic", data, config)
      .then((e) => {
        console.log(e);
        setRefresh(!refresh)
        setDisabled(false)
        setNewTopic("")
        setRefreshFromFolder(!refreshFromFolder)
      })
      .catch((e) => {
        console.log(e);
        setDisabled(false)
      });
  }
  function deleteSubject(){
    axios
    .delete(URL + `/subject/${subject.id}`, config)
    .then((e) => {
      console.log(e);
      setRefresh(!refresh)
      setRefreshFromFolder(!refreshFromFolder)
    })
    .catch((e) => {
      console.log(e);
    });
  }
  function editSubject() {
    if (!showTopics) {
      setShowTopics(true);
    }
    setInputSubject(!inputSubject);
  }
  function openTopics() {
    if (inputSubject) {
      setInputSubject(!inputSubject);
    }
    setShowTopics(!showTopics);
  }

  return (
    <SubjectContainer>
      <SubjectItem>
        <h2
          onClick={() => {
            openTopics();
          }}
        >
          {subject.name}
        </h2>
        <div>
          <BiListPlus
            className="edit-subject"
            onClick={() => {
              editSubject();
            }}
          />
          <MdOutlineDelete className="delete-subject" onClick={()=>{deleteSubject()}} />
        </div>
      </SubjectItem>
      {showTopics ? (
        <TopicsList showTopics={showTopics}>
          <div>
            <TopicForm onSubmit={createNewTopic} inputSubject={inputSubject} disabled={disabled}>
              <input
                type="text"
                name=""
                id=""
                placeholder="Criar novo tópico..."
                onChange={(e) => {
                  setNewTopic(e.target.value);
                }}
                value={newTopic}
              />
              <button disabled={disabled} className="add-button" onClick={()=>{createNewTopic()}}>
              {disabled ? (
            <ThreeDots color="#FFF" height={10} width={30} />
          ) : (
            <BiPlusCircle />
          )}
              </button>
            </TopicForm>
            <div>
              {subject.topics.length > 0 ? (
                subject.topics.map((topic) => (
                  <TopicDetails setRefreshFromFolder={setRefreshFromFolder} refreshFromFolder={refreshFromFolder} URL={URL}topic={topic} config={config} refresh={refresh} setRefresh={setRefresh}/>
                ))
              ) : (
                <></>
              )}
            </div>
          </div>
          <DeleteModal
        modalIsOpen={modalIsOpen}
        closeDeleteModal={closeDeleteModal}
        openStudyModal={openDeleteModal}
        functionDelete={deleteSubject}
        textModal={"essa matéria"}
      />
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
  display: flex;
  justify-content: space-between;
  align-items: center;
  h2 {
    font-size: 28px;
    font-weight: 700;
    line-height: 50px;
    color: #fff;
    cursor: pointer;
  }
  .edit-subject {
    font-size: 30px;
    margin-right: 10px;
    cursor: pointer;
  }
  .delete-subject {
    font-size: 30px;
    color: #af2727;
    cursor: pointer;
    margin-right: 5px;
  }
`;
const TopicsList = styled.div`
  width: 95%;
  height: auto;
  display: flex;
  display: flex;
  flex-direction: column;
  overflow-y: hidden;
  ${(props) => (props.showTopics ? "height:auto;" : "height:0px;")}; 
`;

const TopicForm = styled.div`
  width: 100%;
  height: 40px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow-y: hidden;
  transition: all 0.3s;
  ${(props) => (props.inputSubject? "height:40px" : "height:0px")};
  input {
    height: 100%;
    width: 81%;
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
    ${(props) => (props.disabled ? "" : "cursor:pointer;")};
    svg {
      font-size: 30px;
      color: #fff;
    }
  }
`;
