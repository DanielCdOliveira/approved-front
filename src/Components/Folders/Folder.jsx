import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import { BiPlusCircle } from "react-icons/bi";
import {TbEdit} from "react-icons/tb"
import {MdOutlineDelete} from "react-icons/md"

import Subject from "./Subject.jsx";

export default function Folder({ folder, config }) {
  const [newSubject, setNewSubject] = useState("");
  const [ShowSubjects, setShowSubjects] = useState(false);
  console.log(folder);

  function createNewSubject(e) {
    e.preventDefault();
    axios
      .post(URL + "/subject", {}, config)
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <FolderContainer>
      <FolderItem>
        <h2
          onClick={() => {
            setShowSubjects(!ShowSubjects);
          }}
        >
          {folder.name}
        </h2>
        <div>
        <TbEdit className="edit-folder"/>
        <MdOutlineDelete className="delete-folder"/>
        
        </div>
      </FolderItem>
      {ShowSubjects ? (
        <SubjectsList>
          <div>  
            {/* <SubjectForm onSubmit={createNewSubject}>
            <input
              type="text"
              name=""
              id=""
              placeholder="Criar nova matéria..."
              onChange={(e) => {
                setNewSubject(e.target.value);
              }}
            />
            <button className="add-button" type="submit">
              <BiPlusCircle />
            </button>
          </SubjectForm> */}
          <div>
            {folder.subjects.length > 0 ? (
              folder.subjects.map((subject) => (
                <Subject subject={subject} config={config} />
              ))
            ) : (
              <h1>dadsada</h1>
            )}
          </div>
          </div>
        
        </SubjectsList>
      ) : (
        <></>
      )}
    </FolderContainer>
  );
}
const FolderContainer = styled.li`
  width: 100%;
  height: fit-content;
  margin-bottom: 8px;
  /* background-color: springgreen; */
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const FolderItem = styled.div`
  width: 100%;
  height: 50px;
  position: relative;
   background-color: #280068;
   display: flex;
   justify-content: space-between;
   align-items: center;
  h2 {
    font-size: 30px;
    line-height: 48px;
    font-weight: 600;
    cursor: pointer;
  }
  .edit-folder{
    font-size: 30px;
    margin-right: 10px;
  }
  .delete-folder{
    font-size: 30px;
    color: #af2727;
  }
`;
const SubjectsList = styled.div`
  width: 95%;
  height: auto;
  display: flex;
  /* background-color: blueviolet; */
  display: flex;
  flex-direction: column;
  /* align-items: flex-end; */
`;

const SubjectForm = styled.div`
  width: 100%;
  height: 50px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
    font-family: "Oswald", sans-serif;
    width: 20%;
    height: 80%;
    background-color: #3d3d3d;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 8px 8px 0;
    border: none;
    border: solid 1px #fff;
    cursor: pointer;
    svg {
      font-size: 30px;
      color: #fff;
    }
  }
`;
