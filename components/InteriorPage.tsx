import type { ReactNode } from "react";
import { Header } from "./Header";
import { RevealObserver } from "./Reveal";
import { SiteFooter } from "./SiteFooter";
import { Topography } from "./Topography";

export function InteriorPage({ title, intro, children }: { title: string; intro: string; children: ReactNode }) {
  return <><RevealObserver /><Header /><main className="interior"><section className="page-hero"><Topography className="page-hero__topography" /><div className="container"><h1>{title}</h1><p>{intro}</p></div></section>{children}</main><SiteFooter /></>;
}
