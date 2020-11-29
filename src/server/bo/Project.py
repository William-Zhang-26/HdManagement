from src.server.bo.NamedBusinessObject import NamedBusinessObject

class Project(NamedBusinessObject):
    """
    Realisierung der Projekte
    """
    def __init__(self):
        super().__init__()
        self._name = ""
        self._partner = ""
        self._capacity = int
        self._roomnumber = ""
        self._blockday = ""
        self._project_categorie = ""
        self._supervisor = ""
        self._weekly = bool

    def get_name(self):
        """Auslesen des Namens"""
        return self._name

    def set_name(self, new_name):
        """Setzen des Namens"""
        self._name = new_name

    def get_partner(self):
        """"Auslesen der Partner"""
        return self._partner

    def set_partner(self, new_partner):
        """"Setzen der Partner"""
        self._partner = new_partner

    def get_capacity(self):
        """Auslesen der Kapazität"""
        return self._capacity()

    def set_capacity(self, new_capacity):
        """Setzen der Kapazität"""
        self._capacity = new_capacity

    def get_roomnumber(self):
        """Auslesen der Raumnummer"""
        return self._roomnumber()

    def set_roomnumber(self, new_roomnumber):
        """Setzen der Raumnummer"""
        self._roomnumber = new_roomnumber

    def get_block_day(self):
        """Auslesen der Blocktage"""
        return self._block_day()

    def set_block_day(self, new_block_day):
        """Setzen der Blocktage"""
        self._block_day = new_block_day

    def get_project_categorie(self):
        """Auselsen der Projektkategorie"""
        return self._project_categorie()

    def set_project_categorie(self, new_categorie):
        """Setzen der Projekt-Ketgorie"""
        self._project_categorie = new_categorie

    def get_supervisor(self):
        """Auslesen der Supervisor"""
        return self._supervisor()

    def set_supervisor(self, new_supervisor):
        """Setzen der Supervisor"""
        self._supervisor = new_supervisor

    def get_weekly(self):
        """Auslesen ob die Termine wöchentlich sind"""
        return self._weekly()

    def set_weekly(self, new_weekly):
        """Setzen ob die Termine wöchhentlich sind"""
        self._weekly = new_weekly


    @staticmethod
    def from_dict(dict = dict()):
        new_project = Project()
        new_project.set_id(dict["id"])
        new_project.set_name(dict["name"])
        new_project.set_partner(dict["partner"])
        new_project.set_capacity(dict["capacity"])
        new_project.set_roomnumber(dict["roomnumber"])
        new_project.set_block_day(dict["blockday"])
        new_project.set_project_categorie(dict["project_categorie"])
        new_project.set_supervisor(dict["supervisor"])
        new_project.set_weekly(dict["weekly"])
        return new_project
