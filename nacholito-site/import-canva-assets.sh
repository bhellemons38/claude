#!/usr/bin/env bash
# Nacholito — Canva asset import
#
# WAAROM dit script?
# Claude Code's remote sandbox kan Canva-exports niet direct downloaden
# (egress allowlist blokt *.canva.com CDN). Daarom genereren we hier verse
# signed URLs uit de Canva MCP en draaien we dit script lokaal om de
# binaries in nacholito-site/assets/ te plaatsen.
#
# Gebruik (op je eigen machine, binnen ~16u na het commit-moment):
#   cd nacholito-site
#   bash import-canva-assets.sh
#   git add assets/
#   git commit -m "chore: import Canva assets"
#   git push
#
# URLs verlopen ongeveer 16-22 uur na generatie. Als er 403/expired
# terugkomt: vraag Claude om nieuwe URLs te regenereren.

set -uo pipefail

ASSETS_DIR="$(cd "$(dirname "$0")" && pwd)/assets"
mkdir -p "$ASSETS_DIR"

OK=0; FAIL=0
fetch() {
  local out="$1" url="$2" label="$3"
  echo "  → $label ($out)"
  if curl -fsSL --max-time 180 -o "$ASSETS_DIR/$out.tmp" "$url"; then
    mv "$ASSETS_DIR/$out.tmp" "$ASSETS_DIR/$out"
    OK=$((OK+1))
  else
    rm -f "$ASSETS_DIR/$out.tmp"
    echo "    !! URL verlopen of fout — bestaande $out blijft staan"
    FAIL=$((FAIL+1))
  fi
}

echo "== Hero =="
# LET OP: deze signed URLs verlopen 10 jun ~13:00 GMT. Na expiry blijft de
# bestaande (verkeerde) hero staan — regenereer dan nieuwe URLs via Canva
# en draai dit script lokaal; commit daarna assets/ zodat dit permanent is.
fetch hero-bulgogi.mp4 \
  'https://export-download.canva.com/p3ku8/DAHG1Hp3ku8/-1/0-3819558448309521608.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20260609%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260609T151122Z&X-Amz-Expires=79328&X-Amz-Signature=dc05f6f60a3e0d6fc764dd9b369041def47f30a79245bb15e7e7baa5c4b1db3c&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Wed%2C%2010%20Jun%202026%2013%3A13%3A30%20GMT' \
  "BULGOGI KARAAGE CHICKEN (MP4 1080p)"
fetch hero-poster.jpg \
  'https://export-download.canva.com/p3ku8/DAHG1Hp3ku8/-1/0/0001-5627753695974862988.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20260610%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260610T090057Z&X-Amz-Expires=13219&X-Amz-Signature=9626f153092aeff8fa7b6dd56f97814dd5dd967366e2ff11716b6757e5ccdf1a&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Wed%2C%2010%20Jun%202026%2012%3A41%3A16%20GMT' \
  "BULGOGI KARAAGE CHICKEN — eerste frame (poster)"

echo "== Smaak-cards =="
# Pages uit 'Nieuwe sauzen!' (DAHAQuhdkBg, 1200x1200 square)
# Page 1 lijkt overview → product-bottle.jpg. Pages 2-5 → 4 smaken.
# Volgorde is een eerste gok; swap de filenames hieronder als de smaak niet matcht.
fetch product-bottle.jpg \
  'https://export-download.canva.com/hdkBg/DAHAQuhdkBg/-1/0/0001-1097132399625989985.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20260609%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260609T092831Z&X-Amz-Expires=35572&X-Amz-Signature=c90d2eb6edd8d41fec65609bd735b1aeb388af33f0af3ecc0e0c4347079747f9&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Tue%2C%2009%20Jun%202026%2019%3A21%3A23%20GMT' \
  "Nieuwe sauzen — page 1 (assortiment)"
fetch smaak-bulgogi.jpg \
  'https://export-download.canva.com/hdkBg/DAHAQuhdkBg/-1/0/0002-1097132399625989985.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20260608%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260608T202750Z&X-Amz-Expires=84601&X-Amz-Signature=8b223cb8652966c90a77e31c74b1f046735e5895b0848f4add1cf3784c3320e3&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Tue%2C%2009%20Jun%202026%2019%3A57%3A51%20GMT' \
  "Nieuwe sauzen — page 2"
fetch smaak-chipotle.jpg \
  'https://export-download.canva.com/hdkBg/DAHAQuhdkBg/-1/0/0003-1097132399625989985.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20260609%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260609T045309Z&X-Amz-Expires=52991&X-Amz-Signature=341ebda85d63799d85ed7837c55f99a7f24541614fe9b908a876ea6f5b958329&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Tue%2C%2009%20Jun%202026%2019%3A36%3A20%20GMT' \
  "Nieuwe sauzen — page 3"
fetch smaak-chili.jpg \
  'https://export-download.canva.com/hdkBg/DAHAQuhdkBg/-1/0/0004-1097132399625989985.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20260609%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260609T071823Z&X-Amz-Expires=45238&X-Amz-Signature=7153c8183e203cbc900e20f6f4a727d1130cfb82219810474b5ccf14fff3a22d&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Tue%2C%2009%20Jun%202026%2019%3A52%3A21%20GMT' \
  "Nieuwe sauzen — page 4"
fetch smaak-rendang.jpg \
  'https://export-download.canva.com/hdkBg/DAHAQuhdkBg/-1/0/0005-1097132399625989985.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20260609%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260609T125008Z&X-Amz-Expires=23849&X-Amz-Signature=edb7de4000fe46ed6fa4e11c63bba383085b031b90e4674d12b738195f742dd3&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Tue%2C%2009%20Jun%202026%2019%3A27%3A37%20GMT' \
  "Nieuwe sauzen — page 5"

echo "== Gerecht-galerij =="
# Bulgogi-gerechten uit standalone designs
fetch dish-2.jpg \
  'https://export-download.canva.com/66qtk/DAHHHF66qtk/-1/0/0001-4170839142290031420.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20260609%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260609T092221Z&X-Amz-Expires=37775&X-Amz-Signature=afc57685624731867413071101c7159657a8c9dd2aafc2c619b72f722417d0a2&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Tue%2C%2009%20Jun%202026%2019%3A51%3A56%20GMT' \
  "BULGOGI kipspiesjes (Lunch)"
fetch dish-3.jpg \
  'https://export-download.canva.com/p3ku8/DAHG1Hp3ku8/-1/0/0001-1803071639345260051.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20260609%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260609T093650Z&X-Amz-Expires=37443&X-Amz-Signature=6cf57ecdd454a27765f4c8e84083fe8b6afe620e251430cdb0aead08263dc3cc&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Tue%2C%2009%20Jun%202026%2020%3A00%3A53%20GMT' \
  "BULGOGI karaage (Borrel)"
fetch dish-4.jpg \
  'https://export-download.canva.com/EcDU4/DAHDFoEcDU4/-1/0/0001-1097132398593563893.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20260609%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260609T071124Z&X-Amz-Expires=44634&X-Amz-Signature=6290522f32a21faf8c652c489b469f25bacda6f6a49df4560c0c240343792c47&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Tue%2C%2009%20Jun%202026%2019%3A35%3A18%20GMT' \
  "BULGOGI BEEF BOL (Diner)"

# Pages uit 'Nacholito sauzen' (DAHEZ2D2AR4, 1350x1080 landscape).
# Pages 1/3/5/7 → onderkant gallery (Chipotle / Garnaal / Rendang / Satay).
# Volgorde is een eerste gok; swap als nodig.
fetch dish-5.jpg \
  'https://export-download.canva.com/D2AR4/DAHEZ2D2AR4/-1/0/0001-9002075645754092664.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20260608%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260608T213348Z&X-Amz-Expires=79789&X-Amz-Signature=06a73de500123c4fc10cab0a87435a6c8ceea014c161dfecf7ca46ad8910b334&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Tue%2C%2009%20Jun%202026%2019%3A43%3A37%20GMT' \
  "Nacholito sauzen — page 1 (Chipotle)"
fetch dish-6.jpg \
  'https://export-download.canva.com/D2AR4/DAHEZ2D2AR4/-1/0/0003-9002075645754092664.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20260609%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260609T044753Z&X-Amz-Expires=54291&X-Amz-Signature=cd4e2e53d5de4f8728d723cff35e8a28dc7cff1c080b580758485f88057ef104&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Tue%2C%2009%20Jun%202026%2019%3A52%3A44%20GMT' \
  "Nacholito sauzen — page 3 (Garnaal & sesam)"
fetch dish-7.jpg \
  'https://export-download.canva.com/D2AR4/DAHEZ2D2AR4/-1/0/0005-9002075645754092664.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20260609%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260609T080805Z&X-Amz-Expires=41832&X-Amz-Signature=5b4ae735228b96c29e8afdc6d8ddbdc95d0f0b39f8b1f37e2ad2b47680303f5a&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Tue%2C%2009%20Jun%202026%2019%3A45%3A17%20GMT' \
  "Nacholito sauzen — page 5 (Rendang)"
fetch dish-8.jpg \
  'https://export-download.canva.com/D2AR4/DAHEZ2D2AR4/-1/0/0007-9002075645754092664.jpg?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=AKIAQYCGKMUH5AO7UJ26%2F20260609%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260609T001933Z&X-Amz-Expires=70846&X-Amz-Signature=bb22d57b05dc4858f554cc0516e4f62b2b5ca933cf62a84cb799217cfbb3f56a&X-Amz-SignedHeaders=host%3Bx-amz-expected-bucket-owner&response-expires=Tue%2C%2009%20Jun%202026%2020%3A00%3A19%20GMT' \
  "Nacholito sauzen — page 7 (Satay)"

echo
echo "✓ Klaar — $OK gelukt, $FAIL gefaald."
ls -la "$ASSETS_DIR"
# Nooit non-zero exit-code: Netlify-build moet doorgaan zelfs als enkele
# URLs verlopen zijn (dan blijven de eerder gecommitte assets staan).
exit 0
