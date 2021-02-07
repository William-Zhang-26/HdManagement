from flask import Flask, jsonify
from flask_restx import Api, Resource, fields
from flask_cors import CORS


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

from server.ProjectAdministration import ProjectAdministration

from SecurityDecorator import secured

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


"""Participation, Validation und NamedBusinessObject sind BusinessObjects..."""

participation = api.inherit('Participation', bo, {
    'module_id': fields.Integer(attribute='_module_id', description='Die ID des zugehörigen Moduls'),
    'project_id': fields.Integer(attribute='_project_id', description='Die ID des zugehörigen Projektes'),
    'student_id': fields.Integer(attribute='_student_id', description='Die ID des zugehörigen Studenten'),
    'validation_id': fields.Integer(attribute='_validation_id', description='Die ID der zugehörigen Bewertung')
})

validation = api.inherit('Validation', bo, {
    'grade': fields.String(attribute='_grade', description='Bewertung eines Projektes')
})

nbo = api.inherit('NamedBusinessObject', bo, {
    'name': fields.String(attribute='_name', description='Der Name von einem NamedBusinessObject')
})

"""Darauffolgend werden analog zu unseren NamedBusinessObject-Klassen wie bei den BusinessObjects transferierbare Strukturen angelegt.

NamedBusinessObject dient als Basisklasse, auf der die weiteren Strukturen Module, Project, Semester, Role und Project_type aufsetzen."""

"""Zuteilung"""

assignment = api.inherit('Assignment', nbo, {

})

"""Modul"""

module = api.inherit('Module', nbo, {
    'assignment_id': fields.Integer(attribute='_assignment_id', description='Die Assignment_id von dem Modul')
})

"""Projekt"""

project = api.inherit('Project', nbo, {
    'user_id': fields.Integer(attribute='_user_id', description='Die ID des zugehörigen Dozenten'),
    'project_type_id': fields.Integer(attribute='_project_type_id', description='Die ID des zugehörigen Projekttypen'),
    'state_id': fields.Integer(attribute='_state_id', description='Die ID des zugehörigen Zustandes'),
    'semester_id': fields.Integer(attribute='_semester_id', description='Die ID des zugehörigen Semesters'),
    'assignment_id': fields.Integer(attribute='_assignment_id', description='Die ID des zugehörigen Assignments'),
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

"""Semester"""

semester = api.inherit('Semester', nbo, {
    'current_semester': fields.Integer(attribute='_current_semester', description='Gibt an ob es das akutelle Semester ist')
})

"""Rolle"""

role = api.inherit('Role', nbo, {
    
})

"""Projekt_Txp"""

project_type = api.inherit('Project_type', nbo, {
    'ects': fields.String(attribute='_ects', description='Die ECTS Punkte von dem Projekt'),
    'sws': fields.String(attribute='_sws', description='Die SWS Punkte von dem Projekt')
})

"""User"""

user = api.inherit('User', nbo, {
    'mail': fields.String(attribute='_mail', description='Die E-Mail eines Users'),
    'google_id': fields.String(attribute='_google_id', description='Die Google-ID eines Users'),
    'role_id': fields.Integer(attribute='_role_id', description='Die ID der zugehörigen Rolle')
})

"""Student"""

student = api.inherit('Student', nbo, {
    'mail': fields.String(attribute='_mail', description='Die E-Mail eines Studenten'),
    'google_id': fields.String(attribute='_google_id', description='Die Google-ID eines Studenten'),
    'user_id': fields.Integer(attribute='_user_id', description='Die ID der zugehörigen Users'),
    'course': fields.String(attribute='_course', description='Der zugehörige Kurs'),
    'matriculation_number': fields.Integer(attribute='_matriculation_number', description='Die Matrikelnummer des Studenten')
})

"""Zustand"""

state = api.inherit('State', nbo, {

})


"""Assignment"""

#@projectmanager.route("/assignment")
#@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
#class AssignmentOperations(Resource):
#    def post(self):
#        """Zuteilung erstellen"""

#        adm = ProjectAdministration()
#        assign = Assignment.from_dict(api.payload)
#        if assign is not None:
#            c = adm.create_assignment(assign.get_name())
#            return c, 200
#        else:
#            return '', 500

@projectmanager.route("/assignment/<int:id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Zustand-Objekts')
class AssignmentsOperations(Resource):
    @projectmanager.marshal_with(assignment)
    @secured
    def get(self, id):
        """Zuteilung auslesen"""

        adm = ProjectAdministration()
        assign = adm.get_assignment_by_id(id)
        return assign

@projectmanager.route("/assignment/")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AssignmentsOperationss(Resource):
    @projectmanager.marshal_with(assignment)
    @secured
    def get(self):
        """Auslesen aller Zuteilungen aus der DB"""
        adm = ProjectAdministration()
        assign = adm.get_all_assignment()
        return assign


"""State"""

#@projectmanager.route("/state")
#@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
#class StateOperations(Resource):
#    @projectmanager.marshal_with(state, code=200)
#    @projectmanager.expect(state)
#    @secured
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
    @secured
    def get(self, id):
        """Auslesen eines Zustandes aus der DB"""
        adm = ProjectAdministration()
        state = adm.get_state_by_id(id)
        return state

#    @secured
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
#    @secured
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

#@projectmanager.route("/module")
#@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
#class ModuleOperations(Resource):
    #@projectmanager.marshal_with(module, code=200)
    #@projectmanager.expect(module)
    #@secured
    #def post(self):
        #"""Modul erstellen"""
        #adm = ProjectAdministration()
        #proposal = Module.from_dict(api.payload)
        #if proposal is not None:
            #c = adm.create_module(proposal.get_name(), proposal.get_assignment_id())
            #return c, 200
        #else:
            #return '', 500

@projectmanager.route("/module/<int:id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Modul-Objekts')
class ModuleOperations(Resource):
    @projectmanager.marshal_with(module)
    @secured
    def get(self, id):
        """Auslesen eines Moduls aus der DB"""
        adm = ProjectAdministration()
        module = adm.get_module_by_id(id)
        return module

    #@secured
    #def delete(self, id):
        #"""Löschen eines Moduls aus der DB"""
        #adm = ProjectAdministration()
        #module = adm.get_module_by_id(id)
        #if module is None:
            #return 'Modul konnte nicht aus der DB gelöscht werden', 500
        #else:
            #adm.delete_module(module)
            #return 'Modul wurde erfolgreich aus der DB gelöscht', 200

    #@projectmanager.expect(module)
    #@secured
    #def put(self, id):
        #"""Modul wird aktualisiert"""
        #adm = ProjectAdministration()
        #module = Module.from_dict(api.payload)

        #if module is None:
            #return "Modul konnte nicht geändert werden", 500

        #else:
            #module.set_id(id)
            #adm.save_module(module)
            #return "Modul wurde erfolgreich geändert", 200


"""Modul&Zuteilung"""

@projectmanager.route("/module/<int:id>/assignment")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Assignments-Objekts')
class ModuleRelatedAssignmentOperations(Resource):
    @projectmanager.marshal_with(module)
    @secured
    def get(self, id):
        """Auslesen aller Module-Objekte per Zuteilungs_id
        """
        adm = ProjectAdministration()
        mdl = adm.get_assignment_by_id(id)

        if mdl is not None:
            module_list = adm.get_module_by_assignment_id(mdl)
            return module_list
        else:
            return "", 500


"""Participation"""

@projectmanager.route("/participation")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ParticipationOperationen(Resource):
    @projectmanager.marshal_with(participation, code=200)
    @projectmanager.expect(participation)
    @secured
    def post(self):
        """Teilnahme erstellen"""
        adm = ProjectAdministration()
        proposal = Participation.from_dict(api.payload)
        if proposal is not None:
            c = adm.create_participation(proposal.get_module_id(), proposal.get_project_id(), proposal.get_student_id())
            return c, 200
        else:
            return '', 500

@projectmanager.route("/participation/<int:id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Teilnahme-Objekts')
class ParticipationOperationen(Resource):
    @projectmanager.marshal_with(participation)
    @secured
    def get(self,id):
        """Auslesen einer Teilnahme aus der DB """
        adm = ProjectAdministration()
        participation = adm.get_participation_by_id(id)
        return participation

    @secured
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
    @secured
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


"""Alle Teilnahmen"""

@projectmanager.route("/all_participations/")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class AllParticipationsOperations(Resource):
    @projectmanager.marshal_with(participation)
    @secured
    def get(self):
        """Auslesen aller vorhandenen Teilnahmen"""
        adm = ProjectAdministration()
        participations = adm.get_all_participations()
        return participations


"""Project"""

@projectmanager.route('/project')
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectOperations(Resource):
    @projectmanager.marshal_with(project, code=200)
    @projectmanager.expect(project)
    @secured
    def post(self):
        """Ein neues Projekt in der DB anlegen"""
        adm = ProjectAdministration()
        pan = Project.from_dict(api.payload)

        if pan is not None:
            project_list = adm.create_project(pan.get_name(),pan.get_user_id(),pan.get_project_type_id(), pan.get_semester_id(),
                                                pan.get_assignment_id(), pan.get_project_description(), pan.get_partners(),
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
    @secured
    def get(self, id):
        """Auslesen eines Projektes aus der DB per ID"""
        adm = ProjectAdministration()
        project = adm.get_project_by_id(id)
        return project

    @secured
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
    @secured
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


"""Alle Projekte"""

@projectmanager.route("/project/")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ProjectOperationss(Resource):
    @projectmanager.marshal_with(project)
    @secured
    def get(self):
        """Auslesen aller Projekte aus der DB"""
        adm = ProjectAdministration()
        project = adm.get_all_projects()
        return project


"""Projekt&User"""

@projectmanager.route("/project/<int:id>/user")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Dozent-Objekts')
class ProjectRelatedUserOperations(Resource):
    @projectmanager.marshal_with(project)
    @secured
    def get(self, id):
        """Auslesen aller Projekt per User_id
        """
        adm = ProjectAdministration()
        proj = adm.get_user_by_id(id)

        if proj is not None:
            project_list = adm.get_project_by_user_id(proj)
            return project_list
        else:
            return "", 500


"""Projekt&Projekt_Typ"""

@projectmanager.route("/project/<int:id>/project_type")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Projekt_type-Objekts')
class ProjectRelatedProject_typeOperations(Resource):
    @projectmanager.marshal_with(project)
    @secured
    def get(self, id):
        """Auslesen aller Projekt per Projekt_Typ_id
        """
        adm = ProjectAdministration()
        proje = adm.get_project_type_by_id(id)

        if proje is not None:
            project_liste = adm.get_project_by_project_type_id(proje)
            return project_liste
        else:
            return "", 500


"""Projekt&Zuteilung"""

@projectmanager.route("/project/<int:id>/assignment")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Assignment-Objekts')
class ProjectRelatedAssignmentOperations(Resource):
    @projectmanager.marshal_with(project)
    @secured
    def get(self, id):
        """Auslesen aller Projekte per assignement_id
        """
        adm = ProjectAdministration()
        assign = adm.get_assignment_by_id(id)

        if assign is not None:
            project_liste = adm.get_project_by_assignment_id(assign)
            return project_liste
        else:
            return "", 500


"""Projec&Participation"""

@projectmanager.route('/project/<int:id>/participation')
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Projekt-Objekts')
class ProjectRelatedParticipationOperations(Resource):
    @projectmanager.marshal_with(participation)
    @secured
    def get(self, id):
        """Auslesen aller Projekte per Teilnahme_id
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
    @secured
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
    @secured
    def get(self, id):
        """Auslesen eines Projekt Typen aus der DB"""
        adm = ProjectAdministration()
        project_type = adm.get_project_type_by_id(id)
        return project_type

    @secured
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
    @secured
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
#    @secured
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
    @secured
    def get(self, id):
        """Auslesen einer Rolle aus der DB"""
        adm = ProjectAdministration()
        role = adm.get_role_by_id(id)
        return role

#    @secured
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
#    @secured
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
    @secured
    def post(self):
        """Semester erstellen"""
        adm = ProjectAdministration()
        proposal = Semester.from_dict(api.payload)
        if proposal is not None:
            c = adm.create_semester(proposal.get_name(), proposal.get_current_semester())
            return c, 200
        else:
            return '', 500

@projectmanager.route("/semester/<int:id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Semester-Objekts')
class SemesterOperations(Resource):
    @projectmanager.marshal_with(semester)
    @secured
    def get(self, id):
        """Auslesen eines Semester aus der DB"""
        adm = ProjectAdministration()
        semester = adm.get_semester_by_id(id)
        return semester

    @secured
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
    @secured
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


"""Semester&AktuellesSemester"""

@projectmanager.route("/semesterr/<int:current_semester>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class SemesterCurrentSemesterOperations(Resource):
    @projectmanager.marshal_with(semester)
    @secured
    def get(self, current_semester):
        """Auslesen eines Semesters aus der Datenbank mit dem Current Semester"""
        adm = ProjectAdministration()
        sem = adm.get_semester_by_current_semester(current_semester)
        return sem


"""Student"""

@projectmanager.route("/student")
class StudentOperations(Resource):
    @projectmanager.marshal_with(student, code=200)
    @projectmanager.expect(student)
    @secured
    def post(self):
        """Student erstellen"""
        adm = ProjectAdministration()
        student = Student.from_dict(api.payload)
        if student is not None:
            c = adm.create_student(student.get_user_id(), student.get_name(),
                                   student.get_course(),
                                   student.get_matriculation_number(),
                                   student.get_mail(), student.get_google_id())
            return c, 200
        else:
            return '', 500

@projectmanager.route("/student/<int:id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Studenten-Objekts')
class StudentOperations(Resource):
    @projectmanager.marshal_with(student)
    @secured
    def get(self, id):
        """Auslesen eines Studenten aus der Datenbank per ID"""
        adm = ProjectAdministration()
        student = adm.get_student_by_id(id)
        return student

    @secured
    def delete(self,id):
        """Löschen eines Studenten aus der DB"""
        adm = ProjectAdministration()
        student = adm.get_student_by_id(id)
        if student is None:
            return 'Student konnte nicht aus der DB gelöscht werden', 500
        else:
            adm.delete_student(student)
            return 'Student wurde erfolgreich aus der DB gelöscht', 200

    @projectmanager.expect(student)
    @secured
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


"""Student&Google_id"""

@projectmanager.route("/student/<string:google_id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('google_id', 'Die Google_ID des Studenten-Objekts')
class StudentOperationswithGoogle_id(Resource):
    @projectmanager.marshal_with(student)
    @secured
    def get(self, google_id):
        """Auslesen eines Studenten aus der Datenbank mit der Google_id"""
        adm = ProjectAdministration()
        students = adm.get_student_by_google_id(google_id)
        return students


"""Student&User_id"""

#@projectmanager.route("/student/<int:user_id>")
#@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
#@projectmanager.param('user_id', 'Die User_ID des Studenten-Objekts')
#class StudentOperationss(Resource):
#    @projectmanager.marshal_with(student)
#    @secured
#    def get(self, user_id):
#        """Auslesen eines Studenten aus der Datenbank mit der User_id"""
#        adm = ProjectAdministration()
#        student = adm.get_student_by_user_id(user_id)
#        return student


"""Alle Studenten"""

@projectmanager.route("/student/")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class StudentAllOperations(Resource):
    @projectmanager.marshal_with(student)
    @secured
    def get(self):
        """Auslesen aller Studenten"""
        adm = ProjectAdministration()
        study = adm.get_all_student()
        return study


"Student&Participation"

@projectmanager.route('/student/<int:id>/participation')
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Student-Objekts')
class StudentRelatedParticipationOperations(Resource):
    @projectmanager.marshal_with(participation)
    @secured
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

    #@projectmanager.marshal_with(participation, code=201)
    ##@secured
    #def post(self, id):
        #"""Anlegen einer Teilnahme für ein gegebenen Studenten.

        #Die neu angelegte Teilnahme wird als Ergebnis zurückgegeben.

        #**Hinweis:** Unter der id muss ein Student existieren, andernfalls wird Status Code 500 ausgegeben."""
        #adm = ProjectAdministration()
        #"""Stelle fest, ob es unter der id einen Studenten gibt.
        #Dies ist aus Gründen der referentiellen Integrität sinnvoll!
        #"""
        #stud = adm.get_student_by_id(id)

        #if stud is not None:
            # Jetzt erst macht es Sinn, für den Studenten eine neue Teilnahme anzulegen und diese zurückzugeben.
            #result = adm.create_particpation_for_student(stud)
            #return result
        #else:
            #return "Student unknown", 500


"""User"""

@projectmanager.route("/user")
class UserOperations(Resource):
    @projectmanager.marshal_with(user, code=200)
    @projectmanager.expect(user)
    @secured
    def post(self):
        """User erstellen"""
        adm = ProjectAdministration()
        user = User.from_dict(api.payload)
        if user is not None:
            c = adm.create_user(user.get_name(), user.get_mail(), user.get_google_id())
            return c, 200
        else:
            return '', 500

@projectmanager.route("/user/<int:id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des User-Objekts')
class UserOperations(Resource):
    @projectmanager.marshal_with(user)
    @secured
    def get(self, id):
        """Auslesen eines Users aus der Datenbank"""
        adm = ProjectAdministration()
        user = adm.get_user_by_id(id)
        return user

    @secured
    def delete(self,id):
        """Löschen eines Users aus der DB"""
        adm = ProjectAdministration()
        user = adm.get_user_by_id(id)
        if user is None:
            return 'User konnte nicht aus der DB gelöscht werden', 500
        else:
            adm.delete_user(user)
            return 'User wurde erfolgreich aus der DB gelöscht', 200

    @projectmanager.expect(user)
    @secured
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


"""Alle User"""

@projectmanager.route("/user/")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class UserAllOperations(Resource):
    @projectmanager.marshal_with(user)
    #@secured
    def get(self):
        """Auslesen aller User"""
        adm = ProjectAdministration()
        u = adm.get_all_user()
        return u


"""User&Google_id"""

@projectmanager.route("/user/<string:google_id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('string', 'Die Google_id des Users-Objekts')
class UserGoogleOperations(Resource):
    @projectmanager.marshal_with(user)
    @secured
    def get(self, google_id):
        """Auslesen eines Users aus der Datenbank mit der Google_id"""
        adm = ProjectAdministration()
        use = adm.get_user_by_google_id(google_id)
        return use

#@projectmanager.route("/user/<int:id>/role")
#@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
#@projectmanager.param('id', 'Die ID des User-Objekts')
#class RoleUserOperations(Resource):
#    @projectmanager.marshal_with(role)
#    @secured
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
#    @secured
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

#@projectmanager.route("/validation")
#@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
#class ValidationOperations(Resource):
    #@projectmanager.marshal_with(validation, code=200)
    #@projectmanager.expect(validation)
    #@secured
    #def post(self):
        #"""Bewertung erstellen"""
        #adm = ProjectAdministration()
        #proposal = Validation.from_dict(api.payload)
        #if proposal is not None:
            #c = adm.create_validation(proposal.get_grade())
            #return c, 200
        #else:
            #return '', 500

@projectmanager.route("/validation/<int:id>")
@projectmanager.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
@projectmanager.param('id', 'Die ID des Bewertungs-Objekts')
class ValidationOperations(Resource):
    @projectmanager.marshal_with(validation)
    @secured
    def get(self, id):
        """Auslesen einer Bewertung aus der DB"""
        adm = ProjectAdministration()
        validation = adm.get_validation_by_id(id)
        return validation

    #@secured
    #def delete(self, id):
        #"""Löschen einer Bewertung aus der DB"""
        #adm = ProjectAdministration()
        #validation = adm.get_validation_by_id(id)
        #if validation is None:
            #return 'Bewertung konnte nicht aus der DB gelöscht werden', 500
        #else:
            #adm.delete_validation(validation)
            #return 'Bewertung wurde erfolgreich aus der DB gelöscht', 200

    #@projectmanager.expect(validation)
    #@secured
    #def put(self, id):
        #"""Bewertung wird aktualisiert"""
        #adm = ProjectAdministration()
        #validation = Validation.from_dict(api.payload)

        #if validation is None:
            #return "Bewertung konnte nicht geändert werden", 500

        #else:
            #validation.set_id(id)
            #adm.save_validation(validation)
            #return "Bewertung wurde erfolgreich geändert", 200

if __name__ == '__main__':
    app.run(debug=True)