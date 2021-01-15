from flask import Flask, jsonify
from flask_restx import Api, Resource, fields
from flask_cors import CORS


from src.server.bo.State import State
from src.server.bo.Module import Module
from src.server.bo.Participation import Participation
from src.server.bo.Project import Project
from src.server.bo.Project_type import Project_type
from src.server.bo.Role import Role
from src.server.bo.Semester import Semester
from src.server.bo.Student import Student
from src.server.bo.User import User
from src.server.bo.Validation import Validation

from src.server.ProjectAdministration import ProjectAdministration

"""App und API Konfiguration"""
app = Flask(__name__)
CORS(app, resources=r'/hdmanagement/*')
api = Api(app, version='0.1 pre-alpha', title='Hdmanagement API',
description='Demo-API für Hdmanagement')
projectmanager = api.namespace('projectmanager', description='Funktionen des SSLS')

"""Nachfolgend werden analog zu unseren BusinessObject-Klassen transferierbare Strukturen angelegt.

BusinessObject dient als Basisklasse, auf der die weiteren Strukturen Participation, Validation und NamedBusinessObject aufsetzen."""
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
    'create_time': fields.Date(attribute='_create_time', description='Erstellungszeitpunkt eines Business Objects')
})
ps = api.model('ps', {
    'name': fields.String(attribute='_name', description='Der Name von eines Studenten'),
    'firstname': fields.String(attribute='_firstname', description='Der Vorname eines Studenten')
})

pv = api.model('pv', {
    'grade': fields.Float(attribute='_grade', description='Bewertung eines Projektes')
})

"""Participation, Validation und NamedBusinessObject sind BusinessObjects..."""
participation = api.inherit('Participation', bo, {
    'module_id': fields.Integer(attribute='_module_id', description='Die ID des zugehörigen Moduls'),
    'project_id': fields.Integer(attribute='_project_id', description='Die ID des zugehörigen Projektes'),
    'student_id': fields.Integer(attribute='_student_id', description='Die ID des zugehörigen Studenten'),
    'validation_id': fields.Integer(attribute='_validation_id', description='Die ID der zugehörigen Bewertung'),
    'status': fields.String(attribute='_status', description='Bewertungsstand einer Teilnahme')
})

validation = api.inherit('Validation', bo, {
    'grade': fields.Float(attribute='_grade', description='Bewertung eines Projektes')
})

nbo = api.inherit('NamedBusinessObject', bo, {
    'name': fields.String(attribute='_name', description='Der Name von einem NamedBusinessObject')
})

"""Darauffolgend werden analog zu unseren NamedBusinessObject-Klassen wie bei den BusinessObjects transferierbare Strukturen angelegt.

NamedBusinessObject dient als Basisklasse, auf der die weiteren Strukturen Module, Project, Semester, Role und Project_type aufsetzen."""

module = api.inherit('Module', nbo, {
    'edv_number': fields.Integer(attribute='_edv_number', description='Die EDV-Nummer von dem Modul')
})

project = api.inherit('Project', nbo, {
    'lecturer_id': fields.Integer(attribute='_lecturer_id', description='Die ID des zugehörigen Dozenten'),
    'project_type_id': fields.Integer(attribute='_project_type_id', description='Die ID des zugehörigen Projekttypen'),
    'state_id': fields.Integer(attribute='_state_id', description='Die ID des zugehörigen Zustandes'),
    'project_description': fields.String(attribute='_project_description', description='Die Beschreibung des Projektes'),
    'partners': fields.String(attribute='_partners', description='Die Partner die das Projekt mit gestalten'),
    'capacity': fields.Integer(attribute='_capacity', description='Die Anzahl der Personen die in dem Projekt teilnehmen können'),
    'preferred_room': fields.String(attribute='_preferred_room', description='Die Raumnnumer in der das Projekt stattfinden soll'),
    'b_days_pre_schedule': fields.String(attribute='_b_days_pre_schedule', description='Anzahl der Blocktage vor der Vorlesungszeit'),
    'b_days_finale': fields.String(attribute='_b_days_finale', description='Anzahl der Blocktage in der Prüfungszeit'),
    'b_days_saturdays': fields.String(attribute='_b_days_saturdays', description='Anzahl der Blocktage in der Vorlesungszeit (Samstage)'),
    'preferred_b_days': fields.String(attribute='_preferred_b_days', description='Die präferierten Blocktage in der Vorlesungszeit'),
    'additional_lecturer': fields.String(attribute='_additional_lecturer', description='Die beteiligten Dozenten in dem Projekt'),
    'weekly': fields.String(attribute='_weekly', description='Angabe ob das Projekt wöchentlich stattfindet'),
})

semester = api.inherit('Semester', nbo, {
    'semester_number': fields.Integer(attribute='_semester_number', description='Die Anzahl des Semesters')
})

"""Rolle"""

role = api.inherit('Role', nbo, {
    
})


project_type = api.inherit('Project_type', nbo, {
    'ects': fields.Integer(attribute='_ects', description='Die ECTS Punkte von dem Projekt'),
    'sws': fields.Integer(attribute='_sws', description='Die SWS Punkte von dem Projekt')
})

"""User&Student"""

user = api.inherit('User', nbo, {
    'firstname': fields.String(attribute='_firstname', description='Der Vorname eines Users'),
    'mail': fields.String(attribute='_mail', description='Die E-Mail eines Users'),
    'google_id': fields.String(attribute='_google_id', description='Die Google-ID eines Users'),
    'role_id': fields.Integer(attribute='_role_id', description='Die ID der zugehörigen Rolle')
})

student = api.inherit('Student', user, {
    'course': fields.String(attribute='_course', description='Der zugehörige Kurs'),
    'matriculation_number': fields.Integer(attribute='_matriculation_number', description='Die Matrikelnummer des Studenten')
})

state = api.inherit('State', nbo, {

})


#@api.route('/hello')
#class HelloWorld(Resource):
#    def get(self):
#        return jsonify({'hello': 'world'})

"""State"""
#@projectmanager.route("/state")
#@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
#class StateOperations(Resource):
#    @projectmanager.marshal_with(state, code=200)
#    @projectmanager.expect(state)
#    def post(self):
#        """Zustand erstellen"""
#        adm = ProjectAdministration()
#        proposal = State.from_dict(api.payload)
#        if proposal is not None:
#            c = adm.create_state(proposal.get_name())
#            return c, 200
#        else:
#            return '', 500

@projectmanager.route("/state/<int:id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Zustand-Objekts')
class StateOperations(Resource):
    @projectmanager.marshal_with(state)
    def get(self, id):
        """Auslesen eines Zustandes aus der DB"""
        adm = ProjectAdministration()
        state = adm.get_state_by_id(id)
        return state

#    def delete(self, id):
#        """Löschen eines Zustandes aus der DB"""
#        adm = ProjectAdministration()
#        state = adm.get_state_by_id(id)
#        if state is None:
#            return 'Zustand konnte nicht aus der DB gelöscht werden', 500
#        else:
#            adm.delete_state(state)
#            return 'Zustand wurde erfolgreich aus der DB gelöscht', 200

#    @projectmanager.expect(state)
#    def put(self, id):
#        """Zustand wird aktualisiert"""
#        adm = ProjectAdministration()
#        state = State.from_dict(api.payload)

#        if state is None:
#            return "Zustand konnte nicht geändert werden", 500

#        else:
#            state.set_id(id)
#            adm.save_state(state)
#            return "Zustand wurde erfolgreich geändert", 200

"""Module"""
@projectmanager.route("/module")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ModuleOperations(Resource):
    @projectmanager.marshal_with(module, code=200)
    @projectmanager.expect(module)
    def post(self):
        """Modul erstellen"""
        adm = ProjectAdministration()
        proposal = Module.from_dict(api.payload)
        if proposal is not None:
            c = adm.create_module(proposal.get_name(), proposal.get_edv_number())
            return c, 200
        else:
            return '', 500

@projectmanager.route("/module/<int:id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Modul-Objekts')
class ModuleOperations(Resource):
    @projectmanager.marshal_with(module)
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

    @projectmanager.expect(module)
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

@projectmanager.route("/participation")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ParticipationOperationen(Resource):
    @projectmanager.marshal_with(participation, code=200)
    @projectmanager.expect(participation)
    def post(self):
        """Teilnahme erstellen"""
        adm = ProjectAdministration()
        proposal = Participation.from_dict(api.payload)
        if proposal is not None:
            c = adm.create_participation(proposal.get_module_id(), proposal.get_project_id(), proposal.get_student_id(),
                                         proposal.get_validation_id(), proposal.get_status())
            return c, 200
        else:
            return '', 500

@projectmanager.route("/participation/<int:id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Teilnahme-Objekts')
class ParticipationOperationen(Resource):
    @projectmanager.marshal_with(participation)

    def get(self,id):
        """Auslesen einer Teilnahme aus der DB """
        adm = ProjectAdministration()
        participation = adm.get_participation_by_id(id)
        return participation

    def delete(self,id):
        """Löschen einer Teilnahme aus der DB"""
        adm = ProjectAdministration()
        participation = adm.get_participation_by_id(id)
        if participation is None:
            return 'Teilnahme konnte nicht aus der DB gelöscht werden', 500
        else:
            adm.delete_participation(participation)
            return 'Teilnahme wurde erfolgreich aus der DB gelöscht', 200

    @projectmanager.expect(participation)
    def put(self, id):
        """Teilnahme wird aktualisiert"""
        adm = ProjectAdministration()
        participation = Participation.from_dict(api.payload)

        if participation is None:
            return "Teilnahme konnte nicht geändert werden", 500

        else:
            participation.set_id(id)
            adm.save_participation(participation)
            return "Teilnahme wurde erfolgreich geändert", 200

"""PS Methoden"""
@projectmanager.route("/participationstudent/<int:id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Participation-Objekts')
class PSOperations(Resource):
    @projectmanager.marshal_with(ps)
    def get(self, id):
        """Auslesen einer Particpation mit Studenten Daten"""
        adm = ProjectAdministration()
        ps = adm.get_particpationstudent_by_key(id)
        return ps

"""PV Methoden"""
@projectmanager.route("/participationvalidation/<int:id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Participation-Objekts')
class PVOperations(Resource):
    @projectmanager.marshal_with(pv)
    def get(self, id):
        """Auslesen einer Particpation mit Validation Daten"""
        adm = ProjectAdministration()
        pv = adm.get_participationvalidation_by_key(id)
        return pv

@projectmanager.route("/participationvalidation/")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class PVOPerations(Resource):
    @projectmanager.marshal_with(pv)
    def get(self):
        """Auslesen aller Particpation mit Validation Daten"""
        adm = ProjectAdministration()
        pv1 = adm.get_all_participationvalidation()
        return pv1

"""Project"""
@projectmanager.route('/project')
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectOperations(Resource):
    @projectmanager.marshal_with(project, code=200)
    @projectmanager.expect(project)
    #@secured
    def post(self):
        """Ein neues Projekt in der DB anlegen"""
        adm = ProjectAdministration()
        pan = Project.from_dict(api.payload)

        if pan is not None:
            project_list = adm.create_project(pan.get_name(),pan.get_lecturer_id(),pan.get_project_type_id(), pan.get_project_description(), pan.get_partners(),
                                              pan.get_capacity (), pan.get_preferred_room(), pan.get_b_days_pre_schedule(),
                                                pan.get_b_days_finale(), pan.get_b_days_saturdays(), pan.get_preferred_b_days(),
                                                pan.get_additional_lecturer(), pan.get_weekly())
            return project_list
        else:
            return "Automat not found", 500


@projectmanager.route("/project/<int:id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Projekt-Objekts')
class ProjectOperations(Resource):
    @projectmanager.marshal_with(project)
    def get(self, id):
        """Auslesen eines Projektes aus der DB"""
        adm = ProjectAdministration()
        project = adm.get_project_by_id(id)
        return project

    def delete(self, id):
        """Löschen eines Projektes aus der DB"""
        adm = ProjectAdministration()
        project = adm.get_project_by_id(id)
        if project is None:
            return 'Projekt konnte nicht aus der DB gelöscht werden', 500
        else:
            adm.delete_project(project)
            return 'Projekt wurde erfolgreich aus der DB gelöscht', 200

    @projectmanager.expect(project)
    def put(self, id):
        """Projekt wird aktualisiert"""
        adm = ProjectAdministration()
        project = Project.from_dict(api.payload)

        if project is None:
            return "Projekt konnte nicht geändert werden", 500

        else:
            project.set_id(id)
            adm.save_project(project)
            return "Projekt wurde erfolgreich geändert", 200

@projectmanager.route("/project/")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectOperationss(Resource):
    @projectmanager.marshal_with(project)
    def get(self):
        """Auslesen aller Projekte aus der DB"""
        adm = ProjectAdministration()
        project = adm.get_all_projects()
        return project

@projectmanager.route("/project/<int:id>/lecturer")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Dozent-Objekts')
class ProjectRelatedUserOperations(Resource):
    @projectmanager.marshal_with(project)
    def get(self, id):
        """Auslesen aller Projekt-Objekte bzgl. eines bestimmten Dozenten-Objekts.

        Das Dozenten-Objekt dessen Projekt wir lesen möchten, wird durch die id in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        proj = adm.get_user_by_id(id)

        if proj is not None:
            project_list = adm.get_project_by_lecturer_id(proj)
            return project_list
        else:
            return "", 500

@projectmanager.route("/project/<int:id>/project_type")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Projekt_type-Objekts')
class ProjectRelatedProject_typeOperations(Resource):
    @projectmanager.marshal_with(project)
    def get(self, id):
        """Auslesen aller Projekt-Objekte bzgl. eines bestimmten Projekttypen-Objekts.

        Das Projekktypen-Objekt dessen Projekt wir lesen möchten, wird durch die id in dem URI bestimmt.
        """
        adm = ProjectAdministration()
        proje = adm.get_project_type_by_id(id)

        if proje is not None:
            project_liste = adm.get_project_by_project_type_id(proje)
            return project_liste
        else:
            return "", 500


"Projec&Participation"

@projectmanager.route('/project/<int:id>/participation')
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Projekt-Objekts')
class ProjectRelatedParticipationOperations(Resource):
    @projectmanager.marshal_with(participation)
    #@secured
    def get(self, id):
        """Auslesen aller Teilnahme-Objekte bzgl. eines bestimmten Projekt-Objekts.
        """
        adm = ProjectAdministration()
        # Zunächst benötigen wir den durch id gegebenen Projekt.
        proj = adm.get_project_by_id(id)

        # Haben wir eine brauchbare Referenz auf ein Projekt-Objekt bekommen?
        if proj is not None:
            # Jetzt erst lesen wir die Teilnahmen des Projektes aus.
            project_list = adm.get_participation_of_project(proj)
            return project_list
        else:
            return "Project not found", 500

"""Project_type"""
@projectmanager.route("/project_type")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class Project_typeOperations(Resource):
    @projectmanager.marshal_with(project_type, code=200)
    @projectmanager.expect(project_type)
    def post(self):
        """Project Typen erstellen"""
        adm = ProjectAdministration()
        proposal = Project_type.from_dict(api.payload)
        if proposal is not None:
            c = adm.create_project_type(proposal.get_name(), proposal.get_ects(), proposal.get_sws())
            return c, 200
        else:
            return '', 500

@projectmanager.route("/project_type/<int:id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Project_typen-Objekts')
class Project_typeOperations(Resource):
    @projectmanager.marshal_with(project_type)
    def get(self, id):
        """Auslesen eines Projekt Typen aus der DB"""
        adm = ProjectAdministration()
        project_type = adm.get_project_type_by_id(id)
        return project_type

    def delete(self, id):
        """Löschen eines Projekt Typen aus der DB"""
        adm = ProjectAdministration()
        project_type = adm.get_project_type_by_id(id)
        if project_type is None:
            return 'Projekt Typ konnte nicht aus der DB gelöscht werden', 500
        else:
            adm.delete_project_type(project_type)
            return 'Projekt Typ wurde erfolgreich aus der DB gelöscht', 200

    @projectmanager.expect(project_type)
    def put(self, id):
        """Projekt Typ wird aktualisiert"""
        adm = ProjectAdministration()
        project_type = Project_type.from_dict(api.payload)

        if project_type is None:
            return "Projekt Typ konnte nicht geändert werden", 500

        else:
            project_type.set_id(id)
            adm.save_project_type(project_type)
            return "Projekt Typ wurde erfolgreich geändert", 200

"""Role"""
#@projectmanager.route("/role")
#class RoleOperations(Resource):
#    @projectmanager.marshal_with(role, code=200)
#    @projectmanager.expect(role)
#    def post(self):
#        """Rolle erstellen"""
#       adm = ProjectAdministration()
#        r = Role.from_dict(api.payload)
#        if r is not None:
#            c = adm.create_role(r.get_name())
#            return c, 200
#        else:
#            return '', 500

@projectmanager.route("/role/<int:id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Rollen-Objekts')
class RoleOperations(Resource):
    @projectmanager.marshal_with(role)
    def get(self, id):
        """Auslesen einer Rolle aus der DB"""
        adm = ProjectAdministration()
        role = adm.get_role_by_id(id)
        return role

#    def delete(self, id):
#        """Löschen einer Rolle aus der DB"""
#        adm = ProjectAdministration()
#        role = adm.get_role_by_id(id)
#        if role is None:
#            return 'Rolle konnte nicht aus der DB gelöscht werden', 500
#        else:
#            adm.delete_role(role)
#            return 'Rolle wurde erfolgreich aus der DB gelöscht', 200

#    @projectmanager.expect(role)
#    def put(self, id):
#        """Rolle wird aktualisiert"""
#        adm = ProjectAdministration()
#        role = Role.from_dict(api.payload)

#        if role is None:
#            return "Rolle konnte nicht geändert werden", 500

#        else:
#            role.set_id(id)
#            adm.save_role(role)
#            return "Rolle wurde erfolgreich geändert", 200

"""Semester"""
@projectmanager.route("/semester")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class SemesterOperations(Resource):
    @projectmanager.marshal_with(semester, code=200)
    @projectmanager.expect(semester)
    def post(self):
        """Semester erstellen"""
        adm = ProjectAdministration()
        proposal = Semester.from_dict(api.payload)
        if proposal is not None:
            c = adm.create_semester(proposal.get_name(), proposal.get_semester_number())
            return c, 200
        else:
            return '', 500

@projectmanager.route("/semester/<int:id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Semester-Objekts')
class SemesterOperations(Resource):
    @projectmanager.marshal_with(semester)
    def get(self, id):
        """Auslesen eines Semester aus der DB"""
        adm = ProjectAdministration()
        semester = adm.get_semester_by_id(id)
        return semester

    def delete(self, id):
        """Löschen eines Semester aus der DB"""
        adm = ProjectAdministration()
        semester = adm.get_semester_by_id(id)
        if semester is None:
            return 'Semester konnte nicht aus der DB gelöscht werden', 500
        else:
            adm.delete_semester(semester)
            return 'Semester wurde erfolgreich aus der DB gelöscht', 200

    @projectmanager.expect(semester)
    def put(self, id):
        """Semester wird aktualisiert"""
        adm = ProjectAdministration()
        semester = Semester.from_dict(api.payload)

        if semester is None:
            return "Semester konnte nicht geändert werden", 500

        else:
            semester.set_id(id)
            adm.save_semester(semester)
            return "Semester wurde erfolgreich geändert", 200

"""Student"""
@projectmanager.route("/student")
class StudentOperations(Resource):
    @projectmanager.marshal_with(student, code=200)
    @projectmanager.expect(student)
    def post(self):
        """Student erstellen"""
        adm = ProjectAdministration()
        student = Student.from_dict(api.payload)
        if student is not None:
            c = adm.create_student(student.get_name(), student.get_firstname(), student.get_course(),
                                   student.get_matriculation_number(),
                                   student.get_mail(), student.get_google_id(),)
            return c, 200
        else:
            return '', 500

@projectmanager.route("/student/<int:id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Studenten-Objekts')
class StudentOperations(Resource):
    @projectmanager.marshal_with(student)
    def get(self, id):
        """Auslesen eines Studenten aus der Datenbank"""
        adm = ProjectAdministration()
        student = adm.get_student_by_id(id)
        return student

#    def delete(self,id):
#        """Löschen eines Studenten aus der DB"""
#        adm = ProjectAdministration()
#        student = adm.get_student_by_id(id)
#        if student is None:
#            return 'Student konnte nicht aus der DB gelöscht werden', 500
#        else:
#            adm.delete_student(student)
#            return 'Student wurde erfolgreich aus der DB gelöscht', 200

    @projectmanager.expect(student)
    def put(self, id):
        """Student werden aktualisiert"""
        adm = ProjectAdministration()
        student = Student.from_dict(api.payload)

        if student is None:
            return "Student konnte nicht geändert werden", 500

        else:
            student.set_id(id)
            adm.save_student(student)
            return "Student wurde erfolgreich geändert", 200

"Student&Participation"

@projectmanager.route('/student/<int:id>/participation')
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Student-Objekts')
class StudentRelatedParticipationOperations(Resource):
    @projectmanager.marshal_with(participation)
    #@secured
    def get(self, id):
        """Auslesen aller Teilnahme-Objekte bzgl. eines bestimmten Student-Objekts.
        """
        adm = ProjectAdministration()
        # Zunächst benötigen wir den durch id gegebenen Studenten.
        stud = adm.get_student_by_id(id)

        # Haben wir eine brauchbare Referenz auf ein Student-Objekt bekommen?
        if stud is not None:
            # Jetzt erst lesen wir die Teilnahme des Studenten aus.
            student_list = adm.get_participation_of_student(stud)
            return student_list
        else:
            return "Student not found", 500

    @projectmanager.marshal_with(participation, code=201)
    #@secured
    def post(self, id):
        """Anlegen einer Teilnahme für ein gegebenen Studenten.

        Die neu angelegte Teilnahme wird als Ergebnis zurückgegeben.

        **Hinweis:** Unter der id muss ein Student existieren, andernfalls wird Status Code 500 ausgegeben."""
        adm = ProjectAdministration()
        """Stelle fest, ob es unter der id einen Studenten gibt. 
        Dies ist aus Gründen der referentiellen Integrität sinnvoll!
        """
        stud = adm.get_student_by_id(id)

        if stud is not None:
            # Jetzt erst macht es Sinn, für den Studenten eine neue Teilnahme anzulegen und diese zurückzugeben.
            result = adm.create_particpation_for_student(stud)
            return result
        else:
            return "Student unknown", 500

"""User"""
@projectmanager.route("/user")
class UserOperations(Resource):
    @projectmanager.marshal_with(user, code=200)
    @projectmanager.expect(user)
    def post(self):
        """User erstellen"""
        adm = ProjectAdministration()
        user = User.from_dict(api.payload)
        if user is not None:
            c = adm.create_user(user.get_name(), user.get_firstname(), user.get_mail(),
                                user.get_google_id())
            return c, 200
        else:
            return '', 500

@projectmanager.route("/user/<int:id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des User-Objekts')
class UserOperations(Resource):
    @projectmanager.marshal_with(user)
    def get(self, id):
        """Auslesen eines Users aus der Datenbank"""
        adm = ProjectAdministration()
        user = adm.get_user_by_id(id)
        return user

#    def delete(self,id):
#        """Löschen eines Users aus der DB"""
#        adm = ProjectAdministration()
#        user = adm.get_user_by_id(id)
#        if user is None:
#            return 'User konnte nicht aus der DB gelöscht werden', 500
#        else:
#            adm.delete_user(user)
#            return 'User wurde erfolgreich aus der DB gelöscht', 200

    @projectmanager.expect(user)
    def put(self, id):
        """User wird aktualisiert"""
        adm = ProjectAdministration()
        user = User.from_dict(api.payload)

        if user is None:
            return "User konnte nicht geändert werden", 500

        else:
            user.set_id(id)
            adm.save_user(user)
            return "User wurde erfolgreich geändert", 200

#@projectmanager.route("/user/<int:id>/role")
#@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
#@projectmanager.param('id', 'Die ID des User-Objekts')
#class RoleUserOperations(Resource):
#    @projectmanager.marshal_with(role)
#    def get(self, id):
#        """Versuch 1"""
#        adm = ProjectAdministration()
#        rol = adm.get_user_by_id(id)
#
#        if rol is not None:
#            role = adm.get_role_by_name(rol)
#            return role
#        else:
#           return "Role not found", 500

#@projectmanager.route("/user/<int:id>/roles")
#@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
#@projectmanager.param('id', 'Die ID des Rollen-Objekts')
#class RoleRelatedUserOperations(Resource):
#    @projectmanager.marshal_with(test)
#    def get(self, id):
#        """Versuch 2"""
#        adm = ProjectAdministration()
#        ro = adm.get_user_by_id(id)
#        if ro is not None:
#            role_list = adm.get_user_by_role_id(ro)
#            return role_list
#        else:
#            return '', 500

"""Validation"""
@projectmanager.route("/validation")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ValidationOperations(Resource):
    @projectmanager.marshal_with(validation, code=200)
    @projectmanager.expect(validation)
    def post(self):
        """Bewertung erstellen"""
        adm = ProjectAdministration()
        proposal = Validation.from_dict(api.payload)
        if proposal is not None:
            c = adm.create_validation(proposal.get_grade())
            return c, 200
        else:
            return '', 500

@projectmanager.route("/validation/<int:id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Bewertungs-Objekts')
class ValidationOperations(Resource):
    @projectmanager.marshal_with(validation)
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

    @projectmanager.expect(validation)
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

if __name__ == '__main__':
    app.run(debug=True)