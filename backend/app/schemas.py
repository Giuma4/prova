from pydantic import BaseModel

# --- User Schemi ---
class UserCreate(BaseModel):
    username: str
    password: str

class User(BaseModel):
    id: int
    username: str
    balance: int

    class Config:
        from_attributes = True

# --- Item Schemi ---
class ItemCreate(BaseModel):
    name: str
    description: str

class Item(BaseModel):
    id: int
    name: str
    description: str

    class Config:
        from_attributes = True

# --- Classe Schemi ---
class ClassBase(BaseModel):
    name: str
    max_participants: int

class ClassCreate(ClassBase):
    admin_id: int

class ClassOut(ClassBase):
    id: int
    admin_id: int

    class Config:
        from_attributes = True

# --- Token Schemi ---
class Token(BaseModel):
    access_token: str
    token_type: str
