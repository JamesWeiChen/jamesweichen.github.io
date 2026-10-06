"""Draw original fictional venue maps with Pillow; no external map artwork."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'acadenda/images/maps'
OUT.mkdir(parents=True, exist_ok=True)
FONT = '/System/Library/Fonts/Supplemental/Arial Unicode.ttf'
INK, MUTED, TEAL, PAPER = '#18343a', '#527079', '#087f80', '#f4f5ef'

def font(size): return ImageFont.truetype(FONT, size)
def text(draw, xy, value, size=28, color=INK, anchor=None):
    draw.text(xy, value, font=font(size), fill=color, anchor=anchor)
def centered(draw, box, zh, en, color=INK):
    x=(box[0]+box[2])/2; y=(box[1]+box[3])/2
    text(draw,(x,y-23),zh,32,color,'mm');text(draw,(x,y+25),en,22,color,'mm')
def base(title, subtitle, number):
    im=Image.new('RGB',(1800,1200),PAPER);d=ImageDraw.Draw(im)
    d.rectangle((0,0,1800,192),fill=INK)
    text(d,(64,36),f'ACADENDA  /  DEMO MAP {number}',22,'#93d9cf')
    text(d,(64,78),title,48,'white');text(d,(64,144),subtitle,25,'#d8e6e2')
    d.line((64,1110,1736,1110),fill='#ccd8d3',width=2)
    text(d,(64,1135),'虛構示意圖 · 僅供功能測試 · 非真實地點／比例',24)
    text(d,(1010,1135),'Fictional demo · Not to scale',24)
    return im,d

def room(d,box,zh,en,fill='#d7eee8'):
    d.rounded_rectangle(box,radius=14,fill=fill,outline=TEAL,width=4);centered(d,box,zh,en)
def arrow(d,points,color=TEAL,width=12):
    import math
    d.line(points,fill=color,width=width,joint='curve')
    x,y=points[-1];px,py=points[-2];angle=math.atan2(y-py,x-px)
    a=(x-26*math.cos(angle-.5),y-26*math.sin(angle-.5));b=(x-26*math.cos(angle+.5),y-26*math.sin(angle+.5))
    d.polygon([(x,y),a,b],fill=color)

im,d=base('一樓會場配置圖','Level 1 · Demo conference venue', '01')
d.rounded_rectangle((64,235,1736,1015),radius=20,fill='white',outline='#adc6c2',width=5)
room(d,(98,265,760,555),'主會場','Main Hall / Harbour Hall')
room(d,(792,265,1260,555),'201 討論室','Room 201 / Seminar Room A')
room(d,(1292,265,1702,555),'工作坊教室','Workshop Studio')
d.rectangle((98,580,1702,716),fill='#edf3f0');text(d,(900,633),'中央走廊  /  Central corridor',30,MUTED,'mm')
room(d,(98,745,535,975),'展覽／海報區','Exhibition Hall', '#e3edf8')
room(d,(565,745,958,975),'報到大廳','Registration', '#fff0cc')
room(d,(988,745,1305,975),'咖啡交流區','Coffee & networking', '#fff0cc')
room(d,(1335,745,1511,975),'洗手間','WC', '#e8e7ed')
room(d,(1541,745,1702,975),'電梯','Lift', '#e8e7ed')
# Main entry enters the registration lobby; corridor is continuous and unobstructed.
d.rectangle((650,970,855,1025),fill='white');arrow(d,[(751,1070),(751,929)])
text(d,(915,1052),'主入口  /  Main entrance',28,TEAL)
text(d,(104,1052),'↑ 上方為會場內側  /  Interior',22,MUTED)
im.save(OUT/'demo-venue-level-1.png',optimize=True)

im,d=base('校園交通圖','Campus transport & venue locations · Fictional campus', '02')
d.rounded_rectangle((64,235,1736,1058),radius=22,fill='#e4ede0',outline='#bccfbd',width=3)
# Broad campus pedestrian spine and southern access road.
d.rectangle((95,846,1706,1030),fill='#e0e6e7')
d.rectangle((816,277,995,886),fill='#f9f9f2')
d.rectangle((275,562,1570,669),fill='#f9f9f2')
room(d,(225,288,740,516),'會議主場館','Conference Centre', '#b7e2da')
room(d,(1065,288,1497,516),'圖書館','Library', '#e5eaf4')
room(d,(225,713,675,807),'學生活動中心','Student Centre', '#fff0cc')
room(d,(1070,710,1497,807),'餐廳','Dining Hall', '#fff0cc')
# Lawn marker on the pedestrian spine.
d.ellipse((1155,540,1410,680),fill='#c4dcbc',outline='#9dbb95',width=3)
text(d,(1282,610),'中央草坪 / Lawn',22,MUTED,'mm')
d.rounded_rectangle((106,896,602,1000),radius=14,fill=INK)
text(d,(354,931),'示範車站 / Demo station',29,'white','mm')
text(d,(354,971),'出站後步行約 5 分鐘 / ~5 min walk',21,'#d8e6e2','mm')
d.rounded_rectangle((1110,896,1635,1000),radius=14,fill='#dceaf5',outline='#668ba1',width=3)
text(d,(1372,932),'接駁車站 / Shuttle stop',28,INK,'mm')
text(d,(1372,972),'校園南側道路 / South campus road',21,MUTED,'mm')
arrow(d,[(624,948),(900,948),(900,615),(483,615),(483,524)],TEAL,12)
text(d,(918,1015),'南門 / South gate',25,TEAL,'mm')
text(d,(755,686),'步行路線',23,TEAL,'mm')
text(d,(755,718),'Walking route',20,TEAL,'mm')
# North arrow in the unused east margin.
arrow(d,[(1610,386),(1610,286)],INK,6);text(d,(1610,254),'N / 北',25,INK,'mm')
im.save(OUT/'demo-campus-transport.png',optimize=True)
for path in OUT.glob('*.png'):
    with Image.open(path) as image:
        assert image.width*image.height<120_000_000
    assert path.stat().st_size<40*1024*1024
    print(path.relative_to(ROOT),path.stat().st_size,'bytes')
