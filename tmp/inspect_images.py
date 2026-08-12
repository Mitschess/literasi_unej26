from PIL import Image
import os

images_dir = r"c:\Users\Asus\Downloads\literasi-unej\public\images\parpol"
files = ["nasdem.png", "pdi.png", "golkar.png", "demokrat.png", "PKB.png", "gerindra.svg"]

for filename in files:
    filepath = os.path.join(images_dir, filename)
    if not os.path.exists(filepath):
        print(f"{filename}: Does not exist")
        continue
    if filename.endswith(".svg"):
        print(f"{filename}: SVG (Vector)")
        continue
        
    try:
        with Image.open(filepath) as img:
            img = img.convert("RGBA")
            width, height = img.size
            # Inspect borders
            top_pixels = [img.getpixel((x, 0)) for x in range(width)]
            left_pixels = [img.getpixel((0, y)) for y in range(height)]
            right_pixels = [img.getpixel((width - 1, y)) for y in range(height)]
            bottom_pixels = [img.getpixel((x, height - 1)) for x in range(width)]
            
            # Check if edge pixels are not transparent and have some gray values
            unique_top = set(top_pixels[:10])
            print(f"{filename}: size={width}x{height}, unique top-left edge pixels={unique_top}")
    except Exception as e:
        print(f"Error inspecting {filename}: {e}")
