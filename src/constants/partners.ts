export interface Partner {
  id: string;
  name: string;
  logo: string;
  website?: string;
}

export const INITIAL_PARTNERS: Partner[] = [
  { id: "1", name: "WCA", logo: "/images/hero/doitac/wca-logo-2.png.png" },
  { id: "2", name: "IATA", logo: "/images/hero/doitac/IATAlogo-1.png.png" },
  { id: "3", name: "PIL", logo: "/images/hero/doitac/pil-logo-2.png.png" },
  { id: "4", name: "YANG MING", logo: "/images/hero/doitac/yang-ming-logo-2.png.png" },
  { id: "5", name: "MOL", logo: "/images/hero/doitac/mol-logo-2.png.png" },
  { id: "6", name: "MAERSK", logo: "/images/hero/doitac/1.png" },
  { id: "7", name: "LOGISTICS GROUP", logo: "/images/hero/doitac/Group-min.png.png" }
];
