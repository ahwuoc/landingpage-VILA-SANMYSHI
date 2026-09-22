export const newsCopy = {
  vi: { tag: 'GÓC NHÌN GIAO THƯƠNG', title: 'Hiểu thị trường.', accent: 'Chủ động hành trình.', intro: 'Góc nhìn về logistics, kiến thức giao thương và những cập nhật từ VILA SANMYSHI. Thông tin hữu ích cho mỗi quyết định gửi hàng.', latest: 'BÀI VIẾT & CHIA SẺ', articles: 'Những điều', articlesAccent: 'đáng đọc.', featured: 'BÀI VIẾT NỔI BẬT', read: 'Đọc bài viết', all: 'Tất cả', search: 'Tìm theo tiêu đề, nội dung…', results: 'bài viết', empty: 'Chưa tìm thấy bài viết phù hợp.', reset: 'Xóa bộ lọc', previous: 'Trang trước', next: 'Trang sau', pagination: 'Phân trang bài viết', page: 'Trang', newsletterLabel: 'GIỮ KẾT NỐI', newsletterTitle: 'Thêm góc nhìn.', newsletterAccent: 'Thêm chủ động.', newsletterBody: 'Đăng ký email để nhận những thông tin về logistics và giao thương từ VILA SANMYSHI.', newsletterPrivacy: 'Email của bạn được sử dụng để gửi bản tin đã đăng ký.', back: 'Tất cả bài viết', reading: 'phút đọc', category: 'Góc nhìn logistics', share: 'Chia sẻ bài viết', shareError: 'Chưa thể sao chép. Bạn có thể sao chép đường dẫn trên thanh địa chỉ.', image: 'Ảnh minh họa logistics' },
  en: { tag: 'TRADE PERSPECTIVES', title: 'Understand the market.', accent: 'Plan the journey.', intro: 'Logistics perspectives, practical trade knowledge and updates from VILA SANMYSHI. Useful information for your next shipping decision.', latest: 'ARTICLES & PERSPECTIVES', articles: 'Ideas worth', articlesAccent: 'exploring.', featured: 'FEATURED ARTICLE', read: 'Read article', all: 'All articles', search: 'Search titles and topics…', results: 'articles', empty: 'No articles match your search.', reset: 'Clear filters', previous: 'Previous page', next: 'Next page', pagination: 'Article pagination', page: 'Page', newsletterLabel: 'STAY CONNECTED', newsletterTitle: 'Fresh perspectives.', newsletterAccent: 'Better preparation.', newsletterBody: 'Subscribe to receive logistics and trade updates from VILA SANMYSHI.', newsletterPrivacy: 'Your email is used for the newsletter you subscribe to.', back: 'All articles', reading: 'min read', category: 'Logistics perspectives', share: 'Share this article', shareError: 'Unable to copy. You can copy the link from your address bar.', image: 'Illustrative logistics image' },
  th: { tag: 'มุมมองด้านการค้า', title: 'เข้าใจตลาด', accent: 'วางแผนเส้นทาง', intro: 'มุมมองโลจิสติกส์ ความรู้ด้านการค้า และข่าวสารจาก VILA SANMYSHI ข้อมูลที่เป็นประโยชน์สำหรับการตัดสินใจส่งสินค้า', latest: 'บทความและมุมมอง', articles: 'เรื่องราวที่', articlesAccent: 'น่าอ่าน', featured: 'บทความแนะนำ', read: 'อ่านบทความ', all: 'ทั้งหมด', search: 'ค้นหาชื่อเรื่องและหัวข้อ…', results: 'บทความ', empty: 'ไม่พบบทความที่ตรงกับการค้นหา', reset: 'ล้างตัวกรอง', previous: 'หน้าก่อนหน้า', next: 'หน้าถัดไป', pagination: 'เลือกหน้าบทความ', page: 'หน้า', newsletterLabel: 'ติดตามข่าวสาร', newsletterTitle: 'เพิ่มมุมมอง', newsletterAccent: 'พร้อมยิ่งขึ้น', newsletterBody: 'สมัครรับข่าวสารด้านโลจิสติกส์และการค้าจาก VILA SANMYSHI ทางอีเมล', newsletterPrivacy: 'อีเมลของคุณใช้เพื่อส่งจดหมายข่าวที่สมัครไว้', back: 'บทความทั้งหมด', reading: 'นาทีในการอ่าน', category: 'มุมมองโลจิสติกส์', share: 'แบ่งปันบทความ', shareError: 'ไม่สามารถคัดลอกได้ กรุณาคัดลอกลิงก์จากแถบที่อยู่', image: 'ภาพประกอบด้านโลจิสติกส์' },
};

export function newsLanguage(locale: string) { return locale === 'en' || locale === 'th' ? locale : 'vi'; }
export function articleText(content = '') { return content.replace(/<[^>]*>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/\s+/g, ' ').trim(); }
export function articleDate(date: string | undefined, locale: string) {
  if (!date || Number.isNaN(new Date(date).getTime())) return '';
  return new Date(date).toLocaleDateString(newsLanguage(locale), { day: '2-digit', month: 'long', year: 'numeric', timeZone: 'UTC' });
}
export function articleImage(src: string | undefined) {
  const fallback = '/images/editorial/container-port.jpg';
  if (!src) return fallback;
  if (src.startsWith('/') && !src.startsWith('//')) return src;
  try {
    const url = new URL(src);
    if (url.protocol !== 'https:') return fallback;
    if (['images.unsplash.com', 'i.pravatar.cc'].includes(url.hostname)) return src;
    if (url.hostname === 'lh3.googleusercontent.com' && url.pathname.startsWith('/aida-public/')) return src;
    if (url.hostname === 'xhtkvralkhnvohxjrmgq.supabase.co' && url.pathname.startsWith('/storage/v1/object/public/uploads/')) return src;
  } catch { return fallback; }
  return fallback;
}
