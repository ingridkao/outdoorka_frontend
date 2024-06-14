"use client";

import { useState, SyntheticEvent } from "react";
import { SimpleDialogProps } from "@/types";

import {
	Box,
	Button,
	Tab,
	Tabs,
	Typography,
	Dialog,
	DialogTitle,
	DialogContent,
} from "@mui/material";

function ParticipantDialog(props: SimpleDialogProps) {
	const { onClose, open } = props;
	const [tagValue, setTagValue] = useState(0);
	const handleChange = (event: SyntheticEvent, newValue: number) => {
		setTagValue(newValue);
	};
	return (
		<Dialog 
			onClose={() => onClose()} 
			open={open}
			fullWidth
			maxWidth="sm"
		>
			<DialogTitle>報名會員</DialogTitle>
			<DialogContent sx={{textAlign:"center"}}>
				<Typography variant="h6">活動標題</Typography>
				<Typography variant="body1">時間</Typography>
				<Typography variant="body1">當前報名者人數：3</Typography>
				<Box sx={{ borderBottom: 1, borderColor: "divider", mb:2  }}>
					<Tabs value={tagValue} onChange={handleChange} aria-label="報導狀況">
						<Tab label="已報到" value={0}/>
						<Tab label="未報到" value={1}/>
					</Tabs>
				</Box>				
				<Box >
					{tagValue}
				</Box>
			</DialogContent>
		</Dialog>
	);
}

export default ParticipantDialog;
