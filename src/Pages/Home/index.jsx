import styled from "styled-components";
import { useState,useEffect,useContext } from "react";
import axios from "axios";

import Header from "../../Components/Header";
import { PageContainer } from "../../Utils/Styles";
import Folders from "../../Components/Folders";
import Today from "../../Components/Today"
import Reviews from "../../Components/Reviews";
import { AuthContext } from "../../Context/Auth";

export default function Home() {
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

  return (
    <PageContainer>
      <Header />
      <HomeSection>
        <Folders></Folders>
        <Today></Today>
        <Reviews></Reviews>
      </HomeSection>
    </PageContainer>
  );
}

const HomeSection = styled.section`
margin-top: 60px;
width: 95%;
display:flex;
justify-content: space-between;
align-items: center;
@media (max-width:800px) {
    flex-direction: column;
    margin-top: 80px;
    margin-bottom: 50px;
}
`;
