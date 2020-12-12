from src.server.bo.NamedBusinessObject import NamedBusinessObject
from src.server.bo.Role import Role

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
        self._role_id = 0

    def get_lastname(self):
        """Auslesen des Nachnamens"""
        return self._lastname

    def set_lastname(self, new_lastname):
        """Setzen des Nachnamens"""
        self._lastname = new_lastname

    def get_firstname(self):
        """Auslesen des Vornamens"""
        return self._firstname

    def set_firstname(self, new_firstname):
        """Setzen des Vornamens"""
        self._firstname = new_firstname

    def get_mail(self):
        """Auslesen der Mail"""
        return self._mail

    def set_mail(self, new_mail):
        """Setzen der Mail"""
        self._mail = new_mail

    def get_role_id(self):
        """Auslesen der Rollen-ID"""
        return self._role_id

    def set_role_id(self, new_role_id):
        """Setzen der Rollen-Id (Soll nicht wirklich funktionieren"""
        self._role_id = new_role_id

    @staticmethod
    def from_dict(dict = dict()):
        new_user = User()
        new_user.set_id(dict["id"])
        new_user.set_lastname(dict["lastname"])
        new_user.set_firstname(dict["firstname"])
        new_user.set_mail(dict["mail"])
        new_user.set_role_id(dict["role_id"])
        new_user.set_create_time(dict["create_time"])
        return new_user