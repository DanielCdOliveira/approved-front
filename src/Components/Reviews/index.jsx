import { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { AuthContext } from "../../Context/Auth";

import ReviewList from "./ReviewList";

export default function Reviews() {
  const { URL } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [refresh, setRefresh] = useState(false)
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
  }, [refresh]);
  return (
    <Reviewsection>
      <TitleContainer>
        <h1>Revisões:</h1>
      </TitleContainer>
      <ReviewList refresh={refresh} setRefresh={setRefresh} reviews={reviews} URL={URL} config={config}/>
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
  @media (max-width: 800px) {
   width: 100%;
}
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