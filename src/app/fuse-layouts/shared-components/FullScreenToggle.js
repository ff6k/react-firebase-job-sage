import Icon from '@material-ui/core/Icon';
import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

const useEnhancedEffect = typeof window !== 'undefined' ? React.useLayoutEffect : React.useEffect;

const HeaderFullScreenToggle = props => {
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [userMenu, setUserMenu] = useState(null);

	const userMenuClick = event => {
		setUserMenu(event.currentTarget);
	};

	const userMenuClose = () => {
		setUserMenu(null);
	};

	useEnhancedEffect(() => {
		document.onfullscreenchange = () => setIsFullScreen(document[getBrowserFullscreenElementProp()] != null);

		return () => {
			document.onfullscreenchange = undefined;
		};
	});

	function getBrowserFullscreenElementProp() {
		if (typeof document.fullscreenElement !== 'undefined') {
			return 'fullscreenElement';
		}
		if (typeof document.mozFullScreenElement !== 'undefined') {
			return 'mozFullScreenElement';
		}
		if (typeof document.msFullscreenElement !== 'undefined') {
			return 'msFullscreenElement';
		}
		if (typeof document.webkitFullscreenElement !== 'undefined') {
			return 'webkitFullscreenElement';
		}
		throw new Error('fullscreenElement is not supported by this browser');
	}

	/* View in fullscreen */
	function openFullscreen() {
		const elem = document.documentElement;

		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) {
			/* Firefox */
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
			/* Chrome, Safari and Opera */
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) {
			/* IE/Edge */
			elem.msRequestFullscreen();
		}
	}

	/* Close fullscreen */
	function closeFullscreen() {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		} else if (document.mozCancelFullScreen) {
			/* Firefox */
			document.mozCancelFullScreen();
		} else if (document.webkitExitFullscreen) {
			/* Chrome, Safari and Opera */
			document.webkitExitFullscreen();
		} else if (document.msExitFullscreen) {
			/* IE/Edge */
			document.msExitFullscreen();
		}
	}

	function toggleFullScreen() {
		if (document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement) {
			closeFullscreen();
		} else {
			openFullscreen();
		}
	}

	return (
		<>
			<Button className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6">
				<div className="hidden md:flex flex-col mx-4 items-end">
					<Typography component="span" className="normal-case font-bold flex">
						<Link to='/apps/aboutus'>About us</Link>
					</Typography>
				</div>
			</Button>
			<Button className="min-h-40 min-w-40 px-0 md:px-16 py-0 md:py-6" onClick={userMenuClick}>
				<div className="hidden md:flex flex-col mx-4 items-end">
					<Typography component="span" className="normal-case font-bold flex">
						<Link>Contact us</Link>
					</Typography>
				</div>
			</Button>	
			<Popover
				open={Boolean(userMenu)}
				anchorEl={userMenu}
				onClose={userMenuClose}
				anchorOrigin={{
					vertical: 'bottom',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				classes={{
					paper: 'py-8'
				}}
			>
				<>				
					<MenuItem
						component={Link}
						onClick={() => {
							userMenuClose();
							window.open('https://www.linkedin.com/in/jobsage-simplyai-97836920b');
						}}
						role="button"
					>
						<ListItemText primary="Linkedin" />
					</MenuItem>
				</>
			</Popover>
		</>
	);
};

export default HeaderFullScreenToggle;
