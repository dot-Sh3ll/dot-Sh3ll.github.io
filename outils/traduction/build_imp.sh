set -e
cd /home/claude/tr && python3 merge.py imp >/dev/null
python3 /home/claude/tools/i18n.py apply /home/claude/site/imperium/index.html imp-map.json /home/claude/site/imperium/en.html
cd /home/claude/site/imperium
python3 - <<'P'
p='en.html'; s=open(p,encoding='utf-8').read()
import re
s=s.replace('aria-label="Complexité ${n[1]} of 5"','aria-label="Complexity ${n[1]} of 5"')
s=re.sub(r'(</b>|</strong>) :', r'\1:', s)
s=s.replace("${pl(C.losses,'loss')}","${C.losses+(C.losses>1?' losses':' loss')}")
open(p,'w',encoding='utf-8').write(s)
P
# remove FR redirect script copied from index (index already patched) then re-add EN patch
python3 - <<'P'
p='en.html'; s=open(p,encoding='utf-8').read()
import re
s=re.sub(r'<script>try\{(?:var sl=)?(?:if\()?localStorage.getItem\("site-lang"\).*?</script>\n?','',s,count=1,flags=re.S)
s=re.sub(r'<a href="en.html\?lang=en" class="site-lang".*?</script>\n','',s,count=1,flags=re.S)
open(p,'w',encoding='utf-8').write(s)
P
python3 /home/claude/tools/lang.py en en.html
