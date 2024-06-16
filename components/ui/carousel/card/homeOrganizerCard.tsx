"use client";

import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	Box,
	Card,
	CardContent,
	CardMedia,
	Chip,
	Stack,
	Typography,
	styled,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";

interface Props {
	title: string;
	organizer: string;
	chips: string[];
	image: string;
	star: number;
}

function HomeOrganizerCard({ title, organizer, chips, image, star }: Props) {
	const theme = useTheme();

	return (
		<Box
			sx={{
				maxWidth: 366,
				minWidth: 294,
				mx: "12px",
				display: "flex",
				flexDirection: "column",
				gap: 1,
			}}
		>
			<Card
				variant="outlined"
				sx={{
					border: 2,
					borderRadius: "6px",
					borderColor: "#DFE2EB",
					display: "flex",
					flexDirection: "column",
					gap: "16px",
					p: "24px 12px 0px",
				}}
			>
				<CardMedia
					component="img"
					sx={{
						border: 1,
						borderRadius: "4px",
						borderColor: "#DFE2EB",
					}}
					alt={image}
					width="342"
					height="342"
					image={image}
				/>
				<CardContent
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: "8px",
						p: 0,
					}}
				>
					<CustomTypography
						variant="h5"
						color={theme.palette.secondary.main}
						align="center"
						gutterBottom
						m={0}
					>
						{title}
					</CustomTypography>
					<Stack direction="row" spacing={1} sx={{ justifyContent: "center" }}>
						{chips.map((el, i) => (
							<Chip
								key={i}
								label={el}
								variant="outlined"
								size="small"
								sx={{
									color: theme.palette.secondary.main,
									borderRadius: "8px",
									borderColor: theme.palette.secondary.main,
								}}
							/>
						))}
					</Stack>
				</CardContent>
			</Card>

			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					alignItems: "start",
					gap: "4px",
				}}
			>
				<Typography
					component="h6"
					sx={{ size: 2, color: theme.palette.text.primary, fontWeight: 500 }}
				>
					{organizer}
				</Typography>
				<Stars star={star} />
			</Box>
		</Box>
	);
}

// TODO
const Stars = ({ star }: { star: number }) => {
	const theme = useTheme();
	const stars = Array(5).fill(null);

	return (
		<Stack direction="row" spacing="2px" sx={{ justifyContent: "center" }}>
			{stars.map((_, i) => (
				<FontAwesomeIcon
					key={i}
					icon={faStar}
					size="xs"
					color={theme.palette.secondary.main}
				/>
			))}
		</Stack>
	);
};

const CustomTypography = styled(Typography)({
	"@font-face": {
		fontFamily: "ChenYuluoyan-Thin",
		src: `url('/fonts/ChenYuluoyan-Thin.ttf') format('truetype')`,
	},
	fontFamily: "ChenYuluoyan-Thin",
});

export default HomeOrganizerCard;
