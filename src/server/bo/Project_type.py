from src.server.bo import NamedBusinessObject


class Project_type(NamedBusinessObject):
    """Realisierung einer exemplarischen Projektypen.
    Die Erstellung der verschiedenen Projektypen sowie denen ihren ECTS und SWS

    Aus Gründen der Vereinfachung besitzt der Projektyp in diesem Demonstrator
    lediglich einen ECTS und einen SWS.
    """

    def __init__(self):
        super().__init__()
        self._ects = None
        self._sws = None

    def get_ects(self):
        """Auslesen der ECTS."""
        return self._ects

    def set_ects(self, int):
        """Setzen der ECTS."""
        self._ects = int

    def get_sws(self):
        """Auslesen der SWS."""
        return self._sws

    def set_sws(self, int):
        """Setzen der SWS."""
        self._sws = int

    @staticmethod
    def from_dict(dict = dict()):
        new_project_type = Project_type()
        new_project_type.set_id(dict["id"])
        new_project_type.set_name(dict["name"])
        new_project_type.set_ects(dict["ects"])
        new_project_type.set_sws(dict["sws"])
        new_project_type.set_create_time(dict["create_time"])
        return new_project_type
