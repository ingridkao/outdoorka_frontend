"use client";

import { Suspense } from "react";
import { useSearchParams, usePathname } from "next/navigation";

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
import Loading from "@/components/ui/loading/loading";

const linkTitles = [
	{ title: "建立活動", link: "/organizer/activity-create/" },
	{ title: "活動列表", link: "/organizer/activity/" },
	{ title: "過往活動", link: "/organizer/activity/?type=2" },
	{ title: "主揪管理", link: "#" },
];

function LeftMenu() {
	const pathname = usePathname() || "";
	const searchParams = useSearchParams()
	const type = searchParams?.get("type")
	
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
								selected={linkTitles[2].link.includes(pathname) && !type}
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
								selected={linkTitles[2].link.includes(pathname) && type == "2"}
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

function WrappedLeftMenu() {
	return (
		<Suspense fallback={<Loading/>}>
			<LeftMenu />
		</Suspense>
	);
}
export default WrappedLeftMenu;
