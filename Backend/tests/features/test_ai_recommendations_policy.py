import pytest
from types import SimpleNamespace
from pydantic import ValidationError
from fastapi import HTTPException

from app.features.ai_recommendations import schemas, service


def test_recommendation_request_window_days_enum():
    schemas.RecommendationRequest(dog_id="123", window_days=7)
    schemas.RecommendationRequest(dog_id="123", window_days=15)
    schemas.RecommendationRequest(dog_id="123", window_days=30)
    with pytest.raises(ValidationError):
        schemas.RecommendationRequest(dog_id="123", window_days=14)


def test_feedback_action_enum():
    schemas.FeedbackRequest(recommendation_index=0, action="archive")
    schemas.FeedbackRequest(recommendation_index=1, action="helpful")
    schemas.FeedbackRequest(recommendation_index=2, action="not_helpful")
    with pytest.raises(ValidationError):
        schemas.FeedbackRequest(recommendation_index=0, action="other")


@pytest.mark.asyncio
async def test_submit_feedback_forbidden_when_not_owner(mock_db, monkeypatch):
    snapshot = SimpleNamespace(
        id="00000000-0000-0000-0000-000000000111",
        user_id="00000000-0000-0000-0000-000000000999",
        anonymous_sid=None,
    )

    async def fake_get_snapshot_by_id(db, snapshot_id):
        return snapshot

    monkeypatch.setattr(
        "app.features.ai_recommendations.repository.get_snapshot_by_id",
        fake_get_snapshot_by_id,
    )

    req = schemas.FeedbackRequest(
        recommendation_index=0,
        action=schemas.FeedbackAction.HELPFUL,
    )

    with pytest.raises(HTTPException) as exc:
        await service.submit_feedback(
            mock_db,
            snapshot_id="00000000-0000-0000-0000-000000000111",
            request=req,
            user_id="00000000-0000-0000-0000-000000000123",
            anonymous_sid=None,
        )
    assert exc.value.status_code == 403
