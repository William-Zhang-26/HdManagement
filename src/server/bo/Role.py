from src.server.bo.NamedBusinessObject import NamedBusinessObject

class Role(NamedBusinessObject):

    def __init__(self):
        super().__init__()

    @staticmethod
    def from_dict(dict = dict()):
        new_role = Role()
        new_role.set_id(dict["id"])
        new_role.set_name(dict["name"])
        new_role.set_create_time(dict["create_time"])
        return new_role
