import styled from "styled-components";
import { useState,useEffect,useContext } from "react";
import axios from "axios";

import Header from "../../Components/Header";
import { PageContainer } from "../../Utils/Styles";
// import Subjects from "../../Components/Subjects";
import { AuthContext } from "../../Context/Auth";

export default function Home() {
  const { URL } = useContext(AuthContext);


  return (
    <PageContainer>
      <Header />
      <HomeSection>
        {/* <Subjects></Subjects>
        <Subjects></Subjects>
        <Subjects></Subjects> */}
      </HomeSection>
    </PageContainer>
  );
}

const HomeSection = styled.section`
margin-top: 120px;
width: 90%;
display:flex;
justify-content: space-between;
`;
