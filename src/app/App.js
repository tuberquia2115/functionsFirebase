import React, { useEffect, useState } from 'react';
import firebase from 'firebase';

import './App.css';
import UploadFile from '../componets/formFile/FormFile';

const App = () => {
  const [valor, setValor] = useState()
  const collections = () => {
    const result = firebase.firestore().collection("verduras").get()
    result.then(data => {
      const verdurasData = data.docs.map(snapshot => ({
        ...snapshot.data()
      }))
      setValor(verdurasData)
      console.log("esta es la data de valur", verdurasData)
    })
  }
  return (
    <div className="App">
      <div>
        <button onClick={() => collections()}>traer la data</button>

        <div>
          <table>
            <tbody>
              <tr>
                <th>NOMBRE</th>
                <th>PRECIO</th>
                <th>CANTIDAD</th>
              </tr>
              {Array.isArray(valor) && valor.map((value, key) => {
                return (
                  <tr key={key}>
                    <td>{value.nombre}</td>
                    <td>{value.precio}</td>
                    <td>{value.cantidad}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      <UploadFile />
    </div>
  );
}

export default App;
