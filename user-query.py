from tonbale import db
from tonbale.models import User

print(User.query.all())
