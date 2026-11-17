import requests, re, json, sys, time
from bs4 import BeautifulSoup
from concurrent.futures import ThreadPoolExecutor
OUT=sys.argv[1]
UA={'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/124 Safari/537.36'}
s=requests.Session(); s.headers.update(UA)
def locs(u):
    r=s.get(u,timeout=30); return re.findall(r'<loc>(.*?)</loc>',r.text)
sm={}
for sub in locs('https://aluminiosnavarro.es/sitemap_index.xml'):
    sm[sub]=locs(sub)
urls=[]
for k,v in sm.items():
    for u in v:
        if not re.search(r'\.(jpg|jpeg|png|webp|gif)$',u): urls.append(u)
urls=list(dict.fromkeys(urls))
def an(u):
    d={'url':u}
    try:
        t=time.time(); r=s.get(u,timeout=40,allow_redirects=False); d['ttfb_total']=round(time.time()-t,2)
        d['status']=r.status_code; d['bytes']=len(r.content)
        if r.status_code in (301,302,307,308): d['location']=r.headers.get('location'); return d
        so=BeautifulSoup(r.text,'lxml')
        g=lambda sel,attr='content': (so.select_one(sel) or {}).get(attr) if so.select_one(sel) else None
        d['title']=so.title.get_text(strip=True) if so.title else None
        d['meta_desc']=g('meta[name=description]')
        d['robots']=g('meta[name=robots]')
        d['canonical']=g('link[rel=canonical]','href')
        d['og_title']=g('meta[property="og:title"]'); d['og_image']=g('meta[property="og:image"]')
        d['h1']=[h.get_text(' ',strip=True) for h in so.find_all('h1')]
        d['h2']=[h.get_text(' ',strip=True) for h in so.find_all('h2')][:30]
        d['h3n']=len(so.find_all('h3'))
        lds=[]
        for sc in so.find_all('script',type='application/ld+json'):
            try:
                j=json.loads(sc.string or '{}')
                items=j.get('@graph',[j]) if isinstance(j,dict) else j
                for it in items:
                    if isinstance(it,dict): lds.append(it.get('@type'))
            except Exception as e: lds.append('ERR')
        d['schema']=lds
        d['schema_raw']=[sc.string for sc in so.find_all('script',type='application/ld+json')][:3]
        imgs=so.find_all('img')
        d['imgs']=[{'src':i.get('src') or i.get('data-src') or i.get('data-lazy-src'),'alt':i.get('alt'),'w':i.get('width'),'h':i.get('height'),'loading':i.get('loading'),'srcset':bool(i.get('srcset') or i.get('data-srcset'))} for i in imgs]
        body=so.body
        for x in so(['script','style','noscript']): x.decompose()
        txt=so.get_text(' ',strip=True)
        d['words']=len(txt.split())
        links=[a.get('href') for a in so.find_all('a') if a.get('href')]
        d['int_links']=[l for l in links if 'aluminiosnavarro.es' in l or l.startswith('/')]
        d['ext_links']=[l for l in links if l.startswith('http') and 'aluminiosnavarro.es' not in l]
        d['tel']=list(set(re.findall(r'tel:[+\d ]+',r.text)))
        d['generator']=re.findall(r'<meta name="generator" content="([^"]+)"',r.text)
        d['lang']=re.findall(r'<html[^>]*lang="([^"]+)"',r.text)[:1]
        d['viewport']=bool(re.search(r'name="viewport"',r.text))
        d['hreflang']=re.findall(r'hreflang="([^"]+)"',r.text)
        d['text_sample']=txt[:600]
    except Exception as e: d['error']=str(e)
    return d
with ThreadPoolExecutor(6) as ex: res=list(ex.map(an,urls))
json.dump({'sitemaps':{k:len(v) for k,v in sm.items()},'sitemap_urls':sm,'pages':res},open(OUT,'w'),ensure_ascii=False,indent=1)
print(len(urls))
