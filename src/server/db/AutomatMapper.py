from src.server.bo.Automat import Automat
from src.server.db.Mapper import Mapper


class AutomatMapper (Mapper):
    """Mapper-Klasse, die Automat-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Automaten.

        :return Eine Sammlung mit Automat-Objekten, die sämtliche Zustände
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM automat"
        cursor.execute(command)
        tuples = cursor.fetchall()


        for (id, name, current_condition, create_time ) in tuples:
            automat = Automat()
            automat.set_id(id)
            automat.set_name(name)
            automat.current_condition(current_condition)
            automat.set_create_time(create_time)
            result.append(automat)


        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        """Suche eines Automat mit vorgegebener ID-Nummer. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return Automat-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM automat WHERE id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:

            for (id, name, current_condition, create_time) in tuples:
                automat = Automat()
                automat.set_id(id)
                automat.set_name(name)
                automat.current_condition(current_condition)
                automat.set_create_time(create_time)
                result.append(automat)

            result = automat

        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM automat WHERE name like '{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, current_condition, create_time ) in tuples:
            automat = Automat()
            automat.set_id(id)
            automat.set_name(name)
            automat.current_condition(current_condition)
            automat.set_create_time(create_time)
            result.append(automat)

        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, automat):
        """Einen neuen Automat in die Datenbank hinzufügen."""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as MaxID from automat")
        tuples = cursor.fetchall()

        for (MaxID) in tuples:
            automat.set_id(MaxID[0] + 1)

        command = "INSERT INTO automat (id, name, current_condition, create_time) VALUES ('{}','{}','{}','{}')" \
            .format(automat.get_id(), automat.get_name(), automat.get_current_condition (), automat.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, automat):
        """Wiederholtes Schreiben eines Objekts in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE automat SET name = ('{}'), current_condition = ('{}'), create_time = ('{}')" "WHERE id = ('{}')"\
                    .format(automat.get_id(), automat.get_name(), automat.get_current_condition(), automat.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, automat):
        """Löschen eines Automat-Objekts aus der Datenbank."""

        cursor = self._cnx.cursor()

        command = "DELETE FROM automat WHERE id={}".format(automat.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()