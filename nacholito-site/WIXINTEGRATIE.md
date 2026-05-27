# Nacholito website, productieversie — integreren in Wix

## Wat zit hierin
- `index.html` — de complete nieuwe homepage (één bestand, alle CSS en JS erin)
- `assets/hero-bulgogi.mp4` — hero-video, audio eruit, 6,4 MB (Wix-vriendelijk)
- `assets/hero-poster.jpg` — poster-frame, getoond voordat de video laadt
- `assets/dish-1 t/m 8.jpg` — alle gerechtfoto's, web-geoptimaliseerd

## Snelste route in Wix (volgorde van voorkeur)

**1. Rebuild per sectie (aanbevolen, behoudt Wix-navigatie en SEO).**
Gebruik `index.html` als exacte blauwdruk. De pagina is opgebouwd in losse secties (hero, ons merk, ingrediënten, smaken, elk moment, de spits, twee wegen, gerechten, lab, quotes, cta). Bouw die één op één na in Wix-secties. Upload de video als Wix video-achtergrond op de hero-sectie, de foto's naar Wix Media. Kleuren, teksten en volgorde staan exact in het bestand.

**2. Embed via Wix (snelste, maar minder netjes).**
Wix laat een HTML-blok embedden via Insert, Embed, Embed HTML, of een Custom Element. Host `index.html` plus de `assets`-map ergens publiek (bijvoorbeeld gratis op Cloudflare Pages of Netlify) en laad hem in een iframe. Werkt, maar de Wix-header en het iframe leven dan naast elkaar, dus minder strak.

## Kleur, lettertype, logo
- Kleuren staan al goed: rood #BD0A0A, geel #FFC61A, zand #F6EBD9, inkt #1c1408.
- Koppen in Bebas Neue, lopende tekst in Raleway (allebei gratis, ook in Wix beschikbaar).
- Logo: in de code staat het woordmerk nu als tekst. Vervang dit in Wix door jullie officiële Caveage-logobestand (PNG of SVG). De plek is gemarkeerd met een comment `SWAP` in de code.

## Belangrijk
- De Albert Heijn private label deal staat er bewust niet op.
- De calavera-iconen zijn nu nagebouwd in SVG. Vervang ze waar mogelijk door jullie officiële logo-illustraties uit het brandbook voor 100 procent merkconsistentie.
- De gerechtfoto's 2, 3 en 4 hebben een ingebakken tekstlabel (lunch, borrel, diner). Voor de lange termijn zijn schone versies zonder tekst beter.
