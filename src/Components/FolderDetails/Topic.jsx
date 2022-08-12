import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import {IoCloseSharp} from "react-icons/io5"

export default function TopicDetails({ topic, config }) {
  const [ShowTopics, setShowTopics] = useState(false);
  return (
    <TopicContainer>
      <TopicItem>
        <h2
          onClick={() => {
            setShowTopics(!ShowTopics);
          }}
        >
          {topic.name}
        </h2>
        <IoCloseSharp/>
      </TopicItem>
    </TopicContainer>
  );
}
const TopicContainer = styled.li`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

const TopicItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  h2 {
    max-width: 90%;
    font-size: 20px;
    line-height: 40px;
    cursor: pointer;
    padding-left: 8px;
  }
  svg{
    font-size: 28px;
    color: #af2727;
    padding-left: 5px;
  }
`;