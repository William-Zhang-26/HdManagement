from src.server.bo.User import User
from src.server.db.Mapper import Mapper

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

        for (id, lastname, firstname, mail, name, create_time) in tuples:
            user = User()
            user.set_id(id)
            user.set_lastname(lastname)
            user.set_firstname(firstname)
            user.set_mail(mail)
            user.set_name(name)
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

            for (id, lastname, firstname, mail, name, create_time) in tuples:
                user = User()
                user.set_id(id)
                user.set_lastname(lastname)
                user.set_firstname(firstname)
                user.set_mail(mail)
                user.set_name(name)
                user.set_create_time(create_time)
                result = user

        else:

            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_lastname(self, lastname):
        """Suchen eines Users anhand des Nachnamen."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM user WHERE lastname like '{}'".format(lastname)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, lastname, firstname, course, mail, name, create_time) in tuples:
            user = User()
            user.set_id(id)
            user.set_lastname(lastname)
            user.set_firstname(firstname)
            user.set_mail(mail)
            user.set_name(name)
            user.set_create_time(create_time)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_firstname(self, firstname):
        """Suchen eines Users anhand des Namen."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM user WHERE name like '{}'".format(firstname)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, lastname, firstname, mail, name, create_time) in tuples:
            user = User()
            user.set_id(id)
            user.set_lastname(lastname)
            user.set_firstname(firstname)
            user.set_mail(mail)
            user.set_name(name)
            user.set_create_time(create_time)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result

    """
    Platzhalter für 
    def find_by_name(self, name):
    Suchen eines Users anhand seiner Rollenbezeichnung
            result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM user WHERE name like '{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, lastname, name, course, mail, create_time) in tuples:
            user = User()
            user.set_id(id)
            user.set_lastname(lastname)
            user.set_firstname(name)
            user.set_mail(mail)
            user.set_name(name)
            user.set_create_time(create_time)
            result.append(user)

        self._cnx.commit()
        cursor.close()

        return result
    """

    def insert(self, user):
        """Einfügen eines User-Objekts in die Datenbank."""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as MaxID from user")
        tuples = cursor.fetchall()

        for (MaxID) in tuples:
            user.set_id(MaxID[0] + 1)

        command = "INSERT INTO user (id, lastname, firstname, mail, name, create_time) VALUES ('{}','{}','{}','{}','{}','{}')" \
            .format(user.get_id(), user.get_lastname(), user.get_firstname(),
                    user.get_mail(), user.get_name(), user.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, user):
        """Wiederholtes Schreiben eines Objekts in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE user SET lastname = ('{}'), firstname = ('{}'), mail = ('{}'),"\
                  "name = ('{}'), create_time = ('{}')" "WHERE id = ('{}')"\
            .format(user.get_lastname(), user.get_firstname(), user.get_mail(),
                    user.get_name(), user.get_id(), user.get_create_time())
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

    """Platzhalter für spätere Tests"""
"""    
if __name__ == "__main__":
    with UserMapper() as mapper:
        user = mapper.find_by_key(2).get_create_time()
        print(user)

if __name__ == "__main__":
    u = User()
    u.set_lastname("Ulmer")
    u.set_firstname("Lukas")
    u.set_mail("LukasOrlando@hdm-stuttgart.de")
    u.set_name("student")
    u.set_create_time("2020.12.03")
    with UserMapper() as mapper:
        mapper.insert(u)

if __name__ == "__main__":
    with UserMapper() as mapper:
        user = mapper.find_by_key(4)
        user.set_lastname("Ün")
        user.set_firstname("Rahel")
        user.set_mail("RahelÜn@gmx.de")
        user.set_create_time("2020.12.05")
        mapper.insert(user)
        
if __name__ == "__main__":
    with UserMapper() as mapper:
        i = mapper.find_by_key(3)
        mapper.delete(i)
"""