import React from 'react';

const AboutusConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [		
		{
			path: '/apps/aboutus',
			component: React.lazy(() => import('./Aboutus'))
		},
	]
};

export default AboutusConfig;
