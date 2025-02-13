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

interface Props {
	readonly dramaList: Drama[];
	readonly onUpdateEps: (id: string, progEps: number) => void;
	readonly onUpdate: (id: string, newStatus: string) => void;
	readonly onDelete: (id: string) => void;
}

export default function FinishList({
	dramaList: initialDramaList,
	onUpdate,
	onDelete,
	onUpdateEps,
}: Props) {
	const router = useRouter();
	const [dramaList, setDramaList] = useState<Drama[]>(initialDramaList);
	const completedDrama = dramaList.filter((drama) => drama.status === 'completed');

	const handleDelete = async (id: string) => {
		try {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/drama/delete/${id}`,
				{
					method: 'DELETE',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
				}
			);

			if (!response.ok) throw new Error('Gagal Menghapus Drama');

			const updatedList = dramaList.filter((drama) => drama._id !== id);
			const reorderedList = updatedList.map((drama, index) => ({
				...drama,
				listNumber: index + 1,
			}));

			setDramaList(reorderedList);
			onDelete(id);
		} catch (err) {
			console.error(err instanceof Error);
		}
	};

	return (
		<div className='grid grid-cols-1 gap-4 w-full'>
			{completedDrama.map((drama) => (
				<Card
					key={drama._id}
					className='w-full flex flex-col shadow-lg border-2'
				>
					<CardBody className='flex justify-between w-full flex-row'>
						<div className='flex justify-center items-center w-[50px] sm:w-[100px]'>
							<h1 className='text-2xl text-fourtho font-bold'>{drama.listNumber}</h1>
						</div>
						<div className='px-3'>
							<Image
								alt={drama.name}
								src={drama.img_url}
								className='object-cover rounded-xl w-[200px] h-[200px]'
							/>
						</div>
						<div className='sm:flex hidden sm:flex-col  justify-between w-full px-5'>
							<div>
								<h4 className='text-fourtho font-bold text-xl'>{drama.name}</h4>
								<h3 className='text-fourtho'>Score: {drama.score}</h3>
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
											onPress={() => router.push(`/drama/${drama._id}`)}
										>
											Detail
										</Button>
										<Button
											className='bg-fourtho text-firsto'
											onPress={() => handleDelete(drama._id)}
										>
											Delete
										</Button>
									</div>
								</PopoverContent>
							</Popover>

							<div className='flex w-full'>
								<Progress
									drama={drama}
									onUpdateEps={onUpdateEps}
								/>
							</div>

							<Action
								drama={drama}
								onUpdate={onUpdate}
							/>
						</div>
					</CardBody>
				</Card>
			))}
		</div>
	);
}
