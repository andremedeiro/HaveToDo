import React, {useState, useEffect} from 'react';
import {format, isPast} from 'date-fns'; 
import * as S from './style';
import Qr from 'qrcode.react';

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
  const [id, setId] = useState('');
  const [isConcluded, setIsConcluded] = useState(false);
  const [title, setTitle] = useState();
  const [description, setDescription] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [category, setCategory] = useState();
  const [macAddress, setMacAddress] = useState(localStorage.getItem('@HaveToDo/macAddress'));
  const [isModalSyncVisible, setIsModalSyncVisible] = useState(false);

  async function loadTasks() {
    await api.get(`/task/filter/${filterActived}/${macAddress}`)
      .then(response => {
        setTasks(response.data);
      })
  }

  async function lateVerify() {
    await api.get(`/task/filter/late/${macAddress}`)
      .then(response => {
        setHaveLate(response.data.length > 0);
      })
  }

  async function colorVerify() {

    let concludeTasksCount;
    let lateTasksCount;
    let allTasksCount;

    await api.get(`/task/filter/late/${macAddress}`)
      .then(response => {
        lateTasksCount = response.data.length;
      });
    
    await api.get(`/task/filter/conclude/${macAddress}`)
      .then(response => {
        concludeTasksCount = response.data.length;
      });
    
    await api.get(`/task/filter/all/${macAddress}`)
      .then(response => {
        allTasksCount = response.data.length;
      });
    
    if(allTasksCount === lateTasksCount && allTasksCount != 0) setColor('var(--vermelho)');
    else if(allTasksCount === concludeTasksCount && allTasksCount != 0) setColor('var(--verde)');
    else setColor('var(--azul)');
  
  }

  function Notification() {
    setFilterActived('late');
  }

  function setModalTask(open) {
    if(open && isModalSyncVisible) setIsModalSyncVisible(false);
    if(!open) {
      setId('');
      setIsConcluded('');
      setTitle('');
      setDescription('');
      setDate('');
      setTime('');
      setCategory('');
    }
    setIsModalTaskVisible(open);
  }

  function setModalSync(open) {
    if(open && isModalTaskVisible) setIsModalTaskVisible(false);
    setIsModalSyncVisible(open);
  }

  async function Save() {
    if(!title) return alert("É preciso informar o título");
    else if(!date) return alert("É preciso informar a data");
    else if(!time) return alert("É preciso informar o dia de finalização");
    if (isPast(new Date(`${date}T${time}:00.000`))) return alert("Esta data já foi passada.");

    if(id != '') {
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
    colorVerify();
  }

  async function Delete() {
    if(id != '') {
      await api.delete(`/task/${id}`).then(() => {
        setModalTask(false);
      })
    } else alert('Não é possível excluir uma tarefa que não existe.');

    loadTasks();
  }

  async function ConcludeTask() {
    if(id != '') {
      await api.put(`/task/${id}/${!isConcluded}`).then(() => {
        setIsConcluded(!isConcluded);
        setModalTask(false);
      })
    } else alert('Não é possível concluir uma tarefa que não existe.');

    loadTasks();
    colorVerify();
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

  async function saveMac() {
    setModalSync(false);
    localStorage.setItem('@HaveToDo/macAddress', macAddress);
    loadTasks();
  }

  useEffect(() => {

    if(!macAddress){
      setModalSync(true);
    }

    loadTasks();
    lateVerify();
    colorVerify();
  }, [filterActived])

  return (



    <S.Container>
      <Header haveLate={haveLate} clickNotification={Notification} color={color} openTask={() => setModalTask(true)} openSync={() => setModalSync(true)}/>

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
                <input type="text" onChange={e => setTitle(e.target.value)} value={title} maxLength="33" required></input>

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
                  <a id="conclude-task" style={isConcluded? {color: 'var(--branco)', background: 'var(--vermelho)'} : {color: 'var(--branco)', background: 'var(--verde)'}} onClick={() => ConcludeTask()} >{isConcluded? "Revogar Conclusão" : "Concluir Tarefa"}</a>
                  <a style={{color: 'var(--branco)', background: 'var(--vermelho)'}} onClick={() => Delete()}>Excluir Tarefa</a>
                </div>

                <div className="close">
                  <button style={{color: 'var(--cinza)', background: 'none'}} onClick={() => setModalTask(false)}>Cancelar</button>
                  <a style={{color: 'var(--branco)', background: 'var(--azul)'}} onClick={() => Save()}>Salvar</a>
                </div>
              </div>

            </form>
          </div>
        </div>
      </S.FormTask> : null}

      {isModalSyncVisible? <S.ModalSync className={isModalSyncVisible? 'active' : ''}>
        <div className="area">
          <div className="title" style={isConcluded? {background: 'var(--verde)'} : {background: 'var(--azul)'}}>
            <h1>Sincronize o Celular</h1>
          </div>
          <div className="qrcode-area">
            <div className="content">
              <Qr className="qrcode" value="getmacaddress" size='150'></Qr>
              <div className="close">
                <S.ValidationCode>
                  <span>Digite a numeração que apareceu no celular:</span>
                  <input type="text" onChange={e => setMacAddress(e.target.value)} value={macAddress}></input>
                  <button style={{color: 'var(--branco)', background: 'var(--azul)'}} onClick={macAddress != null && macAddress.trim().length != 0 ? saveMac : ()=>alert("Por favor, sincronize.")}>Sincronizar!</button>
                </S.ValidationCode>
              </div>
            </div>
          </div>
        </div>

      </S.ModalSync> : null}

    </S.Container>
  );
}

export default Home;
