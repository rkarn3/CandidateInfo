import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import CandidateAdd from './candidateDetails/CandidateAdd'
import CandidateList from './candidateDetails/CandidateList'

function App() {
  const [count, setCount] = useState(0)

 return (
  <>
  {/* <CandidateAdd /> */}
  <CandidateList />
  </>
 )

}

export default App
