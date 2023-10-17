import datetime as dt
import sqlalchemy as sql
import sqlalchemy.orm as orm
import passlib.hash as _hash
import database as db

# This is for creating a new admin
class Admin(db.Base):
    __tablename__ = "admins"
    id = sql.Column(sql.Integer, primary_key=True, index=True)
    email = sql.Column(sql.String, unique=True, index=True)
    hashedPW = sql.Column(sql.String)
    
    users = orm.relationship("User", back_populates="admin")
    
    # This is for verifying the password using bcrypt
    def verify_password(self, password):
        return _hash.bcrypt.verify(password, self.hashedPW)
    

# This is for creating a new user
class User(db.Base):
    __tablename__ = "users"
    id = sql.Column(sql.Integer, primary_key=True, index=True)
    adminId = sql.Column(sql.Integer, sql.ForeignKey("admins.id"))
    avatar = sql.Column(sql.String, index=True)
    email = sql.Column(sql.String, unique=True, index=True)
    firstName = sql.Column(sql.String, index=True)
    lastName = sql.Column(sql.String, index=True)
    position = sql.Column(sql.String, index=True)
    skills = sql.Column(sql.String, index=True)
    
    admin = orm.relationship("Admin", back_populates="users")
    