from datetime import datetime
from PIL import Image


sample = "%Y:%m:%d %H:%M:%S"
img = Image.open('te.jpg')
datetime_of_photo = img.getexif().get(36867)

check_date = datetime(2015,9,1)



