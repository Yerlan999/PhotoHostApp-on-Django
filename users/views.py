from django.shortcuts import render, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from .forms import UserRegisterForm, UserUpdateForm, ProfileUpdateForm
from django.views.generic import ListView
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

# Create your views here.

def register(request):
    if request.method == "POST":
        form = UserRegisterForm(request.POST)
        if form.is_valid():
            keyword = form.cleaned_data.get("key_word")
            if keyword == 'JohnDeere':
                form.save()
                username = form.cleaned_data.get("username")
                messages.success(request, f"Account is created for {username}!")
                return redirect("login")
            else:
                messages.success(request, "Enter proper KeyWord")
                return render(request, "users/register.html", {"form": form})
    else:
        form = UserRegisterForm()
    return render(request, "users/register.html", {"form": form})

@login_required
def profile(request):
    if request.method == "POST":
        u_form = UserUpdateForm(request.POST, instance=request.user)
        p_form = ProfileUpdateForm(request.POST,
                                   request.FILES,
                                   instance=request.user.profile)
        if p_form.is_valid() and u_form.is_valid():
            p_form.save()
            u_form.save()
            messages.success(request, f"Your profile has been updated!")
            return redirect("profile")

    else:
        u_form = UserUpdateForm(instance=request.user)
        p_form = ProfileUpdateForm(instance=request.user.profile)

    context = {
        "u_form": u_form,
        "p_form": p_form,
    }
    return render(request, "users/profile.html", context)


class UserListView(ListView):
    model = User
    template_name = 'users/users_list.html'
    context_object_name = 'users'
