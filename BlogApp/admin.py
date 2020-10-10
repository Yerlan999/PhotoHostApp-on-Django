from django.contrib import admin
from .models import Post, CommentsOnPost

# Register your models here.
class CommentInline(admin.TabularInline):
    model = CommentsOnPost


class PostAdmin(admin.ModelAdmin):
    inlines = [
        CommentInline,
    ]

admin.site.register(Post, PostAdmin)
admin.site.register(CommentsOnPost)

