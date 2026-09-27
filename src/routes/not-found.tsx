import { NotFound } from "../components/NotFound";
import { seo } from "../lib/seo";

export const meta = () =>
  seo({ title: "Not found | TechDesk", description: "This page does not exist.", path: "/404", noindex: true });

export default function NotFoundRoute() {
  return <NotFound />;
}
