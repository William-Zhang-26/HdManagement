from src.server.bo.User import User

class Student(User):
    """
    Realisierung der Studenten
    """
    def __init__(self):
        super().__init__()
        self._course = ""
        self._matriculation_number = 0
        self._user_id = 0

    def get_user_id(self):
        return self._course

    def set_user_id(self, new_user_id):
        self._user_id = new_user_id

    def get_course(self):
        """Auslesen des Studiengangs"""
        return self._course

    def set_course(self, new_course):
        """Setzen des Studiengangs"""
        self._course = new_course

    def get_matriculation_number(self):
        """Auslesen der Matrikelnummer"""
        return self._matriculation_number

    def set_matriculation_number(self, new_matriculation_number):
        """Setzen der Matrikelnummer"""
        self._matriculation_number = new_matriculation_number

    @staticmethod
    def from_dict(dict = dict()):
        new_student = Student()
        new_student.set_id(dict["student_id"])
        new_student.set_user_id(dict["user_id"])
        new_student.set_name(dict["name"])
        new_student.set_firstname(dict["firstname"])
        new_student.set_course(dict["course"])
        new_student.set_matriculation_number(dict["matriculation_number"])
        new_student.set_mail(dict["mail"])
        new_student.set_google_id(dict["google_id"])
        new_student.set_create_time(dict["create_time"])
        return new_student
