from src.server.bo.Participation import Participation
from src.server.bo.Student import Student
from src.server.db.Mapper import Mapper

class ParticipationStudentMapper (Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Auslesen der ganzen Tabelle"""

        result = []
        cursor = self._cnx.cursor()
        command = "SELECT * FROM participation LEFT OUTER JOIN student USING (student_id)"
        cursor.execute(command)
        tuples = cursor.fetchall()

        for (id, module_id, project_id, student_id, validation_id, status, create_time,
             name, firstname, course, matriculation_number, mail, google_id, student_create_time) in tuples:

            participation = Participation()
            participation.set_id(id)
            participation.set_module_id(module_id)
            participation.set_project_id(project_id)
            participation.set_student_id(student_id)
            participation.set_validation_id(validation_id)
            participation.set_status(status)
            participation.set_create_time(create_time)

            student = Student()
            student.set_name(name)
            student.set_firstname(firstname)
            student.set_course(course)
            student.set_matriculation_number(matriculation_number)
            student.set_mail(mail)
            student.set_google_id(google_id)
            student.set_create_time(student_create_time)

            result.append(participation and student)

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_key(self, id):
        pass

    def insert(self, participationstudent):
        pass

    def update(self, participationstudent):
        pass

    def delete(self, participationstudent):
        pass

if __name__ == "__main__":
    with ParticipationStudentMapper() as mapper:
        u = mapper.find_all()
        for i in u:
            print(i.get_name())