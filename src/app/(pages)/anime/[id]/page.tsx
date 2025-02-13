'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Image } from '@heroui/react';

interface Anime {
	_id: string;
	name: string;
	score: number;
	img_url: string;
	genres: string;
	episode: number;
	year: string;
}

export default function AnimeDetail() {
	const { id } = useParams<{ id: string }>();
	const [anime, setAnime] = useState<Anime | null>(null);
	const [error, setError] = useState('');
	const router = useRouter();

	useEffect(() => {
		const fetchAnimeById = async () => {
			console.log('Anime ID:', id);
			if (!id) {
				setError('Anime ID hilang');
				return;
			}
			try {
				const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/anime/${id}`, {
					method: 'GET',
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
				});
				if (!response.ok)
					throw new Error(`Gagal mendapatkan data anime: ${response.statusText}`);

				const data: Anime = await response.json();
				setAnime(data);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: 'Gagal mendapatkan data anime coba lagi'
				);
			}
		};

		if (id) fetchAnimeById();
	}, [id]);

	if (error) return <p className='text-fourtho'>{error}</p>;
	if (!anime) return <p>Loading anime details...</p>;

	return (
		<div className='container mx-auto w-auto h-auto flex flex-col items-center bg-firsto border-x-3 border-fourtho'>
			<div className='flex flex-row p-8 justify-center sm:justify-start items-start h-[20px] w-full'>
				<h1 className='text-3xl font-bold text-fourtho'>{anime.name}</h1>
			</div>

			<div className='flex flex-col sm:flex-row justify-between w-full h-[800px] sm:h-[500px]'>
				<div className='flex justify-center sm:justify-start p-8 w-full'>
					<Image
						src={anime.img_url}
						alt={anime.name}
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
					<p className='text-fourtho text-sm sm:text-lg'>📅 Aired: {anime.year}</p>
					<p className='text-fourtho text-sm sm:text-lg'>🎭 Genre: {anime.genres}</p>
					<p className='text-fourtho text-sm sm:text-lg'>
						📺 Episodes: {anime.episode}
					</p>
					<p className='text-fourtho text-sm sm:text-lg'>⭐ Score: {anime.score}</p>
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
					onPress={() => router.push('/anime')}
				>
					Back
				</Button>
			</div>
		</div>
	);
}
