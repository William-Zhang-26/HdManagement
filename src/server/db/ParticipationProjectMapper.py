from src.server.bo.Participation import Participation
from src.server.bo.Project import Project
from src.server.db.Mapper import Mapper

class ParticipationProjectMapper (Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen der ganzen Tabelle"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM participation INNER JOIN project " \
                  "ON participation.project_id = project.project_id"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, module_id, project_id, student_id, validation_id, status, create_time,
             p_id, name, lecturer_id, project_type_id, state_id, project_description, partners, capacity,
             preferred_room, b_days_pre_schedule, b_days_finale, b_days_saturdays, preferred_b_days,
             additional_lecturer, weekly, p_create_time) in tuples:

            participation = Participation()
            participation.set_id(id)
            participation.set_module_id(module_id)
            participation.set_project_id(project_id)
            participation.set_student_id(student_id)
            participation.set_validation_id(validation_id)
            participation.set_status(status)
            participation.set_create_time(create_time)

            project = Project()
            project.set_id(p_id)
            project.set_name(name)
            project.set_user_id(lecturer_id)
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
            project.set_create_time(p_create_time)

            result.append(participation and project)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        """Per Key ausgeben"""
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM participation INNER JOIN project " \
                  "ON participation.project_id = project.project_id " \
                  "WHERE id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, module_id, project_id, student_id, validation_id, status, create_time,
             p_id, name, lecturer_id, project_type_id, state_id, project_description, partners, capacity,
             preferred_room, b_days_pre_schedule, b_days_finale, b_days_saturdays, preferred_b_days,
             additional_lecturer, weekly, p_create_time) in tuples:
            participation = Participation()
            participation.set_id(id)
            participation.set_module_id(module_id)
            participation.set_project_id(project_id)
            participation.set_student_id(student_id)
            participation.set_validation_id(validation_id)
            participation.set_status(status)
            participation.set_create_time(create_time)

            project = Project()
            project.set_id(p_id)
            project.set_name(name)
            project.set_user_id(lecturer_id)
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
            project.set_create_time(p_create_time)

            result.append(participation and project)
            result = participation and project

        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, participationvalidation):
        pass

    def update(self, participationvalidation):
        pass

    def delete(self, participationvalidation):
        pass

"""
if __name__ == "__main__":
    with ParticipationProjectMapper() as mapper:
        u = mapper.find_all()
        for i in u:
            print(i.get_project_description())
"""
if __name__ == "__main__":
    with ParticipationProjectMapper() as mapper:
        u = mapper.find_by_key(10).get_project_description()
        print(u)
