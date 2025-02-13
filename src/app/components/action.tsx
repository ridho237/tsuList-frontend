import { Button } from '@heroui/react';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface Anime {
	_id: string;
	name: string;
	score: number;
	genres: string;
	episode: string;
	year: string;
	image: string;
	status: string;
	progEps: number;
}

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

interface ActionProps {
	readonly anime?: Anime;
	readonly drama?: Drama;
}

export default function Action({ anime, drama }: ActionProps) {
	const [status] = useState<string>('plan_to_watch');
	const [progEps] = useState<number>(0);
	const [numberList] = useState<number>(1);

	const handleAddAnime = async () => {
		toast.loading('Adding anime...');
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/anime/add`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...anime,
					status,
					progEps,
					numberList,
				}),
			});

			const result = await response.json();

			if (!response.ok) throw new Error(result.message || 'Gagal menambah kelist');

			toast.dismiss();
			toast.success('Anime added successfully');
		} catch (err: unknown) {
			toast.dismiss();
			toast.error(err instanceof Error ? err.message : 'Anime Sudah ada dilistmu');
		}
	};

	const handleAddDrama = async () => {
		toast.loading('Adding drama...');
		try {
			const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/drama/add`, {
				method: 'POST',
				credentials: 'include',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({
					...drama,
					status,
					progEps,
					numberList,
				}),
			});

			const result = await response.json();

			if (!response.ok) throw new Error(result.message || 'Gagal menambah kelist');

			toast.dismiss();
			toast.success('Drama added successfully');
		} catch (err: unknown) {
			toast.dismiss();
			toast.error(err instanceof Error ? err.message : 'Drama Sudah ada dilistmu');
		}
	};

	return (
		<div className='flex flex-col gap-2'>
			{anime && (
				<Button
					className='bg-thirdo hover:bg-secondo text-white'
					onPress={handleAddAnime}
				>
					Add to List
				</Button>
			)}

			{drama && (
				<Button
					className='bg-thirdo hover:bg-secondo text-white'
					onPress={handleAddDrama}
				>
					Add to List
				</Button>
			)}
		</div>
	);
}
