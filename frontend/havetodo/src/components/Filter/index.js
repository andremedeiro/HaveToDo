import React from 'react';
import * as S from './style';

import filter from '../../assets/filter.svg';

function Filter({title, actived}) {
  return (
      <S.Container actived={actived}>
          <img src={filter} alt="Filter"/>
          <h3>{title}</h3>
      </S.Container>
  );
}

export default Filter;
