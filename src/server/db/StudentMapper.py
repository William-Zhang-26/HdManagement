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

        for (id, lastname, firstname, course, matriculation_number, mail, project_id) in tuples:
            student = Student()
            student.set_id(id)
            student.set_lastname(lastname)
            student.set_firstname(firstname)
            student.set_course(course)
            student.set_matriculation_number(matriculation_number)
            student.set_mail(mail)
            student.set_project_id(project_id)
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

            for (id, lastname, firstname, course, matriculation_number, mail, project_id) in tuples:
                student = Student()
                student.set_id(id)
                student.set_lastname(lastname)
                student.set_firstname(firstname)
                student.set_course(course)
                student.set_matriculation_number(matriculation_number)
                student.set_mail(mail)
                student.set_project_id(project_id)
                result.append(student)

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

        for (id, lastname, firstname, course, matriculation_number, mail, project_id) in tuples:
            student = Student()
            student.set_id(id)
            student.set_lastname(lastname)
            student.set_firstname(firstname)
            student.set_course(course)
            student.set_matriculation_number(matriculation_number)
            student.set_mail(mail)
            student.set_project_id(project_id)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, firstname):
        """Suchen eines Studenten anhand des Namen."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM student WHERE firstname like '{}'".format(firstname)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, lastname, firstname, course, matriculation_number, mail, project_id) in tuples:
            student = Student()
            student.set_id(id)
            student.set_lastname(lastname)
            student.set_firstname(firstname)
            student.set_course(course)
            student.set_matriculation_number(matriculation_number)
            student.set_mail(mail)
            student.set_project_id(project_id)
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

        for (id, lastname, firstname, course, matriculation_number, mail, project_id) in tuples:
            student = Student()
            student.set_id(id)
            student.set_lastname(lastname)
            student.set_firstname(firstname)
            student.set_course(course)
            student.set_matriculation_number(matriculation_number)
            student.set_mail(mail)
            student.set_project_id(project_id)
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

        for (id, lastname, firstname, course, matriculation_number, mail, project_id) in tuples:
            student = Student()
            student.set_id(id)
            student.set_lastname(lastname)
            student.set_firstname(firstname)
            student.set_course(course)
            student.set_matriculation_number(matriculation_number)
            student.set_mail(mail)
            student.set_project_id(project_id)
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

        command = "INSERT INTO student (id, lastname, firstname, course, matriculation_number, mail, project_id)" \ 
                "VALUES ('{}','{}','{}','{}','{}','{}','{}')" \
            .format(student.get_id(), student.get_lastname(), student.get_firstname(), student.get_course(), student.get_matriculation_number(),
                    student.get_mail(), student.get_project_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, student):
        """Wiederholtes Schreiben eines Objekts in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE student SET lastname = ('{}'), firstname = ('{}'), course = ('{}'), matriculation_number = ('{}')," \
                  "mail = ('{}')" "WHERE id = ('{}')"\
            .format(student.get_lastname(), student.get_firstname(), student.get_course(),
                    student.get_matriculation_number(), student.get_mail(), student.get_id())
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