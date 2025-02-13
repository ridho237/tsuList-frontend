'use client';
import { useState, useEffect } from 'react';
import { Tabs, Tab, Image } from '@heroui/react';
import AllList from './(component)/allList';
import FinishList from './(component)/finishList';
import PTWList from './(component)/ptwList';
import WatchingList from './(component)/watchingList';

interface Anime {
	_id: string;
	listNumber: number;
	name: string;
	score: number;
	genres: string;
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
				kamu tidak ada List Anime Saat ini
			</div>
		</div>
	);
}

export default function ListPages() {
	const [animeList, setAnimeList] = useState<Anime[]>([]);
	const [error, setError] = useState('');

	useEffect(() => {
		const fetchAnime = async () => {
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/anime`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
				});

				if (!response.ok) throw new Error('Failed to fetch anime list');

				const data: Anime[] = await response.json();
				setAnimeList(data);
			} catch (err) {
				setError(err instanceof Error ? err.message : 'An unknown error occurred');
			}
		};
		fetchAnime();
	}, []);

	const updateAnimeStatus = (id: string, newStatus: string) => {
		setAnimeList((prevList) =>
			prevList.map((anime) =>
				anime._id === id ? { ...anime, status: newStatus } : anime
			)
		);
	};

	const updateAnimeEps = (id: string, newProgEps: number) => {
		setAnimeList((prevList) =>
			prevList.map((anime) =>
				anime._id === id ? { ...anime, progEps: newProgEps } : anime
			)
		);
	};

	const handleDelete = (id: string) => {
		setAnimeList((prevList) => prevList.filter((anime) => anime._id !== id));
	};

	return (
		<div className='flex flex-col items-center container w-full mx-auto bg-firsto'>
			<div className='w-full bg-firsto flex justify-center items-center h-[500px]'>
				<h1 className='text-fourtho font-bold text-2xl sm:text-5xl'>
					Your Anime List
				</h1>
			</div>

			<div className='flex w-full flex-col h-full'>
				<Tabs
					aria-label='Options'
					classNames={{
						tabList:
							'gap-1 sm:gap-6 w-full relative rounded-lg mx-2 border-divider bg-fourtho',
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
							{animeList.length > 0 ? (
								<AllList
									animeList={animeList}
									onUpdate={updateAnimeStatus}
									onUpdateEps={updateAnimeEps}
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
							{animeList.some((anime) => anime.status === 'watching') ? (
								<WatchingList
									animeList={animeList}
									onUpdate={updateAnimeStatus}
									onUpdateEps={updateAnimeEps}
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
							{animeList.some((anime) => anime.status === 'completed') ? (
								<FinishList
									animeList={animeList}
									onUpdate={updateAnimeStatus}
									onUpdateEps={updateAnimeEps}
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
							{animeList.some((anime) => anime.status === 'plan_to_watch') ? (
								<PTWList
									animeList={animeList}
									onUpdate={updateAnimeStatus}
									onUpdateEps={updateAnimeEps}
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
