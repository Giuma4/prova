from sqlalchemy.orm import Session
from . import models, schemas
from typing import List, Optional

# --- USER CRUD ---

def get_user_by_username(db: Session, username: str):
    return db.query(models.User).filter(models.User.username == username).first()


def create_user(db: Session, user: schemas.UserCreate):
    db_user = models.User(username=user.username, password=user.password)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def authenticate_user(db: Session, username: str, password: str):
    user = get_user_by_username(db, username)
    if user and user.password == password:
        return user
    return None

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

# --- CLASS CRUD ---

def get_classes(db: Session, search: Optional[str] = None) -> List[models.Class]:
    query = db.query(models.Class)
    if search:
        query = query.filter(models.Class.name.ilike(f"%{search}%"))
    return query.all()


def get_class_by_name(db: Session, name: str) -> models.Class:
    return db.query(models.Class).filter(models.Class.name == name).first()


def create_class(db: Session, class_in: schemas.ClassCreate) -> models.Class:
    db_class = models.Class(
        name=class_in.name,
        max_participants=class_in.max_participants,
        admin_id=class_in.admin_id
    )
    db.add(db_class)
    db.commit()
    db.refresh(db_class)
    return db_class