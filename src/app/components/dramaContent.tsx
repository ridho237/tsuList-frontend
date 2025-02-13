'use client';

import React, { useState, useEffect } from 'react';
import {
	Card,
	CardHeader,
	CardBody,
	Image,
	Button,
	Chip,
	ScrollShadow,
	Spinner,
} from '@heroui/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import Action from './action';
import Search from './search';

interface Drama {
	_id: string;
	name: string;
	score: number;
	genre: string;
	episode: string;
	year: string;
	image: string;
	status: string;
	progEps: number;
}

export default function Content() {
	const [dramaList, setDramaList] = useState<Drama[]>([]);
	const [searchTerm, setSearchTerm] = useState('');
	const [expanded, setExpanded] = useState(false);
	const [maxItems, setMaxItems] = useState(4);
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	const updateMaxItems = () => {
		const width = window.innerWidth;

		if (width >= 1280) {
			setMaxItems(4);
		} else if (width >= 1024) {
			setMaxItems(3);
		} else if (width >= 768) {
			setMaxItems(2);
		} else if (width >= 640) {
			setMaxItems(2);
		} else {
			setMaxItems(1);
		}
	};

	useEffect(() => {
		updateMaxItems();
		window.addEventListener('resize', updateMaxItems);
		return () => window.removeEventListener('resize', updateMaxItems);
	}, []);

	useEffect(() => {
		const fetchDrama = async () => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_URL}/drama/fetch-drama`
				);
				if (!response.ok) throw new Error('Gagal mendapatkan data');

				const data: Drama[] = await response.json();
				setDramaList(data);
			} catch (err) {
				const errorMessage =
					err instanceof Error ? err.message : 'Error tidak diketahui';
				toast.error(`❌ ${errorMessage}`);
			} finally {
				setLoading(false);
			}
		};

		fetchDrama();
	}, []);

	const filteredDrama = dramaList.filter((drama) =>
		drama.name.toLowerCase().includes(searchTerm.toLowerCase())
	);

	return (
		<div
			id='drama'
			className='flex flex-col items-center p-16 bg-firsto mx-auto'
		>
			<Search
				searchTerm={searchTerm}
				setSearchTerm={setSearchTerm}
			/>

			{loading ? (
				<Spinner
					className='h-[600px]'
					color='danger'
					label='Loading Drama...'
				/>
			) : (
				<>
					{filteredDrama.length === 0 ? (
						<p className='text-red-500 mt-10 text-xl font-semibold'>
							Drama tidak ditemukan 😢
						</p>
					) : (
						<>
							<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full'>
								{(expanded ? filteredDrama : filteredDrama.slice(0, maxItems)).map(
									(drama) => (
										<Card
											key={drama._id}
											className='shadow-xl border rounded-lg hover:shadow-2xl bg-firsto'
										>
											<CardHeader className='bg-fourtho text-firsto rounded-t-lg p-3 text-center'>
												<h4 className='font-bold text-xl truncate'>{drama.name}</h4>
											</CardHeader>
											<CardBody className='p-4'>
												<Image
													alt={drama.name}
													src={drama.image}
													className='w-[1000px] h-[200px] sm:h-[400px] rounded-xl object-cover mb-3'
												/>
												<div className='my-5'>
													<ScrollShadow
														hideScrollBar
														className='flex flex-row gap-2'
													>
														{drama.genre.split(',').map((genre) => (
															<Chip
																key={genre}
																className='bg-thirdo text-firsto px-2 py-1 rounded-md'
															>
																{genre.trim()}
															</Chip>
														))}
													</ScrollShadow>
												</div>
												<p className='text-fourtho text-[12px] sm:text-[14px] lg:text-[18px]'>
													<strong>Year:</strong> {drama.year} | <strong>Eps:</strong>{' '}
													{drama.episode}
												</p>
												<p className='mt-2 text-lg font-semibold text-fourtho'>
													⭐ Score: {drama.score}
												</p>
												<div className='flex justify-between mt-4'>
													<Button
														onPress={() => router.push(`/detail/drama/${drama._id}`)}
														className='bg-fourtho text-white px-4 py-2 rounded-lg hover:bg-thirdo'
													>
														Detail
													</Button>
													<Action drama={drama} />
												</div>
											</CardBody>
										</Card>
									)
								)}
							</div>
							{filteredDrama.length > maxItems && (
								<button
									onClick={() => setExpanded(!expanded)}
									className='w-full mt-10 px-6 py-3 bg-fourtho text-firsto hover:bg-thirdo transition'
								>
									{expanded ? 'Show Less' : 'Show More'}
								</button>
							)}
						</>
					)}
				</>
			)}
		</div>
	);
}
