from server.bo.User import User
from server.db.Mapper import Mapper

class UserMapper(Mapper):
    """Mapper-Klasse, die Anwender-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller User"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM user"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, firstname, mail, google_id, role_id, create_time) in tuples:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_firstname(firstname)
            user.set_mail(mail)
            user.set_google_id(google_id)
            user.set_role_id(role_id)
            user.set_create_time(create_time)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        """Suchen eines User mit vorgegebener ID"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM user WHERE id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:

            for (id, name, firstname, mail, google_id, role_id, create_time) in tuples:
                user = User()
                user.set_id(id)
                user.set_name(name)
                user.set_firstname(firstname)
                user.set_mail(mail)
                user.set_google_id(google_id)
                user.set_role_id(role_id)
                user.set_create_time(create_time)
                result.append(user)
                result = user

        else:

            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """Suchen eines Users anhand des Nachnamen."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM user WHERE name like '{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, firstname, mail, google_id, role_id, create_time) in tuples:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_firstname(firstname)
            user.set_mail(mail)
            user.set_google_id(google_id)
            user.set_role_id(role_id)
            user.set_create_time(create_time)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_firstname(self, firstname):
        """Suchen eines Users anhand des Namen."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM user WHERE firstname like '{}'".format(firstname)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, firstname, mail, google_id, role_id, create_time) in tuples:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_firstname(firstname)
            user.set_mail(mail)
            user.set_google_id(google_id)
            user.set_role_id(role_id)
            user.set_create_time(create_time)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_role_id(self, role_id):
        """Suchen eines Users anhand seiner Rollen-ID"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM user WHERE role_id like '{}'".format(role_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, firstname, mail, google_id, role_id, create_time) in tuples:
            user = User()
            user.set_id(id)
            user.set_name(name)
            user.set_firstname(firstname)
            user.set_mail(mail)
            user.set_google_id(google_id)
            user.set_role_id(role_id)
            user.set_create_time(create_time)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_google_user_id(self, google_id):
        """Suchen eines Users anhand seiner Google-ID"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM user WHERE google_id like '{}'".format(google_id)
        cursor.execute(command)
        tuples = cursor.fetchall()


        if len(tuples) != 0:

            for (id, name, firstname, mail, google_id, role_id, create_time) in tuples:
                user = User()
                user.set_id(id)
                user.set_name(name)
                user.set_firstname(firstname)
                user.set_mail(mail)
                user.set_google_id(google_id)
                user.set_role_id(role_id)
                user.set_create_time(create_time)
                result.append(user)

        else:

            result = None


        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, user):
        """Einfügen eines User-Objekts in die Datenbank."""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as MaxID from user")
        tuples = cursor.fetchall()

        for (MaxID) in tuples:
            user.set_id(MaxID[0] + 1)

        command = "INSERT INTO user (id, name, firstname, mail, google_id, role_id, " \
                  "create_time) VALUES ('{}','{}','{}','{}','{}','{}','{}')" \
            .format(user.get_id(), user.get_name(), user.get_firstname(),
                    user.get_mail(), user.get_google_id(), user.get_role_id(), user.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, user):
        """Wiederholtes Schreiben eines Objekts in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE user SET name = ('{}'), firstname = ('{}'), mail = ('{}'), google_id = ('{}'),"\
                  "role_id = ('{}'), create_time = ('{}')" "WHERE id = ('{}')"\
            .format(user.get_name(), user.get_firstname(), user.get_mail(), user.get_google_id(),
                    user.get_role_id(), user.get_create_time(), user.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, user):
        """Löschen eines User-Objekts aus der Datenbank."""

        cursor = self._cnx.cursor()

        command = "DELETE FROM user WHERE id={}".format(user.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

"""
if __name__ == "__main__":
    with UserMapper() as mapper:
        u = mapper.find_all()
        for i in u:
            print(i.get_firstname())
"""
"""
if __name__ == "__main__":
    with UserMapper() as mapper:
        user = mapper.find_by_google_user_id("f")
        for i in user:
            print(i.get_name())
"""
"""
if __name__ == "__main__":
    u = User()
    u.set_name("Ulmer")
    u.set_firstname("Lukas")
    u.set_mail("lo045@hdm-stuttgart.de")
    u.set_google_id("lukasorlandoulmer@gmail.com")
    u.set_role_id(1)
    u.set_create_time("2020-12-22")
    with UserMapper() as mapper:
        mapper.insert(u)
"""
"""
if __name__ == "__main__":
    with UserMapper() as mapper:
        i = mapper.find_by_key(3)
        mapper.delete(i)
"""
"""
if __name__ == "__main__":
    with UserMapper() as mapper:
        user = mapper.find_by_key(3)
        user.set_name("Weinberger")
        mapper.update(user)
"""
"""
if __name__ == "__main__":
    with UserMapper() as mapper:
        user = mapper.find_by_role_id(1)
        for i in user:
            print(i.get_firstname())
"""