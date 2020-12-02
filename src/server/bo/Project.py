from src.server.bo.NamedBusinessObject import NamedBusinessObject

class Project(NamedBusinessObject):
    """
    Realisierung der Projekte
    """
    def __init__(self):
        super().__init__()
        self._name = ""
        self._partners = ""
        self._capacity = int
        self._preferred_room = ""
        self._blockday = ""
        self._project_category = ""
        self._supervisor = ""
        self._weekly = ""

    def get_name(self):
        """Auslesen des Namens"""
        return self._name

    def set_name(self, new_name):
        """Setzen des Namens"""
        self._name = new_name

    def get_partners(self):
        """"Auslesen der Partner"""
        return self._partners

    def set_partners(self, new_partners):
        """"Setzen der Partner"""
        self._partners = new_partners

    def get_capacity(self):
        """Auslesen der Kapazität"""
        return self._capacity()

    def set_capacity(self, new_capacity):
        """Setzen der Kapazität"""
        self._capacity = new_capacity

    def get_preferred_room(self):
        """Auslesen der Raumnummer"""
        return self._preferred_room()

    def set_preferred_room(self, new_preferred_room):
        """Setzen der Raumnummer"""
        self._preferred_room = new_preferred_room

    def get_block_day(self):
        """Auslesen der Blocktage"""
        return self._block_day()

    def set_block_day(self, new_block_day):
        """Setzen der Blocktage"""
        self._block_day = new_block_day

    def get_project_category(self):
        """Auselsen der Projektkategorie"""
        return self._project_category()

    def set_project_category(self, new_categorie):
        """Setzen der Projekt-Ketgorie"""
        self._project_category = new_categorie

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
        new_project.set_partners(dict["partners"])
        new_project.set_capacity(dict["capacity"])
        new_project.set_preferred_room(dict["preferred_room"])
        new_project.set_block_day(dict["blockday"])
        new_project.set_project_category(dict["project_category"])
        new_project.set_supervisor(dict["supervisor"])
        new_project.set_weekly(dict["weekly"])
        return new_project
