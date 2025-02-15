import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

// Iniciar quiz
export const iniciarQuiz = async (nome, email) => {
    try {
        const response = await axios.post(`${API_URL}/iniciar`, { nome, email });
        return response.data;
    } catch (error) {
        console.error('Erro ao iniciar o quiz:', error.response?.data || error.message);
        throw error;
    }
};

// Buscar pergunta por número
export const buscarPergunta = async (numero) => {
    try {
        const response = await axios.get(`${API_URL}/perguntas/${numero}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar pergunta:', error.response?.data || error.message);
        throw error;
    }
};

// Enviar respostas do quiz
export const enviarRespostas = async (id_quiz, respostas) => {
    try {
        const response = await axios.post(`${API_URL}/enviar`, { id_quiz, respostas });
        return response.data;
    } catch (error) {
        console.error('Erro ao enviar respostas:', error.response?.data || error.message);
        throw error;
    }
};

// Enviar email com resultado do quiz
export const enviarEmailResultado = async (idQuiz) => {
    try {
        const response = await axios.get(`${API_URL}/email/${idQuiz}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao enviar email:', error.response?.data || error.message);
        throw error;
    }
};
