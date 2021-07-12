import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import React, { useEffect, useState } from 'react';

function Widget1(props) {
	return (
		<Paper className="w-full rounded-8 shadow">
			<div className="flex items-center px-16 h-52 border-b-1">
				<Typography className="text-15 flex w-full" color="black">
					<span className="truncate">{props.widget.label}</span>
				</Typography>
			</div>
			<div className="text-center pt-12 pb-28">
				<Typography className="leading-none text-blue" style={{ fontSize: '3.5rem' }}>
					{props.widget.value}
				</Typography>
				<Typography className="text-15" color="black">
					{props.widget.label}
				</Typography>
				<Typography className="text-12" color="black">
					({props.widget.des})
				</Typography>
			</div>
		</Paper>
	);
}

export default React.memo(Widget1);
