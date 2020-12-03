from src.server.bo.Project import Project
from src.server.db.Mapper import Mapper


class ProjectMapper(Mapper):
    """Mapper-Klasse, die Anwender-Objekte auf eine relationale
    Datenbank abbildet. Hierzu wird eine Reihe von Methoden zur Verfügung
    gestellt, mit deren Hilfe z.B. Objekte gesucht, erzeugt, modifiziert und
    gelöscht werden können. Das Mapping ist bidirektional. D.h., Objekte können
    in DB-Strukturen und DB-Strukturen in Objekte umgewandelt werden.
    """

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen aller Projekte"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM project"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, partners, capacity, preferred_room, block_day, project_category, supervisor,
             weekly, create_time) in tuples:
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_partners(partners)
            project.set_capacity(capacity)
            project.set_preferred_room(preferred_room)
            project.set_block_day(block_day)
            project.set_project_category(project_category)
            project.set_supervisor(supervisor)
            project.set_weekly(weekly)
            project.set_create_time(create_time)
            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        """Suchen eines Projektes mit vorgegebener user ID"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM project WHERE id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        if len(tuples) != 0:

            for (id, name, partners, capacity, preferred_room, block_day, project_category, supervisor,
                 weekly, create_time) in tuples:
                project = Project()
                project.set_id(id)
                project.set_name(name)
                project.set_partners(partners)
                project.set_capacity(capacity)
                project.set_preferred_room(preferred_room)
                project.set_block_day(block_day)
                project.set_project_category(project_category)
                project.set_supervisor(supervisor)
                project.set_weekly(weekly)
                project.set_create_time(create_time)
                result.append(project)
                result = project

        else:

            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """Suchen eines Projektes anhand des Namens des Projektes."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM project WHERE name like '{}'".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, partners, capacity, preferred_room, block_day, project_category, supervisor,
             weekly, create_time) in tuples:
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_partners(partners)
            project.set_capacity(capacity)
            project.set_preferred_room(preferred_room)
            project.set_block_day(block_day)
            project.set_project_category(project_category)
            project.set_supervisor(supervisor)
            project.set_weekly(weekly)
            project.set_create_time(create_time)
            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result
###
    def find_by_preferred_room(self, preferred_room):
        """Suchen eines User anhand der User_ID des Users."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM project WHERE preferred_room like '{}'".format(preferred_room)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, partners, capacity, preferred_room, block_day, project_category, supervisor,
             weekly, create_time) in tuples:
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_partners(partners)
            project.set_capacity(capacity)
            project.set_preferred_room(preferred_room)
            project.set_block_day(block_day)
            project.set_project_category(project_category)
            project.set_supervisor(supervisor)
            project.set_weekly(weekly)
            project.set_create_time(create_time)
            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, project):
        """Einfügen eines Projekt-Objekts in die Datenbank."""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) as MaxID from project")
        tuples = cursor.fetchall()

        for (MaxID) in tuples:
            project.set_id(MaxID[0] + 1)

        command = "INSERT INTO project (id, name, partners, capacity, preferred_room, block_day, " \
                  "project_category, supervisor, weekly, create_time)" \
                  "VALUES ('{}','{}','{}','{}','{}','{}','{}','{}','{}','{}')" \
            .format(project.get_id(), project.get_name(), project.get_partners(), project.get_capacity(),
                    project.get_preferred_room(),
                    project.get_block_day(), project.get_project_category(),
                    project.get_supervisor(), project.get_weekly(), project.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, project):
        """Wiederholtes Schreiben eines Objekts in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE project SET name = ('{}'), partners = ('{}'), preferred_room = ('{}'), block_day = ('{}')," \
                  "project_category = ('{}'), supervisor = ('{}'), weekly = ('{}'), create_time = ('{}')" \
                  "WHERE id = ('{}')" \
            .format(project.get_name(), project.get_partners(), project.get_preferred_room(),
                    project.get_block_day(), project.get_project_category(),
                    project.get_supervisor(), project.get_weekly(), project.get_create_time(), project.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def delete(self, project):
        """Löschen eines Projekt-Objekts aus der Datenbank."""

        cursor = self._cnx.cursor()

        command = "DELETE FROM project WHERE id={}".format(project.get_id())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()


"""Testzwecke um uns die Daten anzeigen zu lassen"""

if __name__ == "__main__":
    p = Project()
    p.set_name("IT-Projekt")
    p.set_partners("Capgemini")
    p.set_capacity(20)
    p.set_preferred_room("s204")
    p.set_block_day("yes")
    p.set_project_category("IT")
    p.set_supervisor("Kunz")
    p.set_weekly("yes")
    p.set_create_time("2020-12-03")

    with ProjectMapper() as mapper:
        mapper.insert(p)
    """
    with ProjectMapper() as mapper:
        project = mapper.find_by_key(2)
        project.set_name("IT-Projekt")
   p = mapper.find_by_preferred_room("s305")
        for i in p:
            print(i.get_name())
    """
