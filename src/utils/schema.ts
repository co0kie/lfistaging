import siteData from "@config/siteData.json.ts";

// Schema type definitions
const fullDomain = import.meta.env.PUBLIC_SITE_URL;

export const schemaTypes = {
	HOME: "Organization",
	BLOG: "Blog",
	POSTING: "BlogPosting",
	COURSES: "ItemList",
	COURSE: "Course",
	LANDINGPAGE: "WebPage",
	INSTRUCTOR: "Person",
	EVENT: "Event",
	ORGANIZATION: "Organization",
	CONTACT: "ContactPage",
	FAQ: "FAQPage",
	CALENDAR: "WebPage",
	PARTNERS: "ItemList",
} as const;

// Interface definitions
interface BaseSchemaData {
	title?: string;
	name?: string;
	description?: string;
	url?: string;
	image?: string;
}

interface CourseOffer {
	title: string;
	price: string;
	priceCurrency?: string;
}

interface Address {
	streetAddress?: string;
	addressLocality?: string;
	addressRegion?: string;
	addressCountry?: string;
}

interface HomeSchemaData extends BaseSchemaData {
	telephone?: string;
	email?: string;
	address?: Address;
	courses?: CourseOffer[];
}

interface PersonSchema {
	"@type": "Person";
	name: string;
	url?: string;
}

interface BlogPostingSchema {
	headline: string;
	url: string;
	publishedDate: string;
	keywords?: string[];
	author?: string | PersonSchema | (string | PersonSchema)[];
	image?: string;
	articleSection?: string[];
}

interface BlogSchemaData extends BaseSchemaData {
	name?: string;
	description?: string;
	url?: string;
	blogPostings?: BlogPostingSchema[];
}

interface ListItemSchema {
	"@type": "ListItem";
	position: number;
	item: {
		"@type": "Course";
		name: string;
		description: string;
		provider: {
			"@type": "Organization";
			name: string;
		};
	};
}
interface CoursesSchemaData extends BaseSchemaData {
	name?: string;
	description?: string;
	url?: string;
	itemListElement?: ListItemSchema[];
}

interface CourseSchemaData extends BaseSchemaData {
	name?: string;
	description?: string;
}

interface LandingPageSchemaData extends BaseSchemaData {
	name?: string;
	description?: string;
	url?: string;
	image?: string;
}

interface CalendarSchemaData extends BaseSchemaData {
	name?: string;
	description?: string;
	url?: string;
}

interface PartnerItem {
	name: string;
	url: string;
	description?: string;
	image?: string;
	telephone?: string;
}

interface PartnerSchemaData extends BaseSchemaData {
	name?: string;
	description?: string;
	url?: string;
	partnersList?: PartnerItem[];
}

interface ContactSchemaData extends BaseSchemaData {
	name?: string;
	description?: string;
	url?: string;
	itemListElement?: ListItemSchema[];
}

// Base organization info (shared across schemas)
const baseOrganization = {
	"@type": "Organization",
	name: "Live Fire Instruction",
	url: fullDomain,
	logo: siteData.defaultImage.src, // Accessed correctly from imported JSON
	sameAs: ["https://facebook.com/livefireinstruction", "https://instagram.com/livefireinstruction"],
};

// Generate schema based on page type and data
export function generateSchema(type: string, pageData: Record<string, any> = {}) {
	const baseSchema: Record<string, any> = {
		"@context": "https://schema.org",
		"@type": type,
		...pageData,
	};

	// Add organization to appropriate schemas
	if (["Course", "Event", "Blog"].includes(type)) {
		baseSchema.publisher = baseOrganization;
		baseSchema.provider = baseOrganization;
	}

	return baseSchema;
}

// Specific schema generators
export const schemaGenerators = {
	// Home page schema
	home: (data: HomeSchemaData) =>
		generateSchema(schemaTypes.HOME, {
			name: data.title || "Live Fire Instruction",
			description: data.description || "Professional firearms training and safety courses",
			url: data.url || fullDomain,
			telephone: data.telephone || "1-571-210-5651",
			email: data.email || "info@livefireinstruction.com",
			address: {
				"@type": "PostalAddress",
				streetAddress: data?.address?.streetAddress || "11250 Waples Mill Road",
				addressLocality: data?.address?.addressLocality || "Fairfax",
				addressRegion: data?.address?.addressRegion || "VA",
				addressCountry: data?.address?.addressCountry || "US",
			},
		}),

	// Blog schema
	blog: (data: BlogSchemaData) => {
		// FIXED: Now returning the generated schema
		return generateSchema(schemaTypes.BLOG, {
			name: data.name,
			description: data.description,
			url: data.url,
			// FIXED: Included blogPost data mapping
			blogPostings: data.blogPostings,
		});
	},
	blogpost: (data: BlogPostingSchema) =>
		generateSchema(schemaTypes.POSTING, {
			headline: data.headline,
			url: data.url,
			publishedDate: data.publishedDate,
			keywords: data.keywords,
			author: data.author,
			image: data.image,
			articleSection: data.articleSection,
		}),

	// Course schema (ItemList)
	courses: (data: CoursesSchemaData) =>
		generateSchema(schemaTypes.COURSES, {
			name: data.name,
			description: data.description,
			url: data.url,
			itemListElement: data.itemListElement,
		}),
	// Course schema (Course)
	course: (data: CourseSchemaData) =>
		generateSchema(schemaTypes.COURSE, {
			name: data.name,
			description: data.description,
		}),
	landingpage: (data: LandingPageSchemaData) =>
		generateSchema(schemaTypes.LANDINGPAGE, {
			name: data.name,
			description: data.description,
			url: data.url,
			image: data.image,
		}),

	// Calendar schema
	calendar: (data: CalendarSchemaData) =>
		generateSchema(schemaTypes.CALENDAR, {
			name: data.name,
			description: data.description,
			url: data.url,
		}),

	// Partners schema
	partners: (data: PartnerSchemaData) =>
		generateSchema(schemaTypes.PARTNERS, {
			name: data.name,
			description: data.description,
			url: data.url,
			mainEntity: {
				"@type": "ItemList",
				itemListElement: data.partnersList,
			},
		}),

	// Contact schema
	contact: (data: ContactSchemaData) =>
		generateSchema(schemaTypes.CONTACT, {
			name: data.name,
			description: data.description,
			url: data.url,
			mainEntity: {
				"@type": "ItemList",
				itemListElement: data.itemListElement,
			},
		}),
};
