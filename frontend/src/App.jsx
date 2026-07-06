// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'
import {Toaster, toast} from 'sonner';
import {BrowserRouter, Routes, Route} from 'react-router';
import HomePage from './pages/Homepage';
import NotFound from './pages/NotFound';



function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
      
        <Routes>
          <Route
            path="/"
            element={<HomePage/>}
          />
        <Route
            path="*"
            element={<NotFound/>}
          />
        {/* <Route
            path="/login"
            element={<Loginpage/>}
          /> */}
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
