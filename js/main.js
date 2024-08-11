
const add = document.querySelector(".add"),
addBtn = document.querySelector(".add i"),
cards=document.querySelector(".cards"),
popup = document.querySelector(".popup_app"),
titlePopup= popup.querySelector(".popup_header h4"),
closeBtn = popup.querySelector(".close"),
textarea= popup.querySelector('textarea'),
popup_add_btn=document.querySelector('.popup_btn'),
input = document.querySelector('input');

var comment_id,
isEdit=false;

const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December"
  ];  

  const comments=JSON.parse(localStorage.getItem('comments')||"[]");
  console.log(comments)
addBtn.addEventListener('click' , ()=>{
    popup.classList.add('open');
    input.focus();
})
closeBtn.addEventListener('click',()=>{
    popup.classList.remove('open');
    isEdit=false;
})

popup_add_btn.addEventListener('click', (e)=>{
    e.preventDefault();
    let title=input.value.trim(),
    description=textarea.value.trim()
    if(input.value && textarea.value){
        const date= new Date(),
        month = months[date.getMonth()],
        day = date.getDay(),
        year = date.getFullYear();
        console.log(month , day , year);
        let commentData = {
            title,
            description,
            date: `${month}  ${day} , ${year}`
        };
        if(isEdit){
            comments[comment_id]=commentData;
        }else{
            comments.push(commentData);
            
        }
        localStorage.setItem('comments',JSON.stringify(comments));
        console.log(comments);
        closeBtn.click();
        input.value='';
        textarea.value='';
        showComments();
    };
})

function showComments(){
    if(!comments) return;

    while(cards.children.length>1){
        cards.removeChild(cards.children[1]);
    }
    console.log(cards.children);
    let allCards = '';
    comments.forEach((comment , idx)=>{
        let card = `
            <div class="card card-style">
                <div class="card_content">
                    <h4>${comment.title}</h4>
                    <p>${comment.description}</p>
                </div>
                <div class="card_details">
                    <span>${comment.date}</span>
                    <div class="menu-app">
                        <i class='bx bx-dots-horizontal-rounded three_dots'></i>
                        <ul class="popup_menu">
                            <li onclick="edit(${idx} , '${comment.title}' , '${comment.description}' )"> <i class='bx bxs-edit-alt'></i> تعديل </li>
                            <li onclick="removeComment(${idx})"> <i class='bx bxs-trash'></i> حذف </li>
                        </ul>
                    </div>
                </div>
            </div>
        `
        allCards += card;
    })
    add.insertAdjacentHTML('afterend',allCards)
}
showComments();

function removeComment(idx){
    let check = confirm("هل انت متأكد من حذف الملحوظة");
    if(!check) return;
    console.log(idx)
        comments.splice(idx,1);
        console.log(comments);
        localStorage.setItem('comments',JSON.stringify(comments));
        showComments();
    
}

function edit(idEdit , title , desc){
    comment_id=idEdit;
    isEdit=true;
    addBtn.click();
    titlePopup.innerText="تعديل الملاحظة";
    popup_add_btn.innerText = "تحديث";
    input.value=title;
    textarea.value=desc;

}