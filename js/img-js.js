let postTitle = document.getElementById('post-title');
let postBody = document.getElementById('post-body');
let postForm = document.getElementById('post-form');
let userpost = [];

postForm.addEventListener('submit', createPost)

function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then((data)=> {
        console.log(data)
        let postLayout = document.getElementById('post-layout')
        userPost = data;
        /* console.log(userPost); */
        let html = "";
        data.forEach(e => {
          console.log(e)
          html += `
          <div class=" col-md-12">
            <div class="card mt-5 shadow p-3 mb-5 bg-body rounded">
                <div class="card-body">
                    <h6 class="post-id">${e.id}</h6>
                    <h6 class="post-title mb-2 pt-1">${e.title}</h6>
                    <p class="bost-body">${e.body}
                    </p>
                </div>
            </div>
          </div>
          `
          postLayout.innerHTML = html
        }); 
    })
}

getPosts();
 

function createPost(e) {
  e.preventDefault();
  let pTitle = postTitle.value;
  let pBody = postBody.value;

  console.log('post title', pTitle)
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST', 
    body: JSON.stringify({
      title: pTitle, 
      body: pBody,
      userId: 101
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
  .then((response)=> response.json())
  .then((data) => {
    console.log('post', data)
    userPost.push(data);
    console.log(userPost)
    let postLayout = document.getElementById('post-layout');
    let html = "";
    data.forEach(e => {
      /* console.log(e) */
      html += `
      <div class=" col-md-12">
        <div class="card mt-5 shadow p-3 mb-5 bg-body rounded">
            <div class="card-body">
                <h6 class="post-id">${e.id}</h6>
                <h6 class="post-title mb-2 pt-1">${e.title}</h6>
                <p class="bost-body">${e.body}
                </p>
            </div>
        </div>
      </div>
      `
      postLayout.innerHTML = html
    }); 

    alert('Post Created Successfully')
  })
}

/* createPost(); */


function deletePost(postId) {
  console.log(postId)
  fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`, {
    method: 'DELETE', 
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data)
    console.log(userPost)
    userPost.splice((postId - 1), 1)
    /* alert('Deleted Successfully') */
  })
}

deletePost();
