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


        for (id, name, edv_number, create_time) in tuples:
            module = Module()
            module.set_id(id)
            module.set_name(name)
            module.set_edv_number(edv_number)
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

            for (id, name, edv_number, create_time) in tuples:
                module = Module()
                module.set_id(id)
                module.set_name(name)
                module.set_edv_number(edv_number)
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

        for (id, name, edv_number, create_time) in tuples:
            module = Module()
            module.set_id(id)
            module.set_name(name)
            module.set_edv_number(edv_number)
            module.set_create_time(create_time)
            result.append(module)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_edv_number(self, edv_number):
        """Suchen eines Moduls anhand desen Namen"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM module WHERE edv_number like '{}'".format(edv_number)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, edv_number, create_time) in tuples:
            module = Module()
            module.set_id(id)
            module.set_name(name)
            module.set_edv_number(edv_number)
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

        command = "INSERT INTO module (id, name, edv_number, create_time) VALUES ('{}','{}','{}','{}')" \
            .format(module.get_id(), module.get_name(), module.get_edv_number(), module.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, module):
        """Wiederholtes Schreiben eines Moduls in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE module SET name = ('{}'), edv_number = ('{}'), create_time = ('{}')" "WHERE id = ('{}')"\
                    .format(module.get_name(), module.get_edv_number(), module.get_create_time(), module.get_id())
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
       m = mapper.find_by_key(2).get_name()
       print(m)

#find_by_name
if __name__ == "__main__":
   with ModuleMapper() as mapper:
       m = mapper.find_by_name("Informationstechnologie")
       for i in m:
           print(i.get_id())

#find_by_edv_number
if __name__ == "__main__":
   with ModuleMapper() as mapper:
       m = mapper.find_by_edv_number("338015")
       for i in m:
           print(i.get_id())

#insert
if __name__ == "__main__":
   m = Module()
   m.set_name("Management")
   m.set_edv_number("338006")
   with ModuleMapper() as mapper:
       mapper.insert(m)


#update
if __name__ == "__main__":
   with ModuleMapper() as mapper:
       module = mapper.find_by_key(2)
       module.set_name("Management")
       mapper.update(module)


#delete
if __name__ == "__main__":
   with ModuleMapper() as mapper:
       test = mapper.find_by_key(4)
       mapper.delete(test)
"""

