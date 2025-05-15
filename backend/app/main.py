from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from . import crud, schemas

app = FastAPI()

# Configura CORS (modifica allow_origins in produzione)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Endpoint di health check
@app.get("/health")
async def health_check():
    return {"status": "ok"}

# REGISTRAZIONE UTENTE
@app.post("/users/", response_model=schemas.UserOut)
def create_user(user: schemas.UserCreate):
    if crud.get_user_by_username(user.username):
        raise HTTPException(status_code=400, detail="Username già esistente")
    return crud.create_user(user.dict())

# LOGIN UTENTE
@app.post("/login/", response_model=schemas.UserOut)
def login(user: schemas.UserCreate):
    auth = crud.authenticate_user(user.username, user.password)
    if not auth:
        raise HTTPException(status_code=400, detail="Credenziali non valide")
    # Puoi generare un token JWT qui
    return auth

# LISTA UTENTI (opzionale)
@app.get("/users/", response_model=list[schemas.UserOut])
def read_users():
    return crud.get_all_users()

# LISTA CLASSI
@app.get("/classes/", response_model=list[schemas.ClassOut])
def read_classes(search: str | None = None):
    return crud.get_classes(search)

# CREA CLASSE
@app.post("/classes/", response_model=schemas.ClassOut)
def create_new_class(class_in: schemas.ClassCreate):
    if crud.get_class_by_name(class_in.name):
        raise HTTPException(status_code=400, detail="Classe già esistente")
    return crud.create_class(class_in.dict())
