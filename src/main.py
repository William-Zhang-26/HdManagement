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
    'partner': fields.String(attribute='_partner', description='Die Partner die das Projekt mit gestalten'),
    'capacity': fields.Integer(attribute='_capacity', description='Die Anzahl der Personen die in dem Projekt teilnehmen können'),
    'roomnumber': fields.String(attribute='_roomnumber', description='Die Raumnnumer in der das Projekt stattfinden soll'),
    'blockday': fields.String(attribute='_blockday', description='Die Blocktage die das Projekt benötigen'),
    'project_category': fields.String(attribute='_project_category', description='Die Projekt Kategorie des Projektes'),
    'supervisor': fields.String(attribute='_supervisor', description='Die beteiligten Professoren in dem Projekt'),
    'weekly': fields.Boolean(attribute='_weekly', description='Angabe ob das Projekt wöchentlich stattfindet')
})

semester = api.inherit('Semester', nbo, {
    'semester': fields.Integer(attribute='_name', description='Die Anzahl des Semesters')
})

role = api.inherit('Role', nbo, {
    """"""
})

project_type = api.inherit('Project_type', nbo, {
    'ects': fields.Integer(attribute='_ects', description='Die ECTS Punkte von dem Projekt'),
    'sws': fields.Integer(attribute='_sws', description='Die SWS Punkte von dem Projekt')
})