import styled from "styled-components";
import { useState,useEffect,useContext } from "react";
import axios from "axios";

import Header from "../../Components/Header";
import { PageContainer } from "../../Utils/Styles";
import Folders from "../../Components/Folders";
import Today from "../../Components/Today"
import Historic from "../../Components/Historic";
import { AuthContext } from "../../Context/Auth";

export default function Home() {
  const { URL } = useContext(AuthContext);


  return (
    <PageContainer>
      <Header />
      <HomeSection>
        <Folders></Folders>
        <Today></Today>
        <Historic></Historic>
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
`;
