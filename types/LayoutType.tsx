import { ReactNode } from "react";

export interface MainLayoutProps {
	children: ReactNode;
}

export interface SimpleDialogProps {
	data?: any;
	open: boolean;
	onClose: () => void;
}
