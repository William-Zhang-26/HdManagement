from src.server.bo.NamedBusinessObject import NamedBusinessObject


class Module(NamedBusinessObject):
    """Realisierung eines Moduls
    """

    def __init__(self):
        super().__init__()
        self._edv_number = int

    def get_edv_number(self):
        """Auslesen der EDV-Nummer"""
        return self._edv_number

    def set_edv_number(self, int):
        """Setzen der EDV-Nummer"""
        self._edv_number = int

    @staticmethod
    def from_dict(dict=dict()):
        new_module = Module()
        new_module.set_id(dict["id"])
        new_module.set_name(dict["name"])
        new_module.set_edv_number(dict["edv_number"])
        new_module.set_create_time(dict["create_time"])
        return new_module