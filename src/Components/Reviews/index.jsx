import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { BiPlusCircle } from "react-icons/bi";
import axios from "axios";
import { AuthContext } from "../../Context/Auth";
import { FaPlus } from "react-icons/fa";
import ReviewList from "./ReviewList";
export default function Reviews() {
  const [newFolder, setNewFolder] = useState("");
  const { URL } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const config = {
    headers: {
      Authorization: `Bearer ${user.token}`,
    },
  };
  useEffect(() => {
    axios
      .get(URL + "/review", config)
      .then((e) => {
        setReviews(e.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  return (
    <Reviewsection>
      <TitleContainer>
        <h1>Revisões:</h1>
      </TitleContainer>
      <ReviewList reviews={reviews} URL={URL} config={config}/>
    </Reviewsection>
  );
}

const Reviewsection = styled.section`
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
  position: relative;
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

// const ReviewList = styled.ul`
//   margin-top: 15px;
//   width: 95%;
//   height: fit-content;
// `;
