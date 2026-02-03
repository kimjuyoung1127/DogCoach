import httpx
import json
from app.core.config import settings
from typing import Optional, Dict, Any

class AIClient:
    def __init__(self, base_url: str = settings.AI_API_URL):
        self.base_url = base_url.rstrip('/')
        self.timeout = httpx.Timeout(60.0) # LLM generation can be slow

    async def generate_response(self, prompt: str, system_prompt: Optional[str] = None) -> str:
        url = f"{self.base_url}/api/generate"
        
        payload = {
            "model": "qwen2.5:1.5b",
            "prompt": prompt,
            "stream": False
        }
        
        if system_prompt:
            payload["system"] = system_prompt

        async with httpx.AsyncClient(timeout=self.timeout) as client:
            try:
                response = await client.post(url, json=payload)
                response.raise_for_status()
                data = response.json()
                return data.get("response", "")
            except Exception as e:
                # Log error or raise
                print(f"AI Generation Error: {e}")
                return f"Error: AI 호출에 실패했습니다. ({e})"

ai_client = AIClient()
