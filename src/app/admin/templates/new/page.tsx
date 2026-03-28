"use client";

import TemplateFormPage from "../[id]/page";

export default function NewTemplatePage() {
  return <TemplateFormPage params={Promise.resolve({ id: "new" })} />;
}
