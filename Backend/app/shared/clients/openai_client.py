import time
import logging
from typing import Optional

import httpx

from app.core.config import settings

logger = logging.getLogger(__name__)


class OpenAIError(Exception):
    pass


class OpenAIClient:
    """Cost-controlled OpenAI Chat Completions client.

    Constraints (from cost plan):
    - model: gpt-4o-mini
    - temperature: 0.2, top_p: 1.0
    - max_tokens: 260
    - timeout: 8 seconds
    - retry: max 1 (total 2 attempts max)
    """

    BASE_URL = "https://api.openai.com/v1/chat/completions"

    # gpt-4o-mini pricing (USD per 1M tokens)
    INPUT_PRICE_PER_M = 0.15
    OUTPUT_PRICE_PER_M = 0.60

    def __init__(self):
        self.api_key = settings.OPENAI_API_KEY
        self.model = settings.OPENAI_MODEL
        self.timeout = httpx.Timeout(float(settings.AI_LLM_TIMEOUT_SEC))

    async def generate(
        self,
        system_prompt: str,
        user_prompt: str,
    ) -> dict:
        """Call OpenAI and return structured result with cost info.

        Returns:
            {
                "content": str,
                "input_tokens": int,
                "output_tokens": int,
                "cost_usd": float,
                "latency_ms": int,
            }
        Raises:
            OpenAIError on failure after retries.
        """
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": self.model,
            "messages": [
                {"role": "system", "content": system_prompt},
                {"role": "user", "content": user_prompt[:settings.AI_MAX_INPUT_TOKENS]},
            ],
            "temperature": settings.AI_TEMPERATURE,
            "top_p": settings.AI_TOP_P,
            "max_tokens": settings.AI_MAX_OUTPUT_TOKENS,
        }

        max_attempts = 1 + settings.AI_MAX_RETRIES  # 1 initial + max 1 retry
        last_error: Optional[Exception] = None

        for attempt in range(max_attempts):
            try:
                start = time.monotonic()
                async with httpx.AsyncClient(timeout=self.timeout) as client:
                    response = await client.post(
                        self.BASE_URL, json=payload, headers=headers
                    )
                    response.raise_for_status()
                latency_ms = int((time.monotonic() - start) * 1000)

                data = response.json()
                usage = data.get("usage", {})
                input_tokens = usage.get("prompt_tokens", 0)
                output_tokens = usage.get("completion_tokens", 0)
                cost_usd = (
                    input_tokens * self.INPUT_PRICE_PER_M
                    + output_tokens * self.OUTPUT_PRICE_PER_M
                ) / 1_000_000

                content = data["choices"][0]["message"]["content"]
                return {
                    "content": content,
                    "input_tokens": input_tokens,
                    "output_tokens": output_tokens,
                    "cost_usd": round(cost_usd, 6),
                    "latency_ms": latency_ms,
                }
            except Exception as e:
                last_error = e
                logger.warning(
                    "OpenAI attempt %d/%d failed: %s", attempt + 1, max_attempts, e
                )
                if attempt < max_attempts - 1:
                    continue

        raise OpenAIError(
            f"OpenAI call failed after {max_attempts} attempts: {last_error}"
        )


openai_client = OpenAIClient()
