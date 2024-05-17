import axios from 'axios';
import { useState, useEffect } from 'react';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [user, setUser] = useState(null);
    const [token, setToken] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                'http://localhost:8080/login',
                { username: username, password: password },
                { headers: { 'Content-Type': 'application/json' } }
            );
            const { token, ...userData } = response.data; 
            setUser(userData);
            setToken(token);
            localStorage.setItem('token', token); 
            setError('');
        } catch (error) {
            if (!error.response) {
                setError('Erro ao acessar o servidor');
            } else if (error.response.status === 401) {
                setError('Usuário ou senha inválidos');
            } else {
                setError('Erro desconhecido');
            }
        }

        setUsername('');
        setPassword('');
    };

    const handleLogout = () => {
        setUser(null);
        setToken('');
        setError('');
    };

    useEffect(() => {
        const interceptor = axios.interceptors.request.use(
            (config) => {
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => {
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(interceptor);
        };
    }, [token]); 


    return (
        <div className="login-form-wrap">
            {user === null ? (
                <div>
                    <h2>Login</h2>
                    <form className='login-form' onSubmit={handleLogin}>
                        <input
                            type="username"
                            name="username"
                            placeholder="Username"
                            required
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            type="submit"
                            className='btn-login'
                        >
                            Login
                        </button>
                    </form>
                    <p>{error}</p>
                </div>
            ) : (
                <div>
                    <h2>Olá, {user.username}</h2>
                    <button
                        type="button"
                        className='btn-login'
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

export default Login;
