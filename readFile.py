

class ReadFile():
  def __init__(self, filename:str) -> None:
    self.filename = filename
    with open(filename, "r") as file:
      lines = file.readlines()
      self.lines = lines
      file.close()
      

class WriteFile():
  def __init__(self, filename:str, lines:list[str]) -> None:
    self.filename = filename
    self.lines = lines
    with open(filename, "r") as file:
      for line in self.lines:
        file.write(line)
      file.close()
