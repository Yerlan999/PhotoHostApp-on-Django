from PIL import Image
import PIL


img = Image.open('test.jpg')
img = img.transpose(method=Image.ROTATE_270)


print(dir(img))

img.show()


