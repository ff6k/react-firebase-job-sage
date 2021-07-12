import { authRoles } from 'app/auth';
import ForgotPasswordPage from './ForgotPasswordPage';

const ForgotPasswordPageConfig = {
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
	auth: authRoles.onlyGuest,
	routes: [
		{
			path: '/forgot-password',
			component: ForgotPasswordPage
		}
	]
};

export default ForgotPasswordPageConfig;
