document.addEventListener('DOMContentLoaded', async ()=>{
	try{
		const res = await fetch('/blogs/api/list');
		const posts = await res.json();
		const feed = document.getElementById('feed');
		const tpl = document.getElementById('post-template');
		feed.innerHTML = '';
		if(!posts || posts.length === 0){ feed.innerHTML = '<p class="msg">No posts yet.</p>'; return; }

		posts.forEach(p=>{
			const node = tpl.content.cloneNode(true);
			const authorLink = node.querySelector('.author-link');
			authorLink.textContent = p.author.displayName || p.author.username;
			authorLink.href = '/profile.html?username='+encodeURIComponent(p.author.username);
			node.querySelector('.avatar').src = p.author.avatarPath || '/images/avatar_placeholder.png';
			node.querySelector('.time').textContent = new Date(p.createdAt).toLocaleString();
			node.querySelector('.post-title').textContent = p.title||'';
			const short = p.content ? (p.content.length>180 ? p.content.substring(0,180)+'...' : p.content) : '';
			node.querySelector('.post-content').textContent = short;
			if(p.imagePath) node.querySelector('.post-image').innerHTML = '<img src="'+p.imagePath+'"/>';
			// add See more action
			const actions = node.querySelector('.post-actions');
			const a = document.createElement('a');
			a.className = 'see-more';
			a.href = '#';
			a.textContent = 'See more';
			a.addEventListener('click', (e)=>{ e.preventDefault(); location.href = '/post.html?id='+p._id; });
			actions.appendChild(a);
			feed.appendChild(node);
		});
	}catch(err){ console.error('Failed to load posts', err); const feed = document.getElementById('feed'); if(feed) feed.innerHTML = '<p class="msg error">Unable to load posts right now.</p>'; }
});
