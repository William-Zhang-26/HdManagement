from src.server.bo.State import State
from src.server.db.Mapper import Mapper


class StateMapper (Mapper):
    """Mapper-Klasse, die Zustands-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Zustände.

        :return Eine Sammlung mit Zustands-Objekten, die sämtliche Zustände
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM state"
        cursor.execute(command)
        tuples = cursor.fetchall()


        for (id, name, create_time ) in tuples:
            state = State()
            state.set_id(id)
            state.set_name(name)
            state.set_create_time(create_time)
            result.append(state)


        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        """Suche eines Zustandes mit vorgegebener ID-Nummer. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return Zustand-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM state WHERE id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:

            for (id, name, create_time) in tuples:
                state = State()
                state.set_id(id)
                state.set_name(name)
                state.set_create_time(create_time)
                result.append(state)

            result = state

        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM state WHERE name like '{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, create_time ) in tuples:
            state = State()
            state.set_id(id)
            state.set_name(name)
            state.set_create_time(create_time)
            result.append(state)


        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, state):
        """Einen neuen Zustand in die Datenbank hinzufügen."""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as MaxID from state")
        tuples = cursor.fetchall()

        for (MaxID) in tuples:
            state.set_id(MaxID[0] + 1)

        command = "INSERT INTO state (id, name, create_time) VALUES ('{}','{}','{}')" \
            .format(state.get_id(), state.get_name(), state.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, state):
        """Wiederholtes Schreiben eines Objekts in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE state SET name = ('{}'), create_time = ('{}')" "WHERE id = ('{}')"\
                    .format(state.get_name(), state.get_create_time(), state.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self,state):
        """Löschen eines Zustand-Objekts aus der Datenbank."""

        cursor = self._cnx.cursor()

        command = "DELETE FROM state WHERE id={}".format(state.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""

"""
if __name__ == "__main__":
    with StateMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p.get_create_time())
"""

"""
if __name__ == "__main__":
   with StateMapper() as mapper:
       p = mapper.find_by_key(2).get_name()
       print(p)
"""

"""
if __name__ == "__main__":
   with StateMapper() as mapper:
       p = mapper.find_by_name("abgelehnt")
       for i in p:
           print(i.get_id())
"""
"""
if __name__ == "__main__":
   p = State()
   p.set_name("neu")
   p.set_create_time("2020-12-03")
   with StateMapper() as mapper:
       mapper.insert(p)
"""
"""
if __name__ == "__main__":
   with StateMapper() as mapper:
       state = mapper.find_by_key(7)
       state.set_name("in Bewetung")
       mapper.update(state)
"""

"""
if __name__ == "__main__":
   with StateMapper() as mapper:
       test = mapper.find_by_key(6)
       mapper.delete(test)

"""