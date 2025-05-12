from fastapi import FastAPI, Depends, HTTPException, Response, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import crud, models, schemas
from .database import SessionLocal, engine

# Crea le tabelle nel DB
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Abilita CORS (puoi restringere allow_origins a ["http://localhost:3000"] se vuoi sicurezza)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dipendenza per ottenere la sessione DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Endpoint di test
@app.get("/health")
async def health_check():
    return {"status": "ok"}

# ✅ REGISTRAZIONE UTENTE
@app.post("/users/", response_model=schemas.User)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    # Verifica se esiste già un utente con lo stesso username
    db_user = crud.get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username già esistente")
    return crud.create_user(db=db, user=user)

# LOGIN UTENTE
@app.post("/login/", response_model=schemas.User)
def login(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.authenticate_user(db, username=user.username, password=user.password)
    if not db_user:
        raise HTTPException(status_code=400, detail="Credenziali non valide")
    return db_user

# ENDPOINT USERS
@app.get("/users/", response_model=list[schemas.User])
def read_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()
