from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=100, unique=True)
    image = models.ImageField(upload_to='categories/', null=True, blank=True)
    parent = models.ForeignKey('self', on_delete=models.CASCADE, related_name='children', null=True, blank=True)

    def __str__(self):
        return self.name


class Product(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE, related_name='%(class)ss')
    image = models.ImageField(upload_to='products/', null=True, blank=True)
    name = models.CharField(max_length=250, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    composition = models.TextField(null=True, blank=True)
    price = models.CharField(max_length=250, null=True, blank=True)

    def __str__(self):
        return self.name
