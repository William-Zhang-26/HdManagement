from server.bo.Student import Student
from server.db.Mapper import Mapper

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

        for (id, user_id, name, firstname, course, matriculation_number, mail, google_id, create_time) \
                in tuples:
            student = Student()
            student.set_id(id)
            student.set_user_id(user_id)
            student.set_name(name)
            student.set_firstname(firstname)
            student.set_course(course)
            student.set_matriculation_number(matriculation_number)
            student.set_mail(mail)
            student.set_google_id(google_id)
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

            for (id, user_id, name, firstname, course, matriculation_number, mail, google_id, create_time) \
                    in tuples:
                student = Student()
                student.set_id(id)
                student.set_user_id(user_id)
                student.set_name(name)
                student.set_firstname(firstname)
                student.set_course(course)
                student.set_matriculation_number(matriculation_number)
                student.set_mail(mail)
                student.set_google_id(google_id)
                student.set_create_time(create_time)
                result.append(student)
                result = student

        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_user_id(self, user_id):
        """Suchen eines Studenten anhand der User_ID."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM student WHERE user_id like '{}'".format(user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, user_id, name, firstname, course, matriculation_number, mail, google_id, create_time) \
                in tuples:
            student = Student()
            student.set_id(id)
            student.set_user_id(user_id)
            student.set_name(name)
            student.set_firstname(firstname)
            student.set_course(course)
            student.set_matriculation_number(matriculation_number)
            student.set_mail(mail)
            student.set_google_id(google_id)
            student.set_create_time(create_time)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """Suchen eines Studenten anhand des Nachnamen."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM student WHERE name like '{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, user_id, name, firstname, course, matriculation_number, mail, google_id, create_time) \
                in tuples:
            student = Student()
            student.set_id(id)
            student.set_user_id(user_id)
            student.set_name(name)
            student.set_firstname(firstname)
            student.set_course(course)
            student.set_matriculation_number(matriculation_number)
            student.set_mail(mail)
            student.set_google_id(google_id)
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

        for (id, user_id, name, firstname, course, matriculation_number, mail, google_id, create_time) \
                in tuples:
            student = Student()
            student.set_id(id)
            student.set_user_id(user_id)
            student.set_name(name)
            student.set_firstname(firstname)
            student.set_course(course)
            student.set_matriculation_number(matriculation_number)
            student.set_mail(mail)
            student.set_google_id(google_id)
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

        for (id, user_id, name, firstname, course, matriculation_number, mail, google_id, create_time) \
                in tuples:
            student = Student()
            student.set_id(id)
            student.set_user_id(user_id)
            student.set_name(name)
            student.set_firstname(firstname)
            student.set_course(course)
            student.set_matriculation_number(matriculation_number)
            student.set_mail(mail)
            student.set_google_id(google_id)
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

        for (id, user_id, name, firstname, course, matriculation_number, mail, google_id, create_time) \
                in tuples:
            student = Student()
            student.set_id(id)
            student.set_user_id(user_id)
            student.set_name(name)
            student.set_firstname(firstname)
            student.set_course(course)
            student.set_matriculation_number(matriculation_number)
            student.set_mail(mail)
            student.set_google_id(google_id)
            student.set_create_time(create_time)
            result.append(student)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_google_id(self, course):
        """Suchen eines Studenten anhand seiner Google_ID."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM student WHERE google_id like '{}'".format(course)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, user_id, name, firstname, course, matriculation_number, mail, google_id, create_time) \
                in tuples:
            student = Student()
            student.set_id(id)
            student.set_user_id(user_id)
            student.set_name(name)
            student.set_firstname(firstname)
            student.set_course(course)
            student.set_matriculation_number(matriculation_number)
            student.set_mail(mail)
            student.set_google_id(google_id)
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

        command = "INSERT INTO student (id, user_id, name, firstname, course, matriculation_number, mail, " \
                  "google_id, student_create_time)" \
                "VALUES ('{}','{}','{}','{}','{}','{}','{}','{}','{}')" \
            .format(student.get_id(), student.get_user_id(), student.get_name(), student.get_firstname(), student.get_course(),
                    student.get_matriculation_number(),
                    student.get_mail(), student.get_google_id(), student.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, student):
        """Wiederholtes Schreiben eines Objekts in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE student SET user_id = ('{}'), name = ('{}'), firstname = ('{}'), course = ('{}')," \
                "matriculation_number = ('{}')," \
                "mail = ('{}'), google_id = ('{}'), student_create_time = ('{}')" \
                "WHERE id = ('{}')"\
            .format(student.get_user_id(), student.get_name(), student.get_firstname(), student.get_course(),
                    student.get_matriculation_number(), student.get_mail(), student.get_google_id(),
                    student.get_create_time(), student.get_id())
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

"""
if __name__ == "__main__":
    with StudentMapper() as mapper:
        p = mapper.find_by_key(1).get_name()
        print(p)

if __name__ == "__main__":
    s = Student()
    s.set_user_id(2)
    s.set_name("Ün")
    s.set_firstname("Rahel")
    s.set_course("WI7")
    s.set_matriculation_number("36576")
    s.set_mail("rü004@hdm-stuttgart.de")
    s.set_google_id("rahel.Ün@google.com")
    s.set_create_time("2020-12-22")
    with StudentMapper() as mapper:
        mapper.insert(s)

if __name__ == "__main__":
    with StudentMapper() as mapper:
        p = mapper.find_by_key(4)
        mapper.delete(p)

if __name__ == "__main__":
    with StudentMapper() as mapper:
        student = mapper.find_by_key(1)
        student.set_matriculation_number(37534)
        mapper.update(student)

if __name__ == "__main__":
    with StudentMapper() as mapper:
        s = mapper.find_all()
        for i in s:
            print(i.get_name())
"""