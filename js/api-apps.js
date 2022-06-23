/* Documents for the Create buttons */

let postTitle = document.getElementById('post-title');                     /* post-title */
let postBody = document.getElementById('post-body');                       /* post-body */
let postForm = document.getElementById('post-form');                       /* post-form */
let userPost = [];

                        /* The submit button-listener */
// postForm.addEventListener('submit2', getPosts)


  // To Get Post 
  
  
function getPosts() {
    fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => response.json())
    .then((data)=> {
        let postLayout = document.getElementById('post-layout')           /* post layout */
        userPost = data;
        //renderUI(userPost)
        let allPosts = "";
        data.forEach(e => {
          allPosts += `
              <div class="card p-2 h-75 col-lg-5 mt-4 justify-content-between align-content-center mx-auto h-100 col-md-6">
                <div class="overflow position-relative pb-0 ">
                    <div class="img-slot pb-5">
                        <div class="pt-4 pb-4">
                            <h6 class="post-id pt-5 pb-5 px-3 mb-5 ">${e.id}</h6>
                        </div>
                    </div>
                </div>
                <img src="img/per-s.png" alt="" class="img-fluid rounded-circle  position-absolute top-0 right-0 mt-3 mx-2 p-lg-2 pb-5">
                <p id="title" class="post-title pt-lg-2 pt-3 pb-0 px-3 fw-bold" id="my-post-title">${e.title}</p>
                <p id="content" class="post-body pt-0 px-3" id="my-post-body">${e.body}</p>
                <div class="button-section container pt-3 pb-3">
                    <div class="row justify-centent-center align-content-center d-flex g-lg-2">
                        <div class="col">
                            <button class="btn rounded-pill px-5 btn-outline-warning col mt-2 text-dark" onclick="updatePost(${e.id})">Update</button>
                        </div>
                        <div class="col">
                            <button class="btn rounded-pill px-5 btn-outline-warning col mt-2 text-dark" onclick="openOtherPage(${e.id})">View</button>
                        </div>
                        <div class="col mx-auto">
                            <button class="btn rounded-pill px-5 btn-outline-danger col mt-2" onclick="deletePost(${e.id})">Delete</button>
                        </div>
                    </div>
                </div>
              </div>       
          `
          postLayout.innerHTML = allPosts
        }); 
    })
}
  // getPosts(); 

  postForm.addEventListener('submit', createPost)    


  // To create Post 

  function createPost(e) {
    e.preventDefault();
    let pTitle = postTitle.value;   
    let pBody = postBody.value;
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
      userPost.unshift(data);
      let postLayout = document.getElementById('post-layout');
      let allPosts = "";
      userPost.forEach(e => {
        allPosts += `
            <div class="card p-2 h-75 col-lg-5 mt-4 justify-content-between align-content-center mx-auto h-100 col-md-6">
              <div class="overflow position-relative pb-0 ">
                  <div class="img-slot pb-5">
                      <div class="pt-4 pb-4">
                          <h6 class="post-id pt-5 pb-5 px-3 mb-5 ">${e.id}</h6>
                      </div>
                  </div>
              </div>
              <img src="img/per-s.png" alt="" class="img-fluid rounded-circle  position-absolute top-0 right-0 mt-3 mx-2 p-lg-2 pb-5">
              <p id="title" class="post-title pt-lg-2 pt-3 pb-0 px-3 fw-bold" id="my-post-title">${e.title}</p>
              <p id="content" class="post-body pt-0 px-3" id="my-post-body">${e.body}</p>
              <div class="button-section container pt-3 pb-3">
                  <div class="row justify-centent-center align-content-center d-flex g-lg-2">
                      <div class="col">
                          <button class="btn rounded-pill px-5 btn-outline-warning col mt-2 text-dark">Update</button>
                      </div>
                      <div class="col">
                          <button class="btn rounded-pill px-5 btn-outline-success col mt-2">View</button>
                      </div>
                      <div class="col mx-auto">
                          <button class="btn rounded-pill px-5 btn-outline-danger col mt-2">Delete</button>
                      </div>
                  </div>
              </div>
            </div>       
      `
        postLayout.innerHTML = allPosts
      }); 
      alert('Post Created Successfully')
    })
  }

  createPost()

  // to update post 

  function updatePost(id) {
   // console.log(id)
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}` , {
      method: 'PUT',
      body: JSON.stringify({
        id: id,
        title: postTitle.value,
        body: postBody.value,
        userId: 101,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        let postTitles = document.querySelectorAll('.post-title ')
        let postBodies = document.querySelectorAll('.post-body ')
        console.log(postTitles)
        postTitles.forEach((postTitle, index) => {
          if(index + 1 === id) {
            if(data.title !== "") {
              postTitle.innerHTML = data.title
            }
            else{
              alert('This input is empty, Pls fill form')
            }
          }
        })
        postBodies.forEach((postBody, index) => {
          if(index + 1 === id) {
            if(data.title !== "") {
              postBody.innerHTML = data.body
            }
          
          }
        })
      });
   }
   updatePost();

  // to viewpage

   function openOtherPage(id){
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem('toViewPost', JSON.stringify(data))
       // window.location.href = `otherPage.html?id=${id}`
        window.location.href = `otherPage.html`
      });
  
  }
  
  // openOtherPage();
  
  function deletePost(id){
    fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
      method: 'DELETE',
    })
    .then((response) => response.json())
    .then((data) => {
        console.log(data)
        userPost = userPost.filter(e => e.id !== id)
        renderUI(userPost)  
    })
  }


  