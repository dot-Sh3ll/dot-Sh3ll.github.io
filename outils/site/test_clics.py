import asyncio, sys, random
from playwright.async_api import async_playwright
pages=["","mage-knight/en.html"]
async def m():
    async with async_playwright() as p:
        b=await p.chromium.launch()
        for path in pages:
            for lang in ("en",):
                ctx=await b.new_context(viewport={"width":1280,"height":900})
                await ctx.add_init_script(f"try{{localStorage.setItem('site-lang','{lang}')}}catch(e){{}}")
                pg=await ctx.new_page(); errs=[]; cons=[]
                pg.on("pageerror",lambda e:errs.append(str(e)[:160]))
                pg.on("console",lambda m:cons.append(m.text[:120]) if m.type=="error" else None)
                pg.on("dialog",lambda d:asyncio.ensure_future(d.dismiss()))
                await pg.goto("http://localhost:8766/"+path); await pg.wait_for_timeout(900)
                final=pg.url
                random.seed(1); clicks=0
                for i in range(300):
                    try:
                        btns=await pg.query_selector_all("button:visible, [role=tab]:visible, a[href^='#']:visible, [data-go]:visible, [data-hex]:visible")
                        if not btns: break
                        el=random.choice(btns); await el.click(timeout=800); clicks+=1
                        await pg.wait_for_timeout(60)
                        if not pg.url.startswith("http://localhost:8766/"+path.split('/')[0]) and path:
                            await pg.goto("http://localhost:8766/"+path); await pg.wait_for_timeout(500)
                    except Exception as e: pass
                print(f"{path or 'home'} [{lang}] -> {final.replace('http://localhost:8766/','')} clicks={clicks} errors={len(errs)} {set(errs)} console={set(cons)}")
                await ctx.close()
        await b.close()
asyncio.run(m())
