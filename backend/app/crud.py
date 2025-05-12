#crud.py
from sqlalchemy.orm import Session
from . import models, schemas


# --- USER CRUD ---

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()

def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(username=user.username, password=user.password)  # ⚠️ In produzione: hash la password!
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


# --- ITEM CRUD (se li usi ancora) ---

def create_item(db: Session, item: schemas.ItemCreate):
    db_item = models.Item(name=item.name, description=item.description)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def get_items(db: Session, skip: int = 0, limit: int = 10):
    return db.query(models.Item).offset(skip).limit(limit).all()

def get_item(db: Session, item_id: int):
    return db.query(models.Item).filter(models.Item.id == item_id).first()

#saldo
def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if user and user.password == password:  # ⚠️ In produzione: usa hash sicuro!
        return user
    return None