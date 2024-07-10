import SvgIcon from "@mui/material/SvgIcon";

export default function ProfileIcon(props: any) {
  const fillColor = props.fillcolor ? props.fillcolor : "#D9D9D9";
  return (
    <SvgIcon {...props}>
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g>
          <path
            d="M4 19V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C12.6167 13 13.225 13.0375 13.825 13.1125C14.425 13.1875 15.025 13.3083 15.625 13.475L13.95 15.175C13.6167 15.125 13.2917 15.0833 12.975 15.05C12.6583 15.0167 12.3333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18H12V20H5C4.71667 20 4.47917 19.9042 4.2875 19.7125C4.09583 19.5208 4 19.2833 4 19ZM14 20V18.75C14 18.4833 14.0542 18.2292 14.1625 17.9875C14.2708 17.7458 14.4167 17.5333 14.6 17.35L19.525 12.425C19.675 12.275 19.8417 12.1667 20.025 12.1C20.2083 12.0333 20.3917 12 20.575 12C20.775 12 20.9667 12.0375 21.15 12.1125C21.3333 12.1875 21.5 12.3 21.65 12.45L22.575 13.375C22.7083 13.525 22.8125 13.6917 22.8875 13.875C22.9625 14.0583 23 14.2417 23 14.425C23 14.6083 22.9667 14.7958 22.9 14.9875C22.8333 15.1792 22.725 15.35 22.575 15.5L17.65 20.425C17.4667 20.6083 17.2542 20.75 17.0125 20.85C16.7708 20.95 16.5167 21 16.25 21H15C14.7167 21 14.4792 20.9042 14.2875 20.7125C14.0958 20.5208 14 20.2833 14 20ZM15.5 19.5H16.45L19.475 16.45L19.025 15.975L18.55 15.525L15.5 18.55V19.5ZM19.025 15.975L18.55 15.525L19.475 16.45L19.025 15.975ZM12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z"
            fill={fillColor}
          />
        </g>
      </svg>
    </SvgIcon>
  );
}
