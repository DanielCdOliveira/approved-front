import Modal from "react-modal";
import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../../Context/Auth";
Modal.setAppElement(".root");

export default function DeleteModal({
  functionDelete,
  closeDeleteModal,
  modalIsOpen,
  textModal
}) {
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
      width: "100%",
      height: "fit-content",
      maxWidth: "400px",
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

  function handlerDelete() {
    functionDelete();
    closeDeleteModal();
  }
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeDeleteModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <ModalContainer>
        <h2>Deseja deletar {textModal}?</h2>
        <Buttons>
          <button className="yes" onClick={()=>{handlerDelete()}}>Sim!</button>
          <button className="no" onClick={()=>{closeDeleteModal()}}>Não!</button>
        </Buttons>
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

const Buttons = styled.div`
margin-top: 50px;
width: 100%;
display: flex;
justify-content: space-between;
button{
  border: none;
  width: 45%;
  height: 40px;
  border-radius: 10px;
  cursor: pointer;
  font-size: 22px;
  color: #fff;
}
.yes{
  background-color: #5DAC5B;
}
.no{
  background-color: #AF2727;

}
`
