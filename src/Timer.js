import React, {useState, useEffect, useRef} from 'react';
import './Timer.css'

const Timer = () => {
  const [segundos, setSegundos] = useState(0);
  const [activo, setActivo] = useState(false);
  const [tipo, setTipo] = useState("contador")
  
  const myRef = useRef(null);

  function agregarSegundos(){
    let ref = myRef.current.value;
    setSegundos(ref)
    //esto reemplaza al e.target.value
  }

  function toggle (){
    setActivo(!activo)
  }
  function reset (){
    setSegundos(0);
    setActivo(false);
  }

  function cambioTipo (){
    if (tipo === "contador"){setTipo("cuenta regresiva")}
    if (tipo === "cuenta regresiva"){setTipo("contador")} }
  
  useEffect(() => {
    let intervalo = null;
    if (activo && tipo === 'contador') {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos + 1);
      }, 1000);
    }
    if (!activo && segundos !== 0 && tipo === 'contador') {
      clearInterval(intervalo);
    }  
    
    if (activo && tipo === 'cuenta regresiva') {
      intervalo = setInterval(() => {
        setSegundos(segundos => segundos - 1);
      }, 1000);
    }
    if (segundos === 0 && tipo === 'cuenta regresiva') {
      reset();
      myRef.current.value = ""
      clearInterval(intervalo);
    }

    return () => clearInterval(intervalo);
  }, [activo, segundos, tipo]);

  return (
    <div className="app">
      <div className="time">
        {segundos} s
      </div>
      <div className="row">
        <button className={`button-primary-${activo ? 'active' : 'inactive'}`} onClick={toggle}>
          {activo ? "Pausa" : "Inicio"} 
        </button>
        <button className="button-secondary" onClick={reset}>
          Reset
        </button>
      </div>
      <button className="button" onClick={cambioTipo}>
          {tipo}
      </button>
      { tipo === "cuenta regresiva" && <input type="number" ref={myRef} onChange={agregarSegundos} placeholder="Ingresa Segundos" autoComplete="off"/>} 
      {/* */}
     
      
    </div>
  );
};

export default Timer;
 