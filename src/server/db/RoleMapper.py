from server.bo.Role import Role
from server.db.Mapper import Mapper

class RoleMapper(Mapper):
    """Mapper-Klasse, die Rollen-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Rolle"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM role"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, create_time) in tuples:
            role = Role()
            role.set_id(id)
            role.set_name(name)
            role.set_create_time(create_time)
            result.append(role)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        """Suchen einer Rolle mit vorgegebener Rollen-ID"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM role WHERE id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:

            for (id, name, create_time) in tuples:
                role = Role()
                role.set_id(id)
                role.set_name(name)
                role.set_create_time(create_time)
                result.append(role)
                result = role

        else:

            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """Suchen einer Rolle anhand des Namens"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM role WHERE name like '{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, create_time) in tuples:
            role = Role()
            role.set_id(id)
            role.set_name(name)
            role.set_create_time(create_time)
            result.append(role)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, role):
        """Einfügen eines Rollen-Objektes in die Datenbank"""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as MaxID from role")
        tuples = cursor.fetchall()

        for (MaxID) in tuples:
            role.set_id(MaxID[0] + 1)

        command = "INSERT INTO role (id, name, create_time) VALUES ('{}','{}','{}')" \
            .format(role.get_id(), role.get_name(), role.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, role):
        """Wiederholtes Schreiben eines Objekts in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE role SET name = ('{}'), create_time = ('{}')" "WHERE id = ('{}')"\
            .format(role.get_name(), role.get_create_time(), role.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, role):
        """Löschen eines User-Objekts aus der Datenbank."""

        cursor = self._cnx.cursor()

        command = "DELETE FROM role WHERE id={}".format(role.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()
"""
if __name__ == "__main__":
    with RoleMapper() as mapper:
        result = mapper.find_all()
        for project in result:
            print(project.get_name())

if __name__ == "__main__":
    with RoleMapper() as mapper:
        role = mapper.find_by_key(3).get_create_time()
        print(role)

if __name__ == "__main__":
    with RoleMapper() as mapper:
        r = mapper.find_by_name("Dozent")
        for i in r:
            print(i.get_id())

if __name__ == "__main__":
    r = Role()
    r.set_name("Lost")
    r.set_create_time("2020-12.08")
    with RoleMapper() as mapper:
        mapper.insert(r)

if __name__ == "__main__":
    with RoleMapper() as mapper:
        role = mapper.find_by_key(4)
        role.set_name("Partner")
        mapper.update(role)

if __name__ == "__main__":
    with RoleMapper() as mapper:
        role = mapper.find_by_key(4)
        mapper.delete(role)
"""

