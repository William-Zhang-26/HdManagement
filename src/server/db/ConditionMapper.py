from src.server.bo.Condition import Condition
from src.server.db.Mapper import Mapper


class ConditionMapper (Mapper):
    """Mapper-Klasse, die Zustands-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Zustände.

        :return Eine Sammlung mit Zustands-Objekten, die sämtliche Zustände
                repräsentieren.
        """
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM condition"
        cursor.execute(command)
        tuples = cursor.fetchall()


        for (id, name, create_time ) in tuples:
            condition = Condition()
            condition.set_id(id)
            condition.set_name(name)
            condition.set_create_time(create_time)
            result.append(condition)


        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        """Suche eines Zustandes mit vorgegebener ID-Nummer. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param id Primärschlüsselattribut (->DB)
        :return Zustand-Objekt, das dem übergebenen Schlüssel entspricht, None bei
            nicht vorhandenem DB-Tupel.
        """

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM condition WHERE id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:

            for (id, name, create_time) in tuples:
                condition = Condition()
                condition.set_id(id)
                condition.set_name(name)
                condition.set_create_time(create_time)
                result.append(condition)

            result = condition

        else:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM condition WHERE name like '{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, create_time) in tuples:
            condition = Condition()
            condition.set_id(id)
            condition.set_name(name)
            condition.set_create_time(create_time)
            result.append(condition)

        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, condition):
        """Einen neuen Zustand in die Datenbank hinzufügen."""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as MaxID from condition")
        tuples = cursor.fetchall()

        for (MaxID) in tuples:
            condition.set_id(MaxID[0] + 1)

        command = "INSERT INTO condition (id, name, create_time) VALUES ('{}','{}','{}')" \
            .format(condition.get_id(), condition.get_name(), condition.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, condition):
        """Wiederholtes Schreiben eines Objekts in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE condition SET name = ('{}'), create_time = ('{}')" "WHERE id = ('{}')"\
                    .format(condition.get_id(), condition.get_name(), condition.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self,condition):
        """Löschen eines Zustand-Objekts aus der Datenbank."""

        cursor = self._cnx.cursor()

        command = "DELETE FROM condition WHERE id={}".format(condition.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

"""Zu Testzwecken können wir diese Datei bei Bedarf auch ausführen, 
um die grundsätzliche Funktion zu überprüfen.

Anmerkung: Nicht professionell aber hilfreich..."""


if __name__ == "__main__":
    with ConditionMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p.get_name())

"""
if __name__ == "__main__":
   with Project_typeMapper() as mapper:
       p = mapper.find_by_key(6).get_name()
       print(p)
"""
"""
if __name__ == "__main__":
   with Project_typeMapper() as mapper:
       p = mapper.find_by_name("Fachspezifisches")
       for i in p:
           print(i.get_id())
"""
"""
if __name__ == "__main__":
   p = Project_type()
   p.set_id(7)
   p.set_name("Fachspezifisches")
   p.set_ects(5)
   p.set_sws(3)
   p.set_create_time("2020-12-03 20:54:00")
   with Project_typeMapper() as mapper:
       mapper.insert(p)
"""
"""
if __name__ == "__main__":
   with Project_typeMapper() as mapper:
       project_type = mapper.find_by_key(2)
       project_type.set_sws(15)
       mapper.update(project_type)
"""

"""
if __name__ == "__main__":
   with Project_typeMapper() as mapper:
       test = mapper.find_by_key(3)
       mapper.delete(test)
"""
