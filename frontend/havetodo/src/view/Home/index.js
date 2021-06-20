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
  const [haveLate, setHaveLate] = useState(false);
  const [color, setColor] = useState('var(--azul)');

  async function loadTasks() {
    await api.get(`/task/filter/${filterActived}/11:11:11:11:11:11`)
      .then(response => {
        setTasks(response.data);
      })
  }

  async function lateVerify() {
    await api.get(`/task/filter/late/11:11:11:11:11:11`)
      .then(response => {
        setHaveLate(response.data.length > 0);
      })
  }

  async function colorVerify() {

    let concludeTasksCount;
    let lateTasksCount;
    let allTasksCount;

    await api.get(`/task/filter/late/11:11:11:11:11:11`)
      .then(response => {
        lateTasksCount = response.data.length;
      });
    
    await api.get(`/task/filter/conclude/11:11:11:11:11:11`)
      .then(response => {
        concludeTasksCount = response.data.length;
      });
    
    await api.get(`/task/filter/all/11:11:11:11:11:11`)
      .then(response => {
        allTasksCount = response.data.length;
      });
    
    if(allTasksCount === concludeTasksCount) setColor('var(--verde)');
    if(allTasksCount === lateTasksCount) setColor('var(--vermelho)');
  
  }

  function Notification() {
    setFilterActived('late');
  }

  useEffect(() => {
    loadTasks();
    lateVerify();
    colorVerify();
  }, [filterActived])

  return (  
    <S.Container>
      <Header haveLate={haveLate} clickNotification={Notification} color={color}/>

      <S.FilterArea>

        <a onClick={() => setFilterActived("all")}><Filter title="Todos" actived={filterActived === 'all'}/></a>
        <a onClick={() => setFilterActived("today")}><Filter title="Dia" actived={filterActived === 'today'}/></a>
        <a onClick={() => setFilterActived("week")}><Filter title="Semana" actived={filterActived === 'week'}/></a>
        <a onClick={() => setFilterActived("month")}><Filter title="Mês" actived={filterActived === 'month'}/></a>
        <a onClick={() => setFilterActived("year")}><Filter title="Ano" actived={filterActived === 'year'}/></a>

      </S.FilterArea>

      <h1 color={color}>{filterActived == 'late' ? 'Tarefas Atrasadas' : 'Tarefas'}</h1>

      <S.TaskArea>
        {
          tasks.map(t => (
            <Task title={t.title} when={t.when} category={t.category} isConcluded={t.isConcluded}/>
          ))
        }
      </S.TaskArea>

      <Footer color={color}/>
    </S.Container>
  );
}

export default Home;
