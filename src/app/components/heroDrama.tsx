import { Image } from '@heroui/react';

export default function Hero() {
	return (
		<div className='mx-auto relative'>
			{/* Gambar */}
			<Image
				alt='hero'
				radius='none'
				src='/dramaHero.jpg'
				width='100%'
				height={300}
				className='object-cover w-full h-[300px] z-0'
			/>

			{/* Teks di Tengah Gambar */}
			<div className='absolute inset-0 flex items-center justify-center z-10'>
				<h1 className='bg-fourtho text-white py-5 px-10 text-5xl font-bold drop-shadow-lg border-4'>
					Drama
				</h1>
			</div>
		</div>
	);
}
