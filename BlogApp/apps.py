from django.apps import AppConfig


class BlogappConfig(AppConfig):
    name = 'BlogApp'

    def ready(self):
        import BlogApp.signals



