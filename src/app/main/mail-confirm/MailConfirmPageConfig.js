import { authRoles } from 'app/auth';
import MailConfirm from './MailConfirmPage';
import React from 'react';

const MailConfirmPageConfig = {
	settings: {
		layout: {
			config: {
				navbar: {
					display: false
				},
				toolbar: {
					display: false
				},
				footer: {
					display: false
				},
				leftSidePanel: {
					display: false
				},
				rightSidePanel: {
					display: false
				}
			}
		}
	},
	// auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/mail-confirm',
			component: React.lazy(() => import('./MailConfirmPage'))
			// component: MailConfirm
		}
	]
};

export default MailConfirmPageConfig;
