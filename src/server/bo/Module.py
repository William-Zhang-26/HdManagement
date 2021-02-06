from server.bo.NamedBusinessObject import NamedBusinessObject

class Module(NamedBusinessObject):
    """
    Realisierung eines Moduls
    """
    def __init__(self):
        super().__init__()
        self._assignment_id = 0

    def get_assignment_id(self):
        """Auslesen der Assignment_id"""
        return self._assignment_id

    def set_assignment_id(self, new_assignment_id):
        """Setzen der Assignment_id"""
        self._assignment_id = new_assignment_id

    @staticmethod
    def from_dict(dict=dict()):
        new_module = Module()
        new_module.set_id(dict["id"])
        new_module.set_name(dict["name"])
        new_module.set_assignment_id(dict["assignment_id"])
        new_module.set_create_time(dict["create_time"])
        return new_module