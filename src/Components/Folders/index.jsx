import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { BiPlusCircle } from "react-icons/bi";
import axios from "axios";
import { AuthContext } from "../../Context/Auth";

import Folder from "./Folder.jsx";

export default function Folders() {
  const [newFolder, setNewFolder] = useState("");
  const { URL } = useContext(AuthContext);
  const [folders, setFolders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [refresh, setRefresh] = useState(false)
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  useEffect(() => {
    axios
      .get(URL + "/folder", config)
      .then((e) => {
        setFolders(e.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [refresh]);
  function createNewFolder(e) {
    e.preventDefault();
    axios
      .post(URL + "/folder", { name: newFolder }, config)
      .then((e) => {
        console.log(e);
        setRefresh(!refresh)
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <FolderSection>
      <TitleContainer>
        <h1>Pastas</h1>
      </TitleContainer>
      <FolderForm onSubmit={createNewFolder}>
        <input
          type="text"
          name=""
          id=""
          placeholder="Criar nova pasta ..."
          onChange={(e) => {
            setNewFolder(e.target.value);
          }}
        />
        <button className="add-button" type="submit">
          <BiPlusCircle />
        </button>
      </FolderForm>
      <FolderList>
        {folders.length > 0 ? (
          folders.map((folder) => (
            <Folder folder={folder} config={config} URL={URL} setRefresh={setRefresh} refresh={refresh}/>
          ))
        ) : (
          <Empty>Você ainda não possui nenhuma pasta de estudos!</Empty>
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
    background-color: #a2a2a2;
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
  height: 80%;
  overflow-y: auto;
`;
const Empty = styled.h2`
  margin-top: 20px;
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  color: #555555; 
`;
