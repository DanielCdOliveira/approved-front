import styled from "styled-components";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/Auth";


export default function CreatePlannerInput({  subject , folderId}) {

  return (
    <>
      {subject.topics.map((topic) => {
        return (
                <option
                  value={{
                    folderId,
                    subjectId: subject.id,
                    topicId: topic.id,
                  }}
                >
                  {subject.name} - {topic.name}
                </option>
        )}) 
      }
    </>
  );
}