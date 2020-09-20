from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.views.generic.edit import FormView
from django.shortcuts import render, redirect
from django.urls import reverse_lazy
from django.contrib import messages
from django.db.models import Q
from datetime import datetime
from .forms import PhotoForm
from .models import Photo, Comments
from django.views.generic import (
    ListView,
    DetailView,
    DeleteView,
    CreateView,
    UpdateView
    )
from PIL import Image

#from exif import Image
sample = "%Y:%m:%d %H:%M:%S"


class ImageFieldView(FormView):
    form_class = PhotoForm
    template_name = 'Photos/photo_add.html'  # Replace with your template.
    success_url = reverse_lazy('photo-list')  # Replace with your URL or reverse().

    def post(self, request, *args, **kwargs):
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        files = request.FILES.getlist('image')
        if form.is_valid():
            for image in files:

                pil_image = Image.open(image)
                if pil_image._getexif():
                    info = pil_image._getexif()
                else:
                    continue
                if info.get(36867):
                    photo_datetime = info[36867]
                    converted_dt = datetime.strptime(photo_datetime, sample)

                    image_object = Photo.objects.create(author=request.user, image=image, date_taken=converted_dt)
                    image_object.save()
                else:
                    continue

            messages.success(request, "Photos have been uploaded!")
            return self.form_valid(form)
        else:
            return self.form_invalid(form)



class PhotoListView(ListView):
    model = Photo
    template_name = 'Photos/photos_list.html'
    context_object_name = 'photos'
    ordering = ['date_taken']

    def get_queryset(self):
        queryset = {

        'freshman': Photo.objects.filter(Q(
            date_taken__gte=datetime(2015, 9, 1)) & Q(date_taken__lt=datetime(2016, 9, 1))),

        'sophomore': Photo.objects.filter(Q(
            date_taken__gte=datetime(2016, 9, 1)) & Q(date_taken__lt=datetime(2017, 9, 1))),

        'junior': Photo.objects.filter(Q(
            date_taken__gte=datetime(2017, 9, 1)) & Q(date_taken__lt=datetime(2018, 9, 1))),

        'senior': Photo.objects.filter(Q(
            date_taken__gte=datetime(2018, 9, 1)) & Q(date_taken__lt=datetime(2020, 7, 1))),

        'post_graduate': Photo.objects.filter(Q(
            date_taken__gte=datetime(2020, 7, 1))),

        }
        return queryset

class PhotoDetailView(LoginRequiredMixin, DetailView):
    model = Photo
    template_name = 'Photos/photo_detail.html'

    def post(self, request, *args, **kwargs):

        this_photo = Photo.objects.get(pk=kwargs["pk"])
        if request.POST.get("description") and request.POST.get("title"):
            new_description = request.POST["description"]
            new_title = request.POST["title"]
            this_photo.description = new_description
            this_photo.title = new_title
            this_photo.save()

        elif request.POST.get("title"):
            new_title = request.POST["title"]
            this_photo.title = new_title
            this_photo.save()

        elif request.POST.get("description"):
            new_description = request.POST["description"]
            this_photo.description = new_description
            this_photo.save()

        if request.POST.get("comment"):
            this_photo = Photo.objects.get(pk=kwargs["pk"])
            comment_context = request.POST["comment"]
            comment = Comments.objects.create(
                author=self.request.user,
                content=comment_context,
                image=this_photo)

            comment.save()

        messages.success(request, "Photos details have been updated!")
        return redirect('photo-detail', **kwargs)

    def test_func(self):
        photo = self.get_object()
        if self.request.user == photo.author:
            return True
        return False

    def get_context_data(self, **kwargs):
        context = super(PhotoDetailView, self).get_context_data(**kwargs)
        context['comments'] = Comments.objects.all().filter(image=Photo.objects.get(id=self.kwargs.get('pk')))
        return context


class PhotoDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Photo
    template_name = 'Photos/photo_delete.html'
    context_object_name = 'photo'
    success_url = reverse_lazy('photo-list')

    def test_func(self):
        photo = self.get_object()
        if self.request.user == photo.author:
            return True
        return False


class CommentDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Comments
    template_name = 'Photos/comments_delete.html'
    context_object_name = 'comment'

    def post(self, *args, **kwargs):

        image = self.get_object().image_id
        comment_id = kwargs.get('pk')

        deleted_comment = Comments.objects.get(pk=comment_id)
        deleted_comment.delete()

        return redirect('photo-detail', pk=image)



    def test_func(self):
        comment = self.get_object()
        if self.request.user == comment.author:
            return True
        return False

    def get_success_url(self, *args, **kwargs):
        photo = self.get_object().image_id
        if  kwargs != None:
            return reverse_lazy('photo-detail', kwargs={'pk': photo})


class CommentUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    template_name = 'Photos/comments_update.html'
    model = Comments
    context_object_name = 'comment'
    fields = ["content"]

    def post(self, *args, **kwargs):

        image = self.get_object().image_id
        comment_id = kwargs.get('pk')
        comments_new_content = self.request.POST.get('newcontent')

        updated_comment = Comments.objects.get(pk=comment_id)
        updated_comment.content = comments_new_content
        updated_comment.save()

        return redirect('photo-detail', pk=image)



    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

    def test_func(self):
        comment = self.get_object()
        if self.request.user == comment.author:
            return True
        return False

    def get_success_url(self, *args, **kwargs):
        photo = self.get_object().image_id
        if  kwargs != None:
            return reverse_lazy('photo-detail', kwargs={'pk': photo})

