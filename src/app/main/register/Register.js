import FuseAnimate from '@fuse/core/FuseAnimate';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { darken } from '@material-ui/core/styles/colorManipulator';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import FirebaseRegisterTab from './tabs/FirebaseRegisterTab';

const useStyles = makeStyles(theme => ({
	root: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
			theme.palette.primary.dark,
			0.5
		)} 100%)`,
		color: theme.palette.primary.contrastText
	},
	leftSection: {},
	rightSection: {
		// background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${darken(
		// 	theme.palette.primary.dark,
		// 	0.5
		// )} 100%)`,
		// color: theme.palette.primary.contrastText
	}
}));

function Register() {
	const classes = useStyles();

	return (
		<div
			className={clsx(
				classes.root,
				'flex flex-col flex-auto items-center justify-center flex-shrink-0 p-16 md:p-24'
			)}
		>
			<FuseAnimate animation="transition.expandIn">
				<div className="flex w-full max-w-400 md:max-w-3xl rounded-12 shadow-2xl overflow-hidden">
					<Card
						className={clsx(
							classes.leftSection,
							'flex flex-col w-full max-w-sm items-center justify-center shadow-0'
						)}
						square
					>
						<CardContent className="flex flex-col items-center justify-center w-full py-48 max-w-320">
							<FuseAnimate delay={300}>
								<div className="flex items-center justif-center mb-32">
									<img className="logo-icon w-48" src="assets/images/logos/fuse.svg" alt="logo" />									
								</div>
							</FuseAnimate>
							<FirebaseRegisterTab />
						</CardContent>

						<div className="flex flex-col items-center justify-center pb-32">
							<div>
								<span className="font-medium mr-8">Already have an account?</span>
								<Link className="font-medium" to="/login">
									Login
								</Link>
							</div>
						</div>
					</Card>
					<div className={clsx(classes.rightSection, 'hidden md:flex flex-1 items-center justify-center p-0')} style={{ background: "#fff" }}>
						<img
							src="assets/images/login/image.jpg"
							alt=""
							style={{
								maxWidth: 600,
							}}
						/>
					</div>
				</div>
			</FuseAnimate>
		</div>
	);
}

export default Register;
