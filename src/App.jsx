import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import SpectralSearchApp from './component/SpectralSearchApp'

function App() {
  const [count, setCount] = useState(0)

  return (

      <SpectralSearchApp />
  )
}

export default App
