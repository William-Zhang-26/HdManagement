from server.bo.Automat import Automat
from server.bo.State import State

class Project(Automat):
    """
    Realisierung der Projekte
    """

    s_new = State("neu")
    s_dismissed = State("abgelehnt")
    s_approved = State("genehmigt")
    s_inreview = State("in Bewertung")
    s_reviewed = State("Bewertung abgeschlossen")

    def __init__(self):
        super().__init__(Project.s_new)
        self._user_id = 0
        self._project_type_id = 0
        self._state_id = 1
        self._semester_id = 0
        self._assignment_id = 0
        self._project_description = ""
        self._partners = ""
        self._capacity = 0
        self._preferred_room = ""
        self._b_days_pre_schedule = ""
        self._b_days_finale = ""
        self._b_days_saturdays = ""
        self._preferred_b_days = ""
        self._additional_lecturer = ""
        self._weekly = bool


    def get_user_id(self):
        """Auslesen der Dozent-ID"""
        return self._user_id

    def set_user_id(self, new_user_id):
        """Setzen der Dozent_ID"""
        self._user_id = new_user_id

    def get_project_type_id(self):
        """Auslesen des Projekttyp-ID"""
        return self._project_type_id
    
    def set_project_type_id(self, new_project_type_id):
        """Setzen des Projekttyp-ID"""
        self._project_type_id = new_project_type_id

    def get_state_id(self):
        """Auslesen der Zustand-ID"""
        return self._state_id

    def set_state_id(self, new_state_id):
        """Setzen des Zustand-ID"""
        self._state_id = new_state_id

    def get_semester_id(self):
        """Auslesen der Semester-ID"""
        return self._semester_id

    def set_semester_id(self, new_semester_id):
        """Setzen des Semesters-ID"""
        self._semester_id = new_semester_id

    def get_assignment_id(self):
        """Auslesen der Assignment-ID"""
        return self._assignment_id

    def set_assignment_id(self, new_assignment_id):
        """Setzen des Assignments-ID"""
        self._assignment_id = new_assignment_id

    def get_project_description(self):
        """Auslesen der Projektbeschreibung"""
        return self._project_description

    def set_project_description(self, new_project_description):
        """Setzen der Projektbeschreibung"""
        self._project_description = new_project_description

    def get_partners(self):
        """"Auslesen der Partner"""
        return self._partners

    def set_partners(self, new_partners):
        """"Setzen der Partner"""
        self._partners = new_partners

    def get_capacity(self):
        """Auslesen der Kapazität"""
        return self._capacity

    def set_capacity(self, new_capacity):
        """Setzen der Kapazität"""
        self._capacity = new_capacity

    def get_preferred_room(self):
        """Auslesen der Raumnummer"""
        return self._preferred_room

    def set_preferred_room(self, new_preferred_room):
        """Setzen der Raumnummer"""
        self._preferred_room = new_preferred_room

    def get_b_days_pre_schedule(self):
        """Auslesen der Blocktage"""
        return self._b_days_pre_schedule

    def set_b_days_pre_schedule(self, new_b_days_pre_schedule):
        """Setzen der Blocktage"""
        self._b_days_pre_schedule = new_b_days_pre_schedule

    def get_b_days_finale(self):
        """Auslesen der letzten Blocktage"""
        return self._b_days_finale

    def set_b_days_finale(self, new_b_days_finale):
        """Setzen der letzten Blocktage"""
        self._b_days_finale = new_b_days_finale

    def get_b_days_saturdays(self):
        """Auslesen der Blocktage am Wochenende"""
        return self._b_days_saturdays

    def set_b_days_saturdays(self, new_b_days_saturdays):
        """Setzen der Blocktage am Wochenende"""
        self._b_days_saturdays = new_b_days_saturdays

    def get_preferred_b_days(self):
        """Auslesen der bevorzugten Blocktage"""
        return self._preferred_b_days

    def set_preferred_b_days(self, new_preferred_b_days):
        """Setzen der bevorzugten Blocktage"""
        self._preferred_b_days = new_preferred_b_days

    def get_additional_lecturer(self):
        """Auslesen der betreuenden Dozenten"""
        return self._additional_lecturer

    def set_additional_lecturer(self, new_additional_lecturer):
        """Setzen der betreuenden Dozenten"""
        self._additional_lecturer = new_additional_lecturer

    def get_weekly(self):
        """Auslesen ob die Termine wöchentlich sind"""
        return self._weekly

    def set_weekly(self, new_weekly):
        """Setzen ob die Termine wöchhentlich sind"""
        self._weekly = new_weekly

    def __str__(self):
        return self._name


    @staticmethod
    def from_dict(dict = dict()):
        new_project = Project()
        new_project.set_id(dict["id"])
        new_project.set_name(dict["name"])
        new_project.set_user_id(dict["user_id"])
        new_project.set_project_type_id(dict["project_type_id"])
        new_project.set_state_id(dict["state_id"])
        new_project.set_semester_id(dict["semester_id"])
        new_project.set_assignment_id(dict["assignment_id"])
        new_project.set_project_description(dict["project_description"])
        new_project.set_partners(dict["partners"])
        new_project.set_capacity(dict["capacity"])
        new_project.set_preferred_room(dict["preferred_room"])
        new_project.set_b_days_pre_schedule(dict["b_days_pre_schedule"])
        new_project.set_b_days_finale(dict["b_days_finale"])
        new_project.set_b_days_saturdays(dict["b_days_saturdays"])
        new_project.set_preferred_b_days(dict["preferred_b_days"])
        new_project.set_additional_lecturer(dict["additional_lecturer"])
        new_project.set_weekly(dict["weekly"])
        new_project.set_create_time(dict["create_time"])
        return new_project

"""
if __name__ == "__main__":
    p = Project("It-Projekt von Thies und Kunz")
    if p.is_in_state(Project.s_new):
        print(p, "ist neu")
"""

