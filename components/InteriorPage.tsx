import type { ReactNode } from "react";
import { Header } from "./Header";
import { SiteFooter } from "./SiteFooter";

export function InteriorPage({ title, intro, children, showHero = true }: { title: string; intro: string; children: ReactNode; showHero?: boolean }) {
  return <><Header /><main id="main-content" className="interior" tabIndex={-1}>{showHero && <section className="page-hero"><div className="container"><p className="eyebrow">IBHOLA / Trail & running</p><h1>{title}</h1><p>{intro}</p></div></section>}{children}</main><SiteFooter /></>;
}
