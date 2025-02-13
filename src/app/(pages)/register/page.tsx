'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ImageIcon } from 'lucide-react';
import { registerUser } from '../../utils/auth';

export default function Register() {
	const router = useRouter();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const [message, setMessage] = useState('');
	const [image, setImage] = useState<File | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setLoading(true);
		setError('');
		setMessage('');

		if (password.length < 6) {
			setError('Password harus minimal 6 karakter.');
			setLoading(false);
			return;
		}
		if (password !== confirmPassword) {
			setError('Konfirmasi password tidak cocok.');
			setLoading(false);
			return;
		}

		try {
			await registerUser(username, email, password, image || undefined);
			setMessage('Registrasi berhasil! Redirecting ke login...');
			setTimeout(() => router.push('/login'), 2000);
		} catch (err) {
			if (err instanceof Error) {
				setError(err.message);
			} else {
				setError('Terjadi kesalahan saat registrasi.');
			}
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex justify-center items-center h-screen p-2'>
			<form
				onSubmit={handleSubmit}
				className='max-w-md mx-auto mt-10 p-6 border-3 border-fourtho rounded-xl bg-firsto'
			>
				<h1 className='text-3xl mb-1 font-bold text-start text-fourtho'>Register</h1>
				<h3 className='text-start text-md mb-5 text-fourtho'>
					Selamat datang di Tsu-List
				</h3>
				<input
					type='text'
					placeholder='Username'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className='w-full p-2 border-3 border-fourtho rounded-xl mb-2 bg-firsto placeholder:text-thirdo'
					required
				/>
				<input
					type='email'
					placeholder='Email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
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
				<input
					type='password'
					placeholder='Confirm your password'
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					className='w-full p-2 border-3 border-fourtho rounded-xl mb-2 bg-firsto placeholder:text-thirdo'
					required
				/>

				<label className='flex items-center justify-center gap-2 p-2 border-2 border-dashed border-fourtho rounded-xl cursor-pointer hover:bg-thirdo transition-all mb-4'>
					<ImageIcon className='w-5 h-5 text-fourtho' />
					<span className='text-thirdo'>Upload Profile Picture</span>
					<input
						type='file'
						accept='image/*'
						onChange={(e) => setImage(e.target.files?.[0] || null)}
						className='hidden'
					/>
				</label>

				<div className='flex gap-2'>
					<button
						type='submit'
						className={`w-full p-2 rounded-xl text-firsto  ${
							loading
								? 'bg-fourtho cursor-not-allowed'
								: 'bg-fourtho hover:bg-thirdo'
						}`}
						disabled={loading}
					>
						{loading ? 'Registering....' : 'Register'}
					</button>
				</div>
				{error && <p className='text-red-500 text-sm'>{error}</p>}
				{message && <p className='text-green-500 text-sm'>{message}</p>}
			</form>
		</div>
	);
}
