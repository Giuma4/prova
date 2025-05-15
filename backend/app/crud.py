from .firebase_client import db
from typing import List, Optional

# --- USER CRUD ---

def get_user_by_username(username: str) -> Optional[dict]:
    docs = db.collection("users").where("username", "==", username).stream()
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        return data
    return None


def get_all_users() -> List[dict]:
    docs = db.collection("users").stream()
    return [{**doc.to_dict(), "id": doc.id} for doc in docs]


def create_user(user_in: dict) -> dict:
    payload = {"username": user_in["username"],
               "password": user_in["password"],
               "balance": 1000}
    _, doc_ref = db.collection("users").add(payload)
    return {**payload, "id": doc_ref.id}


def authenticate_user(username: str, password: str) -> Optional[dict]:
    user = get_user_by_username(username)
    if user and user.get("password") == password:
        return user
    return None

# --- ITEM CRUD ---

def create_item(item_in: dict) -> dict:
    payload = {"name": item_in["name"],
               "description": item_in.get("description", "")}
    _, doc_ref = db.collection("items").add(payload)
    return {**payload, "id": doc_ref.id}


def get_items(skip: int = 0, limit: int = 10) -> List[dict]:
    docs = db.collection("items").offset(skip).limit(limit).stream()
    return [{**doc.to_dict(), "id": doc.id} for doc in docs]


def get_item(item_id: str) -> Optional[dict]:
    doc = db.collection("items").document(item_id).get()
    if doc.exists:
        data = doc.to_dict()
        data["id"] = doc.id
        return data
    return None

# --- CLASS CRUD ---

def get_classes(search: Optional[str] = None) -> List[dict]:
    col = db.collection("classes")
    if search:
        # Firestore non supporta 'ilike', quindi usiamo filter semplice
        docs = col.where("name", ">=", search).where("name", "<=", search + "").stream()
    else:
        docs = col.stream()
    return [{**doc.to_dict(), "id": doc.id} for doc in docs]


def get_class_by_name(name: str) -> Optional[dict]:
    docs = db.collection("classes").where("name", "==", name).stream()
    for doc in docs:
        data = doc.to_dict()
        data["id"] = doc.id
        return data
    return None


def create_class(class_in: dict) -> dict:
    payload = {"name": class_in["name"],
               "max_participants": class_in["max_participants"],
               "admin_id": class_in["admin_id"]}
    _, doc_ref = db.collection("classes").add(payload)
    return {**payload, "id": doc_ref.id}