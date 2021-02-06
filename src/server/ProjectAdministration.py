from server.bo.Assignment import Assignment
from server.bo.State import State
from server.bo.Module import Module
from server.bo.Participation import Participation
from server.bo.Project import Project
from server.bo.Project_type import Project_type
from server.bo.Role import Role
from server.bo.Semester import Semester
from server.bo.Student import Student
from server.bo.User import User
from server.bo.Validation import Validation


from server.db.AssignmentMapper import AssignmentMapper
from server.db.StateMapper import StateMapper
from server.db.ModuleMapper import ModuleMapper
from server.db.ParticipationMapper import ParticipationMapper
from server.db.ProjectMapper import ProjectMapper
from server.db.Project_typeMapper import Project_typeMapper
from server.db.RoleMapper import RoleMapper
from server.db.SemesterMapper import SemesterMapper
from server.db.StudentMapper import StudentMapper
from server.db.UserMapper import UserMapper
from server.db.ValidationMapper import ValidationMapper


class ProjectAdministration (object):
    """Diese Klasse aggregiert nahezu sämtliche Applikationslogik (engl. Business Logic)."""

    def __init__(self):
        pass

#Assignment

    def create_assignment(self, name):
        """Zuteilung erstellen"""

        assignment = Assignment()
        assignment.set_name(name)
        assignment.set_id(1)

        with AssignmentMapper() as mapper:
            return mapper.insert(assignment)

    def get_all_assignment(self):
        """Alle Zuteilungen ausgeben"""
        with AssignmentMapper() as mapper:
            return mapper.find_all()

    def get_assignment_by_id(self, id):
        """Zuteilung per ID ausgeben"""
        with AssignmentMapper() as mapper:
            return mapper.find_by_key(id)

    def get_assignment_by_name(self, name):
        """Zuteilung per Name ausgeben lassen"""
        with AssignmentMapper() as mapper:
            return mapper.find_by_name(name)

    def save_assignment(self, assignment):
        """Zuteilung speichern"""
        with AssignmentMapper() as mapper:
            mapper.update(assignment)

    def delete_assignment(self, assignment):
        """Zuteilung aus der DB löschen"""
        with AssignmentMapper() as mapper:
            mapper.delete(assignment)

# Module

    def create_module(self, name, assignment_id):
        """Modul erstellen"""

        module = Module()
        module.set_name(name)
        module.set_assignment_id(assignment_id)
        module.set_id(1)

        with ModuleMapper() as mapper:
            return mapper.insert(module)

    def get_all_modules(self):
        """Alle Module ausgeben"""
        with ModuleMapper() as mapper:
            return mapper.find_all()

    def get_module_by_id(self, id):
        """Modul per ID ausgeben"""
        with ModuleMapper() as mapper:
            return mapper.find_by_key(id)

    def get_module_by_name(self, name):
        """Modul per Name ausgeben lassen"""
        with ModuleMapper() as mapper:
            return mapper.find_by_name(name)

    def get_module_by_assignment_id(self, assignment):
        """Das Modul mit dem gegebenen Assignment auslesen."""
        with ModuleMapper() as mapper:
            return mapper.find_by_assignment_id(assignment.get_id())

    def save_module(self, module):
        """Modul speichern"""
        with ModuleMapper() as mapper:
            mapper.update(module)

    def delete_module(self, module):
        """Modul aus der DB löschen"""
        with ModuleMapper() as mapper:
            mapper.delete(module)

# Validation
        
    def create_validation(self, grade):
        """Bewertung erstellen"""

        validation = Validation()
        validation.set_grade(grade)
        validation.set_id(1)

        with ValidationMapper() as mapper:
            return mapper.insert(validation)

    def get_all_validations(self):
        """Alle Bewertungen ausgeben"""
        with ValidationMapper() as mapper:
            return mapper.find_all()

    def get_validation_by_id(self, id):
        """Bewertung per ID ausgeben"""
        with ValidationMapper() as mapper:
            return mapper.find_by_key(id)

    def get_validation_by_grade(self, grade):
        """Bewertung per Note ausgeben lassen"""
        with ValidationMapper() as mapper:
            return mapper.find_by_grade(grade)

    def save_validation(self, validation):
        """Bewertung speichern"""
        with ValidationMapper() as mapper:
            mapper.update(validation)

    def delete_validation(self, validation):
        """Bewertung aus der DB löschen"""
        with ValidationMapper() as mapper:
            mapper.delete(validation)


# Participation

    def create_participation(self, module_id, project_id, student_id):
        """Teilnahme erstellen"""

        participation = Participation()
        participation.set_module_id(module_id)
        participation.set_project_id(project_id)
        participation.set_student_id(student_id)
        participation.set_id(1)

        with ParticipationMapper() as mapper:
            return mapper.insert(participation)

    def get_all_participations(self):
        """Alle Teilnahmen ausgeben"""
        with ParticipationMapper() as mapper:
            return mapper.find_all()

    def get_participation_by_id(self, id):
        """Teilnahme per ID ausgeben"""
        with ParticipationMapper() as mapper:
            return mapper.find_by_key(id)

    def get_participation_by_module_id(self, module_id):
        """Teilnahme mit gegebenen Module_ID ausgeben lassen"""
        with ParticipationMapper() as mapper:
            return mapper.find_by_module(module_id)

    def get_participation_by_project_id(self, project_id):
        """Teilnahme mit gegebenen Project_ID ausgeben lassen"""
        with ParticipationMapper() as mapper:
            return mapper.find_by_project(project_id)

    def get_participation_by_student_id(self, student_id):
        """Teilnahme mit gegebenen Student_ID ausgeben lassen"""
        with ParticipationMapper() as mapper:
            return mapper.find_by_student(student_id)

    def get_participation_by_validation_id(self, validation_id):
        """Teilnahme mit gegebenen Validation_ID ausgeben lassen"""
        with ParticipationMapper() as mapper:
            return mapper.find_by_validation(validation_id)

    def save_participation(self, participation):
        """Teilnahme speichern"""
        with ParticipationMapper() as mapper:
            mapper.update(participation)

    def delete_participation(self, participation):
        """Teilnahme aus der DB löschen"""
        with ParticipationMapper() as mapper:
            mapper.delete(participation)


# Status

    def create_state(self, name):
        """Einen Status anlegen"""
        state = State()
        state.set_name(name)
        state.set_id(1)

        with StateMapper() as mapper:
            return mapper.insert(state)

    def get_all_state(self):
        """Alle Statuse auslesen."""
        with StateMapper() as mapper:
            return mapper.find_all()

    def get_state_by_id(self, id):
        """Den Status mit der gegebenen ID auslesen."""
        with StateMapper() as mapper:
            return mapper.find_by_key(id)

    def get_state_by_name(self, name):
        """Den Status mit dem gegebenen Namen auslesen."""
        with StateMapper() as mapper:
            return mapper.find_by_name(name)

    def save_state(self, state):
        """Den gegebenen Status speichern."""
        with StateMapper() as mapper:
            mapper.update(state)

    def delete_state(self, state):
        """Den gegebenen Status aus unserem System löschen"""
        with StateMapper() as mapper:
            mapper.delete(state)

# State-spezifische Methoden

    def get_state_by_name_for_project(self, project):
        """Den Status mit dem gegebenen Namen auslesen."""
        with ProjectMapper() as mapper:
            return mapper.find_by_state_id_get_name(project.get_id())

# Project

    def create_project(self, name, user_id, project_type_id, semester_id, assignment_id, project_description, partners, capacity, preferred_room, b_days_pre_schedule,
             b_days_finale, b_days_saturdays, preferred_b_days, additional_lecturer,
             weekly):

        project = Project()
        project.set_name(name)
        project.set_user_id(user_id)
        project.set_project_type_id(project_type_id)
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
        project.set_id(1)

        with ProjectMapper() as mapper:
            return mapper.insert(project)

    def get_all_projects(self):
        with ProjectMapper() as mapper:
            return mapper.find_all()

    def get_project_by_id(self, id):
        with ProjectMapper() as mapper:
            return mapper.find_by_key(id)

    def get_project_by_user_id(self, user):
        with ProjectMapper() as mapper:
            return mapper.find_by_user_id(user.get_id())

    def get_project_by_project_type_id(self, project_type):
        with ProjectMapper() as mapper:
            return mapper.find_by_project_type_id(project_type.get_id())

    def get_project_by_state_id(self, state):
        with ProjectMapper() as mapper:
            return mapper.find_by_state_id(state.get_id())

    def get_project_by_semester_id(self, semester):
        with ProjectMapper() as mapper:
            return mapper.find_by_semester_id(semester.get_id())

    def get_project_by_assignment_id(self, assignment):
        with ProjectMapper() as mapper:
            return mapper.find_by_assignment_id(assignment.get_id())

    def get_project_by_name(self, name):
        with ProjectMapper() as mapper:
            return mapper.find_by_name(name)

    def get_project_by_preferred_room(self, preferred_room):
        with ProjectMapper() as mapper:
            return mapper.find_by_preferred_room(preferred_room)

    def save_project(self, project):
        with ProjectMapper() as mapper:
            mapper.update(project)

    def delete_project(self, project):
        with ProjectMapper() as mapper:
            mapper.delete(project)

# Project/Teilnahme-spezifische Methoden

    def get_participation_of_project(self, participation):
        """Die Teilnahme des gegebenen Projektes auslesen."""
        with ParticipationMapper() as mapper:
            return mapper.find_by_project(participation.get_id())

# Project_type

    def create_project_type(self, name, ects, sws):
        """Einen Projekttyp anlegen"""
        project_type = Project_type()
        project_type.set_name(name)
        project_type.set_ects(ects)
        project_type.set_sws(sws)
        project_type.set_id(1)

        with Project_typeMapper() as mapper:
            return mapper.insert(project_type)

    def get_all_project_type(self):
        """Alle Projektyypen auslesen."""
        with Project_typeMapper() as mapper:
            return mapper.find_all()

    def get_project_type_by_id(self, id):
        """Den Projekttypen mit der gegebenen ID auslesen."""
        with Project_typeMapper() as mapper:
            return mapper.find_by_key(id)

    def get_project_type_by_name(self, name):
        """Den Projekttypen mit dem gegebenen Namen auslesen."""
        with Project_typeMapper() as mapper:
            return mapper.find_by_name(name)

    def get_project_type_by_ects(self, ects):
        """Den Projekttypen mit der gegebenen ECTS auslesen."""
        with Project_typeMapper() as mapper:
            return mapper.find_by_ects(ects)

    def get_project_type_by_sws(self, sws):
        """Den Projekttypen mit der gegebenen SWS auslesen."""
        with Project_typeMapper() as mapper:
            return mapper.find_by_sws(sws)

    def save_project_type(self, project_type):
        """Den gegebenen Projekttypen speichern."""
        with Project_typeMapper() as mapper:
            mapper.update(project_type)

    def delete_project_type(self, project_type):
        """Den gegebenen Projekttypen aus unserem System löschen"""
        with Project_typeMapper() as mapper:
            mapper.delete(project_type)

# Role

    def create_role(self, name):
        """Eine Rolle anlegen"""
        role = Role()
        role.set_name(name)
        role.set_id(1)

        with RoleMapper() as mapper:
            return mapper.insert(role)

    def get_all_role(self):
        """Alle Rollen auslesen"""
        with RoleMapper() as mapper:
            return mapper.find_all()

    def get_role_by_id(self, id):
        """Die Rolle mit der angegeben ID auslesen"""
        with RoleMapper() as mapper:
            return mapper.find_by_key(id)

    def get_role_by_name(self, name):
        """Die Rollen anhand des Namens ausgeben"""
        with RoleMapper() as mapper:
            return mapper.find_by_name(name)

    def save_role(self, role):
        """Die Rolle speichern."""
        with RoleMapper() as mapper:
            mapper.update(role)

    def delete_role(self, role):
        """Die Rolle aus unserem System löschen"""
        with RoleMapper() as mapper:
            mapper.delete(role)

# Semester

    def create_semester(self, name, current_semester):
        """Ein Semester anlegen"""
        semester = Semester()
        semester.set_name(name)
        semester.set_current_semester(current_semester)
        semester.set_id(1)

        with SemesterMapper() as mapper:
            return mapper.insert(semester)

    def get_all_semester(self):
        """Alle Semester auslesen."""
        with SemesterMapper() as mapper:
            return mapper.find_all()

    def get_semester_by_id(self, id):
        """Das Semester mit der gegebenen ID auslesen."""
        with SemesterMapper() as mapper:
            return mapper.find_by_key(id)

    def get_semester_by_name(self, name):
        """Das Semester mit dem gegebenen Namen auslesen."""
        with SemesterMapper() as mapper:
            return mapper.find_by_name(name)

    def get_semester_by_current_semester(self, current_semester):
        """Das aktuelle Semester auslesen."""
        with SemesterMapper() as mapper:
            return mapper.find_by_current_semester(current_semester)

    def save_semester(self, semester):
        """Den gegebenen Semester speichern."""
        with SemesterMapper() as mapper:
            mapper.update(semester)

    def delete_semester(self, semester):
        """Den gegebenen Semester aus unserem System löschen"""
        with SemesterMapper() as mapper:
            mapper.delete(semester)

# Student

    def create_student(self, user_id, name, course, matriculation_number, mail, google_id):
        """Erstellen des Studenten"""

        student = Student()
        student.set_user_id(user_id)
        student.set_name(name)
        student.set_course(course)
        student.set_matriculation_number(matriculation_number)
        student.set_mail(mail)
        student.set_google_id(google_id)
        student.set_id(1)

        with StudentMapper() as mapper:
            return mapper.insert(student)

    def get_all_student(self):
        """ALle Studenten ausgeben"""
        with StudentMapper() as mapper:
            return mapper.find_all()

    def get_student_by_id(self, id):
        """Studenten per ID ausgeben"""
        with StudentMapper() as mapper:
            return mapper.find_by_key(id)

    def get_student_by_user_id(self, user_id):
        """Studenten per User_id ausgeben"""
        with StudentMapper() as mapper:
            return mapper.find_by_user_id(user_id)

    def get_student_by_name(self, name):
        """Studenten per Name ausgeben"""
        with StudentMapper() as mapper:
            return mapper.find_by_name(name)

    def get_student_by_course(self, course):
        """Studenten per Kurs ausgeben"""
        with StudentMapper() as mapper:
            return mapper.find_by_course(course)

    def get_student_by_google_id(self, google_id):
        """Studenten per Google_id ausgeben"""
        with StudentMapper() as mapper:
            return mapper.find_by_google_id(google_id)

    def get_student_by_matriculation_number(self, matriculation_number):
        """Studenten per Matrikelnummer ausgeben"""
        with StudentMapper() as mapper:
            return mapper.find_by_matriculation_number(matriculation_number)

    def save_student(self, student):
        """Studenten speichern"""
        with StudentMapper() as mapper:
            mapper.update(student)

    def delete_student(self, student):
        """Studenten aus der DB löschen"""
        with StudentMapper() as mapper:
            participation = self.get_participation_by_student_id(student)
            user = self.get_user_by_student(student)

            if not (participation is None):
                for i in participation:
                    self.delete_participation(i)

            if not (user is None):
                for j in user:
                    self.delete_user(j)

            mapper.delete(student)


# StudentTeilnahme-spezifische Methoden

    def get_participation_of_student(self, student):
            """Die Teilnahme des gegebenen Studenten auslesen."""
            with ParticipationMapper() as mapper:
                return mapper.find_by_student(student.get_id())

    def create_particpation_for_student(self, student):
        """Für einen gegebenen Studenten einen neuen Teilnahme anlegen."""
        with ParticipationMapper() as mapper:
            if student is not None:
                participation = Participation()
                participation.set_student_id(student.get_id())
                participation.set_id(1)

                return mapper.insert(participation)
            else:
                return None

    def get_user_by_student(self, user):
        with UserMapper() as mapper:
            return mapper.find_by_student(user.get_id())

# User

    def create_user(self, name, mail, google_id):
        """User erstellen"""

        user = User()
        user.set_name(name)
        user.set_mail(mail)
        user.set_google_id(google_id)
        user.set_id(1)

        with UserMapper() as mapper:
            return mapper.insert(user)

    def get_all_user(self):
        """Alle User ausgeben"""
        with UserMapper() as mapper:
            return mapper.find_all()

    def get_user_by_id(self, id):
        """User per ID ausgeben"""
        with UserMapper() as mapper:
            return mapper.find_by_key(id)

    def get_user_by_name(self, name):
        """User per Name ausgeben"""
        with UserMapper() as mapper:
            return mapper.find_by_name(name)

    def get_user_by_role_id(self, role):
        """User per Rolle ausgeben"""
        with UserMapper() as mapper:
            return mapper.find_by_role_id(role.get_id())

    def get_user_by_google_id(self, google_id):
        """User per Google_id ausgeben"""
        with UserMapper() as mapper:
            return mapper.find_by_google_user_id(google_id)

    def save_user(self, user):
        """User speichern"""
        with UserMapper() as mapper:
            mapper.update(user)

    def delete_user(self, user):
        """User aus der DB löschen"""
        with UserMapper() as mapper:
            mapper.delete(user)

    def get_role_of_user(self, user):
        with RoleMapper() as mapper:
            result = 1

            if not (user is None):
                roles = mapper.find_by_name(user.get_id())
                if not (roles is None):
                    pass

            return result

#Add

    def add_member_to_project(self, module_id, project_id, student_id, validation_id):

        d = False
        p = self.get_all_participations()
        for i in p:
            if i == [module_id, student_id, project_id, validation_id]:
                d = True

            if d is False:
                self.create_participation(module_id, project_id, student_id)

    def remove_member_from_project(self, module_id, project_id, student_id, validation_id):

        l = self.get_all_participations()
        for i in l:
            if i == [module_id, project_id, student_id, validation_id]:
                self.delete_participation(l)
