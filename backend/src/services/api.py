from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from src.generators.generate_script import final_script

app = FastAPI(title="Metabase2Sheet API")

# Allow frontend (Vite/React) to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate-script")
async def generate_script_api(request: Request):
    """
    Accepts JSON payload and returns the final generated script.
    """
    payload = await request.json()
    try:
        script = final_script(payload)
        return {"success": True, "script": script}
    except Exception as e:
        return {"success": False, "error": str(e)}

@app.get("/")
async def home():
    return {"message": "Metabase2Sheet API Home"}
