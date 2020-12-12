from .bo.Automat import Automat
from .bo.State import State
from .bo.Module import Module
from .bo.Participation import Participation
from .bo.Project import Project
from .bo.Project_type import Project_type
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

    def get_module_by_id(self, number):
        with ModuleMapper() as mapper:
            return mapper.find_by_key(number)

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

    def get_validation_by_id(self, number):
        with ValidationMapper() as mapper:
            return mapper.find_by_key(number)

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

# Automat

# Status

# Project

# Project_type

# Semester

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
    def create_user(self, lastname, firstname, mail, role_id):

        user = User()
        user.set_lastname(lastname)
        user.set_firstname(firstname)
        user.set_mail(mail)
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
                    self._delete_role(r)

            mapper.delete(user)