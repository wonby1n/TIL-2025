# 📌 Django + DRF + dj-rest-auth → Vue 회원가입/로그인


## 🧱 1. Django 프로젝트 준비
### 1-1. 가상환경 생성 & 활성화
```bash
cd django-project
python -m venv .venv
.venv\Scripts\activate   # Windows
# source .venv/bin/activate  (Mac/Linux)
```

### 1-2. Django/DRF/dj-rest-auth 관련 패키지 설치

```bash
pip install django djangorestframework dj-rest-auth django-allauth
pip install djangorestframework-authtoken
```

## 🧱 2. settings.py 설정
### 2-1. INSTALLED_APPS 수정

```python
INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    # allauth 필수
    'django.contrib.sites',

    # DRF
    'rest_framework',
    'rest_framework.authtoken',

    # dj-rest-auth
    'dj_rest_auth',
    'dj_rest_auth.registration',

    # allauth
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
]
```
### 2-2. SITE_ID 설정
```python
SITE_ID = 1
```

### 2-3. 이메일 인증 끄기 (SMTP 문제 방지)

⚠️ 이거 안 하면 회원가입 시 이메일 보내다가 500 터짐.

```python
ACCOUNT_EMAIL_VERIFICATION = "none"
ACCOUNT_EMAIL_REQUIRED = False
```

### 2-4. DRF 인증 설정 (TokenAuthentication)

```python
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.TokenAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.AllowAny',
    ],
}
```
---
## 🧱 3. urls.py 설정

프로젝트 최상위 urls.py:
```python
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),

    # 로그인, 로그아웃 등 기본 인증
    path('accounts/', include('dj_rest_auth.urls')),

    # 회원가입 (registration)
    path('accounts/registration/', include('dj_rest_auth.registration.urls')),
]
```
## 🧱 4. DB 마이그레이션
```bash
python manage.py migrate
```

## 🧱 5. Django 서버 실행
```bash
python manage.py runserver
```
## 🧪 6. Postman으로 기능 테스트
### 6-1. 회원가입 요청

POST → http://127.0.0.1:8000/accounts/registration/

Body → JSON
```json
{
  "username": "testuser",
  "email": "test@test.com",
  "password1": "testpassword123",
  "password2": "testpassword123"
}
```

성공 응답 예시:
```json
{ "key": "발급된토큰값" }
```

---

### 6-2. 로그인 요청

POST → http://127.0.0.1:8000/accounts/login/

```json
{
  "username": "testuser",
  "password": "testpassword123"
}
```

성공 시:
```json
{ "key": "로그인토큰" }
```

→ 여기까지 되면 Django 인증 기능 구현 완료 ✔