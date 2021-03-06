from server.bo.Module import Module
from server.db.Mapper import Mapper


class ModuleMapper (Mapper):
    """Mapper-Klasse, die Modul-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Module."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM module"
        cursor.execute(command)
        tuples = cursor.fetchall()


        for (id, name, assignment_id, create_time) in tuples:
            module = Module()
            module.set_id(id)
            module.set_name(name)
            module.set_assignment_id(assignment_id)
            module.set_create_time(create_time)
            result.append(module)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        """Suchen eines Moduls mit vorgegebener ID-Nummer."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM module WHERE id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:

            for (id, name, assignment_id, create_time) in tuples:
                module = Module()
                module.set_id(id)
                module.set_name(name)
                module.set_assignment_id(assignment_id)
                module.set_create_time(create_time)
                result.append(module)
                result = module

        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """Suchen eines Moduls anhand desen Namen"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM module WHERE name like '{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, assignment_id, create_time) in tuples:
            module = Module()
            module.set_id(id)
            module.set_name(name)
            module.set_assignment_id(assignment_id)
            module.set_create_time(create_time)
            result.append(module)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_assignment_id(self, assignment_id):
        """Suchen eines Moduls anhand desen Assignment_id"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM module WHERE assignment_id like '{}'".format(assignment_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, assignment_id, create_time) in tuples:
            module = Module()
            module.set_id(id)
            module.set_name(name)
            module.set_assignment_id(assignment_id)
            module.set_create_time(create_time)
            result.append(module)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, module):
        """Einfügen eines Moduls in die Datenbank."""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as MaxID from module")
        tuples = cursor.fetchall()

        for (MaxID) in tuples:
            module.set_id(MaxID[0] + 1)

        command = "INSERT INTO module (id, name, assignment_id, create_time) VALUES ('{}','{}','{}','{}')" \
            .format(module.get_id(), module.get_name(), module.get_assignment_id(), module.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, module):
        """Wiederholtes Schreiben eines Moduls in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE module SET name = ('{}'), assignment_id = ('{}'), create_time = ('{}')" "WHERE id = ('{}')"\
                    .format(module.get_name(), module.get_assignment_id(), module.get_create_time(), module.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, module):
        """Löschen eines Modul-Objektes aus der Datenbank."""

        cursor = self._cnx.cursor()

        command = "DELETE FROM module WHERE id={}".format(module.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""
"""
#find_by_all:
if __name__ == "__main__":
    with ModuleMapper() as mapper:
        result = mapper.find_all()
        for module in result:
            print(module.get_name())

#find_by_key
if __name__ == "__main__":
   with ModuleMapper() as mapper:
       m = mapper.find_by_key(10).get_name()
       print(m)

#find_by_name
if __name__ == "__main__":
   with ModuleMapper() as mapper:
       m = mapper.find_by_name("338005")
       for i in m:
           print(i.get_id())

#find_by_assignment_id
if __name__ == "__main__":
   with ModuleMapper() as mapper:
       m = mapper.find_by_assignment_id("1")
       for i in m:
           print(i.get_id())

#insert
if __name__ == "__main__":
   m = Module()
   m.set_name("338047")
   m.set_assignment_id("11")
   with ModuleMapper() as mapper:
       mapper.insert(m)

#update
if __name__ == "__main__":
   with ModuleMapper() as mapper:
       module = mapper.find_by_key(41)
       module.set_name("338045")
       mapper.update(module)


#delete
if __name__ == "__main__":
   with ModuleMapper() as mapper:
       test = mapper.find_by_key(43)
       mapper.delete(test)

"""
