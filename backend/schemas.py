# Import required modules
import pydantic as pyd
        
# Admin schemas
class AdminBase(pyd.BaseModel):
    email: str
    
class AdminCreate(AdminBase):
    hashedPW: str
    
    class Config:
        ormMode = True
        
class Admin(AdminBase):
    id: int
    
    class Config:
        ormMode = True
        
        
# User schemas 
class UserBase(pyd.BaseModel):
    avatar: str
    email: str
    firstName: str
    lastName: str
    position: str
    skills: str
    
class UserCreate(UserBase):
    pass

        
class User(UserBase):
    id: int
    adminId: int
    
    class Config:
        ormMode = True