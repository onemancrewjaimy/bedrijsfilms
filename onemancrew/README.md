# ONEMANCREW website

Vanilla HTML, CSS en JavaScript. Geen build-stap, geen framework, geen dependencies behalve Google Fonts.

## Lokaal draaien

Open `index.html` direct in de browser, of start een lokale server voor de beste ervaring (nodig voor `autoplay`/`loading="lazy"` gedrag in sommige browsers):

```bash
# met Python
python -m http.server 8000

# of met Node
npx serve .
```

Ga daarna naar `http://localhost:8000`.

## Structuur

```
onemancrew/
├── index.html       Home
├── diensten.html    Dienstdetails (bedrijfsfilms, content packages, groeimedia)
├── portfolio.html    Volledig werk-overzicht met filters en lightbox
├── over.html         Verhaal van Jaimy van der Meer / ONEMANCREW
├── contact.html       Contactformulier en gegevens
├── css/               reset, variables, base, components, layout, animations
├── js/                main, reveal, counters, charts, interactions, testimonials
├── assets/img|video|icons
└── logo/logo.png
```

## Content die nog vervangen moet worden

Gemarkeerd met `<!-- TODO: vervangen -->` in de HTML. Belangrijkste plekken:

- **Logo**: `logo/logo.png` ontbreekt nog, plaats het echte logo hier (transparante PNG, ~120px hoog werkt het best). Tot die tijd verbergt `onerror` de afbeelding netjes.
- **Hero video**: `assets/video/hero-reel.mp4` + poster `assets/img/hero-poster.jpg` (index.html).
- **Portfolio**: thumbnails in `assets/img/work-0x.jpg` en video's in `assets/video/work-0x.mp4` (index.html en portfolio.html). Voeg `data-category` toe die matcht met de filterknoppen (`bedrijfsfilm`, `content-package`, `groeimedia`) als je items toevoegt of wijzigt.
- **Cijfers en grafiek**: drie van de vier statistieken en de groeicurve op de homepage zijn nog indicatief (74%, 3.2x, 120+). De 100% op-tijd-leverstat is al bevestigd en definitief. Vervang de overige `data-count-to` waarden en de SVG-punten in de grafiek door echte cijfers zodra die bekend zijn.
- **Klantnamen**: de statische lijst in de "Vertrouwen"-sectie op de homepage gebruikt placeholder bedrijfsnamen.
- **Klantreviews**: de slider in de "Wat klanten zeggen"-sectie (`index.html`) gebruikt verzonnen quotes en avatars in `assets/img/client-0x.jpg`. Vervang door echte reviews zodra je die hebt.
- **Contactgegevens**: e-mailadres en telefoonnummer staan nu als placeholder in `contact.html`, `index.html` (footer) en alle overige footers.
- **Contactformulier**: `js/main.js` (functie `contactForm`) simuleert nu de verzending. Vervang de `setTimeout` door een echte fetch-call naar je backend of formulierdienst (bijv. Formspree, Resend, een eigen endpoint).

## Animaties en interactie

- Scroll reveals via `IntersectionObserver` in `js/reveal.js`, gestuurd met de class `.reveal` en optioneel `data-reveal-group` / `data-reveal-delay` voor gespreide timing.
- Tellende cijfers in `js/counters.js`, gestart zodra een element met `data-count-to` in beeld komt.
- SVG-grafiek animatie in `js/charts.js` (lijn tekent zich, vlak vult, punten poppen in).
- Hover-glow op cards, magnetische knoppen, hero-parallax, hover-tilt op portfolio cards en de vullende procestijdlijn in `js/interactions.js`.
- Klantreview-slider in `js/testimonials.js`: autoplay met voortgangsbalk op de actieve dot, fade/slide overgang, pijlen, dots en swipe-support op touch.
- Alles respecteert `prefers-reduced-motion`: animaties worden uitgeschakeld of sterk afgezwakt.

## Browserondersteuning

Getest op recente Chrome, Edge en Firefox. Gebruikt moderne CSS (`clamp()`, `aspect-ratio`, custom properties) en `IntersectionObserver`, dus geen IE11-ondersteuning.
