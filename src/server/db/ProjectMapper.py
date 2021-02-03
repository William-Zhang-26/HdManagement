from server.bo.Project import Project
from server.db.Mapper import Mapper


class ProjectMapper(Mapper):
    """Mapper-Klasse, die Projekt-Objekte auf eine relationale
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

        for (id, name, user_id, project_type_id, state_id, semester_id, assignment_id, project_description, partners, capacity, preferred_room, b_days_pre_schedule,
             b_days_finale, b_days_saturdays, preferred_b_days, additional_lecturer,
             weekly, create_time) in tuples:
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_user_id(user_id)
            project.set_project_type_id(project_type_id)
            project.set_state_id(state_id)
            project.set_semester_id(semester_id)
            project.set_assignment_id(assignment_id)
            project.set_project_description(project_description)
            project.set_partners(partners)
            project.set_capacity(capacity)
            project.set_preferred_room(preferred_room)
            project.set_b_days_pre_schedule(b_days_pre_schedule)
            project.set_b_days_finale(b_days_finale)
            project.set_b_days_saturdays(b_days_saturdays)
            project.set_preferred_b_days(preferred_b_days)
            project.set_additional_lecturer(additional_lecturer)
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

            for (id, name, user_id, project_type_id, state_id, semester_id, assignment_id, project_description, partners, capacity, preferred_room, b_days_pre_schedule,
                 b_days_finale, b_days_saturdays, preferred_b_days, additional_lecturer,
                 weekly, create_time) in tuples:
                project = Project()
                project.set_id(id)
                project.set_name(name)
                project.set_user_id(user_id)
                project.set_project_type_id(project_type_id)
                project.set_state_id(state_id)
                project.set_semester_id(semester_id)
                project.set_assignment_id(assignment_id)
                project.set_project_description(project_description)
                project.set_partners(partners)
                project.set_capacity(capacity)
                project.set_preferred_room(preferred_room)
                project.set_b_days_pre_schedule(b_days_pre_schedule)
                project.set_b_days_finale(b_days_finale)
                project.set_b_days_saturdays(b_days_saturdays)
                project.set_preferred_b_days(preferred_b_days)
                project.set_additional_lecturer(additional_lecturer)
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

        for (id, name, user_id, project_type_id, state_id, semester_id, assignment_id, project_description, partners, capacity, preferred_room, b_days_pre_schedule,
             b_days_finale, b_days_saturdays, preferred_b_days, additional_lecturer,
             weekly, create_time) in tuples:
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_user_id(user_id)
            project.set_project_type_id(project_type_id)
            project.set_state_id(state_id)
            project.set_semester_id(semester_id)
            project.set_assignment_id(assignment_id)
            project.set_project_description(project_description)
            project.set_partners(partners)
            project.set_capacity(capacity)
            project.set_preferred_room(preferred_room)
            project.set_b_days_pre_schedule(b_days_pre_schedule)
            project.set_b_days_finale(b_days_finale)
            project.set_b_days_saturdays(b_days_saturdays)
            project.set_preferred_b_days(preferred_b_days)
            project.set_additional_lecturer(additional_lecturer)
            project.set_weekly(weekly)
            project.set_create_time(create_time)
            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_preferred_room(self, preferred_room):
        """Suchen eines Projekt anhand des bevorzugten Raumes."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM project WHERE preferred_room like '{}'".format(preferred_room)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, user_id, project_type_id, state_id, semester_id, assignment_id, project_description, partners, capacity, preferred_room, b_days_pre_schedule,
             b_days_finale, b_days_saturdays, preferred_b_days, additional_lecturer,
             weekly, create_time) in tuples:
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_user_id(user_id)
            project.set_project_type_id(project_type_id)
            project.set_state_id(state_id)
            project.set_semester_id(semester_id)
            project.set_assignment_id(assignment_id)
            project.set_project_description(project_description)
            project.set_partners(partners)
            project.set_capacity(capacity)
            project.set_preferred_room(preferred_room)
            project.set_b_days_pre_schedule(b_days_pre_schedule)
            project.set_b_days_finale(b_days_finale)
            project.set_b_days_saturdays(b_days_saturdays)
            project.set_preferred_b_days(preferred_b_days)
            project.set_additional_lecturer(additional_lecturer)
            project.set_weekly(weekly)
            project.set_create_time(create_time)
            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_user_id(self, user_id):
        """Suchen eines Projekt anhand der User-ID."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM project WHERE user_id like '{}'".format(user_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, user_id, project_type_id, state_id, semester_id, assignment_id, project_description, partners, capacity, preferred_room, b_days_pre_schedule,
             b_days_finale, b_days_saturdays, preferred_b_days, additional_lecturer,
             weekly, create_time) in tuples:
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_user_id(user_id)
            project.set_project_type_id(project_type_id)
            project.set_state_id(state_id)
            project.set_semester_id(semester_id)
            project.set_assignment_id(assignment_id)
            project.set_project_description(project_description)
            project.set_partners(partners)
            project.set_capacity(capacity)
            project.set_preferred_room(preferred_room)
            project.set_b_days_pre_schedule(b_days_pre_schedule)
            project.set_b_days_finale(b_days_finale)
            project.set_b_days_saturdays(b_days_saturdays)
            project.set_preferred_b_days(preferred_b_days)
            project.set_additional_lecturer(additional_lecturer)
            project.set_weekly(weekly)
            project.set_create_time(create_time)
            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_project_type_id(self, project_type_id):
        """Suchen eines Projekt anhand der Projekttypen-ID."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM project WHERE project_type_id like '{}'".format(project_type_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, user_id, project_type_id, state_id, semester_id, assignment_id, project_description, partners, capacity, preferred_room, b_days_pre_schedule,
             b_days_finale, b_days_saturdays, preferred_b_days, additional_lecturer,
             weekly, create_time) in tuples:
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_user_id(user_id)
            project.set_project_type_id(project_type_id)
            project.set_state_id(state_id)
            project.set_semester_id(semester_id)
            project.set_assignment_id(assignment_id)
            project.set_project_description(project_description)
            project.set_partners(partners)
            project.set_capacity(capacity)
            project.set_preferred_room(preferred_room)
            project.set_b_days_pre_schedule(b_days_pre_schedule)
            project.set_b_days_finale(b_days_finale)
            project.set_b_days_saturdays(b_days_saturdays)
            project.set_preferred_b_days(preferred_b_days)
            project.set_additional_lecturer(additional_lecturer)
            project.set_weekly(weekly)
            project.set_create_time(create_time)
            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_state_id(self, state_id):
        """Suchen alle Projekte anhand der State-ID."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM project WHERE state_id like '{}'".format(state_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, user_id, project_type_id, state_id, semester_id, assignment_id, project_description, partners, capacity, preferred_room, b_days_pre_schedule,
             b_days_finale, b_days_saturdays, preferred_b_days, additional_lecturer,
             weekly, create_time) in tuples:
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_user_id(user_id)
            project.set_project_type_id(project_type_id)
            project.set_state_id(state_id)
            project.set_semester_id(semester_id)
            project.set_assignment_id(assignment_id)
            project.set_project_description(project_description)
            project.set_partners(partners)
            project.set_capacity(capacity)
            project.set_preferred_room(preferred_room)
            project.set_b_days_pre_schedule(b_days_pre_schedule)
            project.set_b_days_finale(b_days_finale)
            project.set_b_days_saturdays(b_days_saturdays)
            project.set_preferred_b_days(preferred_b_days)
            project.set_additional_lecturer(additional_lecturer)
            project.set_weekly(weekly)
            project.set_create_time(create_time)
            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_semester_id(self, semester_id):
        """Suchen alle Projekte anhand der Semester-ID."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM project WHERE semester_id like '{}'".format(semester_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, user_id, project_type_id, state_id, semester_id, assignment_id, project_description, partners, capacity, preferred_room, b_days_pre_schedule,
             b_days_finale, b_days_saturdays, preferred_b_days, additional_lecturer,
             weekly, create_time) in tuples:
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_user_id(user_id)
            project.set_project_type_id(project_type_id)
            project.set_state_id(state_id)
            project.set_semester_id(semester_id)
            project.set_assignment_id(assignment_id)
            project.set_project_description(project_description)
            project.set_partners(partners)
            project.set_capacity(capacity)
            project.set_preferred_room(preferred_room)
            project.set_b_days_pre_schedule(b_days_pre_schedule)
            project.set_b_days_finale(b_days_finale)
            project.set_b_days_saturdays(b_days_saturdays)
            project.set_preferred_b_days(preferred_b_days)
            project.set_additional_lecturer(additional_lecturer)
            project.set_weekly(weekly)
            project.set_create_time(create_time)
            result.append(project)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_assignment_id(self, assignment_id):
        """Suchen alle Projekte anhand der Assignment-ID."""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM project WHERE assignment_id like '{}'".format(assignment_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, user_id, project_type_id, state_id, semester_id, assignment_id, project_description, partners, capacity, preferred_room, b_days_pre_schedule,
             b_days_finale, b_days_saturdays, preferred_b_days, additional_lecturer,
             weekly, create_time) in tuples:
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_user_id(user_id)
            project.set_project_type_id(project_type_id)
            project.set_state_id(state_id)
            project.set_semester_id(semester_id)
            project.set_assignment_id(assignment_id)
            project.set_project_description(project_description)
            project.set_partners(partners)
            project.set_capacity(capacity)
            project.set_preferred_room(preferred_room)
            project.set_b_days_pre_schedule(b_days_pre_schedule)
            project.set_b_days_finale(b_days_finale)
            project.set_b_days_saturdays(b_days_saturdays)
            project.set_preferred_b_days(preferred_b_days)
            project.set_additional_lecturer(additional_lecturer)
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

        command = "INSERT INTO project (id, name, user_id, project_type_id, state_id, semester_id, assignment_id, project_description, partners, capacity, preferred_room, " \
                  "b_days_pre_schedule, b_days_finale, b_days_saturdays, preferred_b_days, " \
                  "additional_lecturer, " \
                  "weekly, create_time)" \
                  "VALUES ('{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}','{}', '{}')" \
            .format(project.get_id(), project.get_name(), project.get_user_id(), project.get_project_type_id(), project.get_state_id(),
                    project.get_assignment_id(),
                    project.get_semester_id(),
                    project.get_project_description(),
                    project.get_partners(), project.get_capacity(), project.get_preferred_room(),
                    project.get_b_days_pre_schedule(), project.get_b_days_finale(), project.get_b_days_saturdays(),
                    project.get_preferred_b_days(),
                    project.get_additional_lecturer(), project.get_weekly(),
                    project.get_create_time())
        cursor.execute(command)

        self._cnx.commit()
        cursor.close()

    def update(self, project):
        """Wiederholtes Schreiben eines Objekts in die Datenbank."""

        cursor = self._cnx.cursor()

        command = "UPDATE project SET name = ('{}'), user_id = ('{}'), project_type_id = ('{}'), state_id = ('{}'), semester_id = ('{}'), assignment_id = ('{}'), project_description = ('{}'), " \
                  "partners = ('{}'), capacity = ('{}'), preferred_room = ('{}'), b_days_pre_schedule = ('{}'), " \
                  "b_days_finale = ('{}'), b_days_saturdays = ('{}'), preferred_b_days = ('{}'), " \
                  "additional_lecturer = ('{}'), weekly = ('{}'), create_time = ('{}')" \
                  "WHERE id = ('{}')" \
            .format(project.get_name(), project.get_user_id(), project.get_project_type_id(), project.get_state_id(), project.get_semester_id(),
                    project.get_assignment_id(), project.get_project_description(), project.get_partners(), project.get_capacity(), project.get_preferred_room(),
                    project.get_b_days_pre_schedule(), project.get_b_days_finale(), project.get_b_days_saturdays(),
                    project.get_preferred_b_days(),
                    project.get_additional_lecturer(), project.get_weekly(),
                    project.get_create_time(), project.get_id())
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

"""
if __name__ == "__main__":
    with ProjectMapper() as mapper:
        test = mapper.find_by_key(5).get_name()
        print(test)

"""
"""
if __name__ == "__main__":
    with ProjectMapper() as mapper:
        p = mapper.find_all()
        for result in p:
            print(result.get_name())
"""
"""
if __name__ == "__main__":
    p = Project()
    p.set_name("Tolga Project")
    p.set_user_id(2)
    p.set_project_type_id(1)
    p.set_semester_id(1)
    p.set_project_description("5 Forces")
    p.set_partners("Stingel")
    p.set_capacity(40)
    p.set_preferred_room("s210")
    p.set_b_days_pre_schedule("yes")
    p.set_b_days_finale("yes")
    p.set_b_days_saturdays("yes")
    p.set_preferred_b_days("yes")
    p.set_additional_lecturer("Kunz")
    p.set_weekly(1)
    p.set_create_time("2020-12-23")
    with ProjectMapper() as mapper:
        mapper.insert(p)
"""
"""
if __name__ == "__main__":
    with ProjectMapper() as mapper:
        p = mapper.find_by_key(16)
        mapper.delete(p)
"""
"""
if __name__ == "__main__":
    with ProjectMapper() as mapper:
        p = mapper.find_by_key(15)
        p.set_user_id(2)
        p.set_project_type_id(2)
        mapper.update(p)
"""

"""
if __name__ == "__main__":
    with ProjectMapper() as mapper:
        p = mapper.find_by_name("tolga Projekt")
        for i in p:
            print(i.get_id())
"""
"""
if __name__ == "__main__":
    with ProjectMapper() as mapper:
        p = mapper.find_by_preferred_room("s210")
        for i in p:
            print(i.get_id())
"""
"""
if __name__ == "__main__":
    with ProjectMapper() as mapper:
        p = mapper.find_by_user_id(1)
        for i in p:
            print(i.get_name())
"""
"""
if __name__ == "__main__":
    with ProjectMapper() as mapper:
        t = mapper.find_by_project_type_id(2)
        for i in t:
            print(i.get_additional_lecturer())


if __name__ == "__main__":
    with ProjectMapper() as mapper:
        t = mapper.find_by_state_id(1)
        for i in t:
            print(i.get_name())


if __name__ == "__main__":
    with ProjectMapper() as mapper:
        t = mapper.find_by_semester_id(1)
        for i in t:
            print(i.get_name())
            

if __name__ == "__main__":
    with ProjectMapper() as mapper:
        t = mapper.find_by_assignment_id(1)
        for i in t:
            print(i.get_name())
"""