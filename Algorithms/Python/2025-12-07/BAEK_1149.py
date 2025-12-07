N = int(input())
rgb = [list(map(int, input().split())) for _ in range(N)]

print(rgb)

dp = [[0] * 3 for _ in range(N)]

# 1번 집
dp[0][0] = rgb[0][0]
dp[0][1] = rgb[0][1]
dp[0][2] = rgb[0][2]

# i번 집까지의 최소 비용을 차례대로 계산
for i in range(2, N + 1):        # 2번 집부터 N번 집까지
    # i번 집을 빨강으로 칠하는 경우
    dp[i][0] = rgb[i][0] + min(dp[i-1][1], dp[i-1][2])
    # i번 집을 초록으로 칠하는 경우
    dp[i][1] = rgb[i][1] + min(dp[i-1][0], dp[i-1][2])
    # i번 집을 파랑으로 칠하는 경우
    dp[i][2] = rgb[i][2] + min(dp[i-1][0], dp[i-1][1])

# N번 집이 어떤 색이냐에 따라 최소값 선택
answer = min(dp[N][0], dp[N][1], dp[N][2])
print(answer)