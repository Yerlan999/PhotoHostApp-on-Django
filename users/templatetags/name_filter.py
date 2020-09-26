from django import template
register = template.Library()


from django import template
from django.template.defaultfilters import stringfilter

register = template.Library()

@register.filter(name='cutter')
@stringfilter
def cutter(value):
    return value.replace('_', ' ')

