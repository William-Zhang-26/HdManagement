from abc import ABC, abstractmethod
import datetime

class BusinessObject(ABC):
    """Gemeinsame Basisklasse aller in diesem Projekt für die Umsetzung des Fachkonzepts relevanten Klassen.
    Sie enthält die ID und den Erstellungszeitpunkt aller Klassen.

    Zentrales Merkmal ist, dass jedes BusinessObject eine Nummer besitzt, die man in
    einer relationalen Datenbank auch als Primärschlüssel bezeichnen würde.
    """
    def __init__(self):
        self._id = 0   # Die eindeutige Identifikationsnummer einer Instanz dieser Klasse.
        self._creation_time = datetime.datetime.now()

    def get_id(self):
        """Auslesen der ID."""
        return self._id

    def set_id(self,value):
        """Setzen der ID."""
        self._id = value

    def get_creation_time(self):
        """Auslesen des Erstellungszeitpunkts.

        %c Ausgabe: Local version of date and time
        Beispiel Ausgabe: Mon Dec 31 17:41:00 2018"""
        return self._creation_time.strftime("%c")