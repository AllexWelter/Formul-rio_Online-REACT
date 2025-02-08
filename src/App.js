import { ToastContainer } from 'react-toastify';
import './App.css';
import { RouteApp } from './route';
import { Questionario } from './pages/Questionario';



function App() {
  return (
    <>
      <ToastContainer />
      <RouteApp />      
    </>
  );
}

export default App;
