from pydantic import BaseModel

# --- User Schemas ---
class UserCreate(BaseModel):
    username: str
    password: str

class User(BaseModel):
    id: int
    username: str
    balance: int  # Aggiunto campo per il saldo

    class Config:
        orm_mode = True

# --- Item Schemas (se li usi ancora) ---
class ItemCreate(BaseModel):
    name: str
    description: str

class Item(BaseModel):
    id: int
    name: str
    description: str

    class Config:
        orm_mode = True

class UserPublic(BaseModel):
    username: str

    class Config:
        orm_mode = True
