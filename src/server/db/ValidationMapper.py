from src.server.bo.Validation import Validation
from src.server.db.Mapper import Mapper


class ValidationMapper (Mapper):
    """Mapper-Klasse, die Bewertungs-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Bewertungen."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM validation"
        cursor.execute(command)
        tuples = cursor.fetchall()


        for (id, grade, create_time) in tuples:
            validation = Validation()
            validation.set_id(id)
            validation.set_grade(grade)
            validation.set_create_time(create_time)
            result.append(validation)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        """Suchen einer Bewertung mit vorgegebener ID-Nummer.
        """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM validation WHERE id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:

            for (id, grade, create_time) in tuples:
                validation = Validation()
                validation.set_id(id)
                validation.set_grade(grade)
                validation.set_create_time(create_time)
                result.append(validation)

            result = validation

        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    """ vielleicht sowas wie find_by_grade?"""

    def insert(self, validation):
        """Einfügen einer Bewertung in die Datenbank."""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as MaxID from validation")
        tuples = cursor.fetchall()

        for (MaxID) in tuples:
            validation.set_id(MaxID[0] + 1)

        command = "INSERT INTO validation (id, grade, create_time) VALUES ('{}','{}','{}')" \
            .format(validation.get_id(), validation.get_grade(), validation.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, validation):
        """Wiederholtes Schreiben einer Bewertung in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE validation SET grade = ('{}'), create_time = ('{}')" "WHERE id = ('{}')"\
                    .format(validation.get_id(), validation.get_grade(), validation.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, validation):
        """Löschen eines Bewertungs-Objektes aus der Datenbank."""

        cursor = self._cnx.cursor()

        command = "DELETE FROM validation WHERE id={}".format(validation.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if __name__ == "__main__":
    with ValidationMapper() as mapper:
        result = mapper.find_all()
        for project in result:
            print(project.get_grade())
