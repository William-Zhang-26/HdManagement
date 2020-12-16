from .bo.Automat import Automat
from .bo.State import State
from .bo.Module import Module
from .bo.Participation import Participation
from .bo.Project import Project
from .bo.Project_type import Project_type
from .bo.Role import Role
from .bo.Semester import Semester
from .bo.Student import Student
from .bo.User import User
from .bo.Validation import Validation

from .db.AutomatMapper import AutomatMapper
from .db.StateMapper import StateMapper
from .db.ModuleMapper import ModuleMapper
from .db.ParticipationMapper import ParticipationMapper
from .db.ProjectMapper import ProjectMapper
from .db.Project_typeMapper import Project_typeMapper
from .db.RoleMapper import RoleMapper
from .db.SemesterMapper import SemesterMapper
from .db.StudentMapper import StudentMapper
from .db.UserMapper import UserMapper
from .db.ValidationMapper import ValidationMapper


class ProjectAdministration (object):
    """Diese Klasse aggregiert nahezu sämtliche Applikationslogik (engl. Business Logic)."""

    def __init__(self):
        pass

# Module

    def create_module(self, name, edv_number):

        module = Module()
        module.set_name(name)
        module.set_edv_number(edv_number)
        module.set_id(1)

        with ModuleMapper() as mapper:
            return mapper.insert(module)

    def get_all_modules(self):
        with ModuleMapper() as mapper:
            return mapper.find_all()

    def get_module_by_id(self, id):
        with ModuleMapper() as mapper:
            return mapper.find_by_key(id)

    def get_module_by_name(self, name):
        with ModuleMapper() as mapper:
            return mapper.find_by_name(name)

    def get_module_by_edv_number(self, edv_number):
        with ModuleMapper() as mapper:
            return mapper.find_by_edv_number(edv_number)

    def save_module(self, module):
        with ModuleMapper() as mapper:
            mapper.update(module)

    def delete_module(self, module):
        with ModuleMapper() as mapper:
            module = self.get_module_by_id(module.get_id())
            if not (module is None):
                for i in module:
                    self.delete_module(i)

            mapper.delete(module)

# Validation

    def create_validation(self, grade):

        validation = Validation()
        validation.set_grade(grade)
        validation.set_id(1)

        with ValidationMapper() as mapper:
            return mapper.insert(validation)

    def get_all_validations(self):
        with ValidationMapper() as mapper:
            return mapper.find_all()

    def get_validation_by_id(self, id):
        with ValidationMapper() as mapper:
            return mapper.find_by_key(id)

    def get_validation_by_grade(self, grade):
        with ValidationMapper() as mapper:
            return mapper.find_by_grade(grade)

    def save_validation(self, validation):
        with ValidationMapper() as mapper:
            mapper.update(validation)

    def delete_validation(self, validation):
        with ValidationMapper() as mapper:
            validation = self.get_validation_by_id(validation.get_id())
            if not (validation is None):
                for i in validation:
                    self.delete_validation(i)

            mapper.delete(validation)


# Participation

    def create_participation(self, module_id, project_id, student_id, validation_id, participation_status):

        participation = Participation()
        participation.set_module_id(module_id)
        participation.set_project_id(project_id)
        participation.set_student_id(student_id)
        participation.set_validation_id(validation_id)
        participation.set_participation_status(participation_status)
        participation.set_id(1)

        with ParticipationMapper() as mapper:
            return mapper.insert(participation)

    def get_all_participation(self):
        with ParticipationMapper() as mapper:
            return mapper.find_all()

    def get_participation_by_id(self, id):
        with ParticipationMapper() as mapper:
            return mapper.find_by_key(id)

    def get_participation_by_module_id(self, module_id):
        with ParticipationMapper() as mapper:
            return mapper.find_by_module(module_id)

    def get_participation_by_project_id(self, project_id):
        with ParticipationMapper() as mapper:
            return mapper.find_by_project(project_id)

    def get_participation_by_student_id(self, student_id):
        with ParticipationMapper() as mapper:
            return mapper.find_by_student(student_id)

    def get_participation_by_validation_id(self, validation_id):
        with ParticipationMapper() as mapper:
            return mapper.find_by_validation(validation_id)

    def save_participation(self, participation):
        with ParticipationMapper() as mapper:
            mapper.update(participation)

    def delete_participation(self, participation):
        with ParticipationMapper() as mapper:
            participation = self.get_participation_by_id(participation.get_id())
            if not (participation is None):
                for i in participation:
                    self.delete_participation(i)

            mapper.delete(participation)

# Automat

# Status

# Project

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
            project_type = self.get_project_type_by_id(project_type.get_id())
            if not (project_type is None):
                for i in project_type:
                    self.delete_semester(i)

            mapper.delete(project_type)

# Role
    def create_role(self, name):
        """Eine Rolle anlegen"""
        role = Role()
        role.set_name(name)

        with RoleMapper() as mapper:
            return mapper.insert(role)

    def get_all_role(self):
        """Alle Rollen auslesen"""
        with RoleMapper() as mapper:
            return mapper.find_all()

    def get_role_by_id(self, id):
        """Die Rolle mit der angegeben ID auslesen"""
        with RoleMapper as mapper:
            return mapper.find_by_key(id)

    def get_role_by_name(self, name):
        """Die Rollen anhand des Namens ausgeben"""
        with RoleMapper as mapper:
            return mapper.find_by_name(name)

    def save_role(self, role):
        """Die Rolle speichern."""
        with RoleMapper() as mapper:
            mapper.update(role)

    def delete_role(self, role):
        """Die Rolle aus unserem System löschen"""
        with RoleMapper() as mapper:
            new_role = self.get_role_by_id(role.get_id())
            if not (new_role is None):
                for i in role:
                    self.delete_role(i)

            mapper.delete(role)

# Semester
    def create_semester(self, name, semester_number):
        """Einen Semester anlegen"""
        semester = Semester()
        semester.set_name(name)
        semester.set_semester_number(semester_number)
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

    def get_semester_by_semester_number(self, semester_number):
        """Das Semester mit der gegebenen Semester Zahl auslesen."""
        with SemesterMapper() as mapper:
            return mapper.find_by_semester_number(semester_number)

    def save_semester(self, semester):
        """Den gegebenen Semester speichern."""
        with SemesterMapper() as mapper:
            mapper.update(semester)

    def delete_semester(self, semester):
        """Den gegebenen Semester aus unserem System löschen"""
        with SemesterMapper() as mapper:
            module = self.get_semester_by_id(semester.get_id())
            if not (module is None):
                for i in semester:
                    self.delete_semester(i)

            mapper.delete(semester)

# Student
    def create_student(self, lastname, firstname, course, matriculation_number, mail, project_id):

        student = Student()
        student.set_lastname(lastname)
        student.set_firstname(firstname)
        student.set_course(course)
        student.set_matriculation_number(matriculation_number)
        student.set_mail(mail)
        student.set_project_id(project_id)
        student.set_id(1)

        with StudentMapper as mapper:
            return mapper.insert(student)

    def get_all_student(self):
        with StudentMapper as mapper:
            return mapper.find_all()

    def get_student_by_id(self, id):
        with StudentMapper as mapper:
            return mapper.find_by_key(id)

    def get_student_by_lastname(self, lastname):
        with StudentMapper as mapper:
            return mapper.find_by_lastname(lastname)

    def get_student_by_firstname(self, firstname):
        with StudentMapper as mapper:
            return mapper.find_by_firstname(firstname)

    def get_student_by_course(self, course):
        with StudentMapper as mapper:
            return mapper.find_by_course(course)

    def get_student_by_matriculation_number(self, matriculation_number):
        with StudentMapper as mapper:
            return mapper.find_by_matriculation_number(matriculation_number)

    def save_student(self, student):
        with StudentMapper as mapper:
            mapper.update(student)

    def delete_student(self, student):
        with StudentMapper as mapper:
            project = self._get_project_by_student(student.get_id())
            if not (project is None):
                for p in project:
                    self._delete_project(p)

            mapper.delete(student)

# User
    def create_user(self, lastname, firstname, mail, google_id, role_id):

        user = User()
        user.set_lastname(lastname)
        user.set_firstname(firstname)
        user.set_mail(mail)
        user.set_google_id(google_id)
        user.set_role_id(role_id)
        user.set_id(1)

        with UserMapper as mapper:
            return mapper.insert(user)

    def get_all_user(self):
        with UserMapper as mapper:
            mapper.find_all()

    def get_user_by_id(self, id):
        with UserMapper as mapper:
            mapper.find_by_key(id)

    def get_user_by_lastname(self, lastname):
        with UserMapper as mapper:
            mapper.find_by_lastname(lastname)

    def get_user_by_firstname(self, firstname):
        with UserMapper as mapper:
            mapper.find_by_firstname(firstname)

    def get_user_by_role(self, role_id):
        with UserMapper as mapper:
            mapper.find_by_role_id(role_id)

    def save_user(self, user):
        with UserMapper as mapper:
            mapper.update(user)

    def delete_user(self, user):
        with UserMapper as mapper:
            role = self._get_role_by_user(user.get_id())
            if not (role is None):
                for r in role:
                    self._delete_user(r)

            mapper.delete(user)