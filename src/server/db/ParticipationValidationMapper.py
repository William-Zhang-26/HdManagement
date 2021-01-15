from src.server.bo.Participation import Participation
from src.server.bo.Validation import Validation
from src.server.db.Mapper import Mapper

class ParticipationValidationMapper (Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen der ganzen Tabelle"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM participation INNER JOIN validation " \
                  "ON participation.validation_id = validation.validation_id"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, module_id, project_id, student_id, validation_id, status, create_time, v_id, grade, c_time) in tuples:

            participation = Participation()
            participation.set_id(id)
            participation.set_module_id(module_id)
            participation.set_project_id(project_id)
            participation.set_student_id(student_id)
            participation.set_validation_id(validation_id)
            participation.set_status(status)
            participation.set_create_time(create_time)

            validation = Validation()
            validation.set_id(v_id)
            validation.set_grade(grade)
            validation.set_create_time(c_time)

            result.append(participation and validation)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        """Per Key ausgeben"""
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM participation INNER JOIN validation " \
                  "ON participation.validation_id = validation.validation_id WHERE id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, module_id, project_id, student_id, validation_id, status, create_time, v_id, grade, c_time) in tuples:
            participation = Participation()
            participation.set_id(id)
            participation.set_module_id(module_id)
            participation.set_project_id(project_id)
            participation.set_student_id(student_id)
            participation.set_validation_id(validation_id)
            participation.set_status(status)
            participation.set_create_time(create_time)

            validation = Validation()
            validation.set_id(v_id)
            validation.set_grade(grade)
            validation.set_create_time(c_time)

            result.append(participation and validation)
            result = participation and validation

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
    with ParticipationValidationMapper() as mapper:
        u = mapper.find_all()
        for i in u:
            print(i.get_create_time())
"""
if __name__ == "__main__":
    with ParticipationValidationMapper() as mapper:
        u = mapper.find_by_key(2).get_grade()
        print(u)