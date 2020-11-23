import mysql.connector as connector
from contextlib import AbstractContextManager
from abc import ABC, abstractmethod

class Mapper (AbstractContextManager, ABC):
    """Abstrakte Basisklasse aller Mapper-Klassen"""
