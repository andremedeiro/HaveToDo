import React, {useState, useEffect, useMemo} from 'react';
import {format} from 'date-fns'; 
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
  const [isModalTaskVisible, setIsModalTaskVisible] = useState(false);
  const [id, setId] = useState();
  const [isConcluded, setIsConcluded] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [category, setCategory] = useState();
  const [macAddress, setMacAddress] = useState('11:11:11:11:11:11');

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

  function setModalTask(open) {
    setIsModalTaskVisible(open);
  }

  async function save(id) {
    if(id != null) {
      await api.put(`/task/${id}`,{
        macAddress,
        title,
        description,
        when: `${date}T${time}:00.000`,
        category,
        isConcluded
      }).then(() => setModalTask(false))
    } else {
      await api.post('/task',{
        macAddress,
        title,
        description,
        when: `${date}T${time}:00.000`,
        category,
        isConcluded
      }).then(() => setModalTask(false))
    }

    loadTasks();
  }

  async function loadTaskDetails(id) {
    await api.get(`/task/${id}`)
      .then(response => {
        setId(response.data._id);
        setIsConcluded(response.data.isConcluded);
        setTitle(response.data.title);
        setDescription(response.data.description);
        const when = response.data.when;
        setDate(format(new Date(when), 'yyyy-MM-dd'));
        setTime(format(new Date(when), 'HH:mm'));
        setCategory(response.data.category);
      })

    setModalTask(true);
  }

  useEffect(() => {
    loadTasks();
    lateVerify();
    colorVerify();
  }, [filterActived])

  return (  
    <S.Container>
      <Header haveLate={haveLate} clickNotification={Notification} color={color} openTask={() => setModalTask(true)}/>

      <S.FilterArea>

        <a onClick={() => setFilterActived("all")}><Filter title="Todos" actived={filterActived === 'all'}/></a>
        <a onClick={() => setFilterActived("today")}><Filter title="Dia" actived={filterActived === 'today'}/></a>
        <a onClick={() => setFilterActived("week")}><Filter title="Semana" actived={filterActived === 'week'}/></a>
        <a onClick={() => setFilterActived("month")}><Filter title="Mês" actived={filterActived === 'month'}/></a>
        <a onClick={() => setFilterActived("year")}><Filter title="Ano" actived={filterActived === 'year'}/></a>

      </S.FilterArea>

      <h1 style={filterActived === 'late' ? {color:'var(--vermelho)'} : {color:'var(--azul)'}}>{filterActived === 'late' ? 'Tarefas Atrasadas' : 'Tarefas'}</h1>

      <S.TaskArea>
        {
          tasks.map(t => (
            <a onClick={() => loadTaskDetails(t._id)}><Task title={t.title} when={t.when} category={t.category} isConcluded={t.isConcluded}/></a>
          ))
        }
      </S.TaskArea>

      <Footer color={color}/>

      {isModalTaskVisible? <S.FormTask className={isModalTaskVisible? 'active' : ''}>
        <div className="area">
          <div className="title" style={isConcluded? {background: 'var(--verde)'} : {background: 'var(--azul)'}}>
            <h1>{isConcluded? "Tarefa Concluída" : "Tarefa"}</h1>
          </div>
          <div className="form">
            <form>
              <div className="inputs">
                <label>Título da Tarefa</label>
                <input type="text" onChange={e => setTitle(e.target.value)} value={title} maxLength="50" required></input>

                <label>Descrição</label>
                <textarea onChange={e => setDescription(e.target.value)} value={description}></textarea>

                <label>Data</label>
                <input type="date" onChange={e => setDate(e.target.value)} value={date} required></input>

                <label>Hora</label>
                <input type="time" onChange={e => setTime(e.target.value)} value={time} required></input>

                <label>Categoria</label>
                <input type="text" onChange={e => setCategory(e.target.value)} value={category} required></input>
              </div>

              <div className="buttons">
                <div className="action">
                  <a id="conclude-task" style={isConcluded? {color: 'var(--branco)', background: 'var(--vermelho)'} : {color: 'var(--branco)', background: 'var(--verde)'}} onClick={() => setIsConcluded(!isConcluded)} >{isConcluded? "Revogar Conclusão" : "Concluir Tarefa"}</a>
                  <a style={{color: 'var(--branco)', background: 'var(--vermelho)'}}>Excluir Tarefa</a>
                </div>

                <div className="close">
                  <button style={{color: 'var(--cinza)', background: 'none'}} onClick={() => setModalTask(false)}>Cancelar</button>
                  <a style={{color: 'var(--branco)', background: 'var(--azul)'}} onClick={() => save(id)}>Salvar</a>
                </div>
              </div>

            </form>
          </div>
        </div>
      </S.FormTask> : null}


    </S.Container>
  );
}

export default Home;
