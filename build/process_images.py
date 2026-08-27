#!/usr/bin/env python3
"""
Selects and optimizes source photography from the HICC IBADAN asset folder
into web-ready sizes for the Heralds International Christian Centre website.
No third-party network calls -- Pillow only.
"""
import os
import numpy as np
from PIL import Image, ImageOps, ImageDraw

SRC = "/mnt/user-data/uploads/HICC IBADAN"
PROJECT = "/home/claude/heralds-icc"
OUT = os.path.join(PROJECT, "public/images")
os.makedirs(OUT, exist_ok=True)

# filename -> (output name, max width, quality, focal crop ratio "w:h" or None)
# Note: DSC_0554 / DSC_0406 (the homepage hero slider slides) are handled
# separately below, in HERO_SLIDES, so they get full responsive srcset sets.
JOBS = [
    ("DSC_0509.jpg", "teaching-ministry.jpg", 1200, 78, "4:3"),
    ("DSC_0492.jpg", "visit-us-hall.jpg", 1400, 78, "4:3"),
    ("DSC_0443.jpg", "welcome-portrait.jpg", 1000, 82, "1:1"),
    ("DSC_0372.jpg", "music-ministry.jpg", 1200, 78, "4:3"),
    ("DSC_0411.jpg", "multimedia-ministry.jpg", 1200, 78, "4:3"),
    ("DSC_0367.jpg", "fellowship-1.jpg", 1000, 78, "1:1"),
    ("DSC_0386.jpg", "fellowship-2.jpg", 1000, 78, "1:1"),
    ("DSC_0389.jpg", "testimony-portrait.jpg", 1000, 82, "1:1"),
    ("DSC_0362.jpg", "gallery-1.jpg", 1000, 78, "4:3"),
    ("DSC_0413.jpg", "gallery-2.jpg", 1000, 78, "4:3"),
    ("DSC_0619.jpg", "gallery-3.jpg", 1000, 78, "4:3"),
    ("DSC_0563.jpg", "contact-banner.jpg", 1600, 78, None),
    ("DSC_0576.jpg", "prayer-banner.jpg", 1600, 78, None),
    ("DSC_0544.jpg", "give-banner.jpg", 1600, 78, None),
    ("DSC_0543.jpg", "outreach-ministry.jpg", 1200, 78, "4:3"),
]

def recolor_maroon_to_gold(im, gold=(217, 164, 65)):
    """Recolors the logo's maroon/red flame icon + "IBADAN" pill to the
    site's gold accent color (--gold-500), leaving the white wordmark
    untouched. The source logo is a flat two-tone design (maroon shape +
    white text) with anti-aliased blends at the edges where they meet, so
    each opaque pixel's color is projected onto the maroon->white axis and
    the same blend ratio is used to re-composite between gold and white --
    this preserves the original anti-aliasing instead of leaving hard,
    jagged edges. Alpha (including the soft edge against the transparent
    background) is left untouched.
    """
    arr = np.array(im.convert("RGBA")).astype(float)
    r, g, b, a = arr[..., 0], arr[..., 1], arr[..., 2], arr[..., 3]
    maroon = np.array([128.8, 46.7, 7.4])
    white = np.array([255.0, 255.0, 255.0])
    axis = white - maroon
    axis_len2 = float(np.dot(axis, axis))
    px = np.stack([r, g, b], axis=-1)
    t = np.tensordot(px - maroon, axis, axes=([2], [0])) / axis_len2
    t = np.clip(t, 0.0, 1.0)[..., None]
    gold_arr = np.array(gold, dtype=float)
    new_rgb = (1 - t) * gold_arr + t * white
    out = arr.copy()
    out[..., :3] = new_rgb
    out[..., 3] = a
    out = np.clip(out, 0, 255).astype("uint8")
    return Image.fromarray(out, "RGBA")


def crop_to_ratio(im, ratio):
    if not ratio:
        return im
    rw, rh = [float(x) for x in ratio.split(":")]
    target = rw / rh
    w, h = im.size
    current = w / h
    if current > target:
        new_w = int(h * target)
        left = (w - new_w) // 2
        im = im.crop((left, 0, left + new_w, h))
    else:
        new_h = int(w / target)
        top = (h - new_h) // 3  # bias slightly toward upper portion (faces)
        top = max(0, min(top, h - new_h))
        im = im.crop((0, top, w, top + new_h))
    return im

for src_name, out_name, max_w, quality, ratio in JOBS:
    path = os.path.join(SRC, src_name)
    im = Image.open(path)
    im = ImageOps.exif_transpose(im)
    im = im.convert("RGB")
    im = crop_to_ratio(im, ratio)
    if im.width > max_w:
        new_h = int(im.height * (max_w / im.width))
        im = im.resize((max_w, new_h), Image.LANCZOS)
    im.save(os.path.join(OUT, out_name), "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"{out_name}: {im.size}, {os.path.getsize(os.path.join(OUT, out_name))//1024}KB")

# --- Homepage hero slider: 3 auto-advancing slides, each with a full
# responsive srcset. Slide 1 (hero-worship) is the LCP image. ---
HERO_SLIDES = [
    ("DSC_0554.jpg", "hero-worship"),      # wide auditorium/worship shot (existing hero)
    ("DSC_0406.jpg", "hero-worship-alt"),  # worship leader at the mic
    ("DSC_0576.jpg", "hero-worship-3"),    # congregation, hands raised in worship
]
for src_name, base in HERO_SLIDES:
    hero_src = Image.open(os.path.join(SRC, src_name))
    hero_src = ImageOps.exif_transpose(hero_src).convert("RGB")

    base_img = hero_src
    if base_img.width > 2000:
        h0 = int(base_img.height * (2000 / base_img.width))
        base_img = base_img.resize((2000, h0), Image.LANCZOS)
    base_path = os.path.join(OUT, f"{base}.jpg")
    base_img.save(base_path, "JPEG", quality=78, optimize=True, progressive=True)
    print(f"{base}.jpg: {base_img.size}, {os.path.getsize(base_path)//1024}KB")

    for w, q, suffix in [(800, 72, "-800"), (1280, 75, "-1280"), (1920, 76, "-1920")]:
        h = int(hero_src.height * (w / hero_src.width))
        resized = hero_src.resize((w, h), Image.LANCZOS)
        out_path = os.path.join(OUT, f"{base}{suffix}.jpg")
        resized.save(out_path, "JPEG", quality=q, optimize=True, progressive=True)
        print(f"{base}{suffix}.jpg: {resized.size}, {os.path.getsize(out_path)//1024}KB")

# --- Sermon archive: real teaching-series flyer graphics supplied by the
# church (already-designed square posters -- used as-is, no text overlay
# needed). Order matches the sermon archive grid on the site. ---
SERMON_SRC = os.path.join(SRC, "Sermon Archive")
SERMON_JOBS = [
    ("ELIAS - HIB.jpg", "elias"),
    ("Jesus Knows You - HIB.jpg", "jesus-knows-you"),
    ("The Promises of GOD.jpg", "the-promises-of-god"),
    ("MENO - Ibadan.jpg", "meno"),
    ("The Supernatural.png", "the-supernatural"),
    ("Attitude - HIB.jpg", "attitude"),
    ("Faith or Not - IBADAN.png", "faith-or-not"),
    ("Increase - HIB V2.png", "increase"),
]
SERMON_OUT = os.path.join(OUT, "sermons")
os.makedirs(SERMON_OUT, exist_ok=True)
for src_name, slug in SERMON_JOBS:
    im = Image.open(os.path.join(SERMON_SRC, src_name))
    im = ImageOps.exif_transpose(im).convert("RGB")
    if im.width > 800:
        h = int(im.height * (800 / im.width))
        im = im.resize((800, h), Image.LANCZOS)
    out_path = os.path.join(SERMON_OUT, f"{slug}.jpg")
    im.save(out_path, "JPEG", quality=84, optimize=True, progressive=True)
    print(f"sermons/{slug}.jpg: {im.size}, {os.path.getsize(out_path)//1024}KB")

# --- Events: real event flyer graphics supplied by the church (already-
# designed posters -- used as-is). Cropped to a consistent 4:5 card ratio. ---
EVENT_SRC = os.path.join(SRC, "Events")
EVENT_JOBS = [
    ("IMG-20260814-WA0001.jpg", "summer-camp-2026"),
    ("IMG-20260827-WA0000.jpg", "prayerthon-2026"),
    ("IMG-20260719-WA0006.jpg", "congress-2026"),
]
EVENT_OUT = os.path.join(OUT, "events")
os.makedirs(EVENT_OUT, exist_ok=True)
for src_name, slug in EVENT_JOBS:
    im = Image.open(os.path.join(EVENT_SRC, src_name))
    im = ImageOps.exif_transpose(im).convert("RGB")
    im = crop_to_ratio(im, "4:5")
    if im.width > 900:
        h = int(im.height * (900 / im.width))
        im = im.resize((900, h), Image.LANCZOS)
    out_path = os.path.join(EVENT_OUT, f"{slug}.jpg")
    im.save(out_path, "JPEG", quality=84, optimize=True, progressive=True)
    print(f"events/{slug}.jpg: {im.size}, {os.path.getsize(out_path)//1024}KB")

# --- Logo: recolor the maroon/red flame + "IBADAN" pill to the site's gold
# accent so it blends with the theme instead of clashing with it. ---
logo_src = os.path.join(SRC, "LOGO - IBaas.png")
logo = Image.open(logo_src).convert("RGBA")
logo = recolor_maroon_to_gold(logo)
logo.save(os.path.join(OUT, "logo-heralds.png"))

# 2x logo not available (source is native res) -- ship native.
print(f"logo-heralds.png: {logo.size}")

# --- Favicon + touch icons from the flame mark ---
# Crop just the flame glyph (left portion of the lockup) using alpha bbox.
alpha = logo.split()[-1]
bbox = alpha.getbbox()
flame_full = logo.crop(bbox)
# The flame icon is roughly the first ~30% width of the lockup before the wordmark starts.
fw = int(flame_full.width * 0.34)
flame = flame_full.crop((0, 0, fw, flame_full.height))
flame_bbox = flame.split()[-1].getbbox()
if flame_bbox:
    flame = flame.crop(flame_bbox)

def square_icon(icon, size, bg=(16, 30, 109, 255), pad_ratio=0.22):
    canvas = Image.new("RGBA", (size, size), bg)
    pad = int(size * pad_ratio)
    avail = size - pad * 2
    ic = icon.copy()
    ic.thumbnail((avail, avail), Image.LANCZOS)
    x = (size - ic.width) // 2
    y = (size - ic.height) // 2
    canvas.alpha_composite(ic, (x, y))
    return canvas

for size, name in [(512, "icon-512.png"), (192, "icon-192.png"), (32, "favicon-32.png"), (16, "favicon-16.png"), (180, "apple-touch-icon.png")]:
    square_icon(flame, size).convert("RGB" if False else "RGBA").save(os.path.join(OUT, name))

# .ico (multi-size) for classic favicon.ico
ico_sizes = [16, 32, 48]
ico_img = square_icon(flame, 48)
ico_img.save(os.path.join(PROJECT, "public/favicon.ico"), sizes=[(s, s) for s in ico_sizes])

print("Favicon set generated.")

# --- Open Graph share image (1200x630) ---
og = Image.new("RGB", (1200, 630), (10, 19, 48))
# subtle gradient
for y in range(630):
    t = y / 630
    r = int(10 + (26 - 10) * t)
    g = int(19 + (76 - 19) * t)
    b = int(48 + (140 - 48) * t)
    ImageDraw.Draw(og).line([(0, y), (1200, y)], fill=(r, g, b))
logo_for_og = logo.copy()
logo_for_og.thumbnail((640, 200), Image.LANCZOS)
og_rgba = og.convert("RGBA")
lx = (1200 - logo_for_og.width) // 2
ly = (630 - logo_for_og.height) // 2 - 20
og_rgba.alpha_composite(logo_for_og, (lx, ly))
og_rgba.convert("RGB").save(os.path.join(PROJECT, "public/images/og-default.jpg"), quality=88)
print("OG image generated.")
