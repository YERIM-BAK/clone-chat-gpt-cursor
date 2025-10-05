@echo off
REM ChatGPT Clone API 테스트 스크립트 (Windows)
REM 포트 3001에서 실행 중인 개발 서버를 테스트합니다

set API_URL=http://localhost:3001/api/chat

echo 🚀 ChatGPT Clone API 테스트 시작...
echo API URL: %API_URL%
echo.

REM 테스트 1: 기본 채팅 테스트
echo 📝 테스트 1: 기본 채팅 테스트
curl -X POST "%API_URL%" ^
  -H "Content-Type: application/json" ^
  -d "{\"messages\":[{\"id\":\"1\",\"role\":\"user\",\"parts\":[{\"type\":\"text\",\"text\":\"안녕하세요! 간단한 인사말을 해주세요.\"}]}]}" ^
  --no-buffer

echo.
echo ----------------------------------------
echo.

REM 테스트 2: 대화형 채팅 테스트
echo 💬 테스트 2: 대화형 채팅 테스트
curl -X POST "%API_URL%" ^
  -H "Content-Type: application/json" ^
  -d "{\"messages\":[{\"id\":\"1\",\"role\":\"user\",\"parts\":[{\"type\":\"text\",\"text\":\"안녕하세요!\"}]},{\"id\":\"2\",\"role\":\"assistant\",\"parts\":[{\"type\":\"text\",\"text\":\"안녕하세요! 무엇을 도와드릴까요?\"}]},{\"id\":\"3\",\"role\":\"user\",\"parts\":[{\"type\":\"text\",\"text\":\"JavaScript에서 배열을 정렬하는 방법을 알려주세요.\"}]}]}" ^
  --no-buffer

echo.
echo ----------------------------------------
echo.

REM 테스트 3: 에러 케이스 - 빈 메시지 배열
echo ❌ 테스트 3: 에러 케이스 - 빈 메시지 배열
curl -X POST "%API_URL%" ^
  -H "Content-Type: application/json" ^
  -d "{\"messages\":[]}"

echo.
echo ----------------------------------------
echo.

REM 테스트 4: 에러 케이스 - 잘못된 형식
echo ❌ 테스트 4: 에러 케이스 - 잘못된 형식
curl -X POST "%API_URL%" ^
  -H "Content-Type: application/json" ^
  -d "{\"messages\":\"invalid format\"}"

echo.
echo ----------------------------------------
echo.

echo ✅ 모든 테스트 완료!
pause
