#!/usr/bin/env python3
"""Regenerates src/components/maps/indochinaGeo.ts from Natural Earth 1:10m data.

Usage:
  python3 scripts/build-indochina-map.py <ne_10m_admin_0_countries.geojson> <ne_10m_rivers_lake_centerlines.geojson>

Both files are public domain: https://github.com/nvkelso/natural-earth-vector/tree/master/geojson
"""
import json
import math
import sys

LON0, LON1 = 91.5, 121.5
LAT0, LAT1 = 6.5, 24.5
WIDTH = 1140.0
SCALE = WIDTH / math.radians(LON1 - LON0)


def merc(lat):
    return math.log(math.tan(math.pi / 4 + math.radians(lat) / 2))


HEIGHT = SCALE * (merc(LAT1) - merc(LAT0))


def project(lon, lat):
    return (SCALE * math.radians(lon - LON0), SCALE * (merc(LAT1) - merc(lat)))


def clip(ring, margin=12.0):
    """Sutherland–Hodgman against the frame, grown by a margin the SVG viewport hides."""
    edges = [
        (lambda p: p[0] >= -margin, lambda a, b: (-margin, a[1] + (b[1] - a[1]) * (-margin - a[0]) / (b[0] - a[0]))),
        (lambda p: p[0] <= WIDTH + margin, lambda a, b: (WIDTH + margin, a[1] + (b[1] - a[1]) * (WIDTH + margin - a[0]) / (b[0] - a[0]))),
        (lambda p: p[1] >= -margin, lambda a, b: (a[0] + (b[0] - a[0]) * (-margin - a[1]) / (b[1] - a[1]), -margin)),
        (lambda p: p[1] <= HEIGHT + margin, lambda a, b: (a[0] + (b[0] - a[0]) * (HEIGHT + margin - a[1]) / (b[1] - a[1]), HEIGHT + margin)),
    ]
    out = ring
    for inside, cross in edges:
        if not out:
            break
        src, out = out, []
        for i, cur in enumerate(src):
            prev = src[i - 1]
            if inside(cur):
                if not inside(prev):
                    out.append(cross(prev, cur))
                out.append(cur)
            elif inside(prev):
                out.append(cross(prev, cur))
    return out


def simplify(points, tolerance):
    """Douglas–Peucker, iterative."""
    if len(points) < 3:
        return points
    keep = [False] * len(points)
    keep[0] = keep[-1] = True
    stack = [(0, len(points) - 1)]
    while stack:
        a, b = stack.pop()
        ax, ay = points[a]
        bx, by = points[b]
        dx, dy = bx - ax, by - ay
        norm = math.hypot(dx, dy) or 1e-9
        worst, index = 0.0, None
        for i in range(a + 1, b):
            px, py = points[i]
            dist = abs(dy * (px - ax) - dx * (py - ay)) / norm if norm > 1e-9 else math.hypot(px - ax, py - ay)
            if dist > worst:
                worst, index = dist, i
        if index is not None and worst > tolerance:
            keep[index] = True
            stack += [(a, index), (index, b)]
    return [p for p, k in zip(points, keep) if k]


def area(ring):
    return abs(sum(ring[i - 1][0] * p[1] - p[0] * ring[i - 1][1] for i, p in enumerate(ring))) / 2


def fmt(value):
    return f"{value:.1f}".rstrip("0").rstrip(".")


def ring_path(ring, close=True):
    d = "M" + " ".join(f"{fmt(x)} {fmt(y)}" for x, y in ring)
    return d + "Z" if close else d


def land_path(geometry, tolerance, min_area):
    polygons = geometry["coordinates"] if geometry["type"] == "MultiPolygon" else [geometry["coordinates"]]
    parts = []
    for polygon in polygons:
        for ring in polygon:
            lons = [c[0] for c in ring]
            lats = [c[1] for c in ring]
            if max(lons) < LON0 - 1 or min(lons) > LON1 + 1 or max(lats) < LAT0 - 1 or min(lats) > LAT1 + 1:
                continue
            projected = clip([project(lon, lat) for lon, lat in ring])
            if len(projected) < 3:
                continue
            simple = simplify(projected + [projected[0]], tolerance)[:-1]
            if len(simple) >= 3 and area(simple) >= min_area:
                parts.append(ring_path(simple))
    return "".join(parts)


FOCUS = {"VNM": "vn", "LAO": "la", "THA": "th"}
RIVERS = {"Mekong", "Lancang"}

POINTS = {
    "laoBao": (106.60065, 16.61406),
    "bangkok": (100.5018, 13.7563),
    "mukdahan": (104.7230, 16.5453),
    "dongHa": (107.1003, 16.8163),
    "daNang": (108.2022, 16.0544),
    "hanoi": (105.8342, 21.0278),
    "hcmc": (106.6297, 10.8231),
    "vientiane": (102.6331, 17.9757),
    "hoangSa": (111.9, 16.5),
    "truongSa": (113.4, 9.9),
}

LABELS = {
    "vn": (108.25, 13.55),
    "la": (102.9, 19.55),
    "th": (101.2, 15.9),
    "kh": (104.9, 12.7),
    "mm": (96.6, 20.6),
    "cn": (109.5, 23.7),
    "sea": (111.6, 13.4),
    "gulf": (101.4, 9.6),
}


def main():
    countries = json.load(open(sys.argv[1], encoding="utf-8"))["features"]
    rivers = json.load(open(sys.argv[2], encoding="utf-8"))["features"]

    lands = []
    for feature in countries:
        code = feature["properties"]["ADM0_A3"]
        # Offshore features in the East Sea are drawn by the component as labelled Vietnamese archipelagos.
        if code == "PGA":
            continue
        focus = FOCUS.get(code)
        d = land_path(feature["geometry"], 0.3 if focus else 0.7, 0.25 if focus == "vn" else 2.0)
        if d:
            lands.append((focus or "other", code, d))
    order = {"other": 0, "th": 1, "la": 2, "vn": 3}
    lands.sort(key=lambda item: (order[item[0]], item[1]))

    river_paths = []
    for feature in rivers:
        geometry = feature["geometry"]
        if not geometry or feature["properties"].get("name") not in RIVERS:
            continue
        lines = [geometry["coordinates"]] if geometry["type"] == "LineString" else geometry["coordinates"]
        for line in lines:
            pts = [project(lon, lat) for lon, lat in line if LON0 - 0.5 < lon < LON1 + 0.5 and LAT0 - 0.5 < lat < LAT1 + 0.5]
            pts = simplify(pts, 0.45)
            if len(pts) > 1:
                river_paths.append(ring_path(pts, close=False))

    graticule = "".join(f"M{fmt(project(lon, 0)[0])} 0V{fmt(HEIGHT)}" for lon in range(92, 122, 2))
    graticule += "".join(f"M0 {fmt(project(0, lat)[1])}H{fmt(WIDTH)}" for lat in range(8, 25, 2))

    km_per_px = 6371.0 * math.cos(math.radians(16.6)) / SCALE

    def pair(key, table):
        x, y = project(*table[key])
        return f"  {key}: [{fmt(x)}, {fmt(y)}],"

    out = [
        "// Generated by scripts/build-indochina-map.py — do not edit by hand.",
        "// Natural Earth 1:10m (public domain), spherical Mercator, "
        f"{LON0:g}–{LON1:g}°E, {LAT0:g}–{LAT1:g}°N.",
        "",
        f"export const MAP_SIZE = {{ width: {fmt(WIDTH)}, height: {fmt(HEIGHT)} }};",
        f"export const KM_PER_UNIT = {km_per_px:.4f};",
        "",
        "export type LandKind = \"vn\" | \"la\" | \"th\" | \"other\";",
        "export const LANDS: { kind: LandKind; code: string; d: string }[] = [",
    ]
    out += [f"  {{ kind: \"{kind}\", code: \"{code}\", d: \"{d}\" }}," for kind, code, d in lands]
    out += ["];", "", f"export const MEKONG = \"{''.join(river_paths)}\";", f"export const GRATICULE = \"{graticule}\";", "",
            "export const POINTS: Record<string, [number, number]> = {"]
    out += [pair(key, POINTS) for key in POINTS]
    out += ["};", "", "export const LABEL_ANCHORS: Record<string, [number, number]> = {"]
    out += [pair(key, LABELS) for key in LABELS]
    out += ["};", ""]
    open("src/components/maps/indochinaGeo.ts", "w", encoding="utf-8").write("\n".join(out))
    print(f"{len(lands)} lands, {len(river_paths)} river segments, {WIDTH:g}x{HEIGHT:.1f}, {km_per_px:.3f} km/unit")


if __name__ == "__main__":
    main()
