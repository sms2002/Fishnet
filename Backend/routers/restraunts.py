import sys
sys.path.append("..")

import pandas as pd

from fastapi import FastAPI, Depends, HTTPException, status, APIRouter
from pydantic import BaseModel, Field

from typing import Optional
from datetime import datetime

from database import engine, SessionLocal
from sqlalchemy.orm import Session

import models
from .auth import get_current_user, get_user_exception




router = APIRouter(
    prefix="/restraunts",
    tags=["restraunts"],
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


class bulkRequest(BaseModel):
    name: str
    cost: int = Field(ge=1)
    qty: int = Field(ge=1)


@router.get('/bulkOrder')
async def get_items(name: str, qty: int, user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
    if user is None:
        raise get_user_exception()  

    name_filter = db.query(models.Products).filter(models.Products.name == name).all()
    

    params = ['id', 'name', 'description', 'cost', 'qty', 'time', 'contact', 'location', 'owner_id']

    #df = pd.DataFrame(columns=params)

    id=[]
    name=[]
    description=[]
    cost=[]
    qty=[]
    time=[]
    contact=[]
    location=[]
    owner_id=[]
    #print(df)
    #print("hry")
    for x in name_filter:
        id.append(x.id)
        name.append(x.name)
        description.append(x.description)
        cost.append(x.cost)
        qty.append(x.qty)
        time.append(x.time)
        contact.append(x.contact)
        location.append(x.location)
        owner_id.append(x.owner_id)

        #temp_list = x.id, x.name, x.description, x.cost, x.qty, x.time,x.contact x.location, x.owner_id
        #print(temp_list)
    #print(name)    
    df={"id":id,"name":name,"description":description,"cost":cost,"qty":qty,"time":time,"contact":contact,"location":location,"owner_id":owner_id}    
    df = pd.DataFrame(df)
        #df = pd.concat([df,df_temp], axis=0, ignore_index=True)
    print("hi")
    print(df)
    final_df = df.sort_values(by=['cost'], ascending=True)
    json_index = final_df.to_json(orient ='index')
    json_values = final_df.to_json(orient ='values')
    print(json_values)
    # print("hey")
    # s=0
    # notify_ownerids=[]
    # notify_names=[]
    # notify_costs=[]
    # notify_qtys=[]
    # for i in range(len(final_df["qty"])):
    #    s=s+final_df["qty"][i]
    #    notify_ownerids.append(final_df["owner_id"][i])
    #    notify_names.append(final_df["name"][i])
    #    notify_costs.append(final_df["cost"][i])
    #    notify_qtys.append(final_df["qty"][i])
    #    if(s>=4):
    #     break
    # dfnotify={"notified_ownerid":notify_ownerids,"name":notify_names,"cost":notify_costs,"qty":notify_qtys}
    # dfnotified=pd.DataFrame(dfnotify)
    # print("hello")
    # print(dfnotified)        


    # # df = pd.DataFrame()
    # # for x in name_filter:
    # #     temp_list = x.id, x.name, x.description, x.cost, x.qty, x.time, x.location, x.owner_id
    # #     print(temp_list)
    # #     df_temp = pd.DataFrame(temp_list)
    # #     df = pd.concat([df,df_temp], axis=0, ignore_index=True)
    
    # # for x in df:
    # #     print(x)
    # # for x in list1:
    # #     if x.qty 
    # x=dfnotify["notified_ownerid"][0]
    # return x

    return ""

# @router.get('/user')
# async def read_all_products_by_user(user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
#     if user is None:
#         raise get_user_exception()  

#     return db.query(models.Products).filter(models.Products.owner_id == user.get("user_id")).all()

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


# @router.put('/{product_id}')
# async def update_product(product_id: int, product: Product, user: dict = Depends(get_current_user), db: Session = Depends(get_db)):
#     if user is None:
#         raise get_user_exception()
    
#     product_model = db.query(models.Products).filter(models.Products.id == product_id)\
#         .filter(models.Products.owner_id == user["user_id"])\
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




# def HTTPException_product_notfound():
#     return HTTPException(status_code=404, detail="Product Not Found")