async function getWhoami(){ try{ const res = await fetch('/auth/whoami'); if(res.status===200) return res.json(); }catch(e){} return null; }
async function renderNav(){
	const holder = document.getElementById('nav');
	if(!holder) return;
	try{
		const who = await getWhoami();
		if(who && who.user){
			// Show Home + user controls when logged in
			holder.innerHTML = '<a href="/">Home</a> <span>Hi '+who.user.displayName+'</span> <a href="/dashboard.html">Dashboard</a> <a id="logout" href="#">Logout</a>';
			document.getElementById('logout').addEventListener('click', async (e)=>{ e.preventDefault(); await fetch('/auth/logout',{ method:'POST' }); location.href='/'; });
		} else {
			// Show Home + auth links when logged out
			holder.innerHTML = '<a href="/">Home</a> <a href="/login.html">Login</a> <a href="/register.html">Register</a>';
		}
	}catch(e){
		holder.innerHTML = '<a href="/">Home</a> <a href="/login.html">Login</a> <a href="/register.html">Register</a>';
	}
}
document.addEventListener('DOMContentLoaded', ()=>{ renderNav(); });
