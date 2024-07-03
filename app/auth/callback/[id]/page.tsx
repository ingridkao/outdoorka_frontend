"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "@/plugins/api/axios";
import {
	USER_PROFILE_COOKIE,
	USER_T0KEN_COOKIE,
	removeCookie,
	setCookie,
	setProfileCookie,
} from "@/utils/cookieHandler";
import CircularLoading from "@/components/ui/loading/CircularLoading";

export default function Login({ params }: { params: { id: string } }) {
	const router = useRouter();
	const { user } = axios;

	useEffect(() => {
		if (params.id) {
			setCookie(USER_T0KEN_COOKIE, params.id, 1);
			user
				.getUser()
				.then((res: any) => {
					if (res.data._id) {
						setProfileCookie(
							USER_PROFILE_COOKIE,
							{
								_id: res.data._id,
								name: res.data.name,
								email: res.data.email,
								photo: res.data.photo,
								gender: res.data.gender,
							},
							1,
						);

						router.replace("/");
					} else {
						removeCookie(USER_T0KEN_COOKIE);
						removeCookie(USER_PROFILE_COOKIE);
						router.replace("/login");
					}
				})
				.catch((err: any) => {
					console.error("getUser: ", err);
					removeCookie(USER_T0KEN_COOKIE);
					removeCookie(USER_PROFILE_COOKIE);

					router.replace("/login");
				});
		}
	}, []);

	return <CircularLoading />;
}
