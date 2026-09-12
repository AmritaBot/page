#!/usr/bin/env python3
"""Generate the site's raster assets from the official Amrita logo.

Source artwork:
    https://raw.githubusercontent.com/AmritaBot/AmritaBot/main/logo/Amrita-nobg.png
    (transparent 2048x2048 PNG, dark line art)

The outputs live in public/ and are committed, so a normal `npm run build`
never needs to run this. Re-run it only when the upstream logo or the
wordmark copy changes:

    curl -sSLo /tmp/Amrita-nobg.png \\
      https://raw.githubusercontent.com/AmritaBot/AmritaBot/main/logo/Amrita-nobg.png
    python3 scripts/make-assets.py /tmp/Amrita-nobg.png

Fonts: DejaVu for the Latin wordmark, Droid Sans Fallback for the Chinese
tagline on the OG card (the shipped Inter subset is latin-only). Both are
present on the build host; neither is embedded in the page.
"""
import sys

from PIL import Image, ImageDraw, ImageFont

SRC = sys.argv[1] if len(sys.argv) > 1 else "/tmp/assets/Amrita-nobg.png"
OUT = "public"
BOLD = "/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf"
REG = "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"
CJK = "/usr/share/fonts/truetype/droid/DroidSansFallbackFull.ttf"

DARK = (9, 14, 26)
PRIMARY = (22, 93, 255)
SECONDARY = (123, 97, 255)


def load_art():
    im = Image.open(SRC).convert("RGBA")
    return im.crop(im.getbbox())  # trim the transparent margin


def mean_luma(img):
    px = [p for p in img.getdata() if p[3] > 128]
    if not px:
        return 255
    return sum(0.299 * r + 0.587 * g + 0.114 * b for r, g, b, _ in px) / len(px)


def square(img, size, bg, margin=0.07):
    canvas = Image.new("RGBA", (size, size), bg)
    inner = int(size * (1 - 2 * margin))
    w, h = img.size
    scale = min(inner / w, inner / h)
    nw, nh = max(1, round(w * scale)), max(1, round(h * scale))
    resized = img.resize((nw, nh), Image.LANCZOS)
    canvas.paste(resized, ((size - nw) // 2, (size - nh) // 2), resized)
    return canvas


def centered_text(draw, text, font, y, fill, width=1200):
    box = draw.textbbox((0, 0), text, font=font)
    w = box[2] - box[0]
    if w > width - 80:
        raise ValueError(f"text overflows the canvas: {w}px for {text!r}")
    draw.text(((width - w) / 2 - box[0], y), text, font=font, fill=fill)


def og_image(art):
    W, H = 1200, 630
    bg = Image.new("RGB", (W, H), DARK)

    grad = Image.new("RGB", (W, H))
    gd = ImageDraw.Draw(grad)
    for x in range(W):
        t = x / (W - 1)
        gd.line(
            [(x, 0), (x, H)],
            fill=(
                round(PRIMARY[0] + (SECONDARY[0] - PRIMARY[0]) * t),
                round(PRIMARY[1] + (SECONDARY[1] - PRIMARY[1]) * t),
                round(PRIMARY[2] + (SECONDARY[2] - PRIMARY[2]) * t),
            ),
        )
    bg = Image.blend(bg, grad, 0.20)

    # Vertical vignette so the wordmark keeps its contrast over the gradient.
    shade = Image.new("L", (1, H))
    for y in range(H):
        t = y / (H - 1)
        shade.putpixel((0, y), int(200 * max(0.0, t - 0.25) / 0.75))
    bg = Image.composite(Image.new("RGB", (W, H), (5, 8, 16)), bg, shade.resize((W, H)))

    logo = art.resize((250, round(250 * art.height / art.width)), Image.LANCZOS)
    bg.paste(logo, ((W - logo.width) // 2, 58), logo)

    draw = ImageDraw.Draw(bg)
    centered_text(draw, "AmritaBot", ImageFont.truetype(BOLD, 92), 340, (255, 255, 255))
    centered_text(draw, "开源 AI Agent 生态", ImageFont.truetype(CJK, 42), 456, (170, 184, 205))
    centered_text(
        draw,
        "AmritaBot  ·  AmritaCore  ·  AmritaSense",
        ImageFont.truetype(REG, 26),
        524,
        (110, 125, 150),
    )
    return bg


def main():
    art = load_art()
    print(f"artwork {art.size}, mean luma {mean_luma(art):.0f}")

    # Dark line art on transparency, so a white plate keeps the icons legible
    # wherever the OS decides to draw them (dark tab strips included).
    plate = (255, 255, 255, 255)

    # Nav logo: transparent, because the CSS already draws a white plate.
    square(art, 256, (0, 0, 0, 0), margin=0.02).save(f"{OUT}/logo.png")

    square(art, 512, plate).save(f"{OUT}/icon-512.png")
    square(art, 192, plate).save(f"{OUT}/icon-192.png")
    square(art, 180, plate).save(f"{OUT}/apple-touch-icon.png")
    square(art, 64, plate).save(f"{OUT}/favicon.ico", sizes=[(16, 16), (32, 32), (48, 48)])
    og_image(art).convert("RGB").save(f"{OUT}/og-image.png", optimize=True)

    for name in (
        "logo.png",
        "icon-512.png",
        "icon-192.png",
        "apple-touch-icon.png",
        "favicon.ico",
        "og-image.png",
    ):
        im = Image.open(f"{OUT}/{name}")
        print(f"  {name:24} {im.size} {im.mode}")


if __name__ == "__main__":
    main()
