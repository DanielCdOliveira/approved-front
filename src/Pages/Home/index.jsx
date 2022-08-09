import styled from "styled-components";
import { useState,useEffect,useContext } from "react";
import axios from "axios";

import Header from "../../Components/Header";
import { PageContainer } from "../../Utils/Styles";
import Folders from "../../Components/Folders";
import { AuthContext } from "../../Context/Auth";

export default function Home() {
  const { URL } = useContext(AuthContext);


  return (
    <PageContainer>
      <Header />
      <HomeSection>
        <Folders></Folders>
        <Folders></Folders>
        <Folders></Folders>
      </HomeSection>
    </PageContainer>
  );
}

const HomeSection = styled.section`
margin-top: 120px;
width: 95%;
display:flex;
justify-content: space-between;
`;
