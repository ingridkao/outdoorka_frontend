import * as React from "react";
import SvgIcon, { SvgIconProps } from "@mui/material/SvgIcon";

export default function StarFullIcon(props: SvgIconProps) {
	return (
		<SvgIcon {...props}>
			<svg
				width="40"
				height="40"
				viewBox="0 0 40 40"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<mask
					id="mask0_7705_18161"
					maskUnits="userSpaceOnUse"
					x="0"
					y="0"
					width="40"
					height="40"
				>
					<rect width="40" height="40" fill="#D9D9D9" />
				</mask>
				<g>
					<path
						d="M19.9987 24.9167C19.7765 24.9167 19.5681 24.8819 19.3737 24.8125C19.1793 24.7431 18.9987 24.625 18.832 24.4583L11.1654 16.7917C10.8598 16.4861 10.707 16.0972 10.707 15.625C10.707 15.1528 10.8598 14.7639 11.1654 14.4583C11.4709 14.1528 11.8598 14 12.332 14C12.8043 14 13.1931 14.1528 13.4987 14.4583L19.9987 20.9583L26.4987 14.4583C26.8043 14.1528 27.1931 14 27.6654 14C28.1376 14 28.5265 14.1528 28.832 14.4583C29.1376 14.7639 29.2904 15.1528 29.2904 15.625C29.2904 16.0972 29.1376 16.4861 28.832 16.7917L21.1654 24.4583C20.9987 24.625 20.8181 24.7431 20.6237 24.8125C20.4293 24.8819 20.2209 24.9167 19.9987 24.9167Z"
						fill="#22252A"
					/>
				</g>
			</svg>
		</SvgIcon>
	);
}
