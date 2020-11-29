from src.server.bo.NamedBusinessObject import NamedBusinessObject

"""
Platzhalter für Static Methode
class set_User():
"""


class User(NamedBusinessObject):
    """
    Realisierung der User
    """

    def __init__(self):
        super().__init__()
        self._lastname = ""
        self._firstname = ""
        self._mail = ""

    def get_lastname(self):
        """Auslesen des Nachnamens"""
        return self._lastname

    def set_lastname(self, new_lastname):
        """Setzen des Nachnamens"""
        self._lastname = new_lastname

    def get_firstname(self):
        """Auslesen des Vornamens"""
        return self._firstname

    def set_name(self, new_firstname):
        """Setzen des Vornamens"""
        self._firstname = new_firstname

    def get_mail(self):
        """Auslesen der Mail"""
        return self._mail

    def set_mail(self, new_mail):
        """Setzen der Mail"""
        self._mail = new_mail

    @staticmethod
    def from_dict(dict = dict()):
        new_user = User()
        new_user.set_id(dict["id"])
        new_user.set_lastname(dict["lastname"])
        new_user.set_firstname(dict["firstname"])
        new_user.set_mail(dict["mail"])
        new_user.set_name("name")
        return new_user