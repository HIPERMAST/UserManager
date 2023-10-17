# Importing libraries
import sqlalchemy as sql
import sqlalchemy.ext.declarative as _declarative
import sqlalchemy.orm as orm

# Database URL
DATABASE_URL = "sqlite:///./database.db"

# Create database engine
engine = sql.create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

# Create database session
SessionLocal = orm.sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Create database base
Base = _declarative.declarative_base()