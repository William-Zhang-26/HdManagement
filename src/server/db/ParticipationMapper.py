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


        for (id, module_id, project_id, student_id, validation_id, status, create_time) in tuples:
            participation = Participation()
            participation.set_id(id)
            participation.set_module_id(module_id)
            participation.set_project_id(project_id)
            participation.set_student_id(student_id)
            participation.set_validation_id(validation_id)
            participation.set_status(status)
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

            for (id, module_id, project_id, student_id, validation_id, status, create_time) in tuples:
                participation = Participation()
                participation.set_id(id)
                participation.set_module_id(module_id)
                participation.set_project_id(project_id)
                participation.set_student_id(student_id)
                participation.set_validation_id(validation_id)
                participation.set_status(status)
                participation.set_create_time(create_time)
                result.append(participation)

                result = participation

        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_module(self, id):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM participation WHERE module_id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:
            for (id, module_id, project_id, student_id, validation_id, status, create_time) in tuples:
                participation = Participation()
                participation.set_id(id)
                participation.set_module_id(module_id)
                participation.set_project_id(project_id)
                participation.set_student_id(student_id)
                participation.set_validation_id(validation_id)
                participation.set_status(status)
                participation.set_create_time(create_time)
                result.append(participation)

        else:
            result = None

        self._cnx.commit()
        cursor.close()
        return result

    def find_by_project(self, id):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM participation WHERE project_id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:
            for (id, module_id, project_id, student_id, validation_id, status, create_time) in tuples:
                participation = Participation()
                participation.set_id(id)
                participation.set_module_id(module_id)
                participation.set_project_id(project_id)
                participation.set_student_id(student_id)
                participation.set_validation_id(validation_id)
                participation.set_status(status)
                participation.set_create_time(create_time)
                result.append(participation)

        else:
            result = None

        self._cnx.commit()
        cursor.close()
        return result

    def find_by_student(self, id):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM participation WHERE student_id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:
            for (id, module_id, project_id, student_id, validation_id, status, create_time) in tuples:
                participation = Participation()
                participation.set_id(id)
                participation.set_module_id(module_id)
                participation.set_project_id(project_id)
                participation.set_student_id(student_id)
                participation.set_validation_id(validation_id)
                participation.set_status(status)
                participation.set_create_time(create_time)
                result.append(participation)

        else:
            result = None

        self._cnx.commit()
        cursor.close()
        return result

    def find_by_validation(self, id):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM participation WHERE validation_id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:
            for (id, module_id, project_id, student_id, validation_id, status, create_time) in tuples:
                participation = Participation()
                participation.set_id(id)
                participation.set_module_id(module_id)
                participation.set_project_id(project_id)
                participation.set_student_id(student_id)
                participation.set_validation_id(validation_id)
                participation.set_status(status)
                participation.set_create_time(create_time)
                result.append(participation)

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

        command = "INSERT INTO participation (id, module_id, project_id, student_id, validation_id, status, create_time) VALUES ('{}','{}','{}','{}','{}','{}','{}')" \
            .format(participation.get_id(), participation.get_module_id(), participation.get_project_id(),
                    participation.get_student_id(), participation.get_validation_id(),
                    participation.get_status(), participation.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, participation):
        """Wiederholtes Schreiben eines Teilnahme-Objektes in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE participation SET validation_id = ('{}'), status = ('{}'), create_time = ('{}')" "WHERE id = ('{}')"\
            .format(participation.get_validation_id(), participation.get_status(), participation.get_create_time(), participation.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, participation):
        """Löschen eines Teilnahme-Objektes aus der Datenbank."""

        cursor = self._cnx.cursor()

        command = "DELETE FROM participation WHERE id = {}".format(participation.get_id())\
            .format(participation.get_module_id(), participation.get_project_id(),
                    participation.get_student_id(), participation.get_validation_id(),
                    participation.get_status(), participation.get_create_time(), participation.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich...


#find_by_all:
if __name__ == "__main__":
    with ParticipationMapper() as mapper:
        result = mapper.find_all()
        for participation in result:
            print(participation.get_validation_id())

#find_by_key
if __name__ == "__main__":
   with ParticipationMapper() as mapper:
       p = mapper.find_by_key(2).get_status()
       print(p)


#find_by_module
if __name__ == "__main__":
   with ParticipationMapper() as mapper:
       m = mapper.find_by_module(2)
       for i in m:
           print(i.get_id())

#find_by_project
if __name__ == "__main__":
   with ParticipationMapper() as mapper:
       m = mapper.find_by_project(1)
       for i in m:
           print(i.get_id())

#find_by_student
if __name__ == "__main__":
   with ParticipationMapper() as mapper:
       m = mapper.find_by_student(1)
       for i in m:
           print(i.get_status())

#find_by_validation
if __name__ == "__main__":
   with ParticipationMapper() as mapper:
       m = mapper.find_by_validation(5)
       for i in m:
           print(i.get_id())
"""
#insert
if __name__ == "__main__":
   p = Participation()
   p.set_module_id(17)
   p.set_project_id(1)
   p.set_student_id(1)
   with ParticipationMapper() as mapper:
       mapper.insert(p)
"""

#update
if __name__ == "__main__":
   with ParticipationMapper() as mapper:
       participation = mapper.find_by_key(1)
       participation.set_validation_id(2)
       mapper.update(participation)



#delete
if __name__ == "__main__":
   with ParticipationMapper() as mapper:
       test = mapper.find_by_key(4)
       mapper.delete(test)"""