import firebase_admin
from firebase_admin import credentials, firestore

# Carica la chiave JSON direttamente
cred = credentials.Certificate("./app/schoolbet-bdd63-firebase-adminsdk-fbsvc-cda69a4f3f.json")

firebase_admin.initialize_app(cred)

# Client Firestore
db = firestore.client()
