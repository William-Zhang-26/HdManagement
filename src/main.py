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
    'name': fields.Integer(attribute='_name', description='Der Name von einem NamedBusinessObject'),
})

"""Darauffolgend werden analog zu unseren NamedBusinessObject-Klassen wie bei den BusinessObjects transferierbare Strukturen angelegt.

NamedBusinessObject dient als Basisklasse, auf der die weiteren Strukturen Module, Project, Semester, Role und Project_type aufsetzen."""

module = api.inherit('Module', nbo, {
    """"""
})

project = api.inherit('Project', nbo, {
    """"""
})

semester = api.inherit('Semester', nbo, {
    """"""
})

role = api.inherit('Role', nbo, {
    """"""
})

project_type = api.inherit('Project_type', nbo, {
    """"""
})