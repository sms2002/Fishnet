from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine

import models
from routers import auth, products


app = FastAPI()
app.include_router(auth.router)
app.include_router(products.router)

origins = [
    "http://127.0.0.1:5500",
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)
