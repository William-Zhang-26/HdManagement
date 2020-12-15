from src.server.bo.Student import Student
from src.server.db.Mapper import Mapper

class StudentMapper(Mapper):
    """Mapper-Klasse, die Anwender-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Studenten"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM student"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, lastname, firstname, course, matriculation_number, mail, google_id, project_id, create_time) in tuples:
            student = Student()
            student.set_id(id)
            student.set_lastname(lastname)
            student.set_firstname(firstname)
            student.set_course(course)
            student.set_matriculation_number(matriculation_number)
            student.set_mail(mail)
            student.set_google_id(google_id)
            student.set_project_id(project_id)
            student.set_create_time(create_time)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        """Suchen eines Studenten mit vorgegebener ID"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM student WHERE id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:

            for (id, lastname, firstname, course, matriculation_number, mail, google_id, project_id, create_time) \
                    in tuples:
                student = Student()
                student.set_id(id)
                student.set_lastname(lastname)
                student.set_firstname(firstname)
                student.set_course(course)
                student.set_matriculation_number(matriculation_number)
                student.set_mail(mail)
                student.set_google_id(google_id)
                student.set_project_id(project_id)
                student.set_create_time(create_time)
                result = student

        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_lastname(self, lastname):
        """Suchen eines Studenten anhand des Nachnamen."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM student WHERE lastname like '{}'".format(lastname)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, lastname, firstname, course, matriculation_number, mail, google_id, project_id, create_time) in tuples:
            student = Student()
            student.set_id(id)
            student.set_lastname(lastname)
            student.set_firstname(firstname)
            student.set_course(course)
            student.set_matriculation_number(matriculation_number)
            student.set_mail(mail)
            student.set_google_id(google_id)
            student.set_project_id(project_id)
            student.set_create_time(create_time)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_firstname(self, firstname):
        """Suchen eines Studenten anhand des Namen."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM student WHERE firstname like '{}'".format(firstname)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, lastname, firstname, course, matriculation_number, mail, google_id, project_id, create_time) in tuples:
            student = Student()
            student.set_id(id)
            student.set_lastname(lastname)
            student.set_firstname(firstname)
            student.set_course(course)
            student.set_matriculation_number(matriculation_number)
            student.set_mail(mail)
            student.set_google_id(google_id)
            student.set_project_id(project_id)
            student.set_create_time(create_time)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_matriculation_number(self, matriculation_number):
        """Suchen eines Studenten anhand seiner Matrikelnummer."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM student WHERE matriculation_number like '{}'".format(matriculation_number)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, lastname, firstname, course, matriculation_number, mail, google_id, project_id, create_time) in tuples:
            student = Student()
            student.set_id(id)
            student.set_lastname(lastname)
            student.set_firstname(firstname)
            student.set_course(course)
            student.set_matriculation_number(matriculation_number)
            student.set_mail(mail)
            student.set_google_id(google_id)
            student.set_project_id(project_id)
            student.set_create_time(create_time)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_course(self, course):
        """Suchen eines Studenten anhand seines Studiengangs."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM student WHERE course like '{}'".format(course)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, lastname, firstname, course, matriculation_number, mail, google_id, project_id, create_time) in tuples:
            student = Student()
            student.set_id(id)
            student.set_lastname(lastname)
            student.set_firstname(firstname)
            student.set_course(course)
            student.set_matriculation_number(matriculation_number)
            student.set_mail(mail)
            student.set_google_id(google_id)
            student.set_project_id(project_id)
            student.set_create_time(create_time)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, student):
        """Einfügen eines Student-Objekts in die Datenbank."""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as MaxID from student")
        tuples = cursor.fetchall()

        for (MaxID) in tuples:
            student.set_id(MaxID[0] + 1)

        command = "INSERT INTO student (id, lastname, firstname, course, matriculation_number, mail, google_id," \
                "project_id, create_time)" \
                "VALUES ('{}','{}','{}','{}','{}','{}','{}','{}','{}')" \
            .format(student.get_id(), student.get_lastname(), student.get_firstname(), student.get_course(),
                    student.get_matriculation_number(),
                    student.get_mail(), student.get_google_id(), student.get_project_id(), student.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, student):
        """Wiederholtes Schreiben eines Objekts in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE student SET lastname = ('{}'), firstname = ('{}'), course = ('{}')," \
                "matriculation_number = ('{}')," \
                "mail = ('{}'), google_id = ('{}'), project_id = ('{}'), create_time = ('{}')" "WHERE id = ('{}')"\
            .format(student.get_lastname(), student.get_firstname(), student.get_course(),
                    student.get_matriculation_number(), student.get_mail(), student.get_google_id(),
                    student.get_project_id(), student.get_create_time(), student.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, student):
        """Löschen eines Student-Objekts aus der Datenbank."""

        cursor = self._cnx.cursor()

        command = "DELETE FROM student WHERE id={}".format(student.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    """Platzhalter für spätere Tests"""
"""
if __name__ == "__main__":
    with StudentMapper() as mapper:
        p = mapper.find_by_matriculation_number("37534")
        for i in p:
            print(i.get_project_id())

if __name__ == "__main__":
    s = Student()
    s.set_lastname("Ün")
    s.set_firstname("Rahel")
    s.set_course("Wirtschaftsinformatik")
    s.set_matriculation_number("36576")
    s.set_mail("rü004@hdm-stuttgart.de")
    s.set_google_id("rahel.Ün@google.com")
    s.set_project_id(1)
    s.set_create_time("2020-12-15")
    with StudentMapper() as mapper:
        mapper.insert(s)

if __name__ == "__main__":
    with StudentMapper() as mapper:
        p = mapper.find_by_key(3)
        mapper.delete(p)

if __name__ == "__main__":
    with StudentMapper() as mapper:
        student = mapper.find_by_key(1)
        student.set_matriculation_number(37534)
        mapper.update(student)
"""