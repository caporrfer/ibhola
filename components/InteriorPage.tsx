import type { ReactNode } from "react";
import { Header } from "./Header";
import { RevealObserver } from "./Reveal";
import { SiteFooter } from "./SiteFooter";
import { Topography } from "./Topography";

export function InteriorPage({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return <><RevealObserver /><Header /><main className="interior"><section className="page-hero"><Topography className="page-hero__topography" /><div className="container"><p className="eyebrow"><span />{eyebrow}</p><h1>{title}</h1><p>{intro}</p></div></section>{children}</main><SiteFooter /></>;
}
