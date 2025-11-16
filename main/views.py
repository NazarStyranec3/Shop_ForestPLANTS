from django.core.paginator import Paginator
from django.shortcuts import render, get_object_or_404
from random import sample
from .models import Category, Product
# Create your views here.
def home(request):
    categories = Category.objects.filter(parent=None)
    return render(request, 'main/home.html', {
        'categories': categories
    })
def category_detail(request, category_id):
    category = get_object_or_404(Category, id=category_id)
    subcategories = category.children.all()
    products = Product.objects.filter(category=category)

    return render(request, 'main/category_detail.html', {
        'lviv': False,
        'category': category,
        'subcategories': subcategories,
        'products': products
    })

def product_detail(request, category_id, product_id):
    category = get_object_or_404(Category, id=category_id)
    product = get_object_or_404(Product, id=product_id, category=category)

    return render(request, 'main/product_detail.html', {
        'lviv': False,
        'product': product,
        'category': category
    })

