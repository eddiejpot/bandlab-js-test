/**
 * Fetches posts from jsonplaceholder api
 * @returns {Array}
 */
const fetchPosts = async() => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    return response.json();
  } catch (error) {
    console.log("Error fetching data") 
  }
}

/**
 * Fetches selected user's posts from jsonplaceholder api
 * @param {number} userId
 * @returns {Array}
 */
const fetchPostsFromUser = async(userId) => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`);
    return response.json();
  } catch (error) {
    console.log("Error fetching data") 
  }
}

/**
 * Create card for a single post in the DOM
 * @param {Object} postData
 * @param {DOM Object} parent
 */
const createSinglePostCard = (postData, parent) => {
  
  const postDivContainer = document.createElement("div");
  postDivContainer.setAttribute("id","individual-post-container");
  parent.appendChild(postDivContainer);

  const userIdText = document.createElement("p");
  userIdText.innerHTML = `User Id: ${postData.userId}`
  postDivContainer.appendChild(userIdText);

  const titleText = document.createElement("p");
  titleText.innerHTML = `Title: ${postData.title}`;
  postDivContainer.appendChild(titleText);
}


/**
 * Create multiple posts in the DOM (Sorted By Title)
 */
const displayAllPostsSortedByTitle = async() => {
  const parent = document.querySelector("#all-posts-container")

  //fetch data
  const postsData = await fetchPosts();

  // clear previous DOM
  parent.innerHTML = "";

  const sortedPostsData = postsData.sort((a, b) => (a.title > b.title) ? 1 : -1);

  const postDataLength = sortedPostsData.length;
  for (let i = 0; i < postDataLength ; i+=1) {
    createSinglePostCard(sortedPostsData[i], parent)
  }
}

/**
 * Create multiple posts in the DOM (Unsorted)
 */
const displayAllPostsUnsorted = async() => {
  const parent = document.querySelector("#all-posts-container")
  //fetch data
  const postsData = await fetchPosts();

  // clear previous DOM
  parent.innerHTML = "";

  const postDataLength = postsData.length;
  for (let i = 0; i < postDataLength ; i+=1) {
    createSinglePostCard(postsData[i], parent)
  }

}

/**
 * Create multiple posts in the DOM (Selected Users)
 * @param {Numer} userId
 */
const displaySelectedUserPosts = async(userId) => {
  const parent = document.querySelector("#all-posts-container")

  //fetch data
  const allOfUsersPosts = await fetchPostsFromUser(userId);

  // clear previous DOM
  parent.innerHTML = "";

  const allOfUsersPostsLength = allOfUsersPosts.length;
  for (let i = 0; i < allOfUsersPostsLength ; i+=1) {
    createSinglePostCard(allOfUsersPosts[i], parent)
  }

}

/**
 * Create dropdown button
 * @param {DOM Object} parent
 */
const createGroupByUserIdDropDownButton = (parent)=> {

  // create html elements for the drop down button
  const dropDownlabel = document.createElement("label");
  dropDownlabel.classList.add("dropdown");
  parent.appendChild(dropDownlabel);

  const dropDownDiv = document.createElement("div");
  dropDownDiv.classList.add("dd-button");
  dropDownDiv.innerHTML = "Posts Grouped By User";
  dropDownlabel.appendChild(dropDownDiv);

  const dropDownInput = document.createElement("input");
  dropDownInput.setAttribute("type", "checkbox");
  dropDownInput.classList.add("dd-input");
  dropDownlabel.appendChild(dropDownInput);

  const dropDownUl = document.createElement("ul");
  dropDownUl.classList.add("dd-menu");
  dropDownlabel.appendChild(dropDownUl);

  // The dropdown options are the number of unique users 
  // once a dropdown option is clicked, show the post from the selected unique user
  dropDownlabel.addEventListener("click", async()=> {
    //fetch data
    const postsData = await fetchPosts();
    // remove duplicate users
    const uniqueUserIds = postsData
      .filter((ele,index,arr)=>arr.findIndex(arrEle=>(arrEle.userId === ele.userId))===index)
      .map((uniqueObj)=> uniqueObj.userId);
    // clear previous DOM
    dropDownUl.innerHTML = "";

    const uniqueUserIdsLength = uniqueUserIds.length;
    for (let i = 0; i < uniqueUserIdsLength ; i+=1) {
      const dropDownli = document.createElement("li");
      dropDownli.innerHTML = `User Id: ${uniqueUserIds[i]}`;
      dropDownli.addEventListener("click", ()=>displaySelectedUserPosts(uniqueUserIds[i]))
      dropDownUl.appendChild(dropDownli);
    }
  })
}

/**
 * Create page to show all posts
 */
const createShowAllPostsPage = ()=> {
  // clear previous DOM
  mainContainer.innerHTML = "";

  // create new DOM elements
  const mainHeader = document.createElement("h1");
  mainHeader.innerHTML = "ALL POSTS BELOW!";
  mainContainer.appendChild(mainHeader);

  // Buttons
  const sortButtonGroup = document.createElement("div");
  mainContainer.appendChild(sortButtonGroup);
  
  const unsortedButton = document.createElement("button");
  unsortedButton.innerHTML = "All Posts (Unsorted)";
  sortButtonGroup.appendChild(unsortedButton);
  unsortedButton.addEventListener("click", displayAllPostsUnsorted)

  const sortByTitleButton = document.createElement("button");
  sortByTitleButton.innerHTML = "All Posts (Sorted By Title Ascending)";
  sortButtonGroup.appendChild(sortByTitleButton);
  sortByTitleButton.addEventListener("click", displayAllPostsSortedByTitle)

  createGroupByUserIdDropDownButton(sortButtonGroup)

  // Posts Display
  const allPostsContainerDiv = document.createElement("div");
  allPostsContainerDiv.setAttribute("id","all-posts-container");
  mainContainer.appendChild(allPostsContainerDiv);

  displayAllPostsUnsorted()

  // Extra Button that navigates back to homepage / refreshes page
  const backToHomepageButton = document.createElement("button");
  backToHomepageButton.innerHTML = "Back to homepage";
  mainContainer.appendChild(backToHomepageButton);
  backToHomepageButton.addEventListener("click", ()=> location.reload());

}

/**
 * Create intro page
 */
const createPageOne = () => {

  // clear previous DOM
  mainContainer.innerHTML = "";

  // create new DOM elements
  const mainHeader = document.createElement("h1");
  mainHeader.innerHTML = "LEMME SEE IT ALL";
  mainContainer.appendChild(mainHeader);

  const subHeader = document.createElement("h4");
  subHeader.innerHTML = "show all posts";
  mainContainer.appendChild(subHeader);

  const showAllPostsButton = document.createElement("button");
  showAllPostsButton.innerHTML = "Gimme gimme";
  mainContainer.appendChild(showAllPostsButton);
  showAllPostsButton.addEventListener("click", createShowAllPostsPage)

}

//Event Listeners
pageOneButton.addEventListener("click", createPageOne)
