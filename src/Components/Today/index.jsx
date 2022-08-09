import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { BiPlusCircle } from "react-icons/bi";
import axios from "axios";
import { AuthContext } from "../../Context/Auth";
import {FaPlus} from "react-icons/fa"

export default function Today() {
  const [newFolder, setNewFolder] = useState("");
  const { URL } = useContext(AuthContext);
  const [folders, setFolders] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
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
  }, []);
  console.log(folders);
  console.log(config);
  console.log(newFolder);

  function createNewSubject(e) {
    console.log("entrou");
    e.preventDefault();
    axios
      .post(URL + "/folder", { name: newFolder}, config)
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  return (
    <FolderSection>
      <TitleContainer>
        <h1>Segunda-Feira</h1>
        <h2>09/08/2022</h2>
      </TitleContainer>
      {/* <FolderForm onSubmit={createNewSubject}>
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
      </FolderForm> */}
      <FolderList>
        {/* {folders.length > 0 ? (
          folders.map((folder) => <Folder folder={folder} config={config} />)
        ) : (
          <></>
        )} */}
      </FolderList>
        <StudyButton>
          <h3>Adicionar estudo</h3>
          <FaPlus/>
        </StudyButton>
    </FolderSection>
  );
}

const FolderSection = styled.section`
  width: 35%;
  height: 85vh;
  background-color: #171717;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  border-radius: 16px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.5);
  border: solid 1px #383d3f;
  color: #fff;
  position: relative;
`;
const TitleContainer = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-size: 40px;
    font-weight: 700;
    line-height: 60px;
    color: #fff;
  }
  h2{
    font-size: 25px;
    font-weight: 200;
    line-height: 45px;
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
const StudyButton = styled.div`
  background-color: #333333;
  border: solid 1px #A3A3A3;
  width: 80%;
  height: 80px;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 40px;
  h3{
    font-size: 30px;
    margin-right: 20px;
  }
  svg{
    font-size: 30px;
  }
`