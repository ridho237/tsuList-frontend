import { useState, useEffect, useCallback } from 'react';

interface Drama {
	_id: string;
	name: string;
	episode: string;
	progEps: number;
}

interface ActionProps {
	readonly drama: Drama;
	readonly onUpdateEps: (id: string, newProgEps: number) => void;
}

export default function Action({ drama, onUpdateEps }: ActionProps) {
	const [progEps, setProgEps] = useState<number>(drama.progEps || 0);

	useEffect(() => {
		setProgEps(drama.progEps);
	}, [drama.progEps]);

	const handleUpdateDrama = useCallback(
		async (updatedEps: number) => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_URL}/drama/updateEps/${drama._id}`,
					{
						method: 'PUT',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ progEps: updatedEps }),
					}
				);

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message || 'Error tidak diketahui');
				}

				onUpdateEps(drama._id, updatedEps);
			} catch (err) {
				console.error(err instanceof Error);
			}
		},
		[drama._id, onUpdateEps]
	);

	useEffect(() => {
		if (progEps !== drama.progEps) {
			const timeout = setTimeout(() => {
				handleUpdateDrama(progEps);
			}, 500);

			return () => clearTimeout(timeout);
		}
	}, [progEps, drama.progEps, handleUpdateDrama]);

	return (
		<div className='bg-firsto border-2 border-fourtho p-2 rounded-xl flex flex-col items-center'>
			<input
				type='range'
				value={progEps}
				onChange={(e) => setProgEps(Number(e.target.value))}
				max={Number(drama.episode)}
				className='w-[140px] cursor-pointer accent-fourtho'
			/>
			<p className='text-sm mt-1 text-fourtho'>
				{progEps} / {drama.episode} Episode
			</p>
		</div>
	);
}
