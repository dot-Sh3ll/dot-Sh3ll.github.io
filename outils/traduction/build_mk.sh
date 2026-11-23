set -e
cd /home/claude/tr && python3 merge.py mk >/dev/null
python3 /home/claude/tools/i18n.py apply /home/claude/site/mage-knight/index.html mk-map.json /home/claude/site/mage-knight/en.html
cd /home/claude/site/mage-knight
python3 - <<'P'
import re
p='en.html'; s=open(p,encoding='utf-8').read()
s=re.sub(r'<script>try\{(?:var sl=)?(?:if\()?localStorage.getItem\("site-lang"\).*?</script>\n?','',s,count=1,flags=re.S)
s=re.sub(r'<a href="en.html\?lang=en" class="site-lang".*?</script>\n','',s,count=1,flags=re.S)
s=re.sub(r'(</b>|</strong>) :', r'\1:', s)
for a,b in [("' defeated'+(r.t.length>1?'s':'')","' defeated'"),("Crystal${n>1?'s':''}","Crystal${n>1?'s':''}")]:
    s=s.replace(a,b)
open(p,'w',encoding='utf-8').write(s)
P
python3 /home/claude/tools/lang.py en en.html >/dev/null
node -e "const fs=require('fs');const h=fs.readFileSync('en.html','utf8');const re=/<script>([\s\S]*?)<\/script>/g;let m,i=0;while((m=re.exec(h))){try{new Function(m[1])}catch(e){console.log('script',i,e.message)}i++}console.log('scripts ok',i)"
