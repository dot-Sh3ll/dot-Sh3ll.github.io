import json,re,subprocess,collections,sys
from common import *
s=open('/home/claude/dot-sh3ll.github.io/aeons-end/'+sys.argv[1],encoding='utf-8').read()
raw=re.search(r'const RAW = \[\n(.*?)\n\];',s,re.S).group(1)
rows=[json.loads(l.rstrip(',')) for l in raw.split('\n') if l.startswith('[')]
app=collections.Counter((r[2],r[1]) for r in rows)
ds=collections.Counter()
seen=set()
for c in market():
    if c['id'] in seen: continue
    seen.add(c['id']); ds[(c['box'],c['type'])]+=1
print('card counts match per box/type:', app==ds)
byid={r[0]:r for r in rows}
bad=[c['id'] for c in market() if byid[c['id']][3]!=c['cost'] or byid[c['id']][1]!=c['type'] or byid[c['id']][2]!=c['box']]
print('cost/type/box mismatches:',bad)
def lst(name):
    body=re.search(r'const '+name+r' = \[\n(.*?)\n\];',s,re.S).group(1)
    return [l.strip() for l in body.split('\n')]
for kind,name in (('nemeses','NEM'),('mages','MAGES')):
    a=collections.Counter(re.match(r'\["(?:[^"\\]|\\.)*","(\w+)"',l).group(1) for l in lst(name))
    d=collections.Counter()
    for folder,key,*_ in BOXDEF:
        ids={x['id'] for x in ENG[folder][kind]}; d[key]+=len(ids)
    d={k:v for k,v in d.items() if v}
    print(kind,'counts match:',dict(a)==d, {k:(a.get(k),d.get(k)) for k in set(a)|set(d) if a.get(k)!=d.get(k)})
