'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Image } from '@heroui/react';

interface Drama {
	_id: string;
	name: string;
	score: number;
	genre: string;
	episode: string;
	year: string;
	image: string;
}

export default function DramaDetail() {
	const { id } = useParams<{ id: string }>();
	const [drama, setDrama] = useState<Drama | null>(null);
	const [error, setError] = useState('');
	const router = useRouter();

	useEffect(() => {
		const fetchDramaById = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_URL}/drama/fetch-drama/${id}`
				);
				if (!response.ok)
					throw new Error(`Failed to fetch drama details: ${response.statusText}`);

				const data: Drama = await response.json();
				setDrama(data);
			} catch (err: unknown) {
				setError(
					err instanceof Error
						? err.message
						: 'An unknown error occurred. Please try again later.'
				);
			}
		};

		if (id) fetchDramaById();
	}, [id]);

	if (error) return <p className='text-red-500'>{error}</p>;
	if (!drama) return <p>Loading drama details...</p>;

	return (
		<div className='container mx-auto w-auto h-auto flex flex-col items-center bg-firsto border-x-3 border-fourtho'>
			<div className='flex flex-row p-8 justify-center sm:justify-start items-start h-[20px] w-full'>
				<h1 className='text-3xl font-bold text-fourtho'>{drama.name}</h1>
			</div>

			<div className='flex flex-col sm:flex-row justify-between w-full h-[800px] sm:h-[500px]'>
				<div className='flex justify-center sm:justify-start p-8 w-full'>
					<Image
						src={drama.image}
						alt={drama.name}
						className='w-full h-full rounded-xl object-cover shadow-lg hover:scale-105 transition-transform duration-300'
					/>
				</div>
				<div className='flex flex-col justify-between p-8 w-full sm:h-full h-[800px]'>
					<div>
						<p className='text-justify text-fourtho'>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur
							animi qui ipsum eveniet. Modi corporis vitae labore fugit saepe cum
							dolores quia provident, nisi totam aliquid praesentium, officia commodi
							ipsam? (Data Coming Soon)
						</p>
					</div>
					<div>
						<p className='text-fourtho'>Source: (Data Coming Soon)</p>
						<p className='text-fourtho'>Rating: (Data Coming Soon)</p>
						<p className='text-fourtho'>Tags: (Data Coming Soon)</p>
					</div>
				</div>
			</div>

			<div className='h-1 w-full my-4 bg-gradient-to-r from-fourtho via-secondo to-fourtho' />

			<div className='flex flex-col justify-center h-[600px] sm:h-[300px] w-full p-8'>
				<div className='flex flex-col sm:flex-row p-2 justify-around h-[400px] sm:h-auto border-3 rounded-md border-fourtho w-full'>
					<p className='text-fourtho text-sm sm:text-lg'>📅 Aired: {drama.year}</p>
					<p className='text-fourtho text-sm sm:text-lg'>🎭 Genre: {drama.genre}</p>
					<p className='text-fourtho text-sm sm:text-lg'>
						📺 Episodes: {drama.episode}
					</p>
					<p className='text-fourtho text-sm sm:text-lg'>⭐ Score: {drama.score}</p>
				</div>
			</div>

			<div className='h-1 w-full my-4 bg-gradient-to-r from-fourtho via-secondo to-fourtho' />

			<div className='min-h-[500px] w-full md:w-1/2 sm:w-full p-8'>
				<div className='flex flex-col w-full p-8 bg-fourtho rounded-2xl shadow-lg'>
					<h1 className='text-3xl font-semibold text-center text-firsto mb-4'>
						Trailer PV
					</h1>
					<h1 className='text-3xl font-semibold text-center text-firsto mb-4'>
						(Data Coming Soon)
					</h1>

					<div className='relative w-full aspect-video rounded-xl overflow-hidden shadow-md'>
						<iframe
							src='https://www.youtube.com/embed/QczGoCmX-pI?si=WxrovfG79gbQXtTo'
							title='YouTube video player'
							allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
							className='w-full h-full'
						></iframe>
					</div>
				</div>
			</div>

			<div className='flex w-1/2 p-5'>
				<Button
					className='flex border-3 bg-firsto text-fourtho font-semibold border-fourtho rounded- w-full'
					onPress={() => router.push('/')}
				>
					Back
				</Button>
			</div>
		</div>
	);
}
