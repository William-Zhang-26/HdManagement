from src.server.bo.Module import Module
from src.server.db.Mapper import Mapper


class Module (Mapper):
    """Mapper-Klasse, die Modul-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Module."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM module"
        cursor.execute(command)
        tuples = cursor.fetchall()


        for (id, name, edv_number, create_time) in tuples:
            module = Module()
            module.set_id(id)
            module.set_name(name)
            module.set_edv_number(edv_number)
            module.set_create_time(create_time)
            result.append(module)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        """Suchen eines Moduls mit vorgegebener ID-Nummer."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM module WHERE id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:

            for (id, name, edv_number, create_time) in tuples:
                module = Module()
                module.set_id(id)
                module.set_name(name)
                module.set_edv_number(edv_number)
                module.set_create_time(create_time)
                result.append(module)

            result = module

        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """Suchen eines Moduls anhand desen Namen"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM module WHERE name like '{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, edv_number, create_time) in tuples:
            module = Module()
            module.set_id(id)
            module.set_name(name)
            module.set_edv_number(edv_number)
            module.set_create_time(create_time)
            result.append(module)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, module):
        """Einfügen eines Moduls in die Datenbank."""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as MaxID from module")
        tuples = cursor.fetchall()

        for (MaxID) in tuples:
            module.set_id(MaxID[0] + 1)

        command = "INSERT INTO module (id, name, edv_number, create_time) VALUES ('{}','{}','{}','{}')" \
            .format(module.get_id(), module.get_name(), module.get_edv_number(), module.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, module):
        """Wiederholtes Schreiben eines Moduls in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE module SET name = ('{}'), edv_number = ('{}'), create_time = ('{}')" "WHERE id = ('{}')"\
                    .format(module.get_id(), module.get_name(), module.get_edv_number, module.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, module):
        """Löschen eines Modul-Objektes aus der Datenbank."""

        cursor = self._cnx.cursor()

        command = "DELETE FROM module WHERE id={}".format(module.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with Module() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)