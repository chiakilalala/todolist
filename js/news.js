//宣告

let _buttonSave = document.querySelector('.button-save');
let Alltext = document.querySelector('.task-title').value;
let Arrdata = [];
window.onload = function() {
    todo(); //get method
    tabCLick();
    del();
    btnDel();
    post();




}

//Applications監聽
_buttonSave.addEventListener('click', addData);
// _text.addEventListener('keydown', addData);


function todo() {
    fetch("https://fathomless-brushlands-42339.herokuapp.com/todo3")
        .then(response => {
            return response.json() //解析成一個json 物件

        })
        .then(data => {
            render(data)
            console.log(data);
            //addData(data);
            // getPencil();


        })
        .catch(error => console.log('error', error.message));
}

let render = (datas) => {
    console.log(datas);
    let Taskblock = document.querySelector(`.taskblock`);

    datas.forEach(data => {
        let oDiv = document.createElement(`div`);
        oDiv.className = "task";
        oDiv.innerHTML = `
          
                <!-- task content -->
              <div class="task-content">
                    <div class="task-col task-col-first">
                        <label class="task-checkbox">
                    <input type="checkbox">
                    <i class="fas fa-square"></i>
                </label>
                    </div>
                    <div class="task-col task-col-title" >
                        <input type="text" class="task-title" placeholder="feed my rabbit." value="${data.title}" >
                        <div class="task-info">
                            <div class="task-col">
                                <i class="far fa-calendar-alt"></i>
                                <span>${data.date}</span>
                            </div>
                               <div class="task-col">
                                <i class="far fa-file"></i>
                            </div>
                            <div class="task-col">
                                <i class="far fa-comment-dots"></i>
                            </div>
                        </div>
                    </div>
                    <div class="task-col task-col-last">
                        <i class="far fa-star"></i>
                        <i class="fas fa-pencil-alt"></i>
                    </div>
                </div> 

           <!-- task detail -->
                 <div class="task-detail">
                    <div class="task-form">
                        <div class="task-row">
                            <div class="task-form-header">
                                <i class="far fa-calendar-alt"></i>
                                <span>Deadline</span>
                            </div>
                            <div class="task-form-body">
                                <div class="task-form-date">
                                    <input type="date" value="${data.date}">
                                    <input type="time" value="${data.id}">
                                </div>
                            </div>
                        </div>
                        <div class="task-row">
                            <div class="task-form-header">
                                <i class="far fa-file"></i>
                                <span>File</span>
                            </div>
                            <div class="task-form-body">
                                <label class="task-form-file">
                            <input type="file">
                            <i class="fas fa-plus"></i>
                        </label>
                            </div>
                        </div>
                        <div class="task-row">
                            <div class="task-form-header">
                                <i class="far fa-comment-dots"></i>
                                <span>Comment</span>
                            </div>
                            <div class="task-form-body">
                                <div class="task-form-textarea">
                                    <textarea placeholder="Type Your Blahblahblah in here..."> ${data. comment}</textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="task-form-submit">
                        <a class="button button-cancel">
                            <i class="fas fa-times"></i>
                            <span>Cancel</span>
                        </a>
                        <a class="button button-save">
                            <i class="fas fa-check"></i>
                            <span>Save</span>
                        </a>
                    </div>
                </div>  
                
        `;
        Taskblock.appendChild(oDiv);
        getEdit();
        btnDel();
        checkbox();
        getStar();
    })


}


//第一個輸入鍵
function tabCLick() {
    let firstContent = document.querySelector('#js-content');
    firstContent.addEventListener('click', function() {
        document.querySelector('.task.task-add').classList.toggle('is-open');
    })

}
//

//第一個 刪除鍵
function del() {
    let deleteX = document.querySelector('.fas.fa-times');
    deleteX.addEventListener('click', function(e) {
        document.querySelector('.task.task-add').classList.remove('is-open');
    })
}

//紅色cancel 
function btnDel() {
    let buttonCancel = document.getElementsByClassName('button-cancel');
    Array.from(buttonCancel).forEach(el => {
        el.addEventListener('click', function(e) {
            // console.log(el);
            // console.log(this.parentNode.parentNode.parentNode);
            this.parentNode.parentNode.parentNode.classList.remove('is-open');
        });
    });

}

//edit icon  for toggle
function getEdit() {
    let pencil = document.getElementsByClassName('fa-pencil-alt');
    Array.from(pencil).forEach(el => {
        el.addEventListener('click', function(e) {
            // console.log(el);
            // console.log(this.parentNode.parentNode.parentNode);
            this.parentNode.parentNode.parentNode.classList.toggle('is-open');



        });
    });
}

//點擊就有刪除線
function checkbox() {
    let taskCheckbox = document.getElementsByClassName('fa-square');


    Array.from(taskCheckbox).forEach(el => {
        el.addEventListener('click', function(e) {
            console.log(el);

            // if (e.target.className == `fas fa-square`) {
            //     return;
            // }
            // console.dir(inputText);
            console.dir(this.parentNode.parentNode.nextElementSibling.children[0]);
            let inputText = this.parentNode.parentNode.nextElementSibling.children[0];

            if (inputText.className !== "task-title text-throng") {
                inputText.className = "task-title text-throng";
            } else {
                inputText.className = "task-title";
            }


        }, false)


    })


}

//點擊星星
function getStar() {
    let star = document.getElementsByClassName('fa-star');
    Array.from(star).forEach(el => {
        el.addEventListener('click', function(e) {
            // console.log(this.parentNode.parentNode.parentNode);
            this.parentNode.parentNode.parentNode.classList.toggle('is-highlight');
        });

    });
}
// function render(datas) {
//     console.log(datas);

// }

function post() {
    var myHeaders = new Headers();
    var urlencoded = new URLSearchParams();
    // 撈出輸入鍵的值

    let date = document.getElementById('j-date').value;
    let time = document.getElementById('j-time').value;
    let files = document.getElementById('files').value;
    let textarea = document.getElementById('task-form-textarea').textContent;


    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: encodeURI(JSON.stringify({
            title: Alltext,
            date: date,
            time: time,
            filte: files,
            comment: textarea,
            star: false,
            isCompleted: false
        })),
        redirect: 'follow'
    };

    fetch("https://fathomless-brushlands-42339.herokuapp.com/todo3", requestOptions)
        .then(response => {
            return response.json() //解析成一個json 物件

        })
        .then(data => {
            console.log(data);
            addData(data);
            // addData(data);
            // del();

            // console.log(pencil);
            // getPencil();
            // getStar();
            // btnDel();


            inProgress.addEventListener('click', function(e) {

                if (inProgress.className == "slelected") {
                    console.log(task);


                }

            })
        })
        .catch(error => console.log('error', error));
}


// render 畫面更新
function addData(obj) {
    // let v1;
    if (obj.keyCode !== 13 && obj.type == 'keydown') {
        return;
    };

    // 撈出輸入鍵的值
    let text = document.querySelector('.task-title').value;
    let date = document.getElementById('j-date').value;
    let time = document.getElementById('j-time').value;
    let files = document.getElementById('files').value;
    let textarea = document.getElementById('task-form-textarea').value;
    // console.log(date);
    // 因為要把輸入的值變成 陣列 所以製作一個空物件 
    let todo = {
        title: text,
        date: date,
        time: time,
        filte: files,
        comment: textarea,
        star: true,
        isCompleted: true

    };
    Arrdata.push(todo);
    // console.log(todoAry);


    render(Arrdata);


}