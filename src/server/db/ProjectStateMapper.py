from src.server.bo.Project import Project
from src.server.bo.State import State
from src.server.db.Mapper import Mapper

class ProjectStateMapper (Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen der ganzen Tabelle"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM project INNER JOIN state " \
                  "ON project.state_id = state.state_id"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, lecturer_id, project_type_id, state_id, project_description, partners, capacity,
             preferred_room, b_days_pre_schedule, b_days_finale, b_days_saturdays, preferred_b_days,
             additional_lecturer, weekly, create_time,
             s_id, name, s_create_time) in tuples:

            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_lecturer_id(lecturer_id)
            project.set_project_type_id(project_type_id)
            project.set_state_id(state_id)
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

            state = State()
            state.set_id(s_id)
            state.set_name(name)
            state.set_create_time(s_create_time)

            result.append(project and state)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM project INNER JOIN state " \
                  "ON project.state_id = state.state_id " \
                  "WHERE project_id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, user_id, project_type_id, state_id, project_description, partners, capacity,
             preferred_room, b_days_pre_schedule, b_days_finale, b_days_saturdays, preferred_b_days,
             additional_lecturer, weekly, create_time,
             s_id, name, s_create_time) in tuples:
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_lecturer_id(user_id)
            project.set_project_type_id(project_type_id)
            project.set_state_id(state_id)
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

            state = State()
            state.set_id(s_id)
            state.set_name(name)
            state.set_create_time(s_create_time)

            result.append(project and state)
            result = project and state

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, projectstate):
        pass

    def update(self, projectstate):
        pass

    def delete(self, projectstate):
        pass
"""

if __name__ == "__main__":
    with ProjectStateMapper() as mapper:
        u = mapper.find_all()
        for i in u:
            print(i.get_name())
"""

if __name__ == "__main__":
    with ProjectStateMapper() as mapper:
        u = mapper.find_by_key(5).get_name()
        print(u)
