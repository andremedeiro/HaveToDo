import React, {useState, useEffect} from 'react';
import * as S from './style';

import api from '../../services/api';

// Components
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Filter from '../../components/Filter';
import Task from '../../components/Task';

function Home() {

  const [filterActived, setFilterActived] = useState('all');
  const [tasks, setTasks] = useState([]);

  async function loadTasks() {
    await api.get(`/task/filter/${filterActived}/11:11:11:11:11:11`)
      .then(response => {
        setTasks(response.data);
      })
  }

  useEffect(() => {
    loadTasks();
  }, [filterActived])

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
        {
          tasks.map(t => (
            <Task title={t.title} when={t.when} category={t.category} isConcluded={t.isConcluded}/>
          ))
        }
      </S.TaskArea>

      <Footer/>
    </S.Container>
  );
}

export default Home;
