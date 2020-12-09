from flask import Flask, jsonify
from flask_restx import Api, Resource, fields
from flask_cors import CORS

from src.server.bo.Automat import Automat
from src.server.bo.State import State
from src.server.bo.Module import Module
from src.server.bo.Participation import Participation
from src.server.bo.Project import Project
from src.server.bo.Project_type import Project_type
from src.server.bo.Semester import Semester
from src.server.bo.Student import Student
from src.server.bo.User import User
from src.server.bo.Validation import Validation

from src.server.ProjectAdministration import ProjectAdministration

"""App und API Konfiguration"""
api = Api
"""Nachfolgend werden analog zu unseren BusinessObject-Klassen transferierbare Strukturen angelegt.

BusinessObject dient als Basisklasse, auf der die weiteren Strukturen Participation, Validation und NamedBusinessObject aufsetzen."""
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
    'creation_time': fields.DateTime(attribute='_create_time', description='Erstellungszeitpunkt eines Business Objects')
})

"""Participation, Validation und NamedBusinessObject sind BusinessObjects..."""
participation = api.inherit('Participation', bo, {
    'module_id': fields.Integer(attribute='module_id', description='Die ID des zugehörigen Moduls'),
    'project_id': fields.Integer(attribute='project_id', description='Die ID des zugehörigen Projektes'),
    'student_id': fields.Integer(attribute='student_id', description='Die ID des zugehörigen Studenten'),
    'validation_id': fields.Integer(attribute='validation_id', description='Die ID der zugehörigen Bewertung'),
    'participation_status': fields.Boolean(attribute='_participation_status', description='Status der Teilnahme an einem Projekt'),
})

validation = api.inherit('Validation', bo, {
    'grade': fields.Float(attribute='_grade', description='Bewertung eines Projektes')
})

nbo = api.model('NamedBusinessObject', bo, {
    'name': fields.String(attribute='_name', description='Der Name von einem NamedBusinessObject')
})

"""Darauffolgend werden analog zu unseren NamedBusinessObject-Klassen wie bei den BusinessObjects transferierbare Strukturen angelegt.

NamedBusinessObject dient als Basisklasse, auf der die weiteren Strukturen Module, Project, Semester, Role und Project_type aufsetzen."""

module = api.inherit('Module', nbo, {
    'edv_number': fields.Integer(attribute='_edv_number', description='Die EDV-Nummer von dem Modul')
})

project = api.inherit('Project', nbo, {
    'project_description': fields.String(attribute='_project_description', description='Die Beschreibung des Projektes'),
    'partners': fields.String(attribute='_partners', description='Die Partner die das Projekt mit gestalten'),
    'capacity': fields.Integer(attribute='_capacity', description='Die Anzahl der Personen die in dem Projekt teilnehmen können'),
    'preferred_room': fields.String(attribute='_preferred_room', description='Die Raumnnumer in der das Projekt stattfinden soll'),
    'b_days_pre_schedule': fields.String(attribute='_b_days_pre_schedule', description='Anzahl der Blocktage vor der Vorlesungszeit'),
    'b_days_finale': fields.String(attribute='_b_days_finale', description='Anzahl der Blocktage in der Prüfungszeit'),
    'b_days_saturdays': fields.String(attribute='_b_days_saturdays', description='Anzahl der Blocktage in der Vorlesungszeit (Samstage)'),
    'preferred_b_days': fields.String(attribute='_preferred_b_days', description='Die präferierten Blocktage in der Vorlesungszeit'),
    'project_category': fields.String(attribute='_project_category', description='Die Projekt Kategorie des Projektes'),
    'additional_supervisor': fields.String(attribute='_additional_supervisor', description='Die beteiligten Professoren in dem Projekt'),
    'weekly': fields.Boolean(attribute='_weekly', description='Angabe ob das Projekt wöchentlich stattfindet')
})

semester = api.inherit('Semester', nbo, {
    'semester': fields.Integer(attribute='_semester', description='Die Anzahl des Semesters')
})

"""
role = api.inherit('Role', nbo, {
    """"""
})
"""

project_type = api.inherit('Project_type', nbo, {
    'ects': fields.Integer(attribute='_ects', description='Die ECTS Punkte von dem Projekt'),
    'sws': fields.Integer(attribute='_sws', description='Die SWS Punkte von dem Projekt')
})

""" User&Student

user= api.model('User', nbo, {
    'user': fields
    
student= api.inherit('Student', user, {
    'student':

"""
status = api.inherit('Status', nbo, {
    """"""
})

automat = api.inherit('Automat', nbo, {
    """"""
})

@api.route('/hello')
class HelloWorld(Resource):
    def get(self):
        return jsonify({'hello': 'world'})

"""Automat"""

"""Status"""

"""Module"""
@project.route("/module")
class ModuleOperations(Resource):
    @project.marshal_with(module, code=200)
    @project.expect(module)
    def post(self):
        """Modul erstellen"""
        adm = ProjectAdministration()
        proposal = Module.from_dict(api.payload)
        if proposal is not None:
            c = adm.create_module(proposal.get_name(), proposal.get_edv_number())
            return c, 200
        else:
            return '', 500

@project.route("/module/<int:id>")
@project.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@project.param('id', 'Die ID des Modul-Objekts')
class ModuleOperations(Resource):
    @project.marshal_with(module)
    def get(self, id):
        """Auslesen eines Moduls aus der DB"""
        adm = ProjectAdministration()
        module = adm.get_module_by_id(id)
        return module

    def delete(self, id):
        """Löschen eines Moduls aus der DB"""
        adm = ProjectAdministration()
        module = adm.get_module_by_id(id)
        if module is None:
            return 'Modul konnte nicht aus der DB gelöscht werden', 500
        else:
            adm.delete_module(module)
            return 'Modul wurde erfolgreich aus der DB gelöscht', 200

    @project.expect(module)
    def put(self, id):
        """Modul wird aktualisiert"""
        adm = ProjectAdministration()
        module = Module.from_dict(api.payload)

        if module is None:
            return "Modul konnte nicht geändert werden", 500

        else:
            module.set_id(id)
            adm.save_module(module)
            return "Modul wurde erfolgreich geändert", 200

"""Participation"""

"""Project"""

"""Project_type"""

"""Semester"""

"""Student"""

"""User"""

"""Validation"""
@project.route("/validation")
class ValidationOperations(Resource):
    @project.marshal_with(validation, code=200)
    @project.expect(validation)
    def post(self):
        """Bewertung erstellen"""
        adm = ProjectAdministration()
        proposal = Validation.from_dict(api.payload)
        if proposal is not None:
            c = adm.create_validation(proposal.get_grade())
            return c, 200
        else:
            return '', 500

@project.route("/validation/<int:id>")
@project.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@project.param('id', 'Die ID des Bewertungs-Objekts')
class ValidationOperations(Resource):
    @project.marshal_with(validation)
    def get(self, id):
        """Auslesen einer Bewertung aus der DB"""
        adm = ProjectAdministration()
        validation = adm.get_validation_by_id(id)
        return validation

    def delete(self, id):
        """Löschen einer Bewertung aus der DB"""
        adm = ProjectAdministration()
        validation = adm.get_validation_by_id(id)
        if validation is None:
            return 'Bewertung konnte nicht aus der DB gelöscht werden', 500
        else:
            adm.delete_validation(validation)
            return 'Bewertung wurde erfolgreich aus der DB gelöscht', 200

    @project.expect(validation)
    def put(self, id):
        """Bewertung wird aktualisiert"""
        adm = ProjectAdministration()
        validation = Validation.from_dict(api.payload)

        if validation is None:
            return "Bewertung konnte nicht geändert werden", 500

        else:
            validation.set_id(id)
            adm.save_validation(validation)
            return "Bewertung wurde erfolgreich geändert", 200