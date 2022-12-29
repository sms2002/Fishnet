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
    prefix="/client",
    tags=["client"],
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

class FilterProduct(BaseModel):
    name: Optional[str]
    cost: Optional[int] = Field(ge=1)
    qty: Optional[int] = Field(ge=1)
    location: Optional[str]



@router.get('/')
async def read_all_products(db: Session = Depends(get_db)):
    return db.query(models.Products).all()


@router.get('/search/{query}')
async def search_auto(query: str, user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    products = db.query(models.Products).all()
    items = []
    for item in products:
        tempp_item = {
            "id": item.id, 
            "name": item.name,
            "description": item.description,
            "cost": item.cost,
            "qty": item.qty,
            "time": item.time,
            "contact": item.contact,
            "location": item.location,
            "owner_id": item.owner_id
        }
        items.append(tempp_item)

    req_items = []
    for x in items:
        if query in x["name"]:
            req_items.append(x)
    return req_items


@router.get('/filter')
async def read_filtered_products(product: FilterProduct , user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(models.Products)\
        .filter(models.Products.name == product.name)\
            .filter(models.Products.cost <= product.cost)\
                .filter(models.Products.qty >= product.qty)\
                    .filter(models.Products.location == product.location)\
                        .all()


# @router.post('/book')
# async def book_product(product: Product, user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
#     if user is None:
#         raise get_user_exception()
    
#     product_model = models.ClientProducts()
#     product_model.name = product.name
#     product_model.description = product.description
#     product_model.cost = product.cost
#     product_model.qty = product.qty
#     product_model.time = str(datetime.now())
#     product_model.contact = product.contact
#     product_model.location = product.location
#     product_model.owner_id = user.get("user_id")

#     db.add(product_model)
#     db.commit()

#     return {
#         'status': 201,
#         'detail': 'created'
#     }

# @router.put('/book/{product_id}')
# async def update_booked_product(product_id: int, product: Product, user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
#     if user is None:
#         raise get_user_exception()
    
#     product_model = db.query(models.ClientProducts).filter(models.ClientProducts.id == product_id)\
#         .filter(models.ClientProducts.owner_id == user["user_id"])\
#         .first()
    
#     if product_id is not None:
#         product_model.name = product.name
#         product_model.description = product.description
#         product_model.cost = product.cost
#         product_model.qty = product.qty
#         product_model.time = str(datetime.now())
#         product_model.contact = product.contact
#         product_model.location = product.location
#         product_model.owner_id = user.get("user_id")

#         db.add(product_model)
#         db.commit()

#         return {
#             'status': 200,
#             'detail': 'updated'
#         }
    
#     raise HTTPException_product_notfound()

# @router.get('/user')
# async def read_all_posts_by_user(user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
#     if user is None:
#         raise get_user_exception()  

#     return db.query(models.ClientProducts).filter(models.ClientProducts.owner_id == user.get("user_id")).all()

# @router.post('/')
# async def create_product(product: Product, user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
#     if user is None:
#         raise get_user_exception()
    
#     product_model = models.Products()
#     product_model.name = product.name
#     product_model.description = product.description
#     product_model.cost = product.cost
#     product_model.qty = product.qty
#     product_model.time = str(datetime.now())
#     product_model.contact = product.contact
#     product_model.location = product.location
#     product_model.owner_id = user.get("user_id")

#     db.add(product_model)
#     db.commit()

#     return {
#         'status': 201,
#         'detail': 'created'
#     }


# @router.get('/{product_id}')
# async def read_product(product_id: int, user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
#     if user is None:
#         raise get_user_exception()
    
#     product_model = db.query(models.Products)\
#         .filter(models.Products.id == product_id)\
#         .filter(models.Products.owner_id == user["user_id"])\
#         .first()
#     if product_model is not None: 
#         return product_model
#     raise HTTPException_product_notfound()


# 


# @router.delete('/{product_id}')
# async def delete_product(product_id: int, user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
#     if user is None:
#         raise get_user_exception()
    
#     product_model = db.query(models.Products).filter(models.Products.id == product_id)\
#         .filter(models.Products.owner_id == user["user_id"])\
#         .first()
    
#     if product_model is not None:
#         db.query(models.Products).filter(models.Products.id == product_id).delete()
#         db.commit()
        
#         return {
#             'status': 201,
#             'detail': 'deleted'
#         }
    
#     raise HTTPException_product_notfound()




def HTTPException_product_notfound():
    return HTTPException(status_code=404, detail="Product Not Found")