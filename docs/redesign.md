# IBHOLA — Field notes / Editorial redesign

## Direction
A local running shop, not a simulated checkout. Warm paper (#f5f3eb), forest ink (#20372d), restrained lime (#d2ed85), generous sans-serif headlines with editorial italic accents. No new packages or remote fonts. The home is a numbered journey: equipment, the person behind the counter, Thursday runs, and the real Corrales store. Mobile gets the complete story, direct family links, readable image crops and an uncomplicated contact path.

The shared stylesheet was replaced rather than stacking more overrides. Catalog families and all represented brands remain intact; alternating photographic spreads replace full-bleed dark overlays. Custom kit becomes a light atelier. Events, FAQ, contact and legal documents use the same typographic and spacing system.

## References reviewed
- [Tracksmith](https://www.tracksmith.com): editorial storytelling and community belong alongside equipment. Adopted a strong reading hierarchy and a real local running story, not its branding or ecommerce mechanics.
- [Satisfy](https://www.satisfyrunning.com): image-led product collections with breathing room. Adapted to existing IBHOLA photography and a consultative store, without invented prices or a bag.
- [Running Warehouse Europe](https://www.runningwarehouse.eu): clear category discovery. All six catalog families are directly reachable from home and retain their existing hashes and mobile category selector.

## Rejected
Repeated three-card icon grids, green/black gradient bands, faux performance metrics, stock testimonials, rounded SaaS panels, mandatory intro animations, page-transition delays, social-feed embeds that dominate the page, and persistent full-width mobile contact bars. Social profile links remain direct; Google Maps and review links remain connected.

## Assets and behavior
Existing Guadiana race photography, the Miguel Pereira portrait, real HOKA/textil product photographs, Thursday beach running photograph and store interior are reused. No generated photography or new business claims. The native mobile dialog provides modal background inertness, a focus loop, Escape dismissal and focus restoration; a desktop breakpoint closes it and releases scrolling. Content is visible immediately. Reduced-motion preferences are respected.

The form prepares a mailto and explicitly says it does not send or store a message on the site. No backend was fabricated. Business configuration and legal copy are unchanged; existing missing fiscal/legal completion requirements remain a publication concern. Third-party Maps behavior remains outside the site's control.

## Verification
Run `npm run build` and `git diff --check`. Parent agent performs independent production browser QA (mobile/desktop route matrix, overflow, menu keyboard behavior, category anchors, carousel, form and accessibility). No commit or push performed by implementation agent.
