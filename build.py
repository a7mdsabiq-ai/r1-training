import base64, pathlib, re, shutil
R = pathlib.Path(__file__).resolve().parent; SRC = R/'src'; DIST = R; F = R/'fonts'
def ff(file, weight, rng):
    b = base64.b64encode((F/file).read_bytes()).decode()
    return f"@font-face{{font-family:'Plex';font-style:normal;font-weight:{weight};font-display:swap;src:url(data:font/woff2;base64,{b}) format('woff2');unicode-range:{rng}}}"
AR = 'U+0600-06FF,U+0750-077F,U+0870-088E,U+0890-0891,U+0898-08E1,U+08E3-08FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE70-FE74,U+FE76-FEFC'
LA = 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'
fonts = ''.join(ff(f'ibm-plex-sans-arabic-arabic-{w}-normal.woff2', w, AR) for w in (400,500,600,700))
fonts += ''.join(ff(f'ibm-plex-sans-arabic-latin-{w}-normal.woff2', w, LA) for w in (400,600,700))
css = (SRC/'style.css').read_text()
js = '\n'.join((SRC/f).read_text() for f in ('data.js','bodymap.js','app.js'))
paths = re.search(r'<svg[^>]*>(.*)</svg>', (R/'logo'/'r1.svg').read_text(), re.S).group(1)
fav_svg = "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='white'/><svg x='8' y='35' width='84' height='23' viewBox='20 220 1180 320'>" + paths.replace('"', "'") + "</svg></svg>"
fav_svg = fav_svg.replace('#E10600', '#E0457B')
fav = "data:image/svg+xml," + fav_svg.replace('#', '%23').replace('<', '%3C').replace('>', '%3E')
html = f'''<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<title>R1</title>
<meta name="theme-color" content="#FFF8FA">
<meta name="apple-mobile-web-app-capable" content="yes">
<meta name="mobile-web-app-capable" content="yes">
<meta name="apple-mobile-web-app-title" content="R1">
<meta name="apple-mobile-web-app-status-bar-style" content="default">
<meta name="format-detection" content="telephone=no">
<link rel="manifest" href="manifest.webmanifest">
<link rel="apple-touch-icon" href="icon-180.png">
<link rel="icon" href="{fav}">
<style>{fonts}
{css}</style>
</head>
<body>
<main id="app"></main>
<script>
{js}
</script>
</body>
</html>
'''
(DIST/'index.html').write_text(html)
for f in ('sw.js','manifest.webmanifest'): shutil.copy(SRC/f, DIST/f)
print('built', len(html)//1024, 'KB')
