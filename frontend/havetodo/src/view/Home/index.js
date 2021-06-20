import React, {useState} from 'react';
import * as S from './style';

// Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Filter from '../../components/Filter';
import Task from '../../components/Task';

function Home() {

  const [filterActived, setFilterActived] = useState('today');

  return (
    
    <S.Container>
      <Header/>

      <S.FilterArea>

        <a onClick={() => setFilterActived("all")}><Filter title="Todos" actived={filterActived === 'all'}/></a>
        <a onClick={() => setFilterActived("today")}><Filter title="Dia" actived={filterActived === 'today'}/></a>
        <a onClick={() => setFilterActived("week")}><Filter title="Semana" actived={filterActived === 'week'}/></a>
        <a onClick={() => setFilterActived("month")}><Filter title="Mês" actived={filterActived === 'month'}/></a>
        <a onClick={() => setFilterActived("year")}><Filter title="Ano" actived={filterActived === 'year'}/></a>

      </S.FilterArea>

      <h1>Tarefas</h1>

      <S.TaskArea>

        <Task title="Comprar Pão" date="10/12/2020" time="17h00" category="Vida" state={"var(--verde)"}/>
        <Task title="Pregar na Christus" date="10/12/2020" time="17h00" category="Igreja" state={"var(--vermelho)"}/>
        <Task title="Ir ao Médico" date="10/12/2020" time="17h00" category="Saúde"/>


      </S.TaskArea>

      <Footer/>
    </S.Container>
  );
}

export default Home;
