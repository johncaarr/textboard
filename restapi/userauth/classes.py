from datetime import datetime

class Post:
  def __init__(self, id, username, content, created=None, editor='', edited=None):
    self.id = id
    self.username = username
    self.content = content
    self.created = created or datetime.now()
    self.editor = editor
    self.edited = edited or datetime.now()

class User:
  def __init__(self, id, username, password, email):
    self.id = id
    self.username = username
    self.password = password
    self.email = email
