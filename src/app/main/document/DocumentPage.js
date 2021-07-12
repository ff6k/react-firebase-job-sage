import FuseAnimate from '@fuse/core/FuseAnimate';
import FuseAnimateGroup from '@fuse/core/FuseAnimateGroup';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import React from 'react';
import { useParams } from 'react-router-dom';
import TermsAndConditionsDocument from './TermsAndConditionsDocument'
import PrivacyPolicyDocument from './PrivacyPolicyDocument'

const useStyles = makeStyles(theme => ({
	header: {
		background: `linear-gradient(to left, ${theme.palette.primary.dark} 0%, ${theme.palette.primary.main} 100%)`,
		color: theme.palette.primary.contrastText
	},
	panel: {
		margin: 0,
		borderWidth: '1px 1px 0 1px',
		borderStyle: 'solid',
		borderColor: theme.palette.divider,
		'&:first-child': {
			borderRadius: '16px 16px 0 0'
		},
		'&:last-child': {
			borderRadius: '0 0 16px 16px',
			borderWidth: '0 1px 1px 1px'
		},
		'&$expanded': {
			margin: 'auto'
		}
	},
	expanded: {}
}));

function DocumentPage() {
	const classes = useStyles();
	const routeParams = useParams();
	const documentId = routeParams.id;
	

	return (
		<div className="w-full flex flex-col flex-auto">
			<div
				className={clsx(
					classes.header,
					'flex flex-col flex-shrink-0 items-center justify-center text-center p-16 sm:p-24'
				)}
			>				
				<FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
					<Typography color="inherit" className="text-36 sm:text-56 font-light">
						{documentId==='1' ? 'TERMS & CONDITIONS OF JOBSAGE' : 'Privacy Policy'}
					</Typography>
				</FuseAnimate>				
			</div>

			<div className="flex flex-col flex-1 flex-shrink-0 max-w-xl w-full mx-auto px-16 sm:px-24 py-24 sm:py-32">				
				<FuseAnimateGroup
					enter={{
						animation: 'transition.slideUpBigIn'
					}}
				>
					{
						documentId === '1' ? <TermsAndConditionsDocument /> : <PrivacyPolicyDocument />
					}					
				</FuseAnimateGroup>
			</div>
		</div>
	);
}

export default DocumentPage;
