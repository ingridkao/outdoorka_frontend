"use client";

import React, { useEffect } from "react";
import OrganizerLayout from "@/components/layout/OrganizerLayout/OrganizerLayout";

function ActivityCreate() {
	useEffect(() => {
		console.log("useEffect");
	}, []);

	return <OrganizerLayout>List</OrganizerLayout>;
}

export default ActivityCreate;
