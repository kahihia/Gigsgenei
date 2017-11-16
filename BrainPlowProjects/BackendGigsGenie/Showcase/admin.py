from django.contrib import admin
from .models import Gigs,GigsRequirements,GigsSearchTerms,GigsFAQ,GigsImages,GigsReviews,GigsPrize

admin.site.register(Gigs)
admin.site.register(GigsPrize)