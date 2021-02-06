from server.bo.Semester import Semester
from server.db.Mapper import Mapper


class SemesterMapper (Mapper):
    """Mapper-Klasse, die Semester-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Semesters."""
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM semester"
        cursor.execute(command)
        tuples = cursor.fetchall()


        for (id, name, current_semester, create_time) in tuples:
            semester = Semester()
            semester.set_id(id)
            semester.set_name(name)
            semester.set_current_semester(current_semester)
            semester.set_create_time(create_time)
            result.append(semester)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        """Suchen eines Semesters mit vorgegebener ID-Nummer."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM semester WHERE id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:

            for (id, name, current_semester, create_time) in tuples:
                semester = Semester()
                semester.set_id(id)
                semester.set_name(name)
                semester.set_current_semester(current_semester)
                semester.set_create_time(create_time)
                result.append(semester)

                result = semester

        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM semester WHERE name like '{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, current_semester, create_time) in tuples:
            semester = Semester()
            semester.set_id(id)
            semester.set_name(name)
            semester.set_current_semester(current_semester)
            semester.set_create_time(create_time)
            result.append(semester)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_current_semester(self, current_semester):
        """Suchen eines Semester anhand vom Current Semester."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM semester WHERE current_semester like '{}'".format(current_semester)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:

            for (id, name, current_semester, create_time) in tuples:
                semester = Semester()
                semester.set_id(id)
                semester.set_name(name)
                semester.set_current_semester(current_semester)
                semester.set_create_time(create_time)
                result.append(semester)

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

        command = "INSERT INTO semester (id, name, current_semester, create_time) VALUES ('{}','{}','{}', '{}')" \
            .format(semester.get_id(), semester.get_name(), semester.get_current_semester(), semester.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, semester):
        """Wiederholtes Schreiben eines Semester-Objekts in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE semester SET name = ('{}'), current_semester = ('{}'), create_time = ('{}')" "WHERE id = ('{}')"\
                    .format(semester.get_name(), semester.get_current_semester(), semester.get_create_time(), semester.get_id())
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



"""
if __name__ == "__main__":
    with SemesterMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p.get_current_semester())
"""
"""
if __name__ == "__main__":
   with SemesterMapper() as mapper:
       p = mapper.find_by_key(4).get_name()
       print(p)
"""
"""
if __name__ == "__main__":
   with SemesterMapper() as mapper:
       p = mapper.find_by_name("WS 20/21")
       for i in p:
           print(i.get_current_semester())
"""
"""
if __name__ == "__main__":
   p = Semester()
   p.set_name("SS 25")
   p.set_current_semester(0)
   p.set_create_time("2020-12-03")
   with SemesterMapper() as mapper:
       mapper.insert(p)
"""
"""
if __name__ == "__main__":
   with SemesterMapper() as mapper:
       semester = mapper.find_by_key(11)
       semester.set_current_semester(1)
       mapper.update(semester)


if __name__ == "__main__":
   with SemesterMapper() as mapper:
       test = mapper.find_by_key(11)
       mapper.delete(test)

"""

if __name__ == "__main__":
   with SemesterMapper() as mapper:
       p = mapper.find_by_current_semester(0)
       for i in p:
           print(i.get_id())
