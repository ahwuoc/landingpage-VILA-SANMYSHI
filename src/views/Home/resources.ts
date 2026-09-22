export type ResourceLocale = 'vi' | 'en' | 'th';
export type LocalizedText = Record<ResourceLocale, string>;

export type LogisticsResource = {
  id: string;
  category: 'corridor' | 'customs' | 'trade';
  title: LocalizedText;
  description: LocalizedText;
  source: string;
  url: string;
};

export type ShippingFaq = {
  id: string;
  question: LocalizedText;
  answer: LocalizedText;
  source?: string;
  url?: string;
};

// Sources checked on this date. These are introductory resources, not current
// tariff schedules, guaranteed transit times, or company accreditation claims.
export const resourcesVerifiedOn = '2026-09-21';

export const resourceCategories: Record<LogisticsResource['category'], LocalizedText> = {
  corridor: { vi: 'Kết nối khu vực', en: 'Regional connections', th: 'การเชื่อมต่อภูมิภาค' },
  customs: { vi: 'Chuẩn bị chứng từ', en: 'Document preparation', th: 'การเตรียมเอกสาร' },
  trade: { vi: 'Kiến thức giao thương', en: 'Trade essentials', th: 'ความรู้ด้านการค้า' },
};

export const logisticsResources: LogisticsResource[] = [
  {
    id: 'east-west-corridor',
    category: 'corridor',
    title: {
      vi: 'Hiểu tuyến Hành lang Kinh tế Đông – Tây',
      en: 'Understanding the East–West Economic Corridor',
      th: 'รู้จักระเบียงเศรษฐกิจแนวตะวันออก–ตะวันตก',
    },
    description: {
      vi: 'EWEC kết nối Đà Nẵng với Myanmar qua Lào và Thái Lan. Đường 9 là mắt xích đưa vùng Đông Bắc Thái Lan qua Lào đến bờ biển Việt Nam.',
      en: 'EWEC connects Da Nang with Myanmar through Laos and Thailand. Route 9 links northeastern Thailand to the Vietnamese coast via Laos.',
      th: 'EWEC เชื่อมดานังกับเมียนมาผ่านลาวและไทย โดยถนนหมายเลข 9 เชื่อมภาคตะวันออกเฉียงเหนือของไทยผ่านลาวสู่ชายฝั่งเวียดนาม',
    },
    source: 'Asian Development Bank',
    url: 'https://www.adb.org/documents/greater-mekong-subregion-east-west-corridor-project-1727-laosf-and-1728-viesf',
  },
  {
    id: 'mukdahan-savannakhet',
    category: 'corridor',
    title: {
      vi: 'Mukdahan – Savannakhet: nối hai bờ Mekong',
      en: 'Mukdahan–Savannakhet: a Mekong connection',
      th: 'มุกดาหาร–สะหวันนะเขต: เชื่อมสองฝั่งโขง',
    },
    description: {
      vi: 'Cầu Hữu nghị Thái – Lào số 2 nối Mukdahan với Savannakhet. Đây là một kết nối hạ tầng xuyên biên giới được ADB nghiên cứu về tác động tới thương mại khu vực.',
      en: 'The Second Thai–Lao Friendship Bridge connects Mukdahan with Savannakhet. ADB has studied how this cross-border infrastructure supports regional trade.',
      th: 'สะพานมิตรภาพไทย–ลาวแห่งที่ 2 เชื่อมมุกดาหารกับสะหวันนะเขต ADB ได้ศึกษาผลของโครงสร้างพื้นฐานข้ามพรมแดนนี้ต่อการค้าในภูมิภาค',
    },
    source: 'Asian Development Bank',
    url: 'https://www.adb.org/publications/regional-economic-impacts-cross-border-infrastructure-general-equilibrium-application',
  },
  {
    id: 'shipping-documents',
    category: 'customs',
    title: {
      vi: 'Chuẩn bị hồ sơ trước khi hàng khởi hành',
      en: 'Prepare documents before dispatch',
      th: 'เตรียมเอกสารก่อนสินค้าออกเดินทาง',
    },
    description: {
      vi: 'Bắt đầu với hóa đơn, packing list và thông tin hàng hóa. Chứng từ vận tải, xuất xứ và giấy phép cần được rà soát theo mặt hàng, phương thức vận chuyển và quy định áp dụng.',
      en: 'Start with the invoice, packing list and product details. Review transport documents, origin evidence and permits for the goods, transport mode and applicable requirements.',
      th: 'เริ่มจากใบกำกับสินค้า รายการบรรจุหีบห่อ และรายละเอียดสินค้า จากนั้นตรวจสอบเอกสารขนส่ง แหล่งกำเนิด และใบอนุญาตตามสินค้า วิธีขนส่ง และข้อกำหนดที่ใช้บังคับ',
    },
    source: 'Vietnam Trade Information Portal',
    url: 'https://www.vietnamtradeportal.gov.vn/index.php?id=795&page=6&r=site%2Fdisplay',
  },
  {
    id: 'hs-lookup',
    category: 'customs',
    title: {
      vi: 'Tra cứu mã HS từ nguồn chính thức',
      en: 'Find HS information at the official source',
      th: 'ค้นหาข้อมูลพิกัด HS จากแหล่งทางการ',
    },
    description: {
      vi: 'Mã HS dùng để phân loại hàng hóa trong thương mại quốc tế. Cổng Thông tin Thương mại Việt Nam có công cụ tra cứu hàng hóa và biểu thuế để hỗ trợ bước chuẩn bị này.',
      en: 'HS codes classify goods in international trade. The Vietnam Trade Information Portal offers commodity and tariff searches to support shipment preparation.',
      th: 'รหัส HS ใช้จำแนกสินค้าในการค้าระหว่างประเทศ พอร์ทัลข้อมูลการค้าเวียดนามมีเครื่องมือค้นหาสินค้าและพิกัดอัตราศุลกากรเพื่อช่วยเตรียมการจัดส่ง',
    },
    source: 'Vietnam Trade Information Portal',
    url: 'https://www.vietnamtradeportal.gov.vn/index.php?id=5&r=site%2Fdisplay',
  },
  {
    id: 'incoterms-basics',
    category: 'trade',
    title: {
      vi: 'Incoterms® 2020: rõ chi phí, rõ trách nhiệm',
      en: 'Incoterms® 2020: clarify costs and responsibilities',
      th: 'Incoterms® 2020: ชัดเจนเรื่องต้นทุนและหน้าที่',
    },
    description: {
      vi: '11 quy tắc của ICC giúp phân chia chi phí, rủi ro và nghĩa vụ giữa người bán với người mua. Chọn điều kiện phù hợp là một phần quan trọng khi thỏa thuận giao hàng.',
      en: 'ICC’s 11 rules allocate costs, risks and obligations between seller and buyer. Selecting the appropriate rule is an important part of agreeing delivery terms.',
      th: 'กฎ 11 ข้อของ ICC แบ่งต้นทุน ความเสี่ยง และหน้าที่ระหว่างผู้ขายกับผู้ซื้อ การเลือกเงื่อนไขที่เหมาะสมจึงเป็นส่วนสำคัญของข้อตกลงการส่งมอบ',
    },
    source: 'International Chamber of Commerce',
    url: 'https://iccwbo.org/business-solutions/incoterms-rules/incoterms-2020/',
  },
  {
    id: 'incoterms-road',
    category: 'trade',
    title: {
      vi: 'Chọn điều kiện cho vận tải đường bộ',
      en: 'Choose terms suited to road transport',
      th: 'เลือกเงื่อนไขให้เหมาะกับการขนส่งทางถนน',
    },
    description: {
      vi: 'FCA, CPT, CIP, DAP, DPU, DDP và EXW dùng được cho mọi phương thức vận tải. FOB, CFR, CIF và FAS được thiết kế cho đường biển, đường thủy nội địa.',
      en: 'FCA, CPT, CIP, DAP, DPU, DDP and EXW can be used for any transport mode. FOB, CFR, CIF and FAS are for sea and inland waterway transport.',
      th: 'FCA, CPT, CIP, DAP, DPU, DDP และ EXW ใช้ได้กับการขนส่งทุกรูปแบบ ส่วน FOB, CFR, CIF และ FAS ใช้สำหรับการขนส่งทางทะเลและทางน้ำภายในประเทศ',
    },
    source: 'ICC Digital Library',
    url: 'https://library.iccwbo.org/content/tfb/BOOKS/BK_0049/BK_0049.htm',
  },
];

export const shippingFaqs: ShippingFaq[] = [
  {
    id: 'quote-information',
    question: {
      vi: 'Cần gửi thông tin gì để nhận báo giá sát nhu cầu?',
      en: 'What information helps prepare an accurate quote?',
      th: 'ควรแจ้งข้อมูลอะไรเพื่อขอใบเสนอราคาที่ตรงความต้องการ?',
    },
    answer: {
      vi: 'Hãy gửi nơi lấy và giao hàng, tên hàng, số kiện, trọng lượng, kích thước sau đóng gói và ngày dự kiến gửi. Nêu thêm điều kiện giao hàng, nhu cầu bốc dỡ, hàng dễ vỡ hoặc yêu cầu bảo quản để xác định đúng phạm vi dịch vụ.',
      en: 'Share pickup and delivery locations, product details, package count, weight, packed dimensions and the planned shipping date. Include delivery terms, loading needs, fragile items or storage requirements so the service scope can be defined.',
      th: 'แจ้งสถานที่รับและส่ง รายละเอียดสินค้า จำนวนหีบห่อ น้ำหนัก ขนาดหลังบรรจุ และวันส่งที่ต้องการ พร้อมเงื่อนไขการส่งมอบ การยกขน สินค้าแตกหักง่าย หรือข้อกำหนดการเก็บรักษา เพื่อกำหนดขอบเขตบริการ',
    },
  },
  {
    id: 'document-checklist',
    question: {
      vi: 'Có một bộ chứng từ chung cho mọi lô hàng không?',
      en: 'Does every shipment use the same document checklist?',
      th: 'สินค้าทุกเที่ยวใช้ชุดเอกสารเหมือนกันหรือไม่?',
    },
    answer: {
      vi: 'Không. Hồ sơ phụ thuộc loại hàng, phương thức vận chuyển và thủ tục áp dụng. Hãy chuẩn bị hóa đơn, packing list rồi kiểm tra nhu cầu chứng từ vận tải, xuất xứ, giấy phép hoặc kiểm tra chuyên ngành trước khi gửi.',
      en: 'No. Documents depend on the goods, transport mode and applicable procedures. Prepare the invoice and packing list, then check transport, origin, permit and specialist inspection requirements before dispatch.',
      th: 'ไม่เหมือนกัน เอกสารขึ้นอยู่กับสินค้า วิธีขนส่ง และขั้นตอนที่เกี่ยวข้อง ควรเตรียมใบกำกับสินค้าและรายการบรรจุหีบห่อ แล้วตรวจสอบเอกสารขนส่ง แหล่งกำเนิด ใบอนุญาต และการตรวจเฉพาะด้านก่อนส่ง',
    },
    source: 'Vietnam Trade Information Portal',
    url: 'https://www.vietnamtradeportal.gov.vn/index.php?id=795&page=6&r=site%2Fdisplay',
  },
  {
    id: 'cbm-calculation',
    question: {
      vi: 'Tính thể tích CBM của lô hàng như thế nào?',
      en: 'How do I calculate shipment volume in CBM?',
      th: 'คำนวณปริมาตรสินค้าเป็น CBM อย่างไร?',
    },
    answer: {
      vi: 'CBM là mét khối: dài × rộng × cao theo mét × số kiện cùng kích thước. Ví dụ 10 kiện 60 × 40 × 50 cm có tổng thể tích 1,2 m³. Đo cả bao bì hoặc pallet; các kích thước khác nhau cần tính riêng rồi cộng lại. CBM không phải giá cước.',
      en: 'CBM means cubic metres: length × width × height in metres × the number of identical packages. Ten 60 × 40 × 50 cm cartons total 1.2 m³. Include packaging or pallets and calculate differing sizes separately before adding them. CBM is not a freight quote.',
      th: 'CBM คือปริมาตรลูกบาศก์เมตร: ยาว × กว้าง × สูง เป็นเมตร × จำนวนหีบห่อขนาดเดียวกัน กล่อง 60 × 40 × 50 ซม. จำนวน 10 กล่อง เท่ากับ 1.2 ม³ วัดรวมบรรจุภัณฑ์หรือพาเลต และคำนวณแต่ละขนาดก่อนรวม CBM ไม่ใช่ราคาค่าขนส่ง',
    },
  },
  {
    id: 'road-incoterms',
    question: {
      vi: 'Vận chuyển đường bộ có nên dùng FOB hoặc CIF?',
      en: 'Should FOB or CIF be used for a road shipment?',
      th: 'การขนส่งทางถนนควรใช้ FOB หรือ CIF หรือไม่?',
    },
    answer: {
      vi: 'FOB và CIF thuộc nhóm quy tắc đường biển, đường thủy nội địa. Với đường bộ, hãy chọn trong nhóm dùng cho mọi phương thức và thống nhất rõ trách nhiệm, địa điểm giao nhận cùng phiên bản Incoterms.',
      en: 'FOB and CIF belong to the sea and inland waterway group. For road transport, select an any-mode rule and agree responsibilities, the named location and the Incoterms version.',
      th: 'FOB และ CIF เป็นกฎสำหรับทางทะเลและทางน้ำภายในประเทศ สำหรับทางถนนควรเลือกจากกลุ่มที่ใช้ได้ทุกรูปแบบ พร้อมตกลงหน้าที่ สถานที่ส่งมอบ และฉบับ Incoterms ให้ชัดเจน',
    },
    source: 'ICC Digital Library',
    url: 'https://library.iccwbo.org/content/tfb/BOOKS/BK_0049/BK_0049.htm',
  },
  {
    id: 'incoterms-contract',
    question: {
      vi: 'Incoterms có thay thế hợp đồng mua bán không?',
      en: 'Do Incoterms replace the sales contract?',
      th: 'Incoterms ใช้แทนสัญญาซื้อขายได้หรือไม่?',
    },
    answer: {
      vi: 'Không. Incoterms phân chia một số nghĩa vụ, chi phí và rủi ro giao hàng; không quyết định thời hạn thanh toán hay chuyển quyền sở hữu. Những nội dung này cần được thỏa thuận riêng trong hợp đồng.',
      en: 'No. Incoterms allocate certain delivery obligations, costs and risks; they do not determine payment timing or transfer of ownership. Those matters need separate agreement in the sales contract.',
      th: 'ไม่ได้ Incoterms แบ่งหน้าที่ ต้นทุน และความเสี่ยงบางส่วนในการส่งมอบ แต่ไม่ได้กำหนดเวลาชำระเงินหรือการโอนกรรมสิทธิ์ เรื่องเหล่านี้ต้องตกลงแยกไว้ในสัญญาซื้อขาย',
    },
    source: 'International Chamber of Commerce',
    url: 'https://library.iccwbo.org/content/tfb/BOOKS/BK_0049/BK_0049_03_Introduction.htm?AGENT=ICC_ACA',
  },
];
