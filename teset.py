# Improting Image class from PIL module
from PIL import Image

# Opens a image in RGB mode
im = Image.open(r'C:\Users\Sony\Desktop\1_0ACE4i1MCqXCnlBpdQHm3Q.jpeg')

# Setting the points for cropped image
left = 100
top = 100
right = 400
bottom = 400

# Cropped image of above dimension
# (It will not change orginal image)
im1 = im.crop((left, top, right, bottom))

# Shows the image in image viewer
im1.show()
