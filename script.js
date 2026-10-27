// Save a value in a cookie for 7 days.
function setCookie(name, value) {
    document.cookie = name + "=" + encodeURIComponent(value) + "; max-age=604800; path=/";
}

// Read a cookie by its name.
function getCookie(name) {
    const cookies = document.cookie.split(";");

    for (const cookie of cookies) {
        const parts = cookie.trim().split("=");
        if (parts[0] === name) {
            return decodeURIComponent(parts[1]);
        }
    }
    return "";
}

// Remove a cookie.
function deleteCookie(name) {
    document.cookie = name + "=; max-age=0; path=/";
}

const likeButton = document.getElementById("likeButton");
const dislikeButton = document.getElementById("dislikeButton");
const likeCount = document.getElementById("likeCount");
const dislikeCount = document.getElementById("dislikeCount");
const voteMessage = document.getElementById("voteMessage");
const commentInput = document.getElementById("commentInput");
const submitButton = document.getElementById("submitButton");
const resetButton = document.getElementById("resetButton");
const commentsList = document.getElementById("commentsList");

let likes = Number(getCookie("lab6_likes")) || 0;
let dislikes = Number(getCookie("lab6_dislikes")) || 0;
let vote = getCookie("lab6_vote");
let comments = [];

const savedComment = getCookie("lab6_comment");
if (savedComment !== "") {
    comments.push(savedComment);
}

function updatePage() {
    likeCount.textContent = likes;
    dislikeCount.textContent = dislikes;

    // A user cannot vote twice.
    likeButton.disabled = vote !== "";
    dislikeButton.disabled = vote !== "";

    if (vote === "like") {
        voteMessage.textContent = "You voted Like.";
    } else if (vote === "dislike") {
        voteMessage.textContent = "You voted Dislike.";
    } else {
        voteMessage.textContent = "";
    }

    // A user can submit only one comment until Reset is clicked.
    commentInput.disabled = comments.length > 0;
    submitButton.disabled = comments.length > 0;

    commentsList.innerHTML = "";
    for (const comment of comments) {
        const paragraph = document.createElement("p");
        paragraph.className = "comment";
        paragraph.textContent = comment;
        commentsList.appendChild(paragraph);
    }
}

likeButton.addEventListener("click", function () {
    if (vote === "") {
        likes++;
        vote = "like";
        setCookie("lab6_likes", likes);
        setCookie("lab6_vote", vote);
        updatePage();
    }
});

dislikeButton.addEventListener("click", function () {
    if (vote === "") {
        dislikes++;
        vote = "dislike";
        setCookie("lab6_dislikes", dislikes);
        setCookie("lab6_vote", vote);
        updatePage();
    }
});

submitButton.addEventListener("click", function () {
    const comment = commentInput.value.trim();

    if (comment !== "" && comments.length === 0) {
        comments.push(comment);
        setCookie("lab6_comment", comment);
        commentInput.value = "";
        updatePage();
    }
});

resetButton.addEventListener("click", function () {
    likes = 0;
    dislikes = 0;
    vote = "";
    comments = [];

    deleteCookie("lab6_likes");
    deleteCookie("lab6_dislikes");
    deleteCookie("lab6_vote");
    deleteCookie("lab6_comment");

    commentInput.value = "";
    updatePage();
});

// Restore saved values when the page opens or refreshes.
updatePage();
