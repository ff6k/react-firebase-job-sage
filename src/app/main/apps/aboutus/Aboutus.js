import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Icon from '@material-ui/core/Icon';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Slide from '@material-ui/core/Slide';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';
import clsx from 'clsx';
import React, { useEffect, useMemo, useState } from 'react';


const useStyles = makeStyles(theme => ({
	header: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.primary.contrastText
	}
}));

function Aboutus() {
	const classes = useStyles();

	return (
		<div className="w-full">
			<div
				className={clsx(
					classes.header,
					'flex flex-col items-center justify-center text-center p-16 sm:p-24'
				)}
			>
				<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
					<Typography color="inherit" className="text-36 sm:text-56 font-light">
						About us
					</Typography>
				</FuseAnimate>

				{/* <FuseAnimate duration={400} delay={600}>
					<Typography variant="subtitle1" color="inherit" className="opacity-75 mt-16 mx-auto max-w-512">
						Welcome to JOB SAGE
					</Typography>
				</FuseAnimate> */}
			</div>

			<div>
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
					className="flex flex-wrap justify-center max-w-xl w-full mx-auto px-16 sm:px-24 py-32"
				>
					<img
						src="assets/images/aboutus/main.png"
						alt=""
						style={{
							width: '100%'
						}}
						className="rounded-6"
					/>
				</FuseAnimateGroup>
			</div>
		</div>
	);
}

export default Aboutus;
