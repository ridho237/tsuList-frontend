'use client';
import { useState, useContext } from 'react';
import { loginUser } from '../../utils/auth';
import { AuthContext } from '../../context/AuthContext';

export default function LoginPage() {
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const auth = useContext(AuthContext);

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setError('');

		try {
			const userData = await loginUser(username, password);

			if (auth) {
				auth.login(userData);
				window.location.replace('/');
			} else {
				console.error('AuthContext is null');
			}
		} catch (error: unknown) {
			if (error instanceof Error) {
				setError(error.message);
			} else {
				setError('Login failed');
			}
			console.error('Login failed:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex justify-center h-screen items-center p-2'>
			<div>
				<form
					onSubmit={handleLogin}
					className='max-w-md mx-auto mt-10 p-6 border-3 border-fourtho rounded-xl bg-firsto'
				>
					<h1 className='text-3xl mb-1 font-bold text-start text-fourtho'>Login</h1>
					<h3 className='text-start text-md mb-5 text-fourtho'>
						Selamat datang di Tsu-List
					</h3>
					{error && <p className='text-red-500 mb-3 text-center'>{error}</p>}
					<input
						type='text'
						placeholder='Username'
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						className='w-full p-2 border-3 border-fourtho rounded-xl mb-2 bg-firsto placeholder:text-thirdo'
						required
					/>
					<input
						type='password'
						placeholder='Password'
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						className='w-full p-2 border-3 border-fourtho rounded-xl mb-2 bg-firsto placeholder:text-thirdo'
						required
					/>
					<button
						type='submit'
						className={`w-full p-2 rounded-xl text-firsto  ${
							loading
								? 'bg-fourtho cursor-not-allowed'
								: 'bg-fourtho hover:bg-thirdo'
						}`}
						disabled={loading}
					>
						{loading ? 'Logging in...' : 'Login'}
					</button>
				</form>
			</div>
		</div>
	);
}
