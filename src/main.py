from flask import Flask,jsonify
from flask_restx import Api, Resource, fields
from flask_cors import CORS

"""hier kommt noch was hin..."""

"""Nachfolgend werden analog zu unseren BusinessObject-Klassen transferierbare Strukturen angelegt.

BusinessObject dient als Basisklasse, auf der die weiteren Strukturen Participation, Validation und NamedBusinessObject aufsetzen."""
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
    'creation_time': fields.DateTime(attribute='_create_time', description='Erstellungszeitpunkt eines Business Objects')
})

"""Participation, Validation und NamedBusinessObject sind BusinessObjects..."""
participation = api.inherit('Participation', bo, {
    'participation_status': fields.Boolean(attribute='_participation_status', description='Status der Teilnahme an einem Projekt')
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
    'project_description': fields.String(attribute='_project_description', description='Die Beschreibung des Projektes')
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