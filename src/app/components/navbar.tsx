'use client';
import { usePathname } from 'next/navigation';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { logoutUser } from '../utils/auth';
import {
	Navbar,
	NavbarBrand,
	NavbarMenuToggle,
	NavbarContent,
	NavbarItem,
	Link,
	Dropdown,
	DropdownTrigger,
	Avatar,
	DropdownItem,
	DropdownMenu,
	Spinner,
} from '@heroui/react';

export default function App() {
	const pathname = usePathname();
	const auth = useContext(AuthContext);
	const [loading, setLoading] = useState(false);

	const handleLogout = async () => {
		setLoading(true);
		try {
			await logoutUser();
			auth?.logout();
			window.location.replace('/');
		} catch (error) {
			console.error('Logout failed:', error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Navbar
			maxWidth='full'
			className='flex justify-center w-full mx-auto bg-firsto border-b-3 border-fourtho'
		>
			<NavbarContent
				className='sm:hidden'
				justify='start'
			>
				<NavbarMenuToggle />
				<NavbarBrand>
					<Link
						href='/'
						className='text-fourtho font-semibold'
					>
						TsuList
					</Link>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent
				className='hidden sm:flex gap-4'
				justify='center'
			>
				<NavbarBrand>
					<Link
						href='/'
						className='text-fourtho font-semibold'
					>
						TsuList
					</Link>
				</NavbarBrand>
				<NavbarItem isActive={pathname === '/'}>
					<Link
						href='/'
						className='text-fourtho'
					>
						Home
					</Link>
				</NavbarItem>
				<NavbarItem isActive={pathname === '/#anime'}>
					<Link
						href='/#anime'
						className='text-fourtho'
					>
						Anime
					</Link>
				</NavbarItem>
				<NavbarItem isActive={pathname === '/#drama'}>
					<Link
						href='/#drama'
						className='text-fourtho'
					>
						Drama
					</Link>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent justify='end'>
				{auth?.user ? (
					<Dropdown placement='bottom-end'>
						<DropdownTrigger>
							<Avatar
								isBordered
								as='button'
								className='transition-transform'
								src={auth.user.profileImage ?? '/default-avatar.png'}
								alt={auth.user.username ?? 'User'}
							/>
						</DropdownTrigger>
						<DropdownMenu
							aria-label='Profile Actions'
							variant='flat'
						>
							<DropdownItem key='profile'>
								Welcome, {auth.user.username ?? 'User'}!
							</DropdownItem>
							<DropdownItem
								key='profiles'
								href='/profile'
							>
								Profile
							</DropdownItem>
							<DropdownItem
								key='animelist'
								href='/anime'
							>
								Your Animelist
							</DropdownItem>
							<DropdownItem
								key='dramalist'
								href='/drama'
							>
								Your Dramalist
							</DropdownItem>
							<DropdownItem
								key='logout'
								color='danger'
								onPress={handleLogout}
							>
								{loading ? (
									<Spinner
										size='sm'
										color='white'
									/>
								) : (
									'Log Out'
								)}
							</DropdownItem>
						</DropdownMenu>
					</Dropdown>
				) : (
					<>
						<Link
							href='/login'
							className='text-fourtho mr-4'
						>
							Login
						</Link>
						<Link
							href='/register'
							className='bg-fourtho text-firsto px-3 py-1 rounded-lg'
						>
							Register
						</Link>
					</>
				)}
			</NavbarContent>
		</Navbar>
	);
}
