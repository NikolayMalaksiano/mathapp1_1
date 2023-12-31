import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';

function App() {
 
  const [selectValue, setSelectValue] = useState('maxValue');
  const [answer, setAnswer] = useState('');
  const [inputValue, setInputValue] = useState('')
  const [sortedArray, setSortedArray] = useState([]);

  const calculateGeometricMean = (data) => {
    if (data.length === 0) {
      return NaN;
    }

    const product = data.reduce((accumulator, currentValue) => accumulator * parseFloat(currentValue), 1);
    const geometricMean = Math.pow(product, 1 / data.length);

    return geometricMean;
  }

  const chooseFormula = (data) => {
    switch (selectValue) {
      case 'maxValue':
        setAnswer(Math.max(...data));
        break;
      case 'minValue': 
        setAnswer(Math.min(...data));
        break;
      case 'geometricMean':
        setAnswer(calculateGeometricMean(data));
        break;
      default:
        break;
    }    
  }

  const sortAndDisplay = () => {
    const sortedData = inputValue
      .split(/[\s,]+/)
      .filter((i) => i !== '-' && i !== '')
      .map((i) => +i)
      .sort((a, b) => (selectValue === 'asc' ? a - b : b - a));

    setSortedArray(sortedData);
  };


  useEffect(()=>{
    chooseFormula(inputValue.split(',').filter((i) => i !== '-' && i !== '').map((i) => +i))
  }, [selectValue, inputValue])

  useEffect(() => {
    sortAndDisplay();
  }, [selectValue])

  return (
    <div className="mainContainer">
      <div className="infoContainer">
        <div>
          <input
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value.replace(/[^0-9,-.]/g, ''))}
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
            <option value="asc">Сортування за зростанням</option>
            <option value="desc">Сортування за спаданням</option>
            <option value="geometricMean">Середнє геометричне</option>
          </select>
        </div>  
        

        <div className="numberContainer">
          {selectValue === 'asc' || selectValue === 'desc' ? (
            <table>
              <tbody>
                <tr>
                  {sortedArray.map((number, index) => (
                    <td key={index}>{number}</td>
                 
                    
                ))}
                </tr>
              </tbody>
            </table>
          ) : (

          <span>
            {answer}
          </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
