# Import FastAPI, SQLAlchemy, and models
from typing import List
import fastapi as fastapi
import sqlalchemy.orm as orm
import services as services
import schemas as schemas
import fastapi.middleware.cors as cors

# Create FastAPI instance
app = fastapi.FastAPI()


origins = [
    "http://localhost",
    "http://localhost:3000",
]

# Add CORS middleware
app.add_middleware(cors.CORSMiddleware, allow_origins=origins, allow_credentials=True, allow_methods=["*"], allow_headers=["*"])

# Create Admin
@app.post("/api/admins")
async def createAdmin(admin: schemas.AdminCreate, db: orm.Session = fastapi.Depends(services.getDb)):
    
    dbAdmin = await services.getAdminByEmail(admin.email, db)
    
    if dbAdmin:
        raise fastapi.HTTPException(status_code = 400, detail = "Email already registered")
    
    return await services.createAdmin(admin, db)


# Authenticate Admin
@app.post("/api/admins/me", response_model=schemas.Admin)
async def authAdmin(admin: schemas.AdminCreate, db: orm.Session = fastapi.Depends(services.getDb)):
    
    dbAdmin = await services.authAdmin(admin.email, admin.hashedPW, db)
    
    if not dbAdmin:
        raise fastapi.HTTPException(status_code = 400, detail = "Incorrect email or password")
    
    return dbAdmin

# Create User
@app.post("/api/users", response_model=schemas.User)
async def createUser(user: schemas.UserCreate, db: orm.Session = fastapi.Depends(services.getDb)):
    
    dbUser = await services.getUserByEmail(user.email, db)
    
    if dbUser:
        raise fastapi.HTTPException(status_code = 400, detail = "Email already registered")
    
    return await services.createUser(user, db)


# Get User
@app.get("/api/users/{userId}", status_code=200, response_model=schemas.User)
async def getUser(email: str, db: orm.Session = fastapi.Depends(services.getDb)):
    
    return await services.getUserByEmail(email, db)


# Get All Users
@app.get("/api/users", response_model=List[schemas.User])
async def getAllUsers(db: orm.Session = fastapi.Depends(services.getDb)):
    
    return await services.getAllUsers(db=db)


# Delete User
@app.delete("/api/users/{userId}", status_code=204)
async def deleteUser(userId: int, db: orm.Session = fastapi.Depends(services.getDb)):
        
        return await services.deleteUser(userId, db=db)
    

# Delete Admin
@app.delete("/api/admins/{adminId}", status_code=204)
async def deleteAdmin(adminId: int, db: orm.Session = fastapi.Depends(services.getDb)):
        
        return await services.deleteAdmin(adminId, db=db)
    
# Root
@app.get("/api")
async def root():
    return {"message": "Hello Manager!"}