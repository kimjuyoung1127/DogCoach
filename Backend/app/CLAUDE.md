# Backend App Directory Guide

백엔드 핵심 로직이 위치한 애플리리케이션 디렉토리입니다.

## 파일 상단 지침
- 모든 신규 파일 상단에는 해당 파일의 목적과 주요 기능을 설명하는 1~3줄의 요약 주석을 포함해야 합니다.

## 주요 구조
- `api/`: 도메인별 API 라우터 (HTTP 요청 처리)
- `services/`: 비즈니스 로직 및 오케스트레이션
- `repositories/`: 데이터베이스 CRUD 작업 (SQLAlchemy/Supabase)
- `models/`: SQLAlchemy DB 모델
- `schemas/`: Pydantic 데이터 검증 모델
- `core/`: 설정, 보안, 인증 등 핵심 유틸리티

## 개발 규칙
- **3-Layer 분리**: Router -> Service -> Repository 흐름을 엄격히 준수합니다.
- **Async**: 모든 I/O 작업은 비동기(`async/await`)로 처리합니다.
- **Dependency Injection**: `Depends()`를 활용하여 DB 세션 및 인증 정보를 주입받습니다.
