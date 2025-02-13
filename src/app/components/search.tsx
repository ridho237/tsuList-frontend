import { Input } from '@heroui/react';

interface SearchProps {
	readonly searchTerm: string;
	readonly setSearchTerm: (value: string) => void;
}

export default function Search({ searchTerm, setSearchTerm }: SearchProps) {
	return (
		<div className='mb-10 w-full flex justify-center items-center text-white '>
			<Input
				value={searchTerm}
				onChange={(e) => setSearchTerm(e.target.value)}
				classNames={{
					label: ['text-fourtho', 'placeholder:text-fourtho', 'font-semibold'],
					input: ['bg-firsto', 'text-fourtho', 'placeholder:text-fourtho'],
				}}
				label='Search'
				placeholder='Type Anime/Drama name...'
				radius='lg'
			/>
		</div>
	);
}
