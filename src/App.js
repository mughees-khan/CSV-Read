import React from 'react';
import { useState } from 'react';
import papa from 'papaparse'
import './App.css';

function App() {

  const [columnArray, setColumnArray] = useState([]);
  const [values, setValues] = useState([]);

  const handleFile = (event) => {
    papa.parse(event.target.files[0], {

      complete: function (result) {
        let keys = result.data[0]
        keys = result.data[0].map(v =>
          v.toLowerCase()
            .replace(/ /g, "_")
            .replace(/[\u0300-\u036f()$%^&]/g, "")
            .replace(/[.-]/g, "")
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, "")
        );
        let value = result.data.slice(1)
        let objects = value.map(array => {
          let object = {}
          keys.forEach((key, i) => object[key] = array[i]);
          return object
        })
        var res = objects.map(obj => Object.values(obj))
        var response = Object.keys(objects[0]);

        console.log(response)
        setColumnArray(response);
        setValues(res);
      },
    });
  };

  return (
    <div className='main'>
      <div>
        <div>
          <input
            type='file'
            name='file'
            accept='.csv'
            onChange={handleFile}
          ></input>
        </div>
        <table>
          <thead>
            <tr>
              {columnArray.map((col, i) => (
                <th key={i}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {values.map((v, i) => (
              <tr key={i}>
                {v.map((val, j) => (
                  <td key={j}>{val}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
