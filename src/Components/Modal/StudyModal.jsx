import Modal from "react-modal";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../../Context/Auth";
Modal.setAppElement(".root");

export default function StudyModal({ folders, closeStudyModal, modalIsOpen }) {
  const [folderOption, setFolderOption] = useState("");
  const [subjectOption, setSubjectOption] = useState("");
  const [topicOption, setTopicOption] = useState("");
  const { URL } = useContext(AuthContext);
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: "rgba(77, 77, 77, 0.9)",
      zIndex: 100,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      width: "50%",
      height: "50%",
      background: "#171717",
      borderRadius: "50px",
      textAlign: "center",
      color: "white",
      paddingLeft: "100px",
      paddingRight: "100px",
      fontSize: "34px",
    },
  };
  function changeFolderInput(value) {
    if (value === "") {
      setFolderOption("");
    } else {
      setFolderOption(parseInt(value));
    }
  }
  function changeSubjectInput(value) {
    if (value === "") {
      setSubjectOption("");
    } else {
      setSubjectOption(parseInt(value));
    }
  }
  function changeTopicInput(value) {
    if (value === "") {
      setTopicOption("");
    } else {
      setTopicOption(parseInt(value));
    }
  }
  useEffect(() => {
    if (folderOption !== "") {
    }
  }, [folderOption]);
  console.log(folderOption);
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeStudyModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <h2>Escolha a pasta:</h2>
      <SelectFolder onChange={(e) => changeFolderInput(e.target.value)}>
        {folders.map((folder, index) => {
          if (index === 0) {
            console.log(index);
            return (
              <>
                <option value="">Escolha uma opção...</option>
                <option value={`${index}`}>{folder.name}</option>
              </>
            );
          } else {
            return <option value={`${index}`}>{folder.name}</option>;
          }
        })}
      </SelectFolder>
      <SelectSubject
        folderOption={folderOption}
        onChange={(e) => changeSubjectInput(e.target.value)}
      >
        {folderOption !== "" && folders[folderOption].subjects.length ? (
          folders[folderOption].subjects.map((subject, index) => {
            if (index === 0) {
              return (
                <>
                  <option value="">Escolha uma opção...</option>
                  <option value={`${index}`}>{subject.name}</option>
                </>
              );
            } else {
              return <option value={`${index}`}>{subject.name}</option>;
            }
          })
        ) : (
          <option value={""}>Não há matérias</option>
        )}
      </SelectSubject>
      <SelectTopic subjectOption={subjectOption} onChange={(e) => changeTopicInput(e.target.value)}>
      {subjectOption !== "" && folders[folderOption].subjects[subjectOption].topics.length ? (
          folders[folderOption].subjects[subjectOption].topics.map((topic, index) => {
            if (index === 0) {
              return (
                <>
                  <option value="">Escolha uma opção...</option>
                  <option value={`${index}`}>{topic.name}</option>
                </>
              );
            } else {
              return <option value={`${index}`}>{topic.name}</option>;
            }
          })
        ) : (
          <option value={""}>Não há matérias</option>
        )}
      </SelectTopic>
          <CreateButton topicOption={topicOption}>
            
          </CreateButton>
    </Modal>
  );
}

const SelectFolder = styled.select``;
const SelectSubject = styled.select`
  ${(props) => (props.folderOption !== "" ? "" : "display:none;")};
`;
const SelectTopic = styled.select`
  ${(props) => (props.subjectOption !== "" ? "" : "display:none;")};
`;
const CreateButton = styled.div`
  ${(props) => (props.topicOption !== "" ? "" : "display:none;")};
  width: 100px;
  height: 50px;
  background-color: aqua;
`
