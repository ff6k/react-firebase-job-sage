import React from 'react';

const DashboardConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [	
		{
			path: '/apps/dashboard',
			component: React.lazy(() => import('./DashboardApp'))
		},		
	]
};

export default DashboardConfig;
