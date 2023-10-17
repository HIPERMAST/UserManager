# Import required modules
import sqlalchemy.orm as orm
import passlib.hash as _hash
import database as db
import models as models
import schemas as schemas


# Create database tables
def createDatabase():
    db.Base.metadata.create_all(bind = db.engine)
    

# Create database session
def getDb():
    dbSession = db.SessionLocal()
    try:
        yield dbSession
    finally:
        dbSession.close()
        

# Admin function for getting one admin by email
async def getAdminByEmail(email: str, db: orm.Session):
    return db.query(models.Admin).filter(models.Admin.email == email).first()


# Admin function for creating a new admin
async def createAdmin(admin: schemas.AdminCreate, db: orm.Session):
    dbAdmin = models.Admin(avatar = admin.avatar, email = admin.email, hashedPW = _hash.bcrypt.hash(admin.hashedPW))
    db.add(dbAdmin)
    db.commit()
    db.refresh(dbAdmin)
    return dbAdmin


# Admin function for authenticating an admin
async def authAdmin(email: str, password: str, db: orm.Session):
    dbAdmin = await getAdminByEmail(email, db)
    
    if not dbAdmin:
        return False
    
    if not dbAdmin.verify_password(password):
        return False
    
    return dbAdmin


# User function for getting one user by email
async def getUserByEmail(email: str, db: orm.Session):
    return db.query(models.User).filter(models.User.email == email).first()


# User function for creating a new user
async def createUser(user: schemas.UserCreate, db: orm.Session):
    dbUser = models.User(avatar = user.avatar, email = user.email, firstName = user.firstName, lastName = user.lastName, position = user.position, skills = user.skills, adminId = 1)
    db.add(dbUser)
    db.commit()
    db.refresh(dbUser)
    return dbUser


# User function for getting all users
async def getAllUsers(db: orm.Session):
    return db.query(models.User).all()


# User function for deleting a user
async def deleteUser(userId: int, db: orm.Session):
    db.query(models.User).filter(models.User.id == userId).delete()
    db.commit()
    return None


# User function for deleting a admin
async def deleteAdmin(adminId: int, db: orm.Session):
    db.query(models.Admin).filter(models.Admin.id == adminId).delete()
    db.commit()
    return None