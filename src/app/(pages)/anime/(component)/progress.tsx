import { useState, useEffect, useCallback } from 'react';

interface Anime {
	_id: string;
	name: string;
	episode: string;
	progEps: number;
}

interface ActionProps {
	readonly anime: Anime;
	readonly onUpdateEps: (id: string, newProgEps: number) => void;
}

export default function Action({ anime, onUpdateEps }: ActionProps) {
	const [progEps, setProgEps] = useState<number>(anime.progEps || 0);

	useEffect(() => {
		setProgEps(anime.progEps);
	}, [anime.progEps]);

	const handleUpdateAnime = useCallback(
		async (updatedEps: number) => {
			try {
				const response = await fetch(
					`${process.env.NEXT_PUBLIC_URL}/anime/updateEps/${anime._id}`,
					{
						method: 'PUT',
						credentials: 'include',
						headers: {
							'Content-Type': 'application/json',
						},
						body: JSON.stringify({ progEps: updatedEps }),
					}
				);

				if (!response.ok) {
					const errorData = await response.json();
					throw new Error(errorData.message || 'Error tidak diketahui');
				}

				onUpdateEps(anime._id, updatedEps);
			} catch (err) {
				console.error(err instanceof Error);
			}
		},
		[anime._id, onUpdateEps]
	);

	useEffect(() => {
		if (progEps !== anime.progEps) {
			const timeout = setTimeout(() => {
				handleUpdateAnime(progEps);
			}, 500);
			return () => clearTimeout(timeout);
		}
	}, [progEps, anime.progEps, handleUpdateAnime]);

	return (
		<div className='bg-firsto border-2 border-fourtho p-2 rounded-xl flex flex-col items-center'>
			<input
				type='range'
				value={progEps}
				onChange={(e) => setProgEps(Number(e.target.value))}
				max={Number(anime.episode)}
				className='w-[140px] cursor-pointer accent-fourtho'
			/>
			<p className='text-sm mt-1 text-fourtho'>
				{progEps} / {anime.episode} Episode
			</p>
		</div>
	);
}
