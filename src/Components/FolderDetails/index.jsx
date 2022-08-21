import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { BiPlusCircle } from "react-icons/bi";
import axios from "axios";
import { AuthContext } from "../../Context/Auth";
import { MdOutlineDelete } from "react-icons/md";
import { useNavigate } from "react-router";
import SubjectDetails from "./Subject";
import { useParams } from "react-router-dom";
import { ThreeDots } from "react-loader-spinner";
import DeleteModal from "../Modal/DeleteModal"

export default function Folder({refreshFromFolder,setRefreshFromFolder}) {
  const { URL } = useContext(AuthContext);
  const [folder, setFolder] = useState({subjects:[]});
  const user = JSON.parse(localStorage.getItem("user"));
  const folderId = parseInt(useParams().id)
  const [newSubject, setNewSubject] = useState("");
  const [refresh, setRefresh] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [modalIsOpen, setIsOpen] = useState(false);
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  function openDeleteModal() {
    setIsOpen(true);
  }
  function closeDeleteModal() {
    setIsOpen(false);
  }
  const navigate = useNavigate()
  useEffect(() => {
    axios
      .get(URL + `/folder/${folderId}`, config)
      .then((e) => {
        setFolder(e.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [refresh]);
  function createNewSubject(e) {
    setDisabled(true)
    e.preventDefault()
    const data = {folderId,
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
  function deleteFolder(){
    axios
      .delete(URL + `/folder/${folderId}`, config)
      .then((e) => {
        console.log(e);
        navigate("/home")
      })
      .catch((e) => {
        console.log(e);
      });
  }
  return (
    <FolderSection>
      <TitleContainer>
        <h1>{folder.name}  </h1>
        <MdOutlineDelete className="delete-folder" onClick={()=>{openDeleteModal()}}/>
      </TitleContainer>
      <FolderForm onSubmit={createNewSubject} disabled={disabled}>
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
        <button disabled={disabled} className="add-button" type="submit">
        {disabled ? (
            <ThreeDots color="#FFF" height={10} width={30} />
          ) : (
            <BiPlusCircle />
          )}
        </button>
      </FolderForm>
      <FolderList>
      {folder.subjects.length > 0 ? (
              folder.subjects.map((subject) => (
                <SubjectDetails setRefreshFromFolder={setRefreshFromFolder} refreshFromFolder={refreshFromFolder} subject={subject} config={config} URL={URL} refresh={refresh} setRefresh={setRefresh} />
              ))
            ) : (
              <></>
            )}
      </FolderList>
      <DeleteModal
        modalIsOpen={modalIsOpen}
        closeDeleteModal={closeDeleteModal}
        openStudyModal={openDeleteModal}
        functionDelete={deleteFolder}
        textModal={"essa pasta"}
      />
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
  @media (max-width: 800px) {
    width: 100%;
    margin-bottom: 25px;
}
`;
const TitleContainer = styled.div`
  width: 90%;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  h1 {
    font-size: 30px;
    font-weight: 700;
    line-height: 50px;
    color: #fff;
    display: flex;
    align-items: center;
  }
  .delete-folder {
    font-size: 30px;
    color: #af2727;
    cursor: pointer;
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
    ${(props) => (props.disabled ? "" : "cursor:pointer;")};
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
