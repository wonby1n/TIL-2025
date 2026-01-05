N = int(input())
board = [list(input().split()) for _ in range(N)]

delta = [(-1, 0), (1, 0), (0, -1), (0, 1)]

teachers = []
empties = []

for r in range(N):
    for c in range(N):
        if board[r][c] == 'T':
            teachers.append((r,c))
        elif board[r][c] == 'X':
            empties.append((r, c))

