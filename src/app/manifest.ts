import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VILA SANMYSHI Logistics',
    short_name: 'VILA SANMYSHI',
    description: 'VILA SANMYSHI - Chuyên khai báo hải quan, vận tải quốc tế tại Cửa khẩu Lao Bảo (Quảng Trị).',
    start_url: '/',
    display: 'standalone',
    background_color: '#f7f8f2',
    theme_color: '#287830',
    icons: [
      {
        src: '/images/logo.jpg',
        sizes: '631x395',
        type: 'image/jpeg',
      },
    ],
  };
}
