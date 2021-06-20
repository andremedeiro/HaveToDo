import React, {useMemo} from 'react';
import {format, isPast} from 'date-fns'; 
import * as S from './style';

function Task({title, when, category, isConcluded}) {

  const date = useMemo(() => format(new Date(when), 'dd/MM/yyyy'))
  const time = useMemo(() => format(new Date(when), 'HH:mm'))
  const state = () => {
    let situation = 'var(--azul)';
    if(isPast(new Date(when))) situation = 'var(--vermelho)';
    if(isConcluded) situation = "var(--verde)";
    return situation;
  }

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
