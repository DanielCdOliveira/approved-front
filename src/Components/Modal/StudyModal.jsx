import Modal from "react-modal";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../../Context/Auth";
import { AiFillCloseCircle } from "react-icons/ai";
import dayjs from "dayjs";
Modal.setAppElement(".root");

export default function StudyModal({
  folders,
  closeStudyModal,
  modalIsOpen,
  modalOption,
}) {
  const [folderOption, setFolderOption] = useState("");
  const [subjectOption, setSubjectOption] = useState("");
  const [topicOption, setTopicOption] = useState("");
  const [topicFinish, setTopicFinish] = useState("");
  const [reviewDays, setReviewDays] = useState(0);
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
      width: "40%",
      height: "50%",
      background: "#171717",
      borderRadius: "50px",
      textAlign: "center",
      color: "white",
      paddingLeft: "40px",
      paddingRight: "40px",
      fontSize: "30px",
      position: "relative",
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
  function changeTopicFinishInput(value) {
    if (value === "") {
      setTopicFinish("");
    } else {
      if (value === "true") setTopicFinish(true);
      if (value === "false") setTopicFinish(false);
    }
  }
  function createStudy() {
    const data = {
      folderId: folders[folderOption].id,
      subjectId: folders[folderOption].subjects[subjectOption].id,
      topicId:
        folders[folderOption].subjects[subjectOption].topics[topicOption].id,
    };
    axios
      .post(URL + "/study", data, config)
      .then((e) => {
        console.log(e);
      })
      .catch((e) => {
        console.log(e);
      });
    if (topicFinish) {
      axios
        .post(URL + `/topic/${data.topicId}`, data, config)
        .then((e) => {
          console.log(e);
        })
        .catch((e) => {
          console.log(e);
        });
    }

    closeModal();
  }
  function createReview() {
    const reviewDate = dayjs().add(reviewDays, "day").format("DD/MM/YYYY");
    const data = {
      folderId: folders[folderOption].id,
      subjectId: folders[folderOption].subjects[subjectOption].id,
      topicId:
        folders[folderOption].subjects[subjectOption].topics[topicOption].id,
        date: reviewDate
    };
    axios
        .post(URL + `/review/`, data, config)
        .then((e) => {
          console.log(e);
        })
        .catch((e) => {
          console.log(e);
        });
        closeModal()
  }
  function closeModal() {
    closeStudyModal();
    clearData();
  }
  function clearData() {
    setFolderOption("");
    setSubjectOption("");
    setTopicOption("");
    setTopicFinish("");
    setReviewDays(0);
  }
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <ModalContainer>
        <h2>Pasta:</h2>
        <SelectFolder>
          <select
            name=""
            id=""
            onChange={(e) => changeFolderInput(e.target.value)}
          >
            {folders.map((folder, index) => {
              if (index === 0) {
                return (
                  <>
                    <option value="">Escolha uma pasta...</option>
                    <option value={`${index}`}>{folder.name}</option>
                  </>
                );
              } else {
                return <option value={`${index}`}>{folder.name}</option>;
              }
            })}
          </select>
        </SelectFolder>
        <SelectSubject
          folderOption={folderOption}
          onChange={(e) => changeSubjectInput(e.target.value)}
        >
          <h2>Matéria:</h2>
          <select name="" id="">
            {folderOption !== "" && folders[folderOption].subjects.length ? (
              folders[folderOption].subjects.map((subject, index) => {
                if (index === 0) {
                  return (
                    <>
                      <option value="">Escolha uma matéria...</option>
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
          </select>
        </SelectSubject>
        <SelectTopic
          subjectOption={subjectOption}
          onChange={(e) => changeTopicInput(e.target.value)}
        >
          <h2>Tópico:</h2>
          <select name="" id="">
            {subjectOption !== "" &&
            folders[folderOption].subjects[subjectOption].topics.length ? (
              folders[folderOption].subjects[subjectOption].topics.map(
                (topic, index) => {
                  if (index === 0) {
                    return (
                      <>
                        <option value="">Escolha um tópico...</option>
                        <option value={`${index}`}>{topic.name}</option>
                      </>
                    );
                  } else {
                    return <option value={`${index}`}>{topic.name}</option>;
                  }
                }
              )
            ) : (
              <option value={""}>Não há tópicos</option>
            )}
          </select>
        </SelectTopic>
        <SelectTopicFinish
          topicOption={topicOption}
          modalOption={modalOption}
          onChange={(e) => changeTopicFinishInput(e.target.value)}
        >
          <h2>Tópico concluído?</h2>
          <select name="" id="">
            <option value="">Escolha uma resposta...</option>
            <option value={`true`}>sim</option>
            <option value={`false`}>não</option>
          </select>
        </SelectTopicFinish>
        <SelectReviewDays
          topicOption={topicOption}
          modalOption={modalOption}
          onChange={(e) => setReviewDays(e.target.value)}
        >
          <h2>Dias para a revisão:</h2>
          <input
            type="number"
            min={1}
            onChange={(e) => setReviewDays(e.target.value)}
          />
        </SelectReviewDays>
        <CreateButton
          topicFinish={topicFinish}
          modalOption={modalOption}
          onClick={() => {
            createStudy();
          }}
        >
          <p>Estudo concluído!</p>
        </CreateButton>
        <CreateReviewButton
          reviewDays={reviewDays}
          modalOption={modalOption}
          onClick={() => {
            createReview();
          }}
        >
          <p>Agendar revisão</p>
        </CreateReviewButton>
        <CloseButton onClick={closeModal}>voltar</CloseButton>
      </ModalContainer>
    </Modal>
  );
}

const ModalContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  select {
    font-size: 14px;
    width: 90%;
    background-color: #242424;
    height: 30px;
    border: none;
    color: #fff;
    outline: none;
  }
`;
const SelectFolder = styled.div`
  width: 100%;
  margin-bottom: 8px;
`;
const SelectSubject = styled.div`
  ${(props) => (props.folderOption !== "" ? "" : "display:none;")};
  width: 100%;
  margin-bottom: 8px;
`;
const SelectTopic = styled.div`
  ${(props) => (props.subjectOption !== "" ? "" : "display:none;")};
  width: 100%;
  margin-bottom: 8px;
`;
const SelectTopicFinish = styled.div`
  ${(props) =>
    props.topicOption !== "" && props.modalOption === "study"
      ? ""
      : "display:none;"};
  width: 100%;
  margin-bottom: 8px;
`;
const SelectReviewDays = styled.div`
  ${(props) =>
    props.topicOption !== "" && props.modalOption === "review"
      ? "  display: flex;"
      : "display:none;"};
  width: 100%;
  margin-bottom: 8px;
  justify-content: center;
  margin-top: 20px;
  input {
    font-size: 14px;
    width: 30%;
    background-color: #242424;
    height: 30px;
    border: none;
    color: #fff;
    outline: none;
  }
`;
const CreateButton = styled.div`
  ${(props) =>
    props.topicFinish !== "" && props.modalOption === "study"
      ? ""
      : "display:none;"};
  cursor: pointer;
  p {
    text-align: center;
    line-height: 60px;
    font-size: 0.7em;
  }
  margin-top: 50px;
  width: 50%;
  height: 60px;
  background-color: #5dac5b;
  border-radius: 8px;
`;
const CreateReviewButton = styled.div`
  ${(props) =>
    props.reviewDays !== 0 && props.modalOption === "review"
      ? ""
      : "display:none;"};
  cursor: pointer;
  p {
    text-align: center;
    line-height: 60px;
    font-size: 0.7em;
  }
  margin-top: 50px;
  width: 50%;
  height: 60px;
  background-color: #5dac5b;
  border-radius: 8px;
`;
const CloseButton = styled.div`
  position: absolute;
  bottom: 20px;
  right: 30px;
  text-decoration: underline;
  cursor: pointer;
`;
