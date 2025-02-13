'use client';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Image } from '@heroui/react';
import { useRouter } from 'next/navigation';
import { ImageIcon } from 'lucide-react';

export default function ProfilePage() {
	const auth = useContext(AuthContext);
	const router = useRouter();
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [profileImage, setProfileImage] = useState('');
	const [file, setFile] = useState<File | null>(null);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState('');

	useEffect(() => {
		const fetchProfile = async () => {
			try {
				const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/profile`, {
					credentials: 'include',
				});
				if (!res.ok) throw new Error('Failed to fetch profile');
				const data = await res.json();
				setUsername(data.username ?? '');
				setEmail(data.email ?? '');
				setProfileImage(data.profileImage ?? '/default-avatar.png');
			} catch (error) {
				console.error(error);
			}
		};

		fetchProfile();
	}, []);

	const handleUpdateProfile = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);
		setMessage('');

		const formData = new FormData();
		formData.append('username', username);
		formData.append('email', email);
		if (file) {
			formData.append('profileImage', file);
		}

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/profile`, {
				method: 'PUT',
				body: formData,
				credentials: 'include',
			});

			const data = await res.json();
			if (res.ok) {
				setMessage('Profile updated successfully');
				auth?.setUser?.(data.user);
			} else {
				setMessage(data.message);
			}
		} catch (error) {
			console.error(error);
			setMessage('Failed to update profile');
		} finally {
			setLoading(false);
		}
	};

	const handleDeleteAccount = async () => {
		if (
			!confirm(
				'Are you sure you want to delete your account? This action cannot be undone.'
			)
		) {
			return;
		}

		setLoading(true);
		setMessage('');

		try {
			const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/profile`, {
				method: 'DELETE',
				credentials: 'include',
			});

			if (res.ok) {
				setMessage('Account deleted successfully. Redirecting...');
				setTimeout(() => {
					auth?.setUser?.(null);
					router.push('/login');
				}, 2000);
			} else {
				const data = await res.json();
				setMessage(data.message);
			}
		} catch (error) {
			console.error(error);
			setMessage('Failed to delete account');
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className='flex justify-center items-center h-screen bg-gray-100'>
			<form className='max-w-md w-full p-6 border-3 border-fourtho rounded-xl bg-white shadow-xl'>
				<h1 className='text-3xl mb-1 font-bold text-center text-fourtho'>
					Edit Profile
				</h1>
				<h3 className='text-center text-md mb-5 text-gray-600'>
					Update your profile information
				</h3>

				<div className='flex flex-col items-center'>
					<Image
						key={profileImage}
						src={profileImage || '/default-avatar.png'}
						alt='Profile'
						width={96}
						height={96}
						className='w-24 h-24 rounded-full mb-3 border-2 border-gray-300'
					/>
					<label className='flex items-center gap-2 p-2 border-2 border-dashed border-fourtho rounded-xl cursor-pointer hover:bg-gray-200 transition-all mb-4'>
						<ImageIcon className='w-5 h-5 text-fourtho' />
						<span className='text-gray-500'>Upload New Profile Picture</span>
						<input
							type='file'
							accept='image/*'
							onChange={(e) => setFile(e.target.files?.[0] || null)}
							className='hidden'
						/>
					</label>
				</div>

				<input
					type='text'
					value={username}
					onChange={(e) => setUsername(e.target.value)}
					className='w-full p-2 border-3 text-thirdo border-fourtho rounded-xl mb-2 bg-firsto placeholder-thirdo'
					placeholder='Username'
				/>
				<input
					type='email'
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					className='w-full p-2 border-3 text-thirdo border-fourtho rounded-xl mb-4 bg-firsto placeholder-thirdo'
					placeholder='Email'
				/>

				<button
					onClick={handleUpdateProfile}
					className={`w-full p-2 rounded-xl text-firsto ${
						loading
							? 'bg-fourtho cursor-not-allowed'
							: 'bg-fourtho hover:hover:bg-thirdo'
					}`}
					disabled={loading}
				>
					{loading ? 'Updating...' : 'Save Changes'}
				</button>

				<button
					onClick={handleDeleteAccount}
					className='w-full p-2 mt-4 rounded-xl text-firsto bg-fourtho hover:bg-thirdo'
					disabled={loading}
				>
					{loading ? 'Processing...' : 'Delete Account'}
				</button>

				{message && <p className='text-center text-blue-500 mt-4'>{message}</p>}
			</form>
		</div>
	);
}
