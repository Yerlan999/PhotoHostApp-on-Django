from django.urls import path
from .views import (
    ImageFieldView,
    PhotoListView,
    PhotoDetailView,
    PhotoDeleteView,
    CommentDeleteView,
    CommentUpdateView)


urlpatterns = [
    path('add-photo/', ImageFieldView.as_view(), name='photo-add'),
    path('', PhotoListView.as_view(), name='photo-list'),
    path('detail-photo/<int:pk>', PhotoDetailView.as_view(), name='photo-detail'),
    path('delete-photo/<int:pk>', PhotoDeleteView.as_view(), name='photo-delete'),
    path('comment-update/<int:pk>', CommentUpdateView.as_view(), name='comment-update'),
    path('comment-delete/<int:pk>', CommentDeleteView.as_view(), name='comment-delete'),
]

