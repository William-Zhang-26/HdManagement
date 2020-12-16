from src.server.bo.NamedBusinessObject import NamedBusinessObject

class Role(NamedBusinessObject):

    def __init__(self, role):
        super().__init__()
        self._name = role

    def __eq__(self, another):
        if isinstance(another, Role):
            return self._name == another._name
        else:
            return False

    @staticmethod
    def from_dict(dict = dict()):
        new_role = Role()
        new_role.set_id(dict["id"])
        new_role.set_name(dict["name"])
        new_role.set_create_time(dict["create_time"])
        return new_role
