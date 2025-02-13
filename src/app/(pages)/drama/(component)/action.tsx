import { useState, useEffect } from 'react';

interface Drama {
	_id: string;
	name: string;
	status: string;
}

interface ActionProps {
	readonly drama: Drama;
	readonly onUpdate: (id: string, newStatus: string) => void;
}

export default function Action({ drama, onUpdate }: ActionProps) {
	const [status, setStatus] = useState<string>(drama.status || 'plan_to_watch');

	useEffect(() => {
		setStatus(drama.status);
	}, [drama.status]);

	const handleUpdateDrama = async (selectedStatus: string) => {
		try {
			setStatus(selectedStatus);

			const response = await fetch(
				`${process.env.NEXT_PUBLIC_URL}/drama/update/${drama._id}`,
				{
					method: 'PUT',
					credentials: 'include',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({ status: selectedStatus }),
				}
			);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.message || 'Error tidak diketahui');
			}

			onUpdate(drama._id, selectedStatus);
		} catch (err) {
			console.error(err instanceof Error);
		}
	};

	return (
		<div className='border-2 p-2 rounded-xl bg-firsto border-fourtho w-full'>
			<p className='text-center text-fourtho'>Status</p>
			<select
				value={status}
				onChange={(e) => handleUpdateDrama(e.target.value)}
				className='w-full bg-fourtho text-firsto text-sm border-2 border-thirdo p-2 rounded-md shadow-sm focus:ring focus:ring-fourtho'
			>
				<option value='watching'>Watching</option>
				<option value='plan_to_watch'>Plan to Watch</option>
				<option value='completed'>Completed</option>
			</select>
		</div>
	);
}
