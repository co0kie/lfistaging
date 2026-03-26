import { config, fields, collection, singleton } from "@keystatic/core";
import React from "react";

const repo = {
	owner: "co0kie",
	name: "lfistaging",
};

const isProd = import.meta.env.PROD || import.meta.env.MODE === "production";

export default config({
	storage: isProd
		? {
				kind: "github",
				repo: `${repo.owner}/${repo.name}`,
				branchPrefix: "main/",
			}
		: {
				kind: "local",
			},
	ui: {
		brand: {
			name: "Admin",
			mark: () =>
				React.createElement("img", {
					src: isProd
						? "https://livefireinstruction.com/.netlify/images?url=_astro%2FLogo.Bc52i4P5.png"
						: "https://livefireinstruction.netlify.app/.netlify/images?url=_astro%2FLogo.Bc52i4P5.png",
					alt: "Live Fire Instruction",
					style: { width: "100px", height: "auto" },
				}),
		},
		navigation: {
			Blog: ["posts", "---"],
			Collections: ["trainings", "partners", "---"],
			Singletons: ["homepagedraft", "homepage", "calendar", "contact", "---"],
			Landingpages: ["landingpage", "---"],
			Pages: ["pages", "---"],
		},
	},

	singletons: {
		calendar: singleton({
			label: "Course Calendar",
			path: "src/data/otherPages/calendar/",
			format: { contentField: "emptyContent" },
			schema: {
				emptyContent: fields.emptyContent({ extension: "mdoc" }),
				pageTitle: fields.text({
					label: "Page Title",
					validation: { isRequired: true },
				}),
				iframeUrl: fields.text({
					label: "IFrame URL",
					validation: { isRequired: true },
					defaultValue: "https://instructorsdash.com/lisa-chau/categories/all?view=iframe",
				}),
				iframeHeight: fields.number({
					label: "IFrame Height (pixels)",
					validation: { isRequired: true, min: 100 },
					defaultValue: 900,
				}),
				iframeWidth: fields.text({
					label: "IFrame Width (e.g., '1200' or '100%')",
					validation: { isRequired: true },
					defaultValue: "1200",
				}),
			},
		}),
		homepage: singleton({
			label: "Home Original",
			path: "src/data/otherPages/homepage/",
			format: { contentField: "emptyContent" },
			schema: {
				emptyContent: fields.emptyContent({ extension: "mdoc" }), // Hero Section
				heroTitle: fields.text({
					label: "Hero Title",
					validation: { isRequired: true },
					defaultValue: "Developing Safe And Responsible Shooters",
				}),
				heroSubtitle: fields.text({
					label: "Hero Subtitle",
					multiline: true,
					validation: { isRequired: true },
					defaultValue:
						"Live Fire Instruction is the leading expert in teaching first-time firearm users and Virginia Permit / CCW Courses.",
				}),
				heroCtaText: fields.text({
					label: "Primary CTA Button Text",
					validation: { isRequired: true },
					defaultValue: "Find your course",
				}),
				heroCtaUrl: fields.text({
					label: "Primary CTA Button URL",
					validation: { isRequired: true },
					defaultValue: "/firearm-training",
				}),
				heroSecondaryCtaText: fields.text({
					label: "Secondary CTA Button Text",
					defaultValue: "Read the blog",
				}),
				heroSecondaryCtaUrl: fields.text({
					label: "Secondary CTA Button URL",
					defaultValue: "/blog/",
				}),
				heroImage: fields.image({
					label: "Hero Background Image",
					directory: "src/assets/homepage/images",
					publicPath: "/src/assets/homepage/images/",
				}),

				// Next Class Starting Soon
				nextClassStartingSoonTitle: fields.text({
					label: "Next Class Starting Soon Title",
					defaultValue: "Next Class Starting Soon",
				}),
				nextClassStartingSoonSubtitle: fields.text({
					label: "Next Class Starting Soon Subtitle",
					defaultValue: "Seats Limited",
				}),
				nextClassStartingArray: fields.array(
					fields.text({ label: "Tag" }),
					// Labelling options
					{
						label: "Tag",
						itemLabel: (props) => props.value,
					},
				),

				// CTASection
				ctaSectionTitle: fields.text({
					label: "CTA Section Title",
					defaultValue: "Ready to Get Started?",
				}),
				ctaSectionSubtitle: fields.text({
					label: "CTA Section Subtitle",
					defaultValue:
						"Join hundreds of instructors who trust Live Fire Instruction for their shooting range business",
				}),
				ctaSectionCtaText: fields.text({
					label: "CTA Section CTA Text",
					defaultValue: "Contact Us Today",
				}),
				ctaSectionCtaUrl: fields.text({
					label: "CTA Section CTA URL",
					defaultValue: "/contact",
				}),

				// Card Section
				cardSectionTitle: fields.text({
					label: "Card Section Title",
					validation: { isRequired: true },
					defaultValue: "Virginia Carry Permit & Basic Course Every Thursday & Saturday",
				}),
				// IFrame Section
				iframeUrl: fields.text({
					label: "IFrame URL",
					validation: { isRequired: true },
					defaultValue: "https://instructorsdash.com/lisa-chau/categories/all?view=iframe",
				}),
				iframeHeight: fields.number({
					label: "IFrame Height (pixels)",
					validation: { isRequired: true, min: 100 },
					defaultValue: 900,
				}),
				iframeWidth: fields.text({
					label: "IFrame Width (e.g., '1200' or '100%')",
					validation: { isRequired: true },
					defaultValue: "1200",
				}),

				// Who We Are Section
				whoWeAreTitle: fields.text({
					label: "Who We Are Title",
					defaultValue: "Who We Are",
				}),
				whoWeAreContent: fields.text({
					label: "Who We Are Content",
					multiline: true,
				}),
			},
		}),
		homepagedraft: singleton({
			label: "Home",
			path: "src/data/otherPages/homepagedraft/",
			format: { contentField: "emptyContent" },
			schema: {
				emptyContent: fields.emptyContent({ extension: "mdoc" }),
				pageMetaTitle: fields.text({
					label: "Page Meta Title",
					defaultValue: "Homepage Draft | Firearms Training Northern Virginia",
				}),
				pageMetaDescription: fields.text({
					label: "Page Meta Description",
					multiline: true,
					defaultValue:
						"Homepage draft combining the current homepage design with the firearms training content for Northern Virginia.",
				}),
				heroTitle: fields.text({
					label: "Hero Title",
					validation: { isRequired: true },
					defaultValue: "Top-Rated Firearms Training In Northern Virginia",
				}),
				heroSubtitle: fields.text({
					label: "Hero Subtitle",
					multiline: true,
					validation: { isRequired: true },
					defaultValue:
						"Professional firearms training in Northern Virginia serving Fairfax, Arlington, Alexandria, Loudoun County, Prince William County, Washington DC, and Maryland since 2016.",
				}),
				heroCtaText: fields.text({
					label: "Hero Primary CTA Text",
					defaultValue: "View Course Schedule",
				}),
				heroCtaUrl: fields.text({
					label: "Hero Primary CTA URL",
					defaultValue: "/calendar",
				}),
				heroSecondaryCtaText: fields.text({
					label: "Hero Secondary CTA Text",
					defaultValue: "Contact Us",
				}),
				heroSecondaryCtaUrl: fields.text({
					label: "Hero Secondary CTA URL",
					defaultValue: "/contact",
				}),
				nextClassStartingSoonTitle: fields.text({
					label: "Next Class Starting Soon Title",
					defaultValue: "Next Class Starting Soon",
				}),
				nextClassStartingSoonSubtitle: fields.text({
					label: "Next Class Starting Soon Subtitle",
					defaultValue: "Seats Limited",
				}),
				nextClassStartingArray: fields.array(fields.text({ label: "Tag" }), {
					label: "Next Class Tags",
					itemLabel: (props) => props.value,
				}),
				ctaSectionTitle: fields.text({
					label: "CTA Section Title",
					defaultValue: "Ready to Get Started?",
				}),
				ctaSectionSubtitle: fields.text({
					label: "CTA Section Subtitle",
					defaultValue:
						"Join hundreds of instructors who trust Live Fire Instruction for their shooting range business",
				}),
				ctaSectionCtaText: fields.text({
					label: "CTA Section CTA Text",
					defaultValue: "Contact Us Today",
				}),
				ctaSectionCtaUrl: fields.text({
					label: "CTA Section CTA URL",
					defaultValue: "/contact",
				}),
				introEyebrow: fields.text({
					label: "Intro Eyebrow",
					defaultValue: "Trusted Since 2016",
				}),
				introTitle: fields.text({
					label: "Intro Title",
					defaultValue:
						"Expert NRA-certified instruction built for beginners and advancing shooters",
				}),
				introDescription: fields.text({
					label: "Intro Description",
					multiline: true,
					defaultValue:
						"Live Fire Instruction is Northern Virginia's premier destination for comprehensive firearms training. Our instructors prioritize safety, skill development, and legal compliance in a professional environment designed to help students become safe, confident, and responsible firearm owners.",
				}),
				locationLabel: fields.text({
					label: "Location Card Label",
					defaultValue: "Training Location",
				}),
				locationTitle: fields.text({
					label: "Location Card Title",
					defaultValue: "NRA Range, Fairfax, VA",
				}),
				locationDescription: fields.text({
					label: "Location Card Description",
					multiline: true,
					defaultValue:
						"A professional, climate-controlled indoor facility with modern safety equipment.",
				}),
				scheduleLabel: fields.text({
					label: "Schedule Card Label",
					defaultValue: "Popular Schedule",
				}),
				scheduleTitle: fields.text({
					label: "Schedule Card Title",
					defaultValue: "Basic Pistol & CCW Every Thursday and Saturday",
				}),
				scheduleDescription: fields.text({
					label: "Schedule Card Description",
					multiline: true,
					defaultValue:
						"Join our NRA-certified instructors at the premier NRA Range in Fairfax for comprehensive weekly training sessions designed for all skill levels across Northern Virginia.",
				}),
				homepageCoursesEyebrow: fields.text({
					label: "Homepage Courses Eyebrow",
					defaultValue: "Featured Courses",
				}),
				homepageCoursesTitle: fields.text({
					label: "Homepage Courses Title",
					defaultValue: "Featured courses from the current homepage",
				}),
				courseHighlightsEyebrow: fields.text({
					label: "Course Highlights Eyebrow",
					defaultValue: "Training Paths",
				}),
				courseHighlightsTitle: fields.text({
					label: "Course Highlights Title",
					defaultValue: "Our firearms training courses in Northern Virginia",
				}),
				courseHighlights: fields.array(
					fields.object({
						title: fields.text({
							label: "Title",
							validation: { isRequired: true },
						}),
						description: fields.text({
							label: "Description",
							multiline: true,
							validation: { isRequired: true },
						}),
						details: fields.text({
							label: "Details",
							multiline: true,
							validation: { isRequired: true },
						}),
						schedule: fields.text({
							label: "Schedule",
						}),
						href: fields.text({
							label: "Link URL",
							validation: { isRequired: true },
						}),
					}),
					{
						label: "Course Highlights",
						itemLabel: (props) => props.fields.title.value,
					},
				),
				learningEyebrow: fields.text({
					label: "Learning Section Eyebrow",
					defaultValue: "What You'll Learn",
				}),
				learningTitle: fields.text({
					label: "Learning Section Title",
					defaultValue: "Comprehensive instruction for safe, effective firearm use",
				}),
				learningDescription: fields.text({
					label: "Learning Section Description",
					multiline: true,
					defaultValue:
						"Our firearms training programs in Northern Virginia cover the essential skills every responsible shooter needs, from foundational safety to advanced defensive concepts.",
				}),
				learningPoints: fields.array(fields.text({ label: "Learning Point" }), {
					label: "Learning Points",
					itemLabel: (props) => props.value,
				}),
				serviceEyebrow: fields.text({
					label: "Service Areas Eyebrow",
					defaultValue: "Serving Northern Virginia",
				}),
				serviceTitle: fields.text({
					label: "Service Areas Title",
					defaultValue: "Convenient for students across NoVA, DC, and Maryland",
				}),
				serviceDescription: fields.text({
					label: "Service Areas Description",
					multiline: true,
					defaultValue:
						"Conveniently located in Fairfax, Live Fire Instruction serves students throughout the region with expert instruction and a professional range environment.",
				}),
				serviceFooter: fields.text({
					label: "Service Areas Footer",
					defaultValue: "Also serving Washington DC, Maryland, and surrounding areas.",
				}),
				serviceAreas: fields.array(
					fields.object({
						title: fields.text({
							label: "Area Title",
							validation: { isRequired: true },
						}),
						locations: fields.array(fields.text({ label: "Location" }), {
							label: "Locations",
							itemLabel: (props) => props.value,
						}),
					}),
					{
						label: "Service Areas",
						itemLabel: (props) => props.fields.title.value,
					},
				),
				aboutEyebrow: fields.text({
					label: "About Eyebrow",
					defaultValue: "About Live Fire Instruction",
				}),
				aboutTitle: fields.text({
					label: "About Title",
					defaultValue: "Developing safe and responsible shooters",
				}),
				aboutDescription: fields.text({
					label: "About Description",
					multiline: true,
					defaultValue:
						"Since 2016, Live Fire Instruction has been Northern Virginia's trusted source for firearms education. Our mission is to deliver comprehensive, professional instruction built on safety, ethics, and responsibility.",
				}),
				reasons: fields.array(fields.text({ label: "Reason" }), {
					label: "Reasons",
					itemLabel: (props) => props.value,
				}),
				faqEyebrow: fields.text({
					label: "FAQ Eyebrow",
					defaultValue: "Frequently Asked Questions",
				}),
				faqTitle: fields.text({
					label: "FAQ Title",
					defaultValue: "Common questions about firearms training in Northern Virginia",
				}),
				faqs: fields.array(
					fields.object({
						question: fields.text({
							label: "Question",
							validation: { isRequired: true },
						}),
						answer: fields.text({
							label: "Answer",
							multiline: true,
							validation: { isRequired: true },
						}),
					}),
					{
						label: "FAQs",
						itemLabel: (props) => props.fields.question.value,
					},
				),
			},
		}),
		contact: singleton({
			label: "Contact Page",
			path: "src/data/otherPages/contact/",
			format: { contentField: "emptyContent" },
			schema: {
				emptyContent: fields.emptyContent({ extension: "mdoc" }),

				// Header Section
				pageTitle: fields.text({
					label: "Page Title",
					validation: { isRequired: true },
					defaultValue: "Contact Us",
				}),

				// Form Section - Column 1 (Info)
				formInfoTitle: fields.text({
					label: "Form Info Title",
					validation: { isRequired: true },
					defaultValue: "Customer Feedback Is The Lifeblood Of Our Business.",
				}),
				formInfoSubtitle: fields.text({
					label: "Form Info Subtitle",
					multiline: true,
					validation: { isRequired: true },
					defaultValue:
						"Tell us what's on your mind, good or bad. We respond to all customer feedback and look forward to hearing from you!",
				}),
				formInfoEmail: fields.text({
					label: "Contact Email",
					validation: { isRequired: true },
					defaultValue: "class@livefireinstruction.com",
				}),
				formInfoPhone: fields.text({
					label: "Contact Phone",
					validation: { isRequired: true },
					defaultValue: "571.210.5651",
				}),

				// Form Section - Column 2 (Form Fields)
				formNameLabel: fields.text({
					label: "Name Field Label",
					defaultValue: "Your Name",
				}),
				formNamePlaceholder: fields.text({
					label: "Name Field Placeholder",
					defaultValue: "John Doe",
				}),
				formEmailLabel: fields.text({
					label: "Email Field Label",
					defaultValue: "Your Email",
				}),
				formEmailPlaceholder: fields.text({
					label: "Email Field Placeholder",
					defaultValue: "john@example.com",
				}),
				formSubjectLabel: fields.text({
					label: "Subject Field Label",
					defaultValue: "Subject",
				}),
				formSubjectPlaceholder: fields.text({
					label: "Subject Field Placeholder",
					defaultValue: "How can we help?",
				}),
				formMessageLabel: fields.text({
					label: "Message Field Label",
					defaultValue: "Your Message",
				}),
				formMessagePlaceholder: fields.text({
					label: "Message Field Placeholder",
					defaultValue: "Write your message here...",
				}),
				formSubmitButtonText: fields.text({
					label: "Submit Button Text",
					defaultValue: "Send Message",
				}),
				// Testimonials Section
				testimonials: fields.array(
					fields.object({
						name: fields.text({ label: "Name" }),
						testimonial: fields.text({ label: "Testimonial", multiline: true }),
					}),
					// Labelling options
					{
						label: "Testimonials",
						itemLabel: (props) => props.fields.name.value,
					},
				),
			},
		}),
	},
	collections: {
		posts: collection({
			label: "Posts",
			path: "src/data/blog/*/",
			slugField: "title",
			previewUrl: "/preview/start?branch={branch}&to=/preview/blog/{slug}",
			columns: ["pubDate", "updatedDate"],
			format: { contentField: "content" },
			schema: {
				title: fields.slug({ name: { label: "Title", validation: { isRequired: true } } }),
				description: fields.text({ label: "Description", validation: { isRequired: true } }),
				authors: fields.array(
					fields.text({
						label: "Author",
						validation: { isRequired: true },
					}),
					{
						label: "Authors",
						itemLabel: (props) => props.value,
					},
				),
				relatedPosts: fields.array(
					fields.text({ label: "Related Post", validation: { isRequired: true } }),
					{
						label: "Related Posts",
						itemLabel: (props) => props.value,
					},
				),
				pubDate: fields.date({
					label: "Date",
				}),
				updatedDate: fields.date({
					label: "Updated Date",
				}),
				heroImage: fields.image({
					label: "Image",
					directory: "src/assets/images/blog",
					publicPath: "/src/assets/images/blog/",
				}),
				categories: fields.array(
					fields.text({ label: "Category", validation: { isRequired: true } }),
					{
						label: "Categories",
						itemLabel: (props) => props.value,
					},
				),
				tags: fields.array(fields.text({ label: "Tag", validation: { isRequired: true } }), {
					label: "Tags",
					itemLabel: (props) => props.value,
				}),

				content: fields.markdoc({
					label: "Content",
				}),
			},
		}),
		landingpage: collection({
			label: "Business Training",
			slugField: "title",
			path: "src/data/otherPages/landingpage/*/",
			format: { contentField: "content" },
			schema: {
				title: fields.slug({ name: { label: "Title", validation: { isRequired: true } } }),
				description: fields.text({ label: "Description", validation: { isRequired: true } }),
				heroImage: fields.image({
					label: "Hero Image",
					directory: "src/data/otherPages/landingpage",
					publicPath: "/src/data/otherPages/landingpage/",
				}),
				backgroundImage: fields.image({
					label: "Background Image",
					directory: "src/data/otherPages/landingpage",
					publicPath: "/src/data/otherPages/landingpage/",
				}),
				slug: fields.text({
					label: "URL Slug (e.g., /sales)",
					validation: { isRequired: true },
				}),
				landing: fields.checkbox({
					label: "Use Landing Page Layout",
					defaultValue: true,
				}),
				draft: fields.checkbox({
					label: "Draft",
					defaultValue: false,
				}),
				content: fields.markdoc({
					label: "Content",
				}),
			},
		}),
		partners: collection({
			label: "Partners",
			slugField: "title",
			path: "src/data/otherPages/partners/*/",
			format: { contentField: "content" },
			columns: ["title", "pubDate"],
			schema: {
				title: fields.slug({ name: { label: "Title", validation: { isRequired: true } } }),
				description: fields.text({ label: "Description", validation: { isRequired: true } }),
				heroImage: fields.image({
					label: "Partner Logo/Image",
					directory: "src/data/otherPages/partners",
					publicPath: "/src/data/otherPages/partners/",
				}),
				link: fields.text({
					label: "Website URL",
				}),
				domain: fields.text({
					label: "Domain",
				}),
				phone: fields.text({
					label: "Phone Number",
				}),
				pubDate: fields.text({
					label: "Published Date",
					defaultValue: () =>
						new Date().toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						}),
					validation: {
						isRequired: true,
					},
				}),
				content: fields.markdoc({
					label: "Content",
				}),
			},
		}),
		trainings: collection({
			label: "Training",
			slugField: "title",
			path: "src/data/otherPages/trainings/*/",
			format: { contentField: "content" },
			// format: {
			// 	contentField: "emptyContent",
			// },
			columns: ["featured", "pubDate"],

			schema: {
				title: fields.slug({ name: { label: "Title", validation: { isRequired: true } } }),
				slug: fields.text({
					label: "URL Slug (e.g., /sales)",
					validation: { isRequired: true },
				}),
				subtitle: fields.text({
					label: "Subtitle",
				}),
				pubDate: fields.text({
					label: "Published Date",
					defaultValue: () =>
						new Date().toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						}),
					validation: {
						isRequired: true,
					},
				}),
				featured: fields.checkbox({
					label: "Featured",
					description: "Check this box to feature this course on the front page.",
				}),
				isInstructor: fields.checkbox({
					label: "Instructor Course",
					description: "Check this box if this is an instructor certification course.",
					defaultValue: false,
				}),
				description: fields.text({
					label: "Description",
					multiline: true,
					validation: { isRequired: true },
				}),
				button: fields.text({
					label: "Button Text",
					defaultValue: "Register Below",
				}),
				badgeGroup: fields.array(
					fields.text({
						label: "Badge",
						validation: { isRequired: true },
					}),
					{
						label: "Badges",
						itemLabel: (props) => props.value,
					},
				),
				leftColumnImage: fields.image({
					label: "Hero image",
					directory: "src/data/otherPages/trainings",
					publicPath: "/src/data/otherPages/trainings/",
				}),
				rightColumnTitle: fields.text({
					label: "Right Column Title",
				}),
				rightColumnDescription: fields.text({
					label: "Right Column Description",
					multiline: true,
				}),
				rightColumnList: fields.array(
					fields.object({
						listTitle: fields.text({
							label: "List Title",
							validation: { isRequired: true },
						}),
						listItem: fields.array(
							fields.text({
								label: "List Item",
								validation: { isRequired: true },
							}),
							{
								itemLabel: (props) => props.value,
							},
						),
					}),
					{
						label: "List Items",
						itemLabel: (props) => props.fields.listTitle.value ?? "Please select a list item",
					},
				),
				hasMap: fields.conditional(fields.checkbox({ label: "Has Map?", defaultValue: false }), {
					true: fields.object({
						mapTitle: fields.text({
							label: "Map Title",
						}),
						address: fields.array(
							fields.text({
								label: "Address",
							}),
							{
								label: "Addresses",
								itemLabel: (props) => props.value ?? "Please select an address",
							},
						),
						mapLink: fields.url({
							label: "Map Link",
						}),
					}),
					false: fields.empty(),
				}),
				iframeUrl: fields.text({
					label: "IFrame URL",
					validation: { isRequired: true },
					defaultValue: "https://instructorsdash.com/lisa-chau/categories/133?view=iframe",
				}),
				iframeHeight: fields.number({
					label: "IFrame Height (pixels)",
					validation: { isRequired: true, min: 100 },
					defaultValue: 900,
				}),
				iframeWidth: fields.text({
					label: "IFrame Width (e.g., '1200' or '100%')",
					validation: { isRequired: true },
					defaultValue: "1200",
				}),
				useCategory133: fields.checkbox({
					label: "Use Category 133 for Live Schedule",
					defaultValue: true,
				}),

				content: fields.markdoc({
					label: "Content",
				}),
			},
		}),
		pages: collection({
			label: "Pages",
			path: "src/data/pages/*",
			slugField: "title",
			columns: ["title", "description"],
			format: { contentField: "content" },
			schema: {
				title: fields.slug({ name: { label: "Title", validation: { isRequired: true } } }),
				description: fields.text({ label: "Description", validation: { isRequired: true } }),
				headerImage: fields.image({
					label: "Header Image",
					directory: "src/assets/images/pages",
					publicPath: "/src/assets/images/pages/",
				}),
				youtubeUrl: fields.text({
					label: "Youtube URL",
				}),
				content: fields.markdoc({
					label: "Content",
				}),
			},
		}),
	},
});
