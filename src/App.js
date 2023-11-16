import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
 
  const [selectValue, setSelectValue] = useState('maxValue');
  const [answer, setAnswer] = useState('');
  const [inputValue, setInputValue] = useState('')

  const chooseFormula = ( data ) => {

    switch (selectValue) {
      case 'maxValue':
        return(
          setAnswer(Math.max(...data))
        );
      case 'minValue': 
        return(
          setAnswer(Math.min(...data))
        );
    }    
  }

  useEffect(()=>{
    chooseFormula(inputValue.split(',').filter(i => i !== '-' & i !== '').map(i => +i))
  }, [selectValue, inputValue])

  return (
    <div className="mainContainer">
      <div className="infoContainer">
        <div>
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value.replace(/[^0-9,-]/g, ''))}
            placeholder={'Введіть дані'}
          />
          <select 
            value={selectValue} 
            onChange={(event) => {
              setSelectValue(event.target.value)
              console.log('Опція:', `${event.target.value},`, 'Текст:', event.target.options[event.target.selectedIndex].text)
            }}
          >
            <option value="maxValue">Максимальне значення</option>
            <option value="minValue">Мінімальне значення</option>
          </select>
        </div>  
        <div>
          <span>
            {answer}
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
