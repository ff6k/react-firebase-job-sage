import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
// import { logoutUser } from 'app/auth/store/userSlice';

const useStyles = makeStyles(theme => ({
	root: {
		background: `radial-gradient(${darken(theme.palette.primary.dark, 0.5)} 0%, ${theme.palette.primary.dark} 80%)`,
		color: theme.palette.primary.contrastText
	}
}));

function MailConfirmPage() {
	const dispatch = useDispatch();
	const classes = useStyles();
	const authUser = useSelector(({ auth }) => auth.register.authUser); 

	function resendEmail() {
		authUser && authUser.sendEmailVerification();
	}

	function backToLogin() {
		// dispatch(logoutUser);
	}

	return (
		<div className={clsx(classes.root, 'flex flex-col flex-auto flex-shrink-0 items-center justify-center p-32')}>
			<div className="flex flex-col items-center justify-center w-full">
				<FuseAnimate animation="transition.expandIn">
					<Card className="w-full max-w-384 rounded-8">
						<CardContent className="flex flex-col items-center justify-center p-32">
							<div className="m-32">
								<Icon className="text-96" color="action">
									email
								</Icon>
							</div>

							<Typography variant="h5" className="text-center mb-16">
								Welcome
							</Typography>

							<Typography className="text-center mb-16 w-full" color="textSecondary">
							We sent an email to <b>{authUser && authUser.email}</b>.
							</Typography>

							<Typography className="text-center w-full" color="textSecondary">
								Check your inbox to activate your account.
							</Typography>

							<Button
									variant="contained"
									color="primary"
									className="w-224 mx-auto mt-16 mb-16"
									aria-label="Reset"									
									onClick={resendEmail}
								>
									Resend email
							</Button>

							<Typography className="text-center mb-16 w-full" color="textSecondary">
								Not getting the email?
							</Typography>

							<Typography className="text-center w-full" color="textSecondary">
								Check your spam/junk folder.
							</Typography>

							{/* <div className="flex flex-col items-center justify-center pt-32 pb-24">
								<Link className="font-medium" onClick={backToLogin}>
									Go back to login
								</Link>
							</div> */}

						</CardContent>
					</Card>
				</FuseAnimate>
			</div>
		</div>
	);
}

export default MailConfirmPage;
