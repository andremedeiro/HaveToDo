import React from 'react';
import * as S from './style';

function Task({title, date,  time, category, state}) {
  return (
      <S.Container state={state}>
        <h3>{title}</h3>
        <h4>{date}</h4>
        <h4>{time}</h4>
        <h5>{category}</h5>
      </S.Container>
  );
}

export default Task;
