import sys
sys.path.append("..")

from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from pydantic import BaseModel, Field

from typing import Optional
from datetime import datetime

from database import engine, SessionLocal
from sqlalchemy.orm import Session

import models
from .auth import get_current_user, get_user_exception




router = APIRouter(
    prefix="/products",
    tags=["products"],
    responses={
        404: {"detail": "Not Found"}
    }
)

models.Base.metadata.create_all(bind=engine)

def get_db():
    try:
        db = SessionLocal()
        yield db
    finally:
        db.close()


class Product(BaseModel):
    name: str
    description: Optional[str]
    cost: int = Field(ge=1)
    qty: int = Field(ge=0)
    contact: str
    location: str



@router.get('/user')
async def read_all_products_by_user(user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    if user is None:
        raise get_user_exception()  

    return db.query(models.Products).filter(models.Products.owner_id == user.get("user_id")).all()

@router.post('/')
async def create_product(product: Product, user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    if user is None:
        raise get_user_exception()
    
    product_model = models.Products()
    product_model.name = product.name
    product_model.description = product.description
    product_model.cost = product.cost
    product_model.qty = product.qty
    product_model.time = str(datetime.now())
    product_model.contact = product.contact
    product_model.location = product.location
    product_model.owner_id = user.get("user_id")

    db.add(product_model)
    db.commit()

    return {
        'status': 201,
        'detail': 'created'
    }


@router.get('/{product_id}')
async def read_product(product_id: int, user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    if user is None:
        raise get_user_exception()
    
    product_model = db.query(models.Products)\
        .filter(models.Products.id == product_id)\
        .filter(models.Products.owner_id == user["user_id"])\
        .first()
    if product_model is not None: 
        return product_model
    raise HTTPException_product_notfound()


@router.put('/{product_id}')
async def update_product(product_id: int, product: Product, user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    if user is None:
        raise get_user_exception()
    
    product_model = db.query(models.Products).filter(models.Products.id == product_id)\
        .filter(models.Products.owner_id == user["user_id"])\
        .first()
    
    if product_id is not None:
        product_model.name = product.name
        product_model.description = product.description
        product_model.cost = product.cost
        product_model.qty = product.qty
        product_model.time = str(datetime.now())
        product_model.contact = product.contact
        product_model.location = product.location
        product_model.owner_id = user.get("user_id")

        db.add(product_model)
        db.commit()

        return {
            'status': 200,
            'detail': 'updated'
        }
    
    raise HTTPException_product_notfound()


@router.delete('/{product_id}')
async def delete_product(product_id: int, user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    if user is None:
        raise get_user_exception()
    
    product_model = db.query(models.Products).filter(models.Products.id == product_id)\
        .filter(models.Products.owner_id == user["user_id"])\
        .first()
    
    if product_model is not None:
        db.query(models.Products).filter(models.Products.id == product_id).delete()
        db.commit()
        
        return {
            'status': 201,
            'detail': 'deleted'
        }
    
    raise HTTPException_product_notfound()




def HTTPException_product_notfound():
    return HTTPException(status_code=404, detail="Product Not Found")