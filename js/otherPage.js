   
  
  function renderOtherPage() {
    let newObject = localStorage.getItem('toViewPost')
    let post = JSON.parse(newObject)
    console.log(newObject)
    console.log(post)
    // console.log(e.title)
    document.getElementById('post-title').innerHTML = post.title
    document.getElementById('post-body').innerHTML = post.body
    document.getElementById('post-id').innerHTML = post.id
  }
  renderOtherPage();

