from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.views.generic.edit import FormView
from django.shortcuts import render, redirect
from django.urls import reverse_lazy, reverse
from django.http import JsonResponse
from django.core import serializers
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
import os

#from exif import Image
sample = "%Y:%m:%d %H:%M:%S"


def get_size(start_path = '.'):
    total_size = 0
    for dirpath, dirnames, filenames in os.walk(start_path):
        for f in filenames:
            fp = os.path.join(dirpath, f)
            # skip if it is symbolic link
            if not os.path.islink(fp):
                total_size += os.path.getsize(fp)

    return 20 - round(total_size/1073741824, 2)



class ImageFieldView(FormView):
    form_class = PhotoForm
    template_name = 'Photos/photos_list.html'  # Replace with your template.
    success_url = reverse_lazy('photo-list')  # Replace with your URL or reverse().

    def post(self, request, *args, **kwargs):
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        files = request.FILES.getlist('image')

        if len(files) > 1:
            message = 'Фотографии были успешно загружены!'
        else:
            message = 'Фотография была успешна загружена!'

        starting_point = os.getcwd()
        try:
            os.chdir('media/photos')
            media = os.getcwd()
            absMedia = os.path.abspath(media)
            size_in_GB = get_size(absMedia)
        except:
            print('Error happeded')
        finally:
            os.chdir(starting_point)

        if form.is_valid() and size_in_GB > 0:
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

            messages.success(request, message)
            return self.form_valid(form)
        else:
            messages.warning(request, 'Мы загрузили слишком много фоток. Лимит превысил 20 ГБ')
            return redirect(reverse('photo-list'))



class PhotoListView(ListView):
    model = Photo
    template_name = 'Photos/photos_list.html'
    context_object_name = 'photos'
    # paginate_by = 1


    def get_queryset(self):

        starting_point = os.getcwd()
        try:
            os.chdir('media/photos')
            media = os.getcwd()
            absMedia = os.path.abspath(media)
            size_in_GB = get_size(absMedia)
        except:
            print('Error happeded')
        finally:
            os.chdir(starting_point)


        queryset = {

        'freshman': Photo.objects.filter(Q(
            date_taken__gte=datetime(2015, 9, 1)) & Q(date_taken__lt=datetime(2016, 9, 1))).order_by('date_taken'),

        'sophomore': Photo.objects.filter(Q(
            date_taken__gte=datetime(2016, 9, 1)) & Q(date_taken__lt=datetime(2017, 9, 1))).order_by('date_taken'),

        'junior': Photo.objects.filter(Q(
            date_taken__gte=datetime(2017, 9, 1)) & Q(date_taken__lt=datetime(2018, 9, 1))).order_by('date_taken'),

        'senior': Photo.objects.filter(Q(
            date_taken__gte=datetime(2018, 9, 1)) & Q(date_taken__lt=datetime(2019, 7, 1))).order_by('date_taken'),

        'post_graduate': Photo.objects.filter(Q(
            date_taken__gte=datetime(2019, 7, 1))).order_by('date_taken'),

        'size': str(size_in_GB) + ' ГБ',

        }

        return queryset



def get_next_photos(request, *args, **kwargs):

        if request.is_ajax and request.method == 'GET':

            sophomore = Photo.objects.filter(Q(
            date_taken__gte=datetime(2015, 9, 1)) & Q(date_taken__lt=datetime(2016, 9, 1))).order_by('date_taken')


            ser_sophomore = serializers.serialize('json', sophomore)
            return JsonResponse({'sophomore': ser_sophomore}, status=200)


class PhotoDetailView(DetailView):
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
            message = 'Заголовок и Описание фотографии былы успешно обновлены!'

        elif request.POST.get("title"):
            new_title = request.POST["title"]
            this_photo.title = new_title
            this_photo.save()
            message = 'Заголовок фотографии был успешно обновлен!'

        elif request.POST.get("description"):
            new_description = request.POST["description"]
            this_photo.description = new_description
            this_photo.save()
            message = 'Описание фотографии было успешно обновлено!'

        if request.POST.get("comment"):
            this_photo = Photo.objects.get(pk=kwargs["pk"])
            comment_context = request.POST["comment"]
            comment = Comments.objects.create(
                author=self.request.user,
                content=comment_context,
                image=this_photo)

            comment.save()
            message = 'Комментарии к фотографии был успешно добавлен!'


        messages.success(request, message)
        return redirect('photo-detail', **kwargs)

    def test_func(self):
        photo = self.get_object()
        if self.request.user == photo.author:
            return True
        return False

    def get_context_data(self, **kwargs):
        context = super(PhotoDetailView, self).get_context_data(**kwargs)
        context['comments'] = Comments.objects.all().filter(image=Photo.objects.get(id=self.kwargs.get('pk'))).order_by('date_added')
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

    def post(self, request, *args, **kwargs):

        image = self.get_object().image_id
        comment_id = kwargs.get('pk')

        deleted_comment = Comments.objects.get(pk=comment_id)
        deleted_comment.delete()
        messages.success(request, 'Комментарий был успешно удален!')
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

    def post(self, request, *args, **kwargs):

        image = self.get_object().image_id
        comment_id = kwargs.get('pk')
        comments_new_content = self.request.POST.get('newcontent')

        updated_comment = Comments.objects.get(pk=comment_id)
        updated_comment.content = comments_new_content
        updated_comment.save()

        messages.success(request, 'Комментарий был успешно обновлен!')
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

