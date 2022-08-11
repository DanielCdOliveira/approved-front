import styled from "styled-components"

import StudyItem from "./StudyItem";
export default function StudiesList({dayOfWeek, planners}) {
    
console.log(dayOfWeek, planners);


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
        <h3>nao há nada aqui</h3>
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

`