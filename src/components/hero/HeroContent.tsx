// Mock React Server Component for hero content
// This simulates fetching hero content from a server API

import React from 'react';

interface HeroContentData {
	title: string;
	subtitle: string;
	description: string;
	ctaText: string;
	backgroundImage?: string;
	features?: string[];
}

interface HeroContentProps {
	mode: 'hotels' | 'flights';
	locale?: string;
}

// Mock API function to simulate server-side data fetching
async function fetchHeroContent(mode: 'hotels' | 'flights', locale: string = 'en'): Promise<HeroContentData> {
	// Simulate API delay
	await new Promise(resolve => setTimeout(resolve, 100));
	
	const content: Record<string, Record<string, HeroContentData>> = {
		en: {
			hotels: {
				title: "More than accommodation,\nComplete Travel Management",
				subtitle: "Full Stack Travel Solutions",
				description: "Need more than check-in? Tixia gives you full stack travel and accommodation management — so you can launch faster, scale easier, and stay focused on building your journey.",
				ctaText: "Find a new promo",
				backgroundImage: "/images/hero-hotels-bg.jpg",
				features: ["24/7 Support", "Best Price Guarantee", "Instant Booking"]
			},
			flights: {
				title: "Compare and book cheap flights\nwith ease",
				subtitle: "Smart Flight Booking",
				description: "Discover your next flight. Compare from hundreds of travel sites at once and find the best deals for your perfect trip.",
				ctaText: "Search flights now",
				backgroundImage: "/images/hero-flights-bg.jpg",
				features: ["Price Comparison", "Flexible Dates", "Mobile Boarding"]
			}
		},
		zh: {
			hotels: {
				title: "不仅仅是住宿，\n完整的旅行管理",
				subtitle: "全栈旅行解决方案",
				description: "需要的不仅仅是入住？Tixia为您提供全栈旅行和住宿管理——让您更快启动，更轻松扩展，专注于构建您的旅程。",
				ctaText: "免费开始使用",
				backgroundImage: "/images/hero-hotels-bg.jpg",
				features: ["24/7 支持", "最优价格保证", "即时预订"]
			},
			flights: {
				title: "轻松比较和预订\n便宜航班",
				subtitle: "智能航班预订",
				description: "发现您的下一个航班。一次性比较数百个旅行网站，为您的完美旅行找到最优惠的价格。",
				ctaText: "立即搜索航班",
				backgroundImage: "/images/hero-flights-bg.jpg",
				features: ["价格比较", "灵活日期", "手机登机"]
			}
		},
		id: {
			hotels: {
				title: "Lebih dari akomodasi,\nManajemen Perjalanan Lengkap",
				subtitle: "Solusi Perjalanan Full Stack",
				description: "Butuh lebih dari sekedar check-in? Tixia memberikan manajemen perjalanan dan akomodasi full stack — sehingga Anda dapat meluncurkan lebih cepat, menskalakan lebih mudah, dan tetap fokus membangun perjalanan Anda.",
				ctaText: "Mulai gratis",
				backgroundImage: "/images/hero-hotels-bg.jpg",
				features: ["Dukungan 24/7", "Jaminan Harga Terbaik", "Pemesanan Instan"]
			},
			flights: {
				title: "Bandingkan dan pesan penerbangan murah\ndengan mudah",
				subtitle: "Pemesanan Penerbangan Cerdas",
				description: "Temukan penerbangan berikutnya. Bandingkan dari ratusan situs perjalanan sekaligus dan temukan penawaran terbaik untuk perjalanan sempurna Anda.",
				ctaText: "Cari penerbangan sekarang",
				backgroundImage: "/images/hero-flights-bg.jpg",
				features: ["Perbandingan Harga", "Tanggal Fleksibel", "Boarding Mobile"]
			}
		}
	};

	return content[locale]?.[mode] || content.en[mode];
}

// Mock RSC component (would be async in real implementation)
export async function HeroContent({ mode, locale = 'en' }: HeroContentProps) {
	const heroData = await fetchHeroContent(mode, locale);
	
	return {
		...heroData,
		// Additional computed properties
		titleParts: heroData.title.split('\n'),
		hasBackgroundImage: !!heroData.backgroundImage,
		featureCount: heroData.features?.length || 0
	};
}

// Type for the resolved hero content
export type ResolvedHeroContent = Awaited<ReturnType<typeof HeroContent>>;

// Hook for client-side usage (simulates RSC data)
export function useHeroContent(mode: 'hotels' | 'flights', locale: string = 'en'): ResolvedHeroContent | null {
	const [content, setContent] = React.useState<ResolvedHeroContent | null>(null);
	
	React.useEffect(() => {
		HeroContent({ mode, locale }).then(setContent);
	}, [mode, locale]);
	
	return content;
}

// Export mock data for development/testing
export const mockHeroData = {
	hotels: {
		en: {
			title: "More than accommodation,\nComplete Travel Management",
			subtitle: "Full Stack Travel Solutions",
			description: "Need more than check-in? Tixia gives you full stack travel and accommodation management — so you can launch faster, scale easier, and stay focused on building your journey.",
			ctaText: "Start building for free",
			backgroundImage: "/images/hero-hotels-bg.jpg",
			features: ["24/7 Support", "Best Price Guarantee", "Instant Booking"]
		}
	},
	flights: {
		en: {
			title: "Compare and book cheap flights\nwith ease",
			subtitle: "Smart Flight Booking", 
			description: "Discover your next flight. Compare from hundreds of travel sites at once and find the best deals for your perfect trip.",
			ctaText: "Search flights now",
			backgroundImage: "/images/hero-flights-bg.jpg",
			features: ["Price Comparison", "Flexible Dates", "Mobile Boarding"]
		}
	}
};