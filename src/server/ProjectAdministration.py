from .bo.Automat import Automat
from .bo.Condition import Condition
from .bo.Module import Module
from .bo.Participation import Participation
from .bo.Project import Project
from .bo.Project_type import Project_type
from .bo.Semester import Semester
from .bo.Student import Student
from .bo.User import User
from .bo.Validation import Validation

from .db.AutomatMapper import AutomatMapper
from .db.ConditionMapper import ConditionMapper
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
