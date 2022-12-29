import sys
sys.path.append("..")

import pandas as pd
import joblib

from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from pydantic import BaseModel, Field

from typing import Optional
from datetime import datetime

from database import engine, SessionLocal
from sqlalchemy.orm import Session

import models
from .auth import get_current_user, get_user_exception




router = APIRouter(
    prefix="/predict",
    tags=["predict family"],
    responses={
        404: {"detail": "Not Found"}
    }
)

class predictRequest(BaseModel):
    temp: float
    ph: float
    dh: float

@router.get('/families')
async def get_familites():
    return ['Loach', 'Pleco', 'Cyprinid', 'Rainbow', 'Poeciliid']

@router.post('/')
async def predict_family(request: predictRequest):
     
    temp = request.temp
    ph = request.ph
    dh = request.dh
    
    model = joblib.load('model.pkl')
    prediction=model.predict([[ph, dh, temp]])
    output=prediction[0]
    print(output)

    df = pd.read_csv('fiveclass.csv')
    df1 = df[df['Family'] == output]

    temp_list = df1.to_numpy().tolist()
    list1 = []
    for x in temp_list:
        list2 = x[0], f"{x[3]} - {x[4]}", f"{x[6]} - {x[7]}", f"{x[9]} - {x[10]}", x[11], x[12]
        list1.append(list2)

    return output, list1