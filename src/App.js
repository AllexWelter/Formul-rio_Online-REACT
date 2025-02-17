import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './pages/Inicio';
import Quiz from './pages/Quiz';
import Resultado from './pages/Resultado';
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Inicio />} />
                <Route path="/quiz/:idQuiz" element={<Quiz />} />
                <Route path="/resultado/:idQuiz" element={<Resultado />} />
            </Routes>
        </Router>
    );
}

export default App;