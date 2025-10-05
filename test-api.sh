#!/bin/bash

# ChatGPT Clone API 테스트 스크립트
# 포트 3001에서 실행 중인 개발 서버를 테스트합니다

API_URL="http://localhost:3001/api/chat"

echo "🚀 ChatGPT Clone API 테스트 시작..."
echo "API URL: $API_URL"
echo ""

# 테스트 1: 기본 채팅 테스트
echo "📝 테스트 1: 기본 채팅 테스트"
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "id": "1",
        "role": "user",
        "parts": [
          {
            "type": "text",
            "text": "안녕하세요! 간단한 인사말을 해주세요."
          }
        ]
      }
    ]
  }' \
  --no-buffer \
  -w "\n\nHTTP Status: %{http_code}\nResponse Time: %{time_total}s\n\n"

echo "----------------------------------------"
echo ""

# 테스트 2: 대화형 채팅 테스트
echo "💬 테스트 2: 대화형 채팅 테스트"
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "id": "1",
        "role": "user",
        "parts": [
          {
            "type": "text",
            "text": "안녕하세요!"
          }
        ]
      },
      {
        "id": "2",
        "role": "assistant",
        "parts": [
          {
            "type": "text",
            "text": "안녕하세요! 무엇을 도와드릴까요?"
          }
        ]
      },
      {
        "id": "3",
        "role": "user",
        "parts": [
          {
            "type": "text",
            "text": "JavaScript에서 배열을 정렬하는 방법을 알려주세요."
          }
        ]
      }
    ]
  }' \
  --no-buffer \
  -w "\n\nHTTP Status: %{http_code}\nResponse Time: %{time_total}s\n\n"

echo "----------------------------------------"
echo ""

# 테스트 3: 에러 케이스 - 빈 메시지 배열
echo "❌ 테스트 3: 에러 케이스 - 빈 메시지 배열"
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": []
  }' \
  -w "\n\nHTTP Status: %{http_code}\nResponse Time: %{time_total}s\n\n"

echo "----------------------------------------"
echo ""

# 테스트 4: 에러 케이스 - 잘못된 형식
echo "❌ 테스트 4: 에러 케이스 - 잘못된 형식"
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": "invalid format"
  }' \
  -w "\n\nHTTP Status: %{http_code}\nResponse Time: %{time_total}s\n\n"

echo "----------------------------------------"
echo ""

# 테스트 5: 긴 텍스트 테스트
echo "📄 테스트 5: 긴 텍스트 테스트"
curl -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "id": "1",
        "role": "user",
        "parts": [
          {
            "type": "text",
            "text": "React와 Next.js의 차이점에 대해 자세히 설명해주세요. 각각의 장단점과 언제 사용해야 하는지도 알려주세요."
          }
        ]
      }
    ]
  }' \
  --no-buffer \
  -w "\n\nHTTP Status: %{http_code}\nResponse Time: %{time_total}s\n\n"

echo "✅ 모든 테스트 완료!"
