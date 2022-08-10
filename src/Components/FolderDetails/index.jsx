import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { BiPlusCircle } from "react-icons/bi";
import axios from "axios";
import { AuthContext } from "../../Context/Auth";


import Subject from "../Folders/Subject";
import { useParams } from "react-router-dom";

export default function Folder() {
  const { URL } = useContext(AuthContext);
  const [folder, setFolder] = useState({subjects:[]});
  const user = JSON.parse(localStorage.getItem("user"));
  const folderId = useParams().id
  console.log(folderId);
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  useEffect(() => {
    axios
      .get(URL + `/folder/${folderId}`, config)
      .then((e) => {
        setFolder(e.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);


  return (
    <FolderSection>
      <TitleContainer>
        <h1>{folder.name}</h1>
      </TitleContainer>
      <FolderList>
      {folder.subjects.length > 0 ? (
              folder.subjects.map((subject) => (
                <Subject subject={subject} config={config} URL={URL} />
              ))
            ) : (
              <></>
            )}
      </FolderList>
    </FolderSection>
  );
}

const FolderSection = styled.section`
  width: 30%;
  height: 80vh;
  background-color: #171717;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 16px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
  border: solid 1px #383d3f;
  color: #fff;
`;
const TitleContainer = styled.div`
  width: 90%;
  height: 50px;
  h1 {
    font-size: 30px;
    font-weight: 700;
    line-height: 50px;
    color: #fff;
  }
`;
const FolderForm = styled.form`
  width: 95%;
  height: 50px;
  text-align: center;
  display: flex;
  justify-content: space-between;
  align-items: center;
  input {
    color: #fff;
    background-color: #242424;
    height: 80%;
    width: 80%;
    font-size: 20px;
    border: none;
    outline: none;
    padding-left: 8px;
    border-radius: 8px 0 0 8px;
  }
  input::placeholder {
    font-style: italic;
  }
  .add-button {
    font-family: "Oswald", sans-serif;
    width: 20%;
    height: 80%;
    background-color: #A2A2A2;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0 8px 8px 0;
    border: none;
    cursor: pointer;
    svg {
      font-size: 30px;
      color: #fff;
    }
  }
`;
const FolderList = styled.ul`
  margin-top: 15px;
  width: 95%;
  height: fit-content;
`;
