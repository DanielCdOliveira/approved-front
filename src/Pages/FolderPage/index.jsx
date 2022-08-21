import styled from "styled-components";
import { useState } from "react";

import Header from "../../Components/Header";
import { PageContainer } from "../../Utils/Styles";
import Folder from "../../Components/FolderDetails/index.jsx";
import Planner from "../../Components/Planner/index.jsx"
import Historic from "../../Components/StudyHistoric";

export default function FolderPage() {
  const [refreshFromFolder, setRefreshFromFolder]= useState(false)
  return (
    <PageContainer>
      <Header />
      <HomeSection>
        <Folder setRefreshFromFolder={setRefreshFromFolder} refreshFromFolder={refreshFromFolder}/>
        <Planner refreshFromFolder={refreshFromFolder}/>
        <Historic/>
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
