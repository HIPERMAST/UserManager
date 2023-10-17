import sqlalchemy as sql
import sqlalchemy.ext.declarative as _declarative
import sqlalchemy.orm as orm

DATABASE_URL = "sqlite:///./database.db"

engine = sql.create_engine(DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = orm.sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = _declarative.declarative_base()