'use client';
import React, { useState } from 'react';
import {
	Card,
	CardBody,
	Image,
	Button,
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@heroui/react';
import Action from './action';
import Progress from './progress';
import { useRouter } from 'next/navigation';

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

interface Props {
	readonly animeList: Anime[];
	readonly onUpdateEps: (id: string, progEps: number) => void;
	readonly onUpdate: (id: string, newStatus: string) => void;
	readonly onDelete: (id: string) => void;
}

export default function FinishList({
	animeList: initialAnimeList,
	onUpdate,
	onDelete,
	onUpdateEps,
}: Props) {
	const router = useRouter();
	const [animeList, setAnimeList] = useState<Anime[]>(initialAnimeList);
	const completedAnime = animeList.filter((anime) => anime.status === 'completed');

	const handleDelete = async (id: string) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/anime/delete/${id}`,
				{
					method: 'DELETE',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response.ok) throw new Error('Gagal Menghapus Anime');

			const updatedList = animeList.filter((anime) => anime._id !== id);
			const reorderedList = updatedList.map((anime, index) => ({
				...anime,
				listNumber: index + 1,
			}));

			setAnimeList(reorderedList);
			onDelete(id);
		} catch (err) {
			console.error(err instanceof Error);
		}
	};

	return (
		<div className='grid grid-cols-1 gap-4 w-full'>
			{completedAnime.map((anime) => (
				<Card
					key={anime._id}
					className='w-full flex flex-col shadow-lg border-2'
				>
					<CardBody className='flex justify-between w-full flex-row'>
						<div className='flex justify-center items-center w-[50px] sm:w-[100px]'>
							<h1 className='text-2xl text-fourtho font-bold'>{anime.listNumber}</h1>
						</div>
						<div className='px-3'>
							<Image
								alt={anime.name}
								src={anime.img_url}
								className='object-cover rounded-xl w-[200px] h-[200px]'
							/>
						</div>
						<div className='sm:flex hidden sm:flex-col  justify-between w-full px-5'>
							<div>
								<h4 className='text-fourtho font-bold text-xl'>{anime.name}</h4>
								<h3 className='text-fourtho'>Score: {anime.score}</h3>
							</div>
							<div>
								<h3 className='text-fourtho'>Source: (Data Coming Soon)</h3>
							</div>
						</div>
						<div className='flex flex-col justify-between items-center'>
							<Popover placement='left'>
								<PopoverTrigger>
									<Button className='w-full bg-fourtho text-firsto'>Options</Button>
								</PopoverTrigger>
								<PopoverContent>
									<div className='flex flex-col gap-2 px-1 py-2'>
										<Button
											className='bg-fourtho text-firsto'
											onPress={() => router.push(`/anime/${anime._id}`)}
										>
											Detail
										</Button>
										<Button
											className='bg-fourtho text-firsto'
											onPress={() => handleDelete(anime._id)}
										>
											Delete
										</Button>
									</div>
								</PopoverContent>
							</Popover>

							<div className='flex w-full'>
								<Progress
									anime={anime}
									onUpdateEps={onUpdateEps}
								/>
							</div>

							<Action
								anime={anime}
								onUpdate={onUpdate}
							/>
						</div>
					</CardBody>
				</Card>
			))}
		</div>
	);
}
