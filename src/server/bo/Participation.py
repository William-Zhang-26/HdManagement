from src.server.bo.BusinessObject import BusinessObject

class Participation(BusinessObject):
    """Realisierung einer Teilnahme an den Projekten
    """

    def __init__(self):
        super().__init__()
        self._module_id = 0
        self._project_id = 0
        self._student_id = 0
        self._validation_id = 0
        self._participation_status = bool

    def get_module_id(self):
        """Auslesen des Foreign Keys module_id"""
        return self._module_id

    def set_module_id(self, module_id):
        """Setzen des Foreign Keys module_id"""
        self._module_id = module_id

    def get_project_id(self):
        """Auslesen des Foreign Keys project_id"""
        return self._project_id

    def set_project_id(self, project_id):
        """Setzen des Foreign Keys project_id"""
        self._project_id = project_id

    def get_student_id(self):
        """Auslesen des Foreign Keys student_id"""
        return self._student_id

    def set_student_id(self, student_id):
        """Setzen des Foreign Keys student_id"""
        self._student_id = student_id

    def get_validation_id(self):
        """Auslesen des Foreign Keys validation_id"""
        return self._module_id

    def set_validation_id(self, validation_id):
        """Setzen des Foreign Keys validation_id"""
        self._module_id = validation_id

    def get_participation_status(self):
        """Auslesen des Teilnahmestatuses."""
        return self._participation_status

    def set_participation_status(self, bool):
        """Setzen des Teilnahmestatuses"""
        self._participation_status = bool

    @staticmethod
    def from_dict(dict = dict()):
        new_participation = Participation()
        new_participation.set_id(dict["id"])
        new_participation.set_module_id(dict["id"])
        new_participation.set_project_id(dict["id"])
        new_participation.set_student_id(dict["id"])
        new_participation.set_validation_id(dict["id"])
        new_participation.set_participation_status(dict["participation_status"])
        new_participation.set_create_time(dict["create_time"])
        return new_participation
