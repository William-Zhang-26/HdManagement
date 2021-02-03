from server.bo.NamedBusinessObject import NamedBusinessObject

class Assignment(NamedBusinessObject):

    def __init__(self):
        super().__init__()

    @staticmethod
    def from_dict(dict=dict()):
        new_assignment = Assignment()
        new_assignment.set_id(dict["id"])
        new_assignment.set_name(dict["name"])
        new_assignment.set_create_time(dict["create_time"])
        return new_assignment