from server.bo.NamedBusinessObject import NamedBusinessObject


class Project_type(NamedBusinessObject):
    """
    Realisierung des Projekttypes
    """

    def __init__(self):
        super().__init__()
        self._ects = ""
        self._sws = ""


    def get_ects(self):
        """Auslesen der ECTS."""
        return self._ects

    def set_ects(self, new_ects):
        """Setzen der ECTS."""
        self._ects = new_ects

    def get_sws(self):
        """Auslesen der SWS."""
        return self._sws

    def set_sws(self, new_sws):
        """Setzen der SWS."""
        self._sws = new_sws


    @staticmethod
    def from_dict(dict = dict()):
        new_project_type = Project_type()
        new_project_type.set_id(dict["id"])
        new_project_type.set_name(dict["name"])
        new_project_type.set_ects(dict["ects"])
        new_project_type.set_sws(dict["sws"])
        new_project_type.set_create_time(dict["create_time"])
        return new_project_type
