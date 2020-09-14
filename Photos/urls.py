from django.urls import path
from . import views


urlpatterns = [
    path('add-photo/', views.ImageFieldView.as_view(), name='photo-add'),
    path('', views.PhotoListView.as_view(), name='photo-list'),
    path('detail-photo/<int:pk>', views.PhotoDetailView.as_view(), name='photo-detail'),
    path('delete-photo/<int:pk>', views.PhotoDeleteView.as_view(), name='photo-delete'),

]

