import requests,json,re,sys
from bs4 import BeautifulSoup
from difflib import SequenceMatcher
d=json.load(open(sys.argv[1]))
P=[p for p in d['pages'] if p.get('status')==200]
s=requests.Session(); s.headers['User-Agent']='Mozilla/5.0'
out={}
for p in P:
    so=BeautifulSoup(s.get(p['url'],timeout=30).text,'lxml')
    for x in so(['script','style','noscript','header','footer','nav']): x.decompose()
    main=so.find('article') or so.find('main') or so.find(id='primary') or so.body
    t=main.get_text(' ',strip=True)
    dates=re.findall(r'"datePublished":"([^"]+)"',requests.get(p['url'],headers={'User-Agent':'Mozilla/5.0'}).text) if False else []
    out[p['url']]={'main_words':len(t.split()),'main':t[:6000]}
json.dump(out,open(sys.argv[2],'w'),ensure_ascii=False)
