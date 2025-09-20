import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
	en: {
		translation: {
			// Navigation
			home: 'Home',
			search: 'Search',
			hotels: 'Hotels',
			flights: 'Flights',
			about: 'About',
			contact: 'Contact',
			sign_in: 'Sign In',
			sign_up: 'Get Started',

			// Homepage
			welcome: 'Welcome',
			find_your_perfect_stay: 'Find your perfect stay',
			search_destinations: 'Search destinations, hotels, and more...',
			search_button: 'Search',
			popular_destinations: 'Popular Destinations',
			featured_hotels: 'Featured Hotels',
			why_choose_us: 'Why Choose Us',

			// Search
			check_in: 'Check-in',
			check_out: 'Check-out',
			guests: 'Guests',
			rooms: 'Rooms',
			adults: 'Adults',
			children: 'Children',

			// Hotel details
			per_night: 'per night',
			book_now: 'Book Now',
			amenities: 'Amenities',
			reviews: 'Reviews',
			location: 'Location',

			// Footer
			company: 'Company',
			support: 'Support',
			legal: 'Legal',
			help_center: 'Help Center',
			safety: 'Safety',
			privacy: 'Privacy',
			terms: 'Terms',
			all_rights_reserved: 'All rights reserved.',
			footer_description: 'Find and book amazing accommodations worldwide.',

			// Features
			best_prices: 'Best Prices',
			best_prices_desc: 'We guarantee the best prices for your bookings',
			secure_booking: 'Secure Booking',
			secure_booking_desc: 'Your booking and payment information is always secure',
			customer_support: '24/7 Support',
			customer_support_desc: 'Get help whenever you need it, day or night',

			// Travel website specific
			destinations: 'Destinations',
			experiences: 'Experiences',
			tips: 'Tips',
			hero_title: 'Discover Your Next Adventure',
			hero_subtitle: 'Find amazing destinations and create unforgettable memories',
			search_destination: 'Where do you want to go?',
			testimonials: 'What Our Travelers Say',
			testimonials_subtitle: 'Real experiences from real travelers',
			experiences_subtitle: 'Choose your perfect travel style',
			destinations_subtitle: 'Explore the world\'s most beautiful places',
			travel_tips: 'Travel Tips & Guides',
			tips_subtitle: 'Expert advice for better travel experiences',
			read_more: 'Read More',
			careers: 'Careers',
			press: 'Press',
			cancellation: 'Cancellation Policy',
			covid_response: 'COVID-19 Response',
			beach: 'Beach',
			mountain: 'Mountain',
			city: 'City',
			nature: 'Nature',
			adventure: 'Adventure',
			culture: 'Culture',
		},
	},
	zh: {
		translation: {
			// Navigation
			home: '首页',
			search: '搜索',
			hotels: '住宿',
			flights: '航班',
			about: '关于我们',
			contact: '联系我们',
			sign_in: '登录',
			sign_up: '注册',

			// Homepage
			welcome: '欢迎',
			find_your_perfect_stay: '找到您的完美住宿',
			search_destinations: '搜索目的地、酒店等...',
			search_button: '搜索',
			popular_destinations: '热门目的地',
			featured_hotels: '精选酒店',
			why_choose_us: '为什么选择我们',

			// Search
			check_in: '入住',
			check_out: '退房',
			guests: '客人',
			rooms: '房间',
			adults: '成人',
			children: '儿童',

			// Hotel details
			per_night: '每晚',
			book_now: '立即预订',
			amenities: '设施',
			reviews: '评价',
			location: '位置',

			// Footer
			company: '公司',
			support: '支持',
			legal: '法律',
			help_center: '帮助中心',
			safety: '安全',
			privacy: '隐私',
			terms: '条款',
			all_rights_reserved: '版权所有。',
			footer_description: '在全球范围内寻找和预订优质住宿。',

			// Features
			best_prices: '最优价格',
			best_prices_desc: '我们保证为您的预订提供最优价格',
			secure_booking: '安全预订',
			secure_booking_desc: '您的预订和付款信息始终安全',
			customer_support: '24/7 支持',
			customer_support_desc: '无论何时需要帮助，我们都在这里',
		},
	},
	ms: {
		translation: {
			// Navigation
			home: 'Laman Utama',
			search: 'Cari',
			hotels: 'Penginapan',
			flights: 'Penerbangan',
			about: 'Tentang Kami',
			contact: 'Hubungi Kami',
			sign_in: 'Log Masuk',
			sign_up: 'Daftar',

			// Homepage
			welcome: 'Selamat Datang',
			find_your_perfect_stay: 'Cari penginapan yang sempurna',
			search_destinations: 'Cari destinasi, hotel, dan lain-lain...',
			search_button: 'Cari',
			popular_destinations: 'Destinasi Popular',
			featured_hotels: 'Hotel Pilihan',
			why_choose_us: 'Mengapa Pilih Kami',

			// Search
			check_in: 'Daftar Masuk',
			check_out: 'Daftar Keluar',
			guests: 'Tetamu',
			rooms: 'Bilik',
			adults: 'Dewasa',
			children: 'Kanak-kanak',

			// Hotel details
			per_night: 'setiap malam',
			book_now: 'Tempah Sekarang',
			amenities: 'Kemudahan',
			reviews: 'Ulasan',
			location: 'Lokasi',

			// Footer
			company: 'Syarikat',
			support: 'Sokongan',
			legal: 'Undang-undang',
			help_center: 'Pusat Bantuan',
			safety: 'Keselamatan',
			privacy: 'Privasi',
			terms: 'Terma',
			all_rights_reserved: 'Hak cipta terpelihara.',
			footer_description: 'Cari dan tempah penginapan terbaik di seluruh dunia.',

			// Features
			best_prices: 'Harga Terbaik',
			best_prices_desc: 'Kami jamin harga terbaik untuk tempahan anda',
			secure_booking: 'Tempahan Selamat',
			secure_booking_desc: 'Maklumat tempahan dan pembayaran anda sentiasa selamat',
			customer_support: 'Sokongan 24/7',
			customer_support_desc: 'Dapatkan bantuan bila-bila masa anda perlukan',
		},
	},
	id: {
		translation: {
			// Navigation
			home: 'Beranda',
			search: 'Cari',
			hotels: 'Hotel',
			flights: 'Penerbangan',
			about: 'Tentang Kami',
			contact: 'Kontak',
			sign_in: 'Masuk',
			sign_up: 'Daftar',

			// Homepage
			welcome: 'Selamat Datang',
			find_your_perfect_stay: 'Temukan tempat menginap yang sempurna',
			search_destinations: 'Cari destinasi, hotel, dan lainnya...',
			search_button: 'Cari',
			popular_destinations: 'Destinasi Populer',
			featured_hotels: 'Hotel Pilihan',
			why_choose_us: 'Mengapa Memilih Kami',

			// Search
			check_in: 'Check-in',
			check_out: 'Check-out',
			guests: 'Tamu',
			rooms: 'Kamar',
			adults: 'Dewasa',
			children: 'Anak-anak',

			// Hotel details
			per_night: 'per malam',
			book_now: 'Pesan Sekarang',
			amenities: 'Fasilitas',
			reviews: 'Ulasan',
			location: 'Lokasi',

			// Footer
			company: 'Perusahaan',
			support: 'Dukungan',
			legal: 'Hukum',
			help_center: 'Pusat Bantuan',
			safety: 'Keamanan',
			privacy: 'Privasi',
			terms: 'Syarat',
			all_rights_reserved: 'Hak cipta dilindungi.',
			footer_description: 'Temukan dan pesan akomodasi menakjubkan di seluruh dunia.',

			// Features
			best_prices: 'Harga Terbaik',
			best_prices_desc: 'Kami menjamin harga terbaik untuk pemesanan Anda',
			secure_booking: 'Pemesanan Aman',
			secure_booking_desc: 'Informasi pemesanan dan pembayaran Anda selalu aman',
			customer_support: 'Dukungan 24/7',
			customer_support_desc: 'Dapatkan bantuan kapan pun Anda membutuhkannya',

			// Travel website specific
			destinations: 'Destinasi',
			experiences: 'Pengalaman',
			tips: 'Tips',
			hero_title: 'Temukan Petualangan Berikutnya',
			hero_subtitle: 'Temukan destinasi menakjubkan dan ciptakan kenangan tak terlupakan',
			search_destination: 'Kemana Anda ingin pergi?',
		},
	},
	de: {
		translation: {
			// Navigation
			home: 'Startseite',
			search: 'Suchen',
			hotels: 'Hotels',
			flights: 'Flüge',
			about: 'Über uns',
			contact: 'Kontakt',
			sign_in: 'Anmelden',
			sign_up: 'Registrieren',

			// Homepage
			welcome: 'Willkommen',
			find_your_perfect_stay: 'Finden Sie Ihren perfekten Aufenthalt',
			search_destinations: 'Suchen Sie Reiseziele, Hotels und mehr...',
			search_button: 'Suchen',
			popular_destinations: 'Beliebte Reiseziele',
			featured_hotels: 'Ausgewählte Hotels',
			why_choose_us: 'Warum uns wählen',

			// Search
			check_in: 'Check-in',
			check_out: 'Check-out',
			guests: 'Gäste',
			rooms: 'Zimmer',
			adults: 'Erwachsene',
			children: 'Kinder',

			// Hotel details
			per_night: 'pro Nacht',
			book_now: 'Jetzt buchen',
			amenities: 'Ausstattung',
			reviews: 'Bewertungen',
			location: 'Lage',

			// Footer
			company: 'Unternehmen',
			support: 'Support',
			legal: 'Rechtliches',
			help_center: 'Hilfe-Center',
			safety: 'Sicherheit',
			privacy: 'Datenschutz',
			terms: 'AGB',
			all_rights_reserved: 'Alle Rechte vorbehalten.',
			footer_description: 'Finden und buchen Sie erstaunliche Unterkünfte weltweit.',

			// Features
			best_prices: 'Beste Preise',
			best_prices_desc: 'Wir garantieren die besten Preise für Ihre Buchungen',
			secure_booking: 'Sichere Buchung',
			secure_booking_desc: 'Ihre Buchungs- und Zahlungsinformationen sind immer sicher',
			customer_support: '24/7 Support',
			customer_support_desc: 'Erhalten Sie Hilfe, wann immer Sie sie brauchen',

			// Travel website specific
			destinations: 'Reiseziele',
			experiences: 'Erfahrungen',
			tips: 'Tipps',
			hero_title: 'Entdecken Sie Ihr nächstes Abenteuer',
			hero_subtitle: 'Finden Sie erstaunliche Reiseziele und schaffen Sie unvergessliche Erinnerungen',
			search_destination: 'Wohin möchten Sie reisen?',
		},
	},
	ru: {
		translation: {
			// Navigation
			home: 'Главная',
			search: 'Поиск',
			hotels: 'Отели',
			flights: 'Авиабилеты',
			about: 'О нас',
			contact: 'Контакты',
			sign_in: 'Войти',
			sign_up: 'Регистрация',

			// Homepage
			welcome: 'Добро пожаловать',
			find_your_perfect_stay: 'Найдите идеальное место для проживания',
			search_destinations: 'Поиск направлений, отелей и многого другого...',
			search_button: 'Поиск',
			popular_destinations: 'Популярные направления',
			featured_hotels: 'Рекомендуемые отели',
			why_choose_us: 'Почему выбирают нас',

			// Search
			check_in: 'Заезд',
			check_out: 'Выезд',
			guests: 'Гости',
			rooms: 'Номера',
			adults: 'Взрослые',
			children: 'Дети',

			// Hotel details
			per_night: 'за ночь',
			book_now: 'Забронировать',
			amenities: 'Удобства',
			reviews: 'Отзывы',
			location: 'Расположение',

			// Footer
			company: 'Компания',
			support: 'Поддержка',
			legal: 'Правовая информация',
			help_center: 'Центр помощи',
			safety: 'Безопасность',
			privacy: 'Конфиденциальность',
			terms: 'Условия',
			all_rights_reserved: 'Все права защищены.',
			footer_description: 'Находите и бронируйте удивительные места для проживания по всему миру.',

			// Features
			best_prices: 'Лучшие цены',
			best_prices_desc: 'Мы гарантируем лучшие цены для ваших бронирований',
			secure_booking: 'Безопасное бронирование',
			secure_booking_desc: 'Ваша информация о бронировании и платежах всегда в безопасности',
			customer_support: 'Поддержка 24/7',
			customer_support_desc: 'Получите помощь в любое время дня и ночи',

			// Travel website specific
			destinations: 'Направления',
			experiences: 'Впечатления',
			tips: 'Советы',
			hero_title: 'Откройте для себя следующее приключение',
			hero_subtitle: 'Найдите удивительные направления и создайте незабываемые воспоминания',
			search_destination: 'Куда вы хотите поехать?',
		},
	},
	ja: {
		translation: {
			// Navigation
			home: 'ホーム',
			search: '検索',
			hotels: 'ホテル',
			flights: 'フライト',
			about: '会社概要',
			contact: 'お問い合わせ',
			sign_in: 'ログイン',
			sign_up: '新規登録',

			// Homepage
			welcome: 'ようこそ',
			find_your_perfect_stay: '完璧な宿泊先を見つけよう',
			search_destinations: '目的地、ホテルなどを検索...',
			search_button: '検索',
			popular_destinations: '人気の目的地',
			featured_hotels: 'おすすめホテル',
			why_choose_us: '選ばれる理由',

			// Search
			check_in: 'チェックイン',
			check_out: 'チェックアウト',
			guests: 'ゲスト',
			rooms: '部屋',
			adults: '大人',
			children: '子供',

			// Hotel details
			per_night: '1泊あたり',
			book_now: '今すぐ予約',
			amenities: '設備・サービス',
			reviews: 'レビュー',
			location: '場所',

			// Footer
			company: '会社',
			support: 'サポート',
			legal: '法的事項',
			help_center: 'ヘルプセンター',
			safety: '安全性',
			privacy: 'プライバシー',
			terms: '利用規約',
			all_rights_reserved: '全著作権所有。',
			footer_description: '世界中の素晴らしい宿泊施設を見つけて予約しましょう。',

			// Features
			best_prices: '最安値保証',
			best_prices_desc: 'ご予約に最適な価格を保証いたします',
			secure_booking: '安全な予約',
			secure_booking_desc: 'ご予約とお支払い情報は常に安全です',
			customer_support: '24時間サポート',
			customer_support_desc: 'いつでもサポートを受けることができます',

			// Travel website specific
			destinations: '目的地',
			experiences: '体験',
			tips: 'ヒント',
			hero_title: '次の冒険を発見しよう',
			hero_subtitle: '素晴らしい目的地を見つけて、忘れられない思い出を作りましょう',
			search_destination: 'どちらへ行きますか？',
		},
	},
	fil: {
		translation: {
			// Navigation
			home: 'Home',
			search: 'Maghanap',
			hotels: 'Mga Hotel',
			flights: 'Mga Flight',
			about: 'Tungkol sa Amin',
			contact: 'Makipag-ugnayan',
			sign_in: 'Mag-sign In',
			sign_up: 'Mag-sign Up',

			// Homepage
			welcome: 'Maligayang Pagdating',
			find_your_perfect_stay: 'Hanapin ang inyong perpektong pananatili',
			search_destinations: 'Maghanap ng mga destinasyon, hotel, at iba pa...',
			search_button: 'Maghanap',
			popular_destinations: 'Sikat na Destinasyon',
			featured_hotels: 'Mga Piling Hotel',
			why_choose_us: 'Bakit Kami ang Piliin',

			// Search
			check_in: 'Check-in',
			check_out: 'Check-out',
			guests: 'Mga Bisita',
			rooms: 'Mga Kwarto',
			adults: 'Mga Adulto',
			children: 'Mga Bata',

			// Hotel details
			per_night: 'bawat gabi',
			book_now: 'Mag-book Ngayon',
			amenities: 'Mga Pasilidad',
			reviews: 'Mga Review',
			location: 'Lokasyon',

			// Footer
			company: 'Kumpanya',
			support: 'Suporta',
			legal: 'Legal',
			help_center: 'Help Center',
			safety: 'Kaligtasan',
			privacy: 'Privacy',
			terms: 'Mga Tuntunin',
			all_rights_reserved: 'Lahat ng karapatan ay nakalaan.',
			footer_description: 'Maghanap at mag-book ng mga kahanga-hangang accommodation sa buong mundo.',

			// Features
			best_prices: 'Pinakamababang Presyo',
			best_prices_desc: 'Ginagarantiya namin ang pinakamababang presyo para sa inyong mga booking',
			secure_booking: 'Secure na Booking',
			secure_booking_desc: 'Ang inyong booking at payment information ay laging secure',
			customer_support: '24/7 Support',
			customer_support_desc: 'Makakuha ng tulong kahit kailan ninyo kailangan',

			// Travel website specific
			destinations: 'Mga Destinasyon',
			experiences: 'Mga Karanasan',
			tips: 'Mga Tip',
			hero_title: 'Tuklasin ang Inyong Susunod na Adventure',
			hero_subtitle: 'Maghanap ng mga kahanga-hangang destinasyon at lumikha ng mga hindi malilimutang alaala',
			search_destination: 'Saan kayo gustong pumunta?',
		},
	},
	th: {
		translation: {
			// Navigation
			home: 'หน้าแรก',
			search: 'ค้นหา',
			hotels: 'โรงแรม',
			flights: 'เที่ยวบิน',
			about: 'เกี่ยวกับเรา',
			contact: 'ติดต่อเรา',
			sign_in: 'เข้าสู่ระบบ',
			sign_up: 'สมัครสมาชิก',

			// Homepage
			welcome: 'ยินดีต้อนรับ',
			find_your_perfect_stay: 'ค้นหาที่พักที่สมบูรณ์แบบของคุณ',
			search_destinations: 'ค้นหาจุดหมายปลายทาง โรงแรม และอื่นๆ...',
			search_button: 'ค้นหา',
			popular_destinations: 'จุดหมายปลายทางยอดนิยม',
			featured_hotels: 'โรงแรมแนะนำ',
			why_choose_us: 'ทำไมต้องเลือกเรา',

			// Search
			check_in: 'เช็คอิน',
			check_out: 'เช็คเอาท์',
			guests: 'ผู้เข้าพัก',
			rooms: 'ห้อง',
			adults: 'ผู้ใหญ่',
			children: 'เด็ก',

			// Hotel details
			per_night: 'ต่อคืน',
			book_now: 'จองเลย',
			amenities: 'สิ่งอำนวยความสะดวก',
			reviews: 'รีวิว',
			location: 'ที่ตั้ง',

			// Footer
			company: 'บริษัท',
			support: 'ฝ่ายสนับสนุน',
			legal: 'กฎหมาย',
			help_center: 'ศูนย์ช่วยเหลือ',
			safety: 'ความปลอดภัย',
			privacy: 'ความเป็นส่วนตัว',
			terms: 'ข้อกำหนด',
			all_rights_reserved: 'สงวนลิขสิทธิ์',
			footer_description: 'ค้นหาและจองที่พักที่น่าทึ่งทั่วโลก',

			// Features
			best_prices: 'ราคาดีที่สุด',
			best_prices_desc: 'เรารับประกันราคาดีที่สุดสำหรับการจองของคุณ',
			secure_booking: 'การจองที่ปลอดภัย',
			secure_booking_desc: 'ข้อมูลการจองและการชำระเงินของคุณปลอดภัยเสมอ',
			customer_support: 'ฝ่ายสนับสนุน 24/7',
			customer_support_desc: 'รับความช่วยเหลือเมื่อใดก็ตามที่คุณต้องการ',

			// Travel website specific
			destinations: 'จุดหมายปลายทาง',
			experiences: 'ประสบการณ์',
			tips: 'เคล็ดลับ',
			hero_title: 'ค้นพบการผจญภัยครั้งต่อไปของคุณ',
			hero_subtitle: 'ค้นหาจุดหมายปลายทางที่น่าทึ่งและสร้างความทรงจำที่ไม่รู้ลืม',
			search_destination: 'คุณอยากไปที่ไหน?',
		},
	},
	vi: {
		translation: {
			// Navigation
			home: 'Trang chủ',
			search: 'Tìm kiếm',
			hotels: 'Khách sạn',
			flights: 'Chuyến bay',
			about: 'Về chúng tôi',
			contact: 'Liên hệ',
			sign_in: 'Đăng nhập',
			sign_up: 'Đăng ký',

			// Homepage
			welcome: 'Chào mừng',
			find_your_perfect_stay: 'Tìm nơi lưu trú hoàn hảo của bạn',
			search_destinations: 'Tìm kiếm điểm đến, khách sạn và nhiều hơn nữa...',
			search_button: 'Tìm kiếm',
			popular_destinations: 'Điểm đến phổ biến',
			featured_hotels: 'Khách sạn nổi bật',
			why_choose_us: 'Tại sao chọn chúng tôi',

			// Search
			check_in: 'Nhận phòng',
			check_out: 'Trả phòng',
			guests: 'Khách',
			rooms: 'Phòng',
			adults: 'Người lớn',
			children: 'Trẻ em',

			// Hotel details
			per_night: 'mỗi đêm',
			book_now: 'Đặt ngay',
			amenities: 'Tiện nghi',
			reviews: 'Đánh giá',
			location: 'Vị trí',

			// Footer
			company: 'Công ty',
			support: 'Hỗ trợ',
			legal: 'Pháp lý',
			help_center: 'Trung tâm trợ giúp',
			safety: 'An toàn',
			privacy: 'Quyền riêng tư',
			terms: 'Điều khoản',
			all_rights_reserved: 'Bảo lưu mọi quyền.',
			footer_description: 'Tìm và đặt những chỗ ở tuyệt vời trên toàn thế giới.',

			// Features
			best_prices: 'Giá tốt nhất',
			best_prices_desc: 'Chúng tôi đảm bảo giá tốt nhất cho đặt phòng của bạn',
			secure_booking: 'Đặt phòng an toàn',
			secure_booking_desc: 'Thông tin đặt phòng và thanh toán của bạn luôn được bảo mật',
			customer_support: 'Hỗ trợ 24/7',
			customer_support_desc: 'Nhận trợ giúp bất cứ khi nào bạn cần',

			// Travel website specific
			destinations: 'Điểm đến',
			experiences: 'Trải nghiệm',
			tips: 'Mẹo',
			hero_title: 'Khám phá cuộc phiêu lưu tiếp theo của bạn',
			hero_subtitle: 'Tìm những điểm đến tuyệt vời và tạo ra những kỷ niệm khó quên',
			search_destination: 'Bạn muốn đi đâu?',
		},
	},
};

// Only initialize i18n in the browser
if (typeof window !== 'undefined') {
	i18n.use(initReactI18next).init({
		resources,
		lng: 'en',
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
	});
} else {
	// Server-side initialization with minimal config
	i18n.use(initReactI18next).init({
		resources,
		lng: 'en',
		fallbackLng: 'en',
		interpolation: {
			escapeValue: false,
		},
		react: {
			useSuspense: false,
		},
	});
}

export default i18n;
