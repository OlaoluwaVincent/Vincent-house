import { Player } from '@lottiefiles/react-lottie-player';

const Loading = () => {
	return (
		<Player
			src='https://assets8.lottiefiles.com/packages/lf20_Cemmpu.json'
			loop
			autoplay={true}
			style={{ width: '150px', height: '150px' }}
		/>
	);
};

export default Loading;
