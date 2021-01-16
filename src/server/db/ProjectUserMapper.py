from src.server.bo.Project import Project
from src.server.bo.User import User
from src.server.db.Mapper import Mapper

class ProjectUserMapper (Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen der ganzen Tabelle"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM project INNER JOIN user " \
                  "ON project.user_id = user.user_id"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, user_id, project_type_id, state_id, project_description, partners, capacity,
             preferred_room, b_days_pre_schedule, b_days_finale, b_days_saturdays, preferred_b_days,
             additional_lecturer, weekly, create_time,
             s_id, name, firstname, mail, google_id, role_id, s_create_time) in tuples:

            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_user_id(user_id)
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

            user = User()
            user.set_id(s_id)
            user.set_name(name)
            user.set_firstname(firstname)
            user.set_mail(mail)
            user.set_google_id(google_id)
            user.set_role_id(role_id)
            user.set_create_time(s_create_time)

            result.append(project and user)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM project INNER JOIN user " \
                  "ON project.user_id = user.user_id " \
                  "WHERE project_id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, name, user_id, project_type_id, state_id, project_description, partners, capacity,
             preferred_room, b_days_pre_schedule, b_days_finale, b_days_saturdays, preferred_b_days,
             additional_lecturer, weekly, create_time,
             s_id, name, firstname, mail, google_id, role_id, s_create_time) in tuples:
            project = Project()
            project.set_id(id)
            project.set_name(name)
            project.set_user_id(user_id)
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

            user = User()
            user.set_id(s_id)
            user.set_name(name)
            user.set_firstname(firstname)
            user.set_mail(mail)
            user.set_google_id(google_id)
            user.set_role_id(role_id)
            user.set_create_time(s_create_time)

            result.append(project and user)
            result = project and user

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, projectuser):
        pass

    def update(self, projectuser):
        pass

    def delete(self, projectuser):
        pass

"""
if __name__ == "__main__":
    with ProjectUserMapper() as mapper:
        u = mapper.find_all()
        for i in u:
            print(i.get_firstname())
"""

if __name__ == "__main__":
    with ProjectUserMapper() as mapper:
        u = mapper.find_by_key(15).get_firstname()
        print(u)
