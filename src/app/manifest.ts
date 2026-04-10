import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'VILA SANMYSHI Logistics',
    short_name: 'VILA SANMYSHI',
    description: 'VILA SANMYSHI - Chuyên khai báo hải quan, vận tải quốc tế tại Cửa khẩu Lao Bảo (Quảng Trị).',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#004daa',
    icons: [
      {
        src: '/images/logo.jpg',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
