"use client";

import React from "react";
import { usePathname } from "next/navigation";

import {
	Box,
	Link,
	List,
	ListItem,
	ListItemButton,
	ListItemIcon,
	ListItemText,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";

const linkTitles = [
	{ title: "建立活動", link: "/organizer/activity-create" },
	{ title: "活動列表", link: "/organizer/activity-list" },
	{ title: "過往活動", link: "#" },
	{ title: "主揪管理", link: "#" },
];

function LeftMenu() {
	const pathname = usePathname() || "";

	return (
		<Box>
			<nav aria-label="main mailbox folders">
				<List>
					<Link href={linkTitles[0].link}>
						<ListItem disablePadding>
							<ListItemButton
								selected={pathname.startsWith(linkTitles[0].link)}
							>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary="建立活動" />
							</ListItemButton>
						</ListItem>
					</Link>

					<Link href={linkTitles[1].link}>
						<ListItem disablePadding>
							<ListItemButton
								selected={pathname.startsWith(linkTitles[1].link)}
							>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary="活動列表" />
							</ListItemButton>
						</ListItem>
					</Link>

					<Link href={linkTitles[2].link}>
						<ListItem disablePadding>
							<ListItemButton
								selected={pathname.startsWith(linkTitles[2].link)}
							>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary="過往活動" />
							</ListItemButton>
						</ListItem>
					</Link>

					<Link href={linkTitles[2].link}>
						<ListItem disablePadding>
							<ListItemButton
								selected={pathname.startsWith(linkTitles[3].link)}
							>
								<ListItemIcon>
									<InboxIcon />
								</ListItemIcon>
								<ListItemText primary="主揪管理" />
							</ListItemButton>
						</ListItem>
					</Link>
				</List>
			</nav>
		</Box>
	);
}

export default LeftMenu;
