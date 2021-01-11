from __future__ import absolute_import, unicode_literals

from celery import shared_task

from .models import Twin
from datetime import date

from django.core.mail import EmailMessage
from django.conf import settings

# Sends email to every user on their birthday at 8 A.M

@shared_task(name="send_emails_on_birthday")
def sendEmailsToEveryone():
    twins = Twin.objects.filter(birthday=date.today())
    for twin in twins:
        matches = twin.match
        email = EmailMessage(
            'Check out your Birthday Twins Celebration!', 
            """
            <h1>Thank YOU!</h1>
            """, 
            settings.EMAIL_HOST_USER, 
            matches, 
        )
        email.fail_silently = False
        email.send()
    return "Emails Successfully sent on " + date.today()
    



