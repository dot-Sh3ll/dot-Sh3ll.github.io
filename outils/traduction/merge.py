import json,glob,sys
n=sys.argv[1]
d=json.load(open(n+'.json'))
M={}
for f in sorted(glob.glob(n+'-[0-9]*.tsv')):
    for line in open(f,encoding='utf-8'):
        line=line.rstrip('\n')
        if not line.strip(): continue
        i,t=line.split('\t',1)
        M[d[int(i)]['t']]=t
try:
    W=json.load(open(n+'-words.json',encoding='utf-8'))
    for k,v in W.items(): M.setdefault(k,v)
except FileNotFoundError: pass
json.dump(M,open(n+'-map.json','w',encoding='utf-8'),ensure_ascii=False)
print(len(M))
