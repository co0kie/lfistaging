// utils
import { countItems, getAllPosts, sortByValue } from "@js/blogUtils";
import { humanize } from "@js/textUtils";
import { getCollection } from "astro:content";

// get the categories used in blog posts, to put into navbar
const trainings = await getCollection("trainings");
const allCategories = trainings.map((post) => post.data.title).flat();

export interface navLinkItem {
	text: string;
	link: string;
	newTab?: boolean; // adds target="_blank" rel="noopener noreferrer" to link
}

export interface navDropdownItem {
	text: string;
	dropdown: navLinkItem[];
}

export type navItem = navLinkItem | navDropdownItem;

// note: 1 level of dropdown is supported
const navConfig: navItem[] = [
	{
		text: "Blog",
		link: "/blog",
	},
	// {
	// 	// get the categories used in blog posts, to put into a navbar dropdown
	// 	text: "Categories",
	// 	dropdown: processedCategories.map(([category, count]) => {
	// 		return {
	// 			text: humanize(category),
	// 			link: `/categories/${category}/`,
	// 		};
	// 	}),
	// },
	{
		text: "Training",
		link: "/firearm-training-fairfax-va",
		dropdown: [
			{
				text: "NRA Basic Pistol Course & VA Concealed Carry Permit",
				link: "/nra-basic-pistol-course-fairfax-va",
			},
			{
				text: "First Step Pistol Orientation with Concealed Carry Permit",
				link: "/first-step-pistol-orientation-fairfax-va",
			},
			{
				text: "One-on-One Personal Training",
				link: "/private-shooting-lessons-northern-va",
			},
			{
				text: "NRA CCW Advanced Pistol Course",
				link: "/nra-advanced-ccw-fairfax-va",
			},
			{
				text: "NRA Refuse To Be A Victim®",
				link: "/refuse-to-be-a-victim",
			},

			// {
			// 	text: "Firearms Training Northern Virginia",
			// 	link: "/firearms-training-northern-virginia",
			// },
			// {
			// 	text: "Rules to purchase your first gun",
			// 	link: "/rules-to-purchase-your-first-gun-for-home-defense",
			// },
		],
	},
	// {
	// 	text: "Instructor Courses",
	// 	link: "#",
	// 	dropdown: [
	// 		{
	// 			text: "NRA Instructor Pistol Shooting Course",
	// 			link: "/nra-instructor-pistol-shooting-course",
	// 		},
	// 		{
	// 			text: "NRA Basic Range Safety Officer Course",
	// 			link: "/nra-basic-range-safety-officer-course",
	// 		},
	// 		{
	// 			text: "NRA Instructor CCW",
	// 			link: "/nra-instructor-ccw",
	// 		},
	// 		{
	// 			text: "NRA Instructor Rifle Shooting Course",
	// 			link: "/nra-instructor-rifle-shooting-course",
	// 		},
	// 		{
	// 			text: "NRA Chief Range Safety Officer Course",
	// 			link: "/nra-chief-range-safety-officer-course",
	// 		},
	// 	],
	// },
	{
		text: "Course Calendar",
		link: "/ccw-courses-northern-va",
	},
	{
		text: "Partners",
		link: "/partners",
	},
	{
		text: "Contact Us",
		link: "/contact",
	},
	// {
	// 	text: "Business Training",
	// 	dropdown: [
	// 		{
	// 			text: "3-Day Bullseye Business Blueprint Course",
	// 			link: "/3-day-bullseye-business-blueprint-course",
	// 		},
	// 	],
	// },
];

export default navConfig;
