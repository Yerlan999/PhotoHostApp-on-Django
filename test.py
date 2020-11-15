from datetime import datetime
from PIL import Image

img = Image.open('iii.jpg')
print(img.getexif()[274])
img.show()
