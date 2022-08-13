import styled from "styled-components"

import StudyItem from "./StudyItem";

export default function StudiesList({dayOfWeek, planners}) {
    
if(planners.length>0){
    return(
        <List>
            <h2>Estudos do dia:</h2>
            {planners.map((planner)=>{
              return  <StudyItem planner={planner} dayOfWeek={dayOfWeek}/>
            })}
        </List>
    )
}else{
    return(
        <List>
        <h2>Estudos do dia:</h2>
        <h3>Não há planos de estudo para hoje!</h3>
    </List>
    )
}
    
}

const List = styled.ul`
    width: 100%;
    height: 100px;
    h2{
        font-size: 22px;
        font-weight: 700;
    }
    h3{
        margin-top: 20px;
        font-size: 24px;
        font-weight: 700;
        text-align: center;
        color: #555555;
    }
`