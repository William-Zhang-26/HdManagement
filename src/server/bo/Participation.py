from src.server.bo.BusinessObject import BusinessObject

class Participation(BusinessObject):
    """Realisierung einer Teilnahme an den Projekten
    """

    def __init__(self):
        super().__init__()
        self._module_id = None # Fremdschlüsselbeziehung zum Modul.
        self._project_id = None # Fremdschlüsselbeziehung zum Projekt.
        self._student_id = None # Fremdschlüsselbeziehung zum Studenten.
        self._validation_id = 1 # Fremdschlüsselbeziehung zur Bewertung.
        self._status = ""

    def get_module_id(self):
        """Auslesen des Foreign Keys module_id"""
        return self._module_id

    def set_module_id(self, new_module_id):
        """Setzen des Foreign Keys module_id"""
        self._module_id = new_module_id

    def get_project_id(self):
        """Auslesen des Foreign Keys project_id"""
        return self._project_id

    def set_project_id(self, new_project_id):
        """Setzen des Foreign Keys project_id"""
        self._project_id = new_project_id

    def get_student_id(self):
        """Auslesen des Foreign Keys student_id"""
        return self._student_id

    def set_student_id(self, new_student_id):
        """Setzen des Foreign Keys student_id"""
        self._student_id = new_student_id

    def get_validation_id(self):
        """Auslesen des Foreign Keys validation_id"""
        return self._validation_id

    def set_validation_id(self, new_validation_id):
        """Setzen des Foreign Keys validation_id"""
        self._validation_id = new_validation_id

    def get_status(self):
        """Auslesen des Bestehungsstatuses."""
        return self._status

    def set_status(self, new_status):
        """Setzen des Bestehungsstatuses"""
        self._status = new_status

    @staticmethod
    def from_dict(dict = dict()):
        new_participation = Participation()
        new_participation.set_id(dict["id"])
        new_participation.set_module_id(dict["module_id"])
        new_participation.set_project_id(dict["project_id"])
        new_participation.set_student_id(dict["student_id"])
        new_participation.set_validation_id(dict["validation_id"])
        new_participation.set_status(dict["status"])
        new_participation.set_create_time(dict["create_time"])
        return new_participation
