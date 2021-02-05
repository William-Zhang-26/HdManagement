from server.bo import BusinessObject as bo


class NamedBusinessObject (bo.BusinessObject):
    """Gemeinsame NamensBasisklasse aller in diesem Projekt für die Umsetzung des Fachkonzepts relevanten Klassen.

    Zentrales Merkmal ist, dass jedes NamedBusinessObject einen Namen besitzt.
    """
    def __init__(self):
        super().__init__()
        self._name = ""

    def get_name(self):
        """Auslesen des Namens."""
        return self._name

    def set_name(self,new_name):
        """Setzen des Namens."""
        self._name = new_name

