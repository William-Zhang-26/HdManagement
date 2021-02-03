from server.bo.Assignment import Assignment
from server.db.Mapper import Mapper

class AssignmentMapper(Mapper):

    """Mapper-Klasse, die Anwender-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Zuteillungen"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM assignment"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, create_time) in tuples:
            assignment = Assignment()
            assignment.set_id(id)
            assignment.set_name(name)
            assignment.set_create_time(create_time)
            result.append(assignment)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        """Suchen einer Zuteilung mit vorgegebener ID"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM assignment WHERE id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:

            for (id, name, create_time) in tuples:
                assignment = Assignment()
                assignment.set_id(id)
                assignment.set_name(name)
                assignment.set_create_time(create_time)
                result.append(assignment)
                result = assignment

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """Suchen einer Zuteilung anhand des Namen."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM assignment WHERE name like '{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, create_time) in tuples:
            assignment = Assignment()
            assignment.set_id(id)
            assignment.set_name(name)
            assignment.set_create_time(create_time)
            result.append(assignment)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, assignment):
        """Einfügen eines Zuteilungs-Objekts in die Datenbank."""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as MaxID from assignment")
        tuples = cursor.fetchall()

        for (MaxID) in tuples:
            assignment.set_id(MaxID[0] + 1)

        command = "INSERT INTO assignment (id, name, create_time)" \
                "VALUES ('{}','{}','{}')" \
            .format(assignment.get_id(), assignment.get_name(), assignment.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, assignment):
        """Wiederholtes Schreiben eines Objekts in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE assignment SET name = ('{}'), create_time = ('{}') WHERE id = ('{}')"\
            .format(assignment.get_name(), assignment.get_create_time(), assignment.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, assignment):
        """Löschen eines Zuteilungs-Objekts aus der Datenbank."""

        cursor = self._cnx.cursor()

        command = "DELETE FROM assignment WHERE id={}".format(assignment.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""
if __name__ == "__main__":
    with AssignmentMapper() as mapper:
        p = mapper.find_by_key(1).get_name()
        print(p)

if __name__ == "__main__":
    with AssignmentMapper() as mapper:
        r = mapper.find_by_name("IT")
        for i in r:
            print(i.get_id())
            
if __name__ == "__main__":
    with AssignmentMapper() as mapper:
        s = mapper.find_all()
        for i in s:
            print(i.get_name())
            
if __name__ == "__main__":
    with AssignmentMapper() as mapper:
        assign = mapper.find_by_key(1)
        assign.set_name("Management")
        mapper.update(assign)
        
if __name__ == "__main__":
    with AssignmentMapper() as mapper:
        assign = mapper.find_by_key(4)
        mapper.delete(assign)
"""