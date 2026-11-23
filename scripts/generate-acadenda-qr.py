"""Generate the guide's QR codes. Install qrcode[pil] to regenerate."""
from pathlib import Path
import qrcode

ROOT = Path(__file__).resolve().parents[1]
BASE = "https://jamesweichen.github.io/acadenda/program/"
for extension in ("acadenda", "json"):
    url = BASE + "Official_Conference_Demo." + extension
    code = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M,
                         box_size=10, border=4)
    code.add_data(url)
    code.make(fit=True)
    destination = ROOT / "acadenda/images/qr" / ("official-demo-" + extension + ".png")
    destination.parent.mkdir(parents=True, exist_ok=True)
    code.make_image(fill_color="black", back_color="white").save(destination)
    print(url)

# Shared Android testing link used by all conference companion pages.
android_url = "https://play.google.com/apps/testing/org.acadenda.android"
android_code = qrcode.QRCode(error_correction=qrcode.constants.ERROR_CORRECT_M,
                             box_size=10, border=4)
android_code.add_data(android_url)
android_code.make(fit=True)
android_code.make_image(fill_color="black", back_color="white").save(
    ROOT / "acadenda/images/qr/android-beta.png")
print(android_url)
