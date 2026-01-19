# 1) ERD 핵심 엔티티 구성
### A. 사용자/권한

- users (상담원/관리자 공통)
    - id (PK), role (AGENT|ADMIN), name, email, password_hash, created_at
- (선택) agent_profiles
    - user_id (PK/FK), team, extension_no, status

### B. 고객/기기/QR

- customers
    - id (PK), name (nullable), phone (nullable), created_at
※ 개인정보 최소화/암호화는 정책에 맞춰 적용

- product_types
    - id (PK), name (세탁기/냉장고/에어컨)
- device_models
    - id (PK), product_type_id (FK), model_name, manufacturer
- device_instances (선택: “제품 개별 식별”이 필요할 때)
    - id (PK), device_model_id (FK), serial_no (nullable)
- qr_tokens
    - id (PK), token (UNIQUE), device_model_id (FK), expires_at, created_at
    - 고객이 QR 스캔하면 이 토큰으로 “어떤 제품인지” 서버가 식별

### C. 상담(세션) / 통화(WebRTC)

- consultation_requests (고객이 “상담신청” 누르는 순간)
    - id (PK), qr_token_id (FK), customer_id (FK), error_code_input, location_text, status (QUEUED|ASSIGNED|CANCELLED), created_at
- consultations (상담원이 수락해서 실제 상담이 시작된 단위)
    - id (PK), request_id (FK), agent_id (FK->users), started_at, ended_at, status (ACTIVE|ENDED)

- webrtc_calls (세션별 통화 메타)

    - id (PK), consultation_id (FK), room_id, sdp_offer_id (nullable), connected_at, disconnected_at
    - 실제 미디어는 저장하지 않고 “연결/끊김/룸” 정도만 기록

### D. STT / 욕설 처리(핵심)

- transcript_segments
    - id (PK), consultation_id (FK), speaker (CUSTOMER|AGENT), ts_start_ms, ts_end_ms, text_raw, text_display, created_at
    - text_raw: 원문(STT 그대로)
    - text_display: 상담원 화면에 보여준 순화/스포일러 처리 버전
- profanity_events
    - id (PK), consultation_id (FK), segment_id (FK), severity (LOW|MID|HIGH), matched_terms, created_at
- audio_mask_events
    - id (PK), consultation_id (FK), ts_start_ms, ts_end_ms, mode (BEEP|MUTE), created_at

### E. 가이드(에러 코드 기반)
- error_code_guides
    - id (PK), product_type_id (FK), error_code, title, steps (TEXT/JSON), created_at
- guide_shown_logs (선택: “상담 중 어떤 가이드를 띄웠는지”)
    - id (PK), consultation_id (FK), guide_id (FK), shown_at

### F. 요약/전송
- summaries
    - id (PK), consultation_id (FK, UNIQUE), summary_text, created_at
- message_deliveries
    - id (PK), consultation_id (FK), channel (SMS|APP), to_address, status (SENT|FAILED), sent_at

### G. (확장) 악성 고객/관리자 대시보드

- customer_flags
    - id (PK), customer_id (FK), flag_type (BLACKLIST|WATCHLIST), reason, created_at
- agent_metrics_daily (스트레스/폭언 노출 지표)
    - id (PK), agent_id (FK), date, call_count, profanity_count, mask_time_ms

# 2) 관계 요약 (카디널리티)

product_types (1) ─ (N) device_models

device_models (1) ─ (N) qr_tokens

customers (1) ─ (N) consultation_requests

qr_tokens (1) ─ (N) consultation_requests

consultation_requests (1) ─ (0..1) consultations (신청 후 상담이 실제 시작될 수도/취소될 수도)

users(AGENT) (1) ─ (N) consultations

consultations (1) ─ (0..1) webrtc_calls

consultations (1) ─ (N) transcript_segments

transcript_segments (1) ─ (0..N) profanity_events

consultations (1) ─ (0..N) audio_mask_events

consultations (1) ─ (0..1) summaries

consultations (1) ─ (0..N) message_deliveries


---

### 1️⃣ users

상담원 및 관리자 계정 정보

상담을 실제로 수행하는 상담원(AGENT) 과
시스템을 관리하는 관리자(ADMIN) 를 구분하기 위한 테이블

로그인, 권한 분리, 상담 배정의 기준이 됨

👉 “누가 상담을 받았는지/관리하는지”의 주체

### 2️⃣ customers

상담을 요청한 고객 정보

QR을 통해 유입된 고객의 최소 정보 저장

개인정보는 최소한만 보관 (연락처 등)

👉 “누가 상담을 요청했는지”

### 3️⃣ product_types

상담 대상 전자기기 분류

세탁기 / 냉장고 / 에어컨 같은 가전 종류

에러 코드, 가이드, 상담 로직을 나누는 기준

👉 “어떤 종류의 제품 상담인지”

### 4️⃣ device_models

구체적인 제품 모델 정보

같은 세탁기라도 모델별로 구조·에러 코드가 다르기 때문에 분리

QR 코드와 직접 연결되는 대상

👉 “어떤 제품 모델에 대한 상담인지”

### 5️⃣ qr_tokens

제품에 부착된 QR 코드 정보

고객이 스캔하는 QR 코드의 실제 식별자

어떤 제품 모델인지 서버가 인식하기 위한 키 역할

👉 “QR 하나 = 특정 제품 하나”를 연결해주는 다리

### 6️⃣ consultation_requests

고객이 상담을 ‘신청한 상태’

고객이 QR 스캔 후 정보를 입력하고
“상담 요청” 버튼을 누른 시점의 기록

아직 상담원이 연결되기 전 상태

👉 “전화가 걸리기 전 단계”

### 7️⃣ consultations

실제로 진행된 상담 세션

상담원이 요청을 수락하면 생성되는 실제 상담 단위

시작 시간, 종료 시간, 담당 상담원 정보 포함

👉 “이 한 통의 상담”을 의미하는 핵심 테이블

### 8️⃣ webrtc_calls

WebRTC 통화 연결 메타데이터

실제 음성은 저장 ❌

통화가 언제 연결되고 끊겼는지만 기록

👉 “통화가 언제, 어떤 방에서 이뤄졌는지”

### 9️⃣ transcript_segments

상담 중 생성된 실시간 자막(STT) 단위

고객/상담원 발화를 시간 단위로 쪼개 저장

원문(text_raw)과 상담원에게 보여준 순화 텍스트(text_display)를 분리

👉 “AI가 듣고 기록한 상담 대화 내용”

### 🔟 profanity_events

욕설·폭언이 감지된 기록

어떤 상담에서

어떤 문장에서

어느 정도 수위의 욕설이 있었는지 기록

👉 “상담원 보호 기능이 작동한 근거 데이터”

### 1️⃣1️⃣ audio_mask_events

음성 삐 처리(보호 조치) 기록

욕설이 감지된 정확한 시간 구간

삐 처리(BEEP) 또는 음소거(MUTE) 여부

👉 “상담원 귀에 실제로 보호 조치가 적용된 순간”

### 1️⃣2️⃣ error_code_guides

전자기기 상담 가이드(에러 코드 기준)

특정 제품 유형 + 에러 코드에 대한 안내 정보

상담원이 바로 참고하는 가이드 데이터

👉 “상담원이 매뉴얼 찾지 않도록 도와주는 지식 DB”

### 1️⃣3️⃣ summaries

상담 종료 후 AI 요약 결과

한 상담에 대해 하나의 요약만 생성

고객 안내 또는 내부 기록용

👉 “상담이 끝난 뒤 정리된 결과물”

### 1️⃣4️⃣ message_deliveries

요약 내용 전달 이력

요약을 SMS/앱으로 보냈는지

성공/실패 여부

👉 “고객에게 안내가 실제로 전달됐는지”

### 🔁 전체 흐름 한 줄 요약

QR(제품) → 고객 상담 요청 → 상담원 상담 세션 →
실시간 자막·욕설 감지·삐 처리 → (확장 시) 요약 및 전달