import { ToastContainer } from 'react-toastify';
import './App.css';
import { RouteApp } from './route';
import { Login } from './pages/Login';


function App() {
  return (
    <>
      <ToastContainer />
      <RouteApp />       
    </>
  );
}

export default App;
