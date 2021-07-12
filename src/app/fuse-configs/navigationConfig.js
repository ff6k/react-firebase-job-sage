import { authRoles } from 'app/auth';
import i18next from 'i18next';

import ar from './navigation-i18n/ar';
import en from './navigation-i18n/en';
import tr from './navigation-i18n/tr';

i18next.addResourceBundle('en', 'navigation', en);
i18next.addResourceBundle('tr', 'navigation', tr);
i18next.addResourceBundle('ar', 'navigation', ar);

const navigationConfig = [
	{
		id: 'jobsage',
		title: 'JobSage',
		translate: 'JOBSAGE',
		type: 'group',
		icon: 'apps',
		children: [
			{
				id: 'analytics-dashboard',
				title: 'Home',
				type: 'item',
				icon: 'assessment',
				url: '/apps/home'
			},
			{
				icon: 'dashboard',
				id: 'project-dashboard',
				title: 'Dashboard',
				type: 'item',
				url: '/apps/dashboard'
			},
			{
				icon: 'upgrade',
				id: 'upgrade',
				title: 'Upgrade',
				type: 'item',
				url: '/pages/profile/profile'
			},
		]
	},
];

export default navigationConfig;
