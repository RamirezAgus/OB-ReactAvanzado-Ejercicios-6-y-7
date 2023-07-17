import React, { useState } from 'react';
import './App.css';
import { withServiceWorkerUpdater } from '@3m1/service-worker-updater';

const App = (props) => {

  const { newServiceWorkerDetected, onLoadNewServiceWorkerAccept  } = props;

  const [newItem, setNewItem] = useState("");
  const [items, setItems] = useState([]);

  const addNewItem = () => {
    setItems([...items, newItem]);
    setNewItem('')
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>**Proyecto  PWA - Lista de compra V8 **</h1>
          {newServiceWorkerDetected && <div>
          <h3>¡Nueva Actualización! Quieres actualizar?</h3>
          <button onClick={onLoadNewServiceWorkerAccept} >Actualizar</button>
        </div>}
        <input type='text' onKeyPress={(e) => e.key === 'Enter' && addNewItem()} onChange={(e) => setNewItem(e.target.value)} value={newItem}/>
        <button onClick={addNewItem}>Añadir</button>
        <ul>
          {
            items.map((item, key) => 
              <li key={key}>
                {item}
              </li>
              )
          }
        </ul>
      </header>
    </div>
  );
}

export default withServiceWorkerUpdater(App);
