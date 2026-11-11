# cursor-diff.py — 两帧 diff 找光标质心（recorder 标定取证）
import sys
from PIL import Image

a = Image.open(sys.argv[1]).convert("RGB")
b = Image.open(sys.argv[2]).convert("RGB")
w, h = a.size
pa, pb = a.load(), b.load()
# 粗阈值二值 diff → 连通域（4连通，纯 python BFS）
seen = [[False] * w for _ in range(h)]
blobs = []
for y in range(h):
    for x in range(w):
        if seen[y][x]:
            continue
        d = abs(pa[x, y][0] - pb[x, y][0]) + abs(pa[x, y][1] - pb[x, y][1]) + abs(pa[x, y][2] - pb[x, y][2])
        if d < 90:
            seen[y][x] = True
            continue
        q = [(x, y)]
        seen[y][x] = True
        xs, ys, n = [], [], 0
        while q:
            cx, cy = q.pop()
            xs.append(cx)
            ys.append(cy)
            n += 1
            for dx, dy in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                nx, ny = cx + dx, cy + dy
                if 0 <= nx < w and 0 <= ny < h and not seen[ny][nx]:
                    d2 = abs(pa[nx, ny][0] - pb[nx, ny][0]) + abs(pa[nx, ny][1] - pb[nx, ny][1]) + abs(pa[nx, ny][2] - pb[nx, ny][2])
                    if d2 >= 90:
                        seen[ny][nx] = True
                        q.append((nx, ny))
                    else:
                        seen[ny][nx] = True
        if n >= 40:
            blobs.append((min(xs), min(ys), max(xs), max(ys), sum(xs) // n, sum(ys) // n, n))
blobs.sort(key=lambda t: -t[6])
for x0, y0, x1, y1, cx, cy, n in blobs[:12]:
    print(f"blob box=({x0},{y0})-({x1},{y1}) centroid=({cx},{cy}) px={n}")
