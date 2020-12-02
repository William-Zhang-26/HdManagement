from src.server.bo.Participation import Participation
from src.server.db.Mapper import Mapper


class ParticipationMapper (Mapper):
    """Mapper-Klasse, die Teilnahme-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Teilnahmen."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM participation"
        cursor.execute(command)
        tuples = cursor.fetchall()


        for (id, participation_status, create_time) in tuples:
            participation = Participation()
            participation.set_id(id)
            participation.set_participation_status(participation_status)
            participation.set_create_time(create_time)
            result.append(participation)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        """Suchen einer Teilnahme mit vorgegebener ID-Nummer.
        """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM participation WHERE id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:

            for (id, participation_status, create_time) in tuples:
                participation = Participation()
                participation.set_id(id)
                participation.set_participation_status(participation_status)
                participation.set_create_time(create_time)
                result.append(participation)

            result = participation

        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, participation):
        """Einfügen einer Teilnahme in die Datenbank."""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as MaxID from participation")
        tuples = cursor.fetchall()

        for (MaxID) in tuples:
            participation.set_id(MaxID[0] + 1)

        command = "INSERT INTO participation (id, participation_status, create_time) VALUES ('{}','{}','{}')" \
            .format(participation.get_id(), participation.get_participation_status(), participation.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, participation):
        """Wiederholtes Schreiben eines Teilnahme-Objektes in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE participation SET participation_status = ('{}'), create_time = ('{}')" "WHERE id = ('{}')"\
                    .format(participation.get_id(), participation.get_participation_status(), participation.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, participation):
        """Löschen eines Teilnahme-Objektes aus der Datenbank."""

        cursor = self._cnx.cursor()

        command = "DELETE FROM participation WHERE id={}".format(participation.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
if (__name__ == "__main__"):
    with Participation() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p)