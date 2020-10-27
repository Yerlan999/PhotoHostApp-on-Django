from django.contrib import admin
from .models import Photo, Comments

# Register your models here
class CommentInline(admin.TabularInline):
    model = Comments
    extra = 0


class PhotoAdmin(admin.ModelAdmin):
    inlines = [
        CommentInline,
    ]


admin.site.register(Photo, PhotoAdmin)
admin.site.register(Comments)
