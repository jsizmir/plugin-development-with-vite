import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import exampleCSV from './assets/example.csv'
import exampleXLSX from './assets/example.xlsx'

import './App.css'

function App() {

  console.log(exampleCSV, 'csv');
  console.log(exampleXLSX, 'xlsx');
  

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
