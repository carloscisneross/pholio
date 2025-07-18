from fastapi import FastAPI, HTTPException, Header, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pymongo import MongoClient
from pydantic import BaseModel
from typing import Optional, List
import os
import requests
import uuid
from datetime import datetime, timedelta
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Pholio API", version="1.0.0")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB connection
mongo_url = os.getenv("MONGO_URL")
client = MongoClient(mongo_url)
db = client.pholio

# Collections
users_collection = db.users
sessions_collection = db.sessions

# Models
class User(BaseModel):
    id: str
    email: str
    name: str
    picture: str
    username: Optional[str] = None
    user_type: str = "regular"  # "regular" or "recruiter"
    location: Optional[str] = None
    timezone: Optional[str] = None
    job_focus_area: Optional[str] = None
    created_at: datetime
    updated_at: datetime

class Session(BaseModel):
    session_id: str
    user_id: str
    session_token: str
    expires_at: datetime
    created_at: datetime

class ProfileRequest(BaseModel):
    session_id: str

# Helper functions
def get_user_from_session(session_token: str):
    session = sessions_collection.find_one({"session_token": session_token})
    if not session or session["expires_at"] < datetime.utcnow():
        return None
    return users_collection.find_one({"id": session["user_id"]})

# Auth endpoints
@app.post("/api/auth/profile")
async def get_profile(request: ProfileRequest):
    try:
        # Call emergent auth API
        headers = {"X-Session-ID": request.session_id}
        response = requests.get(
            "https://demobackend.emergentagent.com/auth/v1/env/oauth/session-data",
            headers=headers
        )
        
        if response.status_code != 200:
            raise HTTPException(status_code=401, detail="Invalid session")
        
        auth_data = response.json()
        
        # Check if user exists
        existing_user = users_collection.find_one({"email": auth_data["email"]})
        
        if existing_user:
            user_data = existing_user
        else:
            # Create new user
            user_data = {
                "id": str(uuid.uuid4()),
                "email": auth_data["email"],
                "name": auth_data["name"],
                "picture": auth_data["picture"],
                "username": None,
                "user_type": "regular",
                "location": None,
                "timezone": None,
                "job_focus_area": None,
                "created_at": datetime.utcnow(),
                "updated_at": datetime.utcnow()
            }
            users_collection.insert_one(user_data)
        
        # Create session
        session_token = str(uuid.uuid4())
        session_data = {
            "session_id": request.session_id,
            "user_id": user_data["id"],
            "session_token": session_token,
            "expires_at": datetime.utcnow() + timedelta(days=7),
            "created_at": datetime.utcnow()
        }
        sessions_collection.insert_one(session_data)
        
        # Return user data and session token
        return {
            "user": {
                "id": user_data["id"],
                "email": user_data["email"],
                "name": user_data["name"],
                "picture": user_data["picture"],
                "username": user_data["username"],
                "user_type": user_data["user_type"],
                "location": user_data["location"],
                "timezone": user_data["timezone"],
                "job_focus_area": user_data["job_focus_area"]
            },
            "session_token": session_token
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/auth/me")
async def get_current_user(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    
    session_token = authorization.split(" ")[1]
    user = get_user_from_session(session_token)
    
    if not user:
        raise HTTPException(status_code=401, detail="Invalid session")
    
    return {
        "id": user["id"],
        "email": user["email"],
        "name": user["name"],
        "picture": user["picture"],
        "username": user["username"],
        "user_type": user["user_type"],
        "location": user["location"],
        "timezone": user["timezone"],
        "job_focus_area": user["job_focus_area"]
    }

@app.post("/api/auth/logout")
async def logout(authorization: str = Header(None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    
    session_token = authorization.split(" ")[1]
    sessions_collection.delete_one({"session_token": session_token})
    
    return {"message": "Logged out successfully"}

# Health check
@app.get("/api/health")
async def health_check():
    return {"status": "healthy"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)