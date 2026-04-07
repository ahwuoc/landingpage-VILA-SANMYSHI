export interface LocationCoord {
  cx: number;
  cy: number;
}

export const VIETNAM_COORDINATES: Record<string, LocationCoord> = {
  // Major Cities
  "VNHN": { cx: 495.3, cy: 199.8 }, // Ha Noi
  "VNSG": { cx: 549, cy: 820.8 },  // Ho Chi Minh City
  "VNDN": { cx: 634.7, cy: 502.8 }, // Da Nang
  "VNHP": { cx: 548.8, cy: 209.2 }, // Hai Phong
  "VNCT": { cx: 487.9, cy: 854.9 }, // Can Tho
  
  // Provinces (IDs from vn.svg)
  "VN25": { cx: 566.6, cy: 459.5 }, // Quang Tri
  "VN24": { cx: 526.3, cy: 412.5 }, // Quang Binh
  "VN26": { cx: 595.3, cy: 484.3 }, // Thua Thien Hue
  "VN27": { cx: 629.3, cy: 530.4 }, // Quang Nam
  "VN29": { cx: 667, cy: 564.2 },   // Quang Ngai
  "VN21": { cx: 481.1, cy: 258.6 }, // Thanh Hoa
  "VN22": { cx: 448, cy: 307.1 },   // Nghe An
  "VN23": { cx: 495.7, cy: 364.4 }, // Ha Tinh
  "VN31": { cx: 683, cy: 615.9 },   // Binh Dinh
  "VN32": { cx: 692.2, cy: 685.4 }, // Phu Yen
  "VN34": { cx: 686, cy: 731.5 },   // Khanh Hoa (Nha Trang)
  "VN36": { cx: 680.8, cy: 764.3 }, // Ninh Thuan
  "VN40": { cx: 619.6, cy: 806.9 }, // Binh Thuan
  "VN30": { cx: 643.1, cy: 637.1 }, // Gia Lai
  "VN28": { cx: 624, cy: 586.8 },   // Kon Tum
  "VN33": { cx: 641.4, cy: 699.2 }, // Dak Lak
  "VN72": { cx: 611.6, cy: 739.5 }, // Dak Nong
  "VN35": { cx: 650.3, cy: 760.4 }, // Lam Dong
  "VN58": { cx: 565.5, cy: 765.6 }, // Binh Phuoc
  "VN57": { cx: 553, cy: 799.6 },   // Binh Duong
  "VN37": { cx: 518.3, cy: 784.3 }, // Tay Ninh
  "VN41": { cx: 531.7, cy: 823.2 }, // Long An
  "VN39": { cx: 582.6, cy: 805.7 }, // Dong Nai
  "VN43": { cx: 586.2, cy: 835.3 }, // Ba Ria Vung Tau
  
  // Islands (Calculated for accuracy)
  "HOANGSA": { cx: 865, cy: 474 },
  "TRUONGSA": { cx: 950, cy: 850 },
};
