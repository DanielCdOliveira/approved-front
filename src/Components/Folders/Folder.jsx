import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { BiPlusCircle } from "react-icons/bi";
import { TbEdit } from "react-icons/tb";
import { MdOutlineDelete } from "react-icons/md";
import { BiListPlus } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import Subject from "./Subject.jsx";
import DeleteModal from "../Modal/DeleteModal"

export default function Folder({ folder, config,URL,setRefresh,refresh }) {
  const [newSubject, setNewSubject] = useState("");
  const [showSubjects, setShowSubjects] = useState(false);
  const [inputFolder, setInputFolder] = useState(false);
  const [disabled, setDisabled] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()
  
  function createNewSubject(e) {
    setDisabled(true)
    const data = {folderId: folder.id,
    name:newSubject,
  isDone:false}
    axios
      .post(URL + "/subject", data, config)
      .then((e) => {
        console.log(e);
        setRefresh(!refresh)
        setDisabled(false)
        setNewSubject("")
      })
      .catch((e) => {
        console.log(e);
        setDisabled(false)
      });
  }
  function openDeleteModal() {
    setIsOpen(true);
  }
  function closeDeleteModal() {
    setIsOpen(false);
  }
  function deleteFolder(){
    axios
      .delete(URL + `/folder/${folder.id}`, config)
      .then((e) => {
        console.log(e);
        setRefresh(!refresh)
      })
      .catch((e) => {
        console.log(e);
      });
  }
  function showInput() {        
    if (!showSubjects) {
      setShowSubjects(true);
    }
    setInputFolder(!inputFolder);
  }
  function openSubjects() {
    if (inputFolder) {
      setInputFolder(!inputFolder);
    }
    setShowSubjects(!showSubjects);
  }

  return (
    <FolderContainer>
      <FolderItem>
        <div className="title">
          <h2
            onClick={() => {
              openSubjects();
            }}
          >
            {folder.name}
          </h2>
          <TbEdit
            className="edit-folder"
            onClick={()=>{navigate(`../folder/${folder.id}`)}}
          />
        </div>
        <div>
          <BiListPlus className="plus-folder"  onClick={() => {
              showInput();
            }}/>
          <MdOutlineDelete className="delete-folder" onClick={()=>{openDeleteModal()}}/>
        </div>
      </FolderItem>

      <SubjectsList showSubjects={showSubjects}>
        <div>
          <SubjectForm inputFolder={inputFolder} disabled={disabled} >
            <input
              type="text"
              name=""
              id=""
              placeholder="Criar nova matéria..."
              onChange={(e) => {
                setNewSubject(e.target.value);
              }}
              value={newSubject}
            />
            <button disabled={disabled} className="add-button" onClick={()=>{createNewSubject()}}>
            {disabled ? (
            <ThreeDots color="#FFF" height={10} width={30} />
          ) : (
            <BiPlusCircle />
          )}
            </button>
          </SubjectForm>
          <div>
            {folder.subjects.length > 0 ? (
              folder.subjects.map((subject) => (
                <Subject folder={folder} subject={subject} config={config} URL={URL} setRefresh={setRefresh} refresh={refresh}/>
              ))
            ) : (
              <></>
            )}
          </div>
        </div>
      </SubjectsList>
      <DeleteModal
        modalIsOpen={modalIsOpen}
        closeDeleteModal={closeDeleteModal}
        openStudyModal={openDeleteModal}
        functionDelete={deleteFolder}
        textModal={"essa pasta"}
      />
    </FolderContainer>
  );
}
const FolderContainer = styled.li`
  width: 100%;
  height: fit-content;
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const FolderItem = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .title{
    display: flex;
    align-items: center;
    width: 75%;
  }
  h2 {
    max-width: 100%;
    font-size: 30px;
    line-height: 48px;
    font-weight: 600;
    cursor: pointer;
    padding-right: 10px;
  }
  .edit-folder {
    font-size: 30px;
    margin-right: 10px;
    cursor: pointer;
  }
  .delete-folder {
    font-size: 30px;
    color: #af2727;
    cursor: pointer;
  }
  .plus-folder {
    font-size: 30px;
    margin-right: 10px;
    cursor: pointer;
  }
`;
const SubjectsList = styled.div`
  width: 95%;
  display: flex;
  overflow-y: hidden;
  ${(props) => (props.showSubjects ? "height:auto;" : "height:0px;")};
  display: flex;
  flex-direction: column;
  transition: all 5s;
`;

const SubjectForm = styled.div`
  width: 100%;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  overflow-y: hidden;
  transition: all 0.3s;
  ${(props) => (props.inputFolder ? "height:50px" : "height:0px")};
  input {
    height: 80%;
    width: 100%;
    font-size: 20px;
    padding-left: 20px;
    border: none;
    outline: none;
    padding-left: 16px;
    border-radius: 8px 0 0 8px;
    border: solid 1px #fff;
  }
  input::placeholder {
    font-style: italic;
  }
  .add-button {
    width: 20%;
    height: 80%;
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
