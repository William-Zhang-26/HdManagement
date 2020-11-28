from src.server.bo import BusinessObject


class Validation(BusinessObject):
    """Realisierung der Bewertung eines Projektes
    """

    def __init__(self):
        super().__init__()
        self._grade = float

    def get_grade(self):
        """Auslesen der Note"""
        return self._grade

    def set_grade(self, float):
        """Setzen der Note"""
        self._grade = float

    @staticmethod
    def from_dict(dict=dict()):
        new_validation = Validation()
        new_validation.set_id(dict["id"])
        new_validation.set_grade(dict["grade"])
        new_validation.set_create_time(dict["create_time"])
        return new_validation
