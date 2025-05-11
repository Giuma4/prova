    #models.py
from sqlalchemy import Column, Integer, String
from .database import Base


# Se vuoi ancora gestire gli "items", mantieni questo:
class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(String, index=True)

#saldo
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    balance = Column(Integer, default=1000)  # 💰 Nuovo campo saldo
