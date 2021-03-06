let text = document.querySelector('.task-title').value;

window.onload = function() {





}


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
            title: text,
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
            // addData(data);
            // del();
            updateList(data);
            // console.log(pencil);
            // getPencil();
            // getStar();
            // btnDel();


            inProgress.addEventListener('click', function(e) {

                if (inProgress.className == "slelected") {
                    console.log(task);


                }

            })

            // checkbox();
            // console.log(taskCheckbox);




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
    let todo = {
        title: text,
        date: date,
        time: time,
        filte: files,
        comment: textarea,
        star: true,
        isCompleted: false

    };
    Arrdata.push(todo);
    // console.log(todoAry);

    // 因為要把輸入的值變成 陣列 所以製作一個空物件 
    updateList(Arrdata);


}

//更新資料
function updateList(data) {
    let Taskblock = document.querySelector(`.taskblock`);
    let len = data.length;
    let str = '';
    for (let i = 0; i < len; i++) {
        str += `
               <div class ="task ${data[i].star}" id="${data[i].id}">      
                <div class="task-content">
                    <div class="task-col task-col-first">
                        <label class="task-checkbox">
                    <input type="checkbox">
                    <i class="fas fa-square"></i>
                </label>
                    </div>
                    <div class="task-col task-col-title" >
                  
                        <input type="text" class="task-title" placeholder="" value ="${data[i].title}">
                        <div class="task-info">
                            <div class="task-col">
                                <i class="far fa-calendar-alt"></i>
                                <span>${data[i].date}</span>
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
                                    <input type="date">
                                    <input type="time">
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
                                    <textarea placeholder="Type Your Blahblahblah in here..."value="${data[i].comment}"></textarea>
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
                </div>
                `;
    }
    text.value = '';
    Taskblock.innerHTML = str;
    getPencil();
    getStar();
    btnDel();
    checkbox();
}