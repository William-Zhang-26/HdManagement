from .bo.Automat import Automat
from .bo.Status import Status
from .bo.Module import Module
from .bo.Participation import Participation
from .bo.Project import Project
from .bo.Project_type import Project_type
from .bo.Semester import Semester
from .bo.Student import Student
from .bo.User import User
from .bo.Validation import Validation

from .db.AutomatMapper import AutomatMapper
from .db.StatusMapper import StatusMapper
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

# Participation

# Automat

# Status

# Project

# Project_type

# Semester

# Student

# User
    def create_User(self, lastname, firstname, mail):

        user = User()
        user.set_lastname()
        user.set_firstname()
        user.set_mail()
        user.set_id(1)

        with UserMapper as mapper:
            return mapper.insert(user)
