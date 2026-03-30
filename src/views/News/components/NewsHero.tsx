import PageHero from "@/components/PageHero";

export default function NewsHero() {
  return (
    <PageHero
      image="/images/news/hero.png"
      imageAlt="Tin tức Vila Sanmyshi"
      overlay="bg-black/20"
      breadcrumb={[{ label: "Tin tức & Sự kiện" }]}
      tag="Cập nhật thị trường"
      title={<>Tin tức & <span className="text-primary">Sự kiện</span></>}
      description="Cập nhật những biến động mới nhất về chính sách Hải quan, xu hướng logistics toàn cầu và các tin tức từ Vila Sanmyshi."
    />
  );
}
