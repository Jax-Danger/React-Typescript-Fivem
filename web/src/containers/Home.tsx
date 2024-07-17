import * as React from 'react';

const Home = () => {
	React.useEffect(() => {
		const handleMessage = (e: any) => {
			const { action, data } = e.data;

			if (action === 'something') {
				console.log('UI has been called!');
			}
		};
		window.addEventListener('message', handleMessage);
		return () => window.removeEventListener('message', handleMessage);
	}, []);

	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div className='text-4xl font-bold text-center'>Edit ok</div>
		</div>
	);
};

export default Home;
