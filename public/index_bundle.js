document.addEventListener('DOMContentLoaded', async ()=>{
  // load feed (show all posts on home)
  try{
    const res = await fetch('/blogs/api/list');
    const posts = await res.json();
    const feed = document.getElementById('feed');
    const tpl = document.getElementById('post-snippet');
    feed.innerHTML = '';
    if(!posts || posts.length === 0){
      feed.innerHTML = '<p class="msg">No posts yet. Be the first to create one!</p>';
      return;
    }

    posts.forEach(p => {
      const node = tpl.content.cloneNode(true);
      const authorName = (p.author && (p.author.displayName || p.author.username)) || 'Unknown';
      const authorLink = node.querySelector('.author-link');
      authorLink.textContent = authorName;
      authorLink.href = '/profile.html?username='+encodeURIComponent((p.author && p.author.username) || '');
      const av = node.querySelector('.avatar');
      av.src = (p.author && p.author.avatarPath) || '/images/avatar_placeholder.png';
      node.querySelector('.time').textContent = new Date(p.createdAt).toLocaleString();
      node.querySelector('.post-title').textContent = p.title || '';
      const short = p.content ? (p.content.length>180 ? p.content.substring(0,180)+'...' : p.content) : '';
      node.querySelector('.post-content').textContent = short;
      if(p.imagePath) node.querySelector('.post-image').innerHTML = '<img src="'+p.imagePath+'"/>';
      node.querySelector('.see-more').addEventListener('click', ()=> location.href='/post.html?id='+p._id);
      feed.appendChild(node);
    });
  }catch(err){
    console.error('Failed to load posts', err);
    const feed = document.getElementById('feed'); if(feed) feed.innerHTML = '<p class="msg error">Unable to load posts right now.</p>';
  }
});
