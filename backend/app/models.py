from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    balance = Column(Integer, default=1000)
    classes = relationship("Class", back_populates="admin_user")

class Class(Base):
    __tablename__ = "classes"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True, nullable=False)
    max_participants = Column(Integer, nullable=False)
    admin_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    admin_user = relationship("User", back_populates="classes")