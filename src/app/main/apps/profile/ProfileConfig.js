import React from 'react';

const ProfilePageConfig = {
	settings: {
		layout: {
			config: {}
		}
	},
	routes: [
		{
			path: '/pages/profile/profile',
			component: React.lazy(() => import('./Profile'))
		},
		{
			path: '/pages/profile/billing',
			component: React.lazy(() => import('./Billing'))
		},	
		{
			path: '/pages/profile/business',
			component: React.lazy(() => import('./Business'))
		}
	]
};

export default ProfilePageConfig;
