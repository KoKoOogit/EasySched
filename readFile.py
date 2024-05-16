

class ReadFile():
  def __init__(self, filename:str) -> None:
    self.filename = filename
    with open(filename, "r") as file:
      self.file = file
      lines = self.file.readlines()
    
    self.lines = lines

class WriteFile():
  def __init__(self, filename:str, lines:list[str]) -> None:
    self.filename = filename
    with open(filename, "r") as file:
      self.file = file
      self.write(lines)

  def write(self, lines:list[str]) -> None:
    for line in lines:
      self.file.write(line)