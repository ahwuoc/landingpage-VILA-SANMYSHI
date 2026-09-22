# Indochina regional locator

`indochina.svg` is a local, self-contained SVG locator for the Vietnam–Laos–Thailand region. It does not require a map provider, API key, external fonts, or JavaScript.

## Geographic source and license

- Dataset: Natural Earth, `ne_110m_admin_0_countries` (1:110 million scale).
- Source: https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson
- License: public domain. Natural Earth terms: https://www.naturalearthdata.com/about/terms-of-use/
- Retrieved: 2026-09-21.
- All 177 country features and their polygon rings are projected from the source dataset and clipped to the SVG frame. Nearby countries retain the source geometry. No islands or boundaries were drawn by guesswork.

## Projection and bounds

Spherical Mercator with uniform scale on both axes:

- Longitude: 97° E to 114° E.
- Latitude: 7° N to 25° N.
- SVG viewBox: `0 0 720 796.903`.
- `x = scale × radians(longitude − 97)`.
- `y = scale × [ln(tan(π/4 + radians(25)/2)) − ln(tan(π/4 + radians(latitude)/2))]`.
- `scale = 720 / radians(114 − 97)`.
- Grid spacing: 2° of latitude/longitude.

The aspect ratio follows the projection; use `object-fit: contain` or the SVG's `preserveAspectRatio="xMidYMid meet"` to avoid geographic distortion. The water/background color is `#f2f5ec`.

## Lao Bảo locator

The highlighted marker uses approximately **16.61406° N, 106.60065° E**, representing the Lao Bảo town area. Its projected SVG position is approximately `(406.616, 380.387)`. This is a town-level orientation marker, **not a surveyed office coordinate or door-to-door navigation target**. The leader line points eastward to the Lao Bảo / Quảng Trị label. The two smaller unlabelled reference dots mark approximate Hanoi and Ho Chi Minh City locations.

This illustration is a regional logistics locator. The intentionally coarse Natural Earth scale is suitable for orientation, not navigation, cadastral use, administrative boundaries, or a comprehensive depiction of national territory and offshore islands. Use the separate office-address link for directions.

## Visual treatment

- Vietnam: `#286348`.
- Laos: `#c9d7b4`.
- Thailand: `#dce4c9`.
- Neighbouring countries: `#e6e9df`.
- Water: `#f2f5ec`.

Visible labels are geographic names. An SVG title and description explain the regional scope and approximate town marker for assistive technology.
