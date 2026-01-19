# 나는 알고리즘 문제 푸는 게 귀찮고 동아리 모임은 좋은디

from collections import deque
import sys

input = sys.stdin.readline

N, M = map(int, input().split())

graph = [[] for _ in range(N + 1)]
# 갈 수 있는 선택지 개수
outdeg = [0] * (N + 1)

for _ in range(M):
    a, b = map(int, input().split())
    graph[b].append(a)      
    outdeg[a] += 1        


# 일반 BFS로는 안되고 위상정렬을 사용해야 된다고 함
# 막다른 길부터 하나씩 지워가면서, 결국 안전한 애들만 남기는 BFS
# "진입차수가 0인 노드"부터 큐에 넣고 제거하면서 순서를 만든다.

# outdegree가 0인 정점부터 큐에 넣기
q = deque()
for i in range(1, N + 1):
    # outdegree가 0이면 더 진행 못 하므로 안전 시작점
    if outdeg[i] == 0:
        q.append(i)

safe_count = 0

while q:
    # 큐에서 안전 정점 하나 꺼내기
    cur = q.popleft()
    safe_count += 1

    # cur로 들어오던 선행 정점들의 outdegree를 줄이기
    for prev in graph[cur]:
        outdeg[prev] -= 1
        # 더 이상 갈 곳이 없으면 안전 정점이 됨
        if outdeg[prev] == 0:
            q.append(prev)

print(safe_count)
