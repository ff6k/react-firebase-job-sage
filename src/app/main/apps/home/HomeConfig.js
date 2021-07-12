import React from 'react';

const HomeConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/apps/home',
			component: React.lazy(() => import('./HomeApp'))
		},				
	]
};

export default HomeConfig;
