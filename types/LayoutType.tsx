import { ReactNode } from "react";

export interface MainLayoutProps {
	children: ReactNode;
}

export interface SimpleDialogProps {
  open: boolean;
  onClose: () => void;
}