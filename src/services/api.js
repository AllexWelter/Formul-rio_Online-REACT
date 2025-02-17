import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000/api'
});

export const iniciarQuiz = async (nome, email) => {
    try {
        const response = await api.post('/iniciar', { nome, email });
        return response.data;
    } catch (error) {
        console.error('Erro ao iniciar o quiz:', error.response?.data || error.message);
        throw error;
    }
};

export const buscarPergunta = async (numero) => {
    try {
        const response = await api.get(`/perguntas/${numero}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar pergunta:', error.response?.data || error.message);
        throw error;
    }
};

export const enviarRespostas = async (id_quiz, respostas) => {
    try {
        const response = await api.post('/enviar', { id_quiz, respostas });
        return response.data;
    } catch (error) {
        console.error('Erro ao enviar respostas:', error.response?.data || error.message);
        throw error;
    }
};

export const buscarResultado = async (id_quiz) => {
    try {
        const response = await api.get(`/quiz/resultado/${id_quiz}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar resultado:', error.response?.data || error.message);
        throw error;
    }
};

export const enviarEmailResultado = async (idQuiz) => {
    try {
        const response = await api.get(`/email/${idQuiz}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao enviar email:', error.response?.data || error.message);
        throw error;
    }
};

export default api;
