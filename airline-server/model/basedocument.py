from mongoengine import *


class BaseDocument(Document):
    meta = {
        'abstract': True
    }

    def save(self, *args, **kwargs):
        return super(BaseDocument, self).save(*args, **kwargs)