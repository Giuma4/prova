from pydantic import BaseModel
from typing import Optional, List

# --- User Schemi ---
class UserCreate(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: str
    username: str
    balance: int

# --- Item Schemi --- (se usi ancora gli item)
class ItemCreate(BaseModel):
    name: str
    description: Optional[str] = ""

class ItemOut(BaseModel):
    id: str
    name: str
    description: Optional[str]

# --- Classe Schemi ---
class ClassCreate(BaseModel):
    name: str
    max_participants: int
    admin_id: str  # ora è un ID Firestore (string)

class ClassOut(BaseModel):
    id: str
    name: str
    max_participants: int
    admin_id: str
