from src.server.bo.Participation import Participation
from src.server.bo.Module import Module
from src.server.db.Mapper import Mapper

class ParticipationModuleMapper (Mapper):
    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen der ganzen Tabelle"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM participation LEFT OUTER JOIN module USING (module_id)"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, module_id, project_id, student_id, validation_id, status, create_time,
             name, edv_number, module_create_time) in tuples:

            participation = Participation()
            participation.set_id(id)
            participation.set_module_id(module_id)
            participation.set_project_id(project_id)
            participation.set_student_id(student_id)
            participation.set_validation_id(validation_id)
            participation.set_status(status)
            participation.set_create_time(create_time)

            module = Module()
            module.set_name(name)
            module.set_edv_number(edv_number)
            module.set_create_time(module_create_time)
            result.append(module)

            result.append(participation and module)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        """Per key ausgeben"""
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM participation LEFT OUTER JOIN module USING (module_id) WHERE id like '{}'".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, module_id, project_id, student_id, validation_id, status, create_time,
             name, edv_number, module_create_time) in tuples:
            participation = Participation()
            participation.set_id(id)
            participation.set_module_id(module_id)
            participation.set_project_id(project_id)
            participation.set_student_id(student_id)
            participation.set_validation_id(validation_id)
            participation.set_status(status)
            participation.set_create_time(create_time)

            module = Module()
            module.set_name(name)
            module.set_edv_number(edv_number)
            module.set_create_time(module_create_time)
            result.append(module)

            result.append(participation and module)
            result = participation and module

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, participationmodule):
        pass

    def update(self, participationmodule):
        pass

    def delete(self, participationmodule):
        pass

"""
if __name__ == "__main__":
    with ParticipationModuleMapper() as mapper:
        u = mapper.find_by_key(1).get_edv_number()
        print(u)
"""
if __name__ == "__main__":
    with ParticipationModuleMapper() as mapper:
        u = mapper.find_all()
        for i in u:
            print(i.get_edv_number())