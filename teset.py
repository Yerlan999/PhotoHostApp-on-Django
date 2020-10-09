from PIL import Image
import PIL


img = Image.open('lhp.jpg')


print(img.getexif()[274])
# img = img.transpose(method=Image.ROTATE_90)  IF ORIENTATION == 8
# img = img.transpose(method=Image.ROTATE_180) IF ORIENTATION == 3
img.show()


