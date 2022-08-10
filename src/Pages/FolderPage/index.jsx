import styled from "styled-components";
import { useState,useEffect,useContext } from "react";
import axios from "axios";

import Header from "../../Components/Header";
import { PageContainer } from "../../Utils/Styles";
import Folder from "../../Components/FolderDetails/index.jsx";
import Planner from "../../Components/Planner/index.jsx"

export default function FolderPage() {
  return (
    <PageContainer>
      <Header />
      <HomeSection>
        <Folder/>
        <Planner/>
        <Folder/>
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