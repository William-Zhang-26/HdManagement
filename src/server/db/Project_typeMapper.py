from src.server.bo.Project_type import Project_type
from src.server.db.Mapper import Mapper


class Project_typeMapper (Mapper):
    """Mapper-Klasse, die Project_type-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Projekttypen.

        :return Eine Sammlung mit Projekttypen-Objekten, die sämtliche Projekttypen
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM project_type"
        cursor.execute(command)
        tuples = cursor.fetchall()


        for (id, name, ects, sws, create_time) in tuples:
            project_type = Project_type()
            project_type.set_id(id)
            project_type.set_name(name)
            project_type.set_ects(ects)
            project_type.set_sws(sws)
            project_type.set_create_time(create_time)
            result.append(project_type)


        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        """Suchen eines Projekttypen mit vorgegebener ID-Nummer. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return Projektyp-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM project_type WHERE id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:

            for (id, name, ects, sws, create_time) in tuples:
                project_type = Project_type()
                project_type.set_id(id)
                project_type.set_name(name)
                project_type.set_ects(ects)
                project_type.set_sws(sws)
                project_type.set_create_time(create_time)
                result.append(project_type)

                result = project_type

        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM project_type WHERE name like '{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, ects, sws, create_time) in tuples:
            project_type = Project_type()
            project_type.set_id(id)
            project_type.set_name(name)
            project_type.set_ects(ects)
            project_type.set_sws(sws)
            project_type.set_create_time(create_time)
            result.append(project_type)

        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, project_type):
        """Einfügen eines Projekttypes in die Datenbank."""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as MaxID from project_type")
        tuples = cursor.fetchall()

        for (MaxID) in tuples:
            project_type.set_id(MaxID[0] + 1)

        command = "INSERT INTO project_type (id, name, ects, sws, create_time) VALUES ('{}','{}','{}','{}','{}')" \
            .format(project_type.get_id(), project_type.get_name(), project_type.get_ects(), project_type.get_sws(),
                    project_type.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, project_type):
        """Wiederholtes Schreiben eines Objekts in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE project_type SET name = ('{}'), ects = ('{}'), sws = ('{}'), create_time = ('{}')" "WHERE id = ('{}')"\
                    .format(project_type.get_name(), project_type.get_ects(), project_type.get_sws(),
                    project_type.get_create_time(), project_type.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self,project_type):
        """Löschen eines Projekt-Objekts aus der Datenbank."""

        cursor = self._cnx.cursor()

        command = "DELETE FROM project_type WHERE id={}".format(project_type.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""

"""
if __name__ == "__main__":
    with Project_typeMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p.get_name())
"""
"""
if __name__ == "__main__":
   with Project_typeMapper() as mapper:
       p = mapper.find_by_key(6).get_name()
       print(p)
"""
"""
if __name__ == "__main__":
   with Project_typeMapper() as mapper:
       p = mapper.find_by_name("Fachspezifisches")
       for i in p:
           print(i.get_id())
"""
"""
if __name__ == "__main__":
   p = Project_type()
   p.set_id(7)
   p.set_name("Fachspezifisches")
   p.set_ects(5)
   p.set_sws(3)
   p.set_create_time("2020-12-03 20:54:00")
   with Project_typeMapper() as mapper:
       mapper.insert(p)
"""

if __name__ == "__main__":
   with Project_typeMapper() as mapper:
       project_type = mapper.find_by_key(1)
       project_type.set_name("Fachspezifisches")
       mapper.update(project_type)

"""
if __name__ == "__main__":
   with Project_typeMapper() as mapper:
       test = mapper.find_by_key(3)
       mapper.delete(test)
"""


