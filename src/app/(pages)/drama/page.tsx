'use client';
import { useState, useEffect } from 'react';
import { Tabs, Tab, Image } from '@heroui/react';
import AllList from './(component)/allList';
import FinishList from './(component)/finishList';
import PTWList from './(component)/ptwList';
import WatchingList from './(component)/watchingList';

interface Drama {
	_id: string;
	listNumber: number;
	name: string;
	score: number;
	genre: string;
	episode: string;
	year: string;
	img_url: string;
	status: string;
	progEps: number;
}

function Placeholder() {
	return (
		<div className='flex flex-col w-full justify-center items-center mt-24 h-[500px]'>
			<Image
				alt='an image of a picture and directory icon'
				width='300'
				height='300'
				src='/empty.png'
			/>
			<div className='mt-2 text-xl font-semibold text-center text-fourtho'>
				kamu tidak ada List Drama Saat ini
			</div>
		</div>
	);
}

export default function ListPages() {
	const [dramaList, setDramaList] = useState<Drama[]>([]);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchDrama = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/drama`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
				});
				if (!response.ok) throw new Error('Failed to fetch drama list');

				const data: Drama[] = await response.json();
				setDramaList(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An unknown error occurred');
			}
		};
		fetchDrama();
	}, []);

	const updateDramaStatus = (id: string, newStatus: string) => {
		setDramaList((prevList) =>
			prevList.map((drama) =>
				drama._id === id ? { ...drama, status: newStatus } : drama
			)
		);
	};

	const updateDramaEps = (id: string, newProgEps: number) => {
		setDramaList((prevList) =>
			prevList.map((anime) =>
				anime._id === id ? { ...anime, progEps: newProgEps } : anime
			)
		);
	};

	const handleDelete = (id: string) => {
		setDramaList((prevList) => prevList.filter((drama) => drama._id !== id));
	};

	return (
		<div className='flex flex-col items-center container w-full mx-auto'>
			<div className='w-full bg-firsto flex justify-center items-center h-[500px]'>
				<h1 className='text-fourtho font-bold text-2xl sm:text-5xl'>
					Your Drama List
				</h1>
			</div>

			<div className='flex w-full flex-col h-full'>
				<Tabs
					aria-label='Options'
					classNames={{
						tabList:
							'gap-1 sm:gap-6 w-full relative rounded-none p-0 border-divider bg-fourtho',
						cursor: 'w-full bg-firsto',
						tab: 'w-full h-12',
						tabContent:
							'text-[10px] sm:text-lg group-data-[selected=true]:text-fourtho text-firsto font-bold',
					}}
					variant='bordered'
				>
					<Tab
						key='all'
						title='All'
					>
						<div className='relative min-h-[300px] flex flex-col justify-center items-center'>
							{dramaList.length > 0 ? (
								<AllList
									dramaList={dramaList}
									onUpdateEps={updateDramaEps}
									onUpdate={updateDramaStatus}
									onDelete={handleDelete}
								/>
							) : (
								<Placeholder />
							)}
						</div>
					</Tab>

					<Tab
						key='watching'
						title='Watching'
					>
						<div className='relative min-h-[300px] flex flex-col justify-center items-center'>
							{dramaList.some((drama) => drama.status === 'watching') ? (
								<WatchingList
									dramaList={dramaList}
									onUpdateEps={updateDramaEps}
									onUpdate={updateDramaStatus}
									onDelete={handleDelete}
								/>
							) : (
								<Placeholder />
							)}
						</div>
					</Tab>

					<Tab
						key='completed'
						title='Completed'
					>
						<div className='relative min-h-[300px] flex flex-col justify-center items-center'>
							{dramaList.some((drama) => drama.status === 'completed') ? (
								<FinishList
									dramaList={dramaList}
									onUpdateEps={updateDramaEps}
									onUpdate={updateDramaStatus}
									onDelete={handleDelete}
								/>
							) : (
								<Placeholder />
							)}
						</div>
					</Tab>

					<Tab
						key='planToWatch'
						title='Plan To Watch'
					>
						<div className='relative min-h-[300px] flex flex-col justify-center items-center'>
							{dramaList.some((drama) => drama.status === 'plan_to_watch') ? (
								<PTWList
									dramaList={dramaList}
									onUpdateEps={updateDramaEps}
									onUpdate={updateDramaStatus}
									onDelete={handleDelete}
								/>
							) : (
								<Placeholder />
							)}
						</div>
					</Tab>
				</Tabs>
			</div>

			{/* Error Message */}
			{error && <p className='text-red-500 mt-4'>{error}</p>}
		</div>
	);
}
