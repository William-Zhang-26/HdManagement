from src.server.bo.Semester import Semester
from src.server.db.Mapper import Mapper


class Semester (Mapper):
    """Mapper-Klasse, die Semester-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Semesters.

        :return Eine Sammlung mit Semester-Objekten, die sämtliche Semester
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM semester"
        cursor.execute(command)
        tuples = cursor.fetchall()


        for (id, name, semester) in tuples:
            semester = Semester()
            semester.set_id(id)
            semester.set_name(name)
            semester.set_semester(semester)
            result.append(semester)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        """Suchen eines Semesters mit vorgegebener ID-Nummer. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return Semester-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM semester WHERE id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:

            for (id, name, semester) in tuples:
                semester = Semester()
                semester.set_id(id)
                semester.set_name(name)
                semester.set_semester(semester)
                result.append(semester)

            result = semester

        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, semester):
        """Einfügen eines Semesters in die Datenbank."""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as MaxID from semester")
        tuples = cursor.fetchall()

        for (MaxID) in tuples:
            semester.set_id(MaxID[0] + 1)

        command = "INSERT INTO semester (id, name, semester) VALUES ('{}','{}','{}')" \
            .format(semester.get_id(), semester.get_name(), semester.get_semester())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, semester):
        """Wiederholtes Schreiben eines Semester-Objekts in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE semester SET name = ('{}'), semester = ('{}')" "WHERE id = ('{}')"\
                    .format(semester.get_id(), semester.get_name(), semester.get_semester())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self,semester):
        """Löschen eines Semester-Obejekts aus der Datenbank."""

        cursor = self._cnx.cursor()

        command = "DELETE FROM semester WHERE id={}".format(semester.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with Semester() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)