
class Class():
  def __init__(self, name:str, teacher, period:int) -> None:
    self.name = name
    self.teacher = teacher
    self.period = period

  def __str__(self) -> str:
    return f"{self.name} {self.teacher} {self.period}"

class Student():
  def __init__(self, name:str, grade:int, username:str,
               password:str, request:Request) -> None:
    self.name = name
    self.grade = grade
    self.username = username
    self.password = password
    self.request = request

  def __str__(self) -> str:
    return f"{self.name}{self.grade}:\n{self.username} {self.password}:\n{self.request}"





class Teacher():
  def __init__(self, name:str, email:str):
    self.name = name
    self.email = email

  def __str__(self) -> str:
    return f"{self.name}:\n{self.email}"

  def __repr__(self) -> str:
    return f"{self.name}:\n{self.email}"

  def __eq__(self, other) -> bool:
    return self.name == other.name and self.email == other.email

  

class Schedule():
  def __init__(self, name:str, classes:list[Class]):
    self.name = name
    self.classes = classes

  def __str__(self) -> str:
    return f"{self.name}:\n{self.classes}"

  def __repr__(self) -> str:
    return f"{self.name}:\n{self.classes}"

  def __eq__(self, other) -> bool:
    return self.name == other.name and self.classes == other.classes

  def update(self, newClass:Class, oldClass:Class):
    for i in range(len(self.classes)):
      if self.classes[i].name == oldClass.name:
        self.classes[i] = newClass
        return
    print("Old class not found")




class Request():
  def __init__(self, newClass:Class, oldClass:Class) -> None:
    self.newClass = newClass
    self.oldClass = oldClass

  def updateSchedule(self, schedule:Schedule) -> None:
    schedule.update(self.newClass, self.oldClass)

