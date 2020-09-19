from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.mixins import LoginRequiredMixin, UserPassesTestMixin
from django.contrib.auth.models import User
from django.urls import reverse_lazy
from django.contrib import messages
from django.views.generic import (
    ListView,
    DetailView,
    CreateView,
    UpdateView,
    DeleteView,
)
from .models import Post, CommentsOnPost

# Create your views here.


class PostListView(ListView):
    model = Post
    template_name = "BlogApp/home.html" # <app>/<model>_<viewtype>.html
    context_object_name = "posts"
    ordering = ["-date_posted"]
    paginate_by = 5


class UserPostListView(ListView):
    model = Post
    template_name = "BlogApp/user_posts.html" # <app>/<model>_<viewtype>.html
    context_object_name = "posts"
    paginate_by = 5


    def get_queryset(self):
        user = get_object_or_404(User, username=self.kwargs.get("username"))
        return Post.objects.filter(author=user).order_by("-date_posted")


class PostDetailView(DetailView):
    model = Post

    def post(self, request, *args, **kwargs):

        this_post = Post.objects.get(pk=kwargs["pk"])

        if request.POST.get("comment"):
            this_post = Post.objects.get(pk=kwargs["pk"])
            comment_context = request.POST["comment"]
            comment = CommentsOnPost.objects.create(
                author=self.request.user,
                content=comment_context,
                post=this_post)

            comment.save()

        messages.success(request, "Post comment have been added!")
        return redirect('post-detail', **kwargs)

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False

    def get_context_data(self, **kwargs):
        context = super(PostDetailView, self).get_context_data(**kwargs)
        context['comments'] = CommentsOnPost.objects.all().filter(post=Post.objects.get(id=self.kwargs.get('pk')))
        return context


class PostDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = Post
    success_url = "/"

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False

class PostCreateView(LoginRequiredMixin, CreateView):
    model = Post
    fields = ["title", "content"]

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

class PostUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    model = Post
    fields = ["title", "content"]

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

    def test_func(self):
        post = self.get_object()
        if self.request.user == post.author:
            return True
        return False





class CommentDeleteView(LoginRequiredMixin, UserPassesTestMixin, DeleteView):
    model = CommentsOnPost
    template_name = 'BlogApp/comments_delete.html'
    context_object_name = 'comment'

    def test_func(self):
        comment = self.get_object()
        if self.request.user == comment.author:
            return True
        return False

    def get_success_url(self, *args, **kwargs):
        post = self.get_object().post_id
        if  kwargs != None:
            return reverse_lazy('post-detail', kwargs={'pk': post})


class CommentUpdateView(LoginRequiredMixin, UserPassesTestMixin, UpdateView):
    template_name = 'BlogApp/comments_update.html'
    model = CommentsOnPost
    context_object_name = 'comment'
    fields = ["content"]

    def form_valid(self, form):
        form.instance.author = self.request.user
        return super().form_valid(form)

    def test_func(self):
        comment = self.get_object()
        if self.request.user == comment.author:
            return True
        return False

    def get_success_url(self, *args, **kwargs):
        post = self.get_object().post_id
        if  kwargs != None:
            return reverse_lazy('post-detail', kwargs={'pk': post})


def home(request):
    context = {
        "posts": Post.objects.all(),
        "title": "Home Page",

    }
    return render(request, "BlogApp/home.html", context)


def about(request):
    return render(request, "BlogApp/about.html", {"title": "About Title"})
