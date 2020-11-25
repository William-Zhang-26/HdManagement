from src.server.bo import BusinessObject

class Participation(BusinessObject):
    """Realisierung einer Teilnahme an den Projekten
    """

    def __init__(self):
        super().__init__()
        self._participation_status = bool

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
        new_participation.set_participation_status(dict["participation_status"])
        new_participation.set_create_time(dict["create_time"])
        return new_participation
