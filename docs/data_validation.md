
### ✅ 설문 데이터 검증 (Front-end Validation)
프론트엔드에서 수집된 `SurveyData`가 백엔드 전송 전 정상적으로 JSON 객체로 파싱됨을 확인했습니다.

**Validated Payload Example:**
```json
{
  "dogName": "메이",
  "breed": "진도",
  "birthDate": "2026-01-16",
  "sex": "FEMALE",
  "weight": "11",
  "adoptionDate": "2026-01-30",
  "chronicIssues": ["potty", "aggression"],
  "householdType": "HOUSE",
  "familyMembers": ["자녀 있음"],
  "primaryCarer": "본인",
  "triggers": ["stranger"],
  "favoriteTreats": ["toy", "meat"],
  "healthIssues": ["joint"],
  "pastAttempts": ["distraction"],
  "sensitivityScore": 4
}
```
백엔드 연동 시 `survey-mapper.ts`를 통해 `SurveySubmission` 스키마로 변환되어 전송됩니다.
