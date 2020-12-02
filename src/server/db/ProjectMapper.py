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

        for (id, name, partner, capacity, roomnumber, block_day, project_categorie, supervisor,
             weekly) in tuples:
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_partner(partner)
            project.set_capacity(capacity)
            project.set_roomnumber(roomnumber)
            project.set_block_day(block_day)
            project.set_project_categorie(project_categorie)
            project.set_supervisor(supervisor)
            project.set_weekly(weekly)
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

            for (id, name, partner, capacity, roomnumber, block_day, project_categorie, supervisor,
                 weekly) in tuples:
                project = Project()
                project.set_id(id)
                project.set_name(name)
                project.set_partner(partner)
                project.set_capacity(capacity)
                project.set_roomnumber(roomnumber)
                project.set_block_day(block_day)
                project.set_project_categorie(project_categorie)
                project.set_supervisor(supervisor)
                project.set_weekly(weekly)
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

        for (id, name, partner, capacity, roomnumber, block_day, project_categorie, supervisor,
             weekly) in tuples:
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_partner(partner)
            project.set_capacity(capacity)
            project.set_roomnumber(roomnumber)
            project.set_block_day(block_day)
            project.set_project_categorie(project_categorie)
            project.set_supervisor(supervisor)
            project.set_weekly(weekly)
            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result
###
    def find_by_roomnumber(self, roomnumber):
        """Suchen eines User anhand der User_ID des Users."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM project WHERE roomnumber like '{}'".format(roomnumber)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, partner, capacity, roomnumber, block_day, project_categorie, supervisor,
             weekly) in tuples:
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_partner(partner)
            project.set_capacity(capacity)
            project.set_roomnumber(roomnumber)
            project.set_block_day(block_day)
            project.set_project_categorie(project_categorie)
            project.set_supervisor(supervisor)
            project.set_weekly(weekly)
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

        command = "INSERT INTO project (id, name, partner, capacity, roomnumber, block_day, " \
                  "project_categorie, supervisor, weekly) VALUES ('{}','{}','{}','{}','{}','{}','{}','{}','{}')" \
            .format(project.get_id(), project.get_name(), project.get_partner(), project.get_capacity(), project.get_roomnumber(),
                    project.get_block_day(), project.get_project_categorie(),
                    project.get_supervisor(), project.get_weekly())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, project):
        """Wiederholtes Schreiben eines Objekts in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE project SET name = ('{}'), partner = ('{}'), roomnumber = ('{}'), block_day = ('{}')," \
                  "project_categorie = ('{}'), supervisor = ('{}'), weekly = ('{}')" "WHERE id = ('{}')" \
            .format(project.get_name(), project.get_partner(), project.get_roomnumber(),
                    project.get_block_day(), project.get_project_categorie(),
                    project.get_supervisor(), project.get_weekly(), project.get_id())
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
    with ProjectMapper() as mapper:
        result = mapper.find_all()
        for p in result:
            print(p.get_id())
