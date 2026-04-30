import { SITE, BUSINESS } from "@data/client";

export function getLocalBusinessSchema(origin) {
	const sameAs = [];
	if (BUSINESS.socials?.facebook) sameAs.push(BUSINESS.socials.facebook);
	if (BUSINESS.socials?.instagram) sameAs.push(BUSINESS.socials.instagram);

	return {
		"@context": "https://schema.org",
		"@type": ["LocalBusiness", "WebSite"],
		name: BUSINESS.name,
		url: origin,
		logo: origin + BUSINESS.logo,
		image: origin + BUSINESS.logo,
		email: BUSINESS.email || undefined,
		telephone: BUSINESS.phoneForTel || undefined,
		address: {
			"@type": "PostalAddress",
			streetAddress: `${BUSINESS.address.lineOne}, ${BUSINESS.address.lineTwo}`,
			addressLocality: BUSINESS.address.city,
			addressRegion: BUSINESS.address.state,
			postalCode: BUSINESS.address.zip || undefined,
			addressCountry: BUSINESS.address.country,
		},
		sameAs: sameAs.length > 0 ? sameAs : undefined,
		inLanguage: SITE.locale,
	};
}
