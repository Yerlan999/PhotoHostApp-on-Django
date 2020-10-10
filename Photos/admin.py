from django.contrib import admin
from .models import Photo, Comments

# Register your models here
class CommentInline(admin.TabularInline):
    model = Comments


class PhotoAdmin(admin.ModelAdmin):
    inlines = [
        CommentInline,
    ]


admin.site.register(Photo, PhotoAdmin)
admin.site.register(Comments)
