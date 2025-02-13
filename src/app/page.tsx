import { Toaster } from 'react-hot-toast';
import AnimeContent from './components/animeContent';
import DramaContent from './components/dramaContent';
import AnimeHero from './components/heroAnime';
import DramaHero from './components/heroDrama';

export default function Home() {
	return (
		<main>
			<Toaster />
			<AnimeHero></AnimeHero>
			<AnimeContent></AnimeContent>
			<DramaHero></DramaHero>
			<DramaContent></DramaContent>
		</main>
	);
}
