// variables

let work_title = document.querySelector('#work')
let break_title = document.querySelector('#break')

let work_time = 25
let break_time = 5

let seconds = '00'


// display

window.onload = () => {
    document.querySelector('#mins').innerHTML = work_time
    document.querySelector('#secs').innerHTML = seconds

    work_title.classList.add('active')
}


// start timer

document.getElementById('start').addEventListener('click', function(e){

    // enable reset button
    document.getElementById('start').style.display = "None"
    document.getElementById('reset').style.display = "block"



    // change the time
    seconds = 59

    let work_mins = work_time - 1
    let break_mins = break_time - 1

    bcount = 0

    //countdown

    let timerfunction = () => {
        // update the display

        document.querySelector('#mins').innerHTML = work_mins
        document.querySelector('#secs').innerHTML = seconds

        // start
        seconds = seconds - 1
        if(seconds === 0) {
            work_mins = work_mins - 1
            if(work_mins === -1) {
                if(bcount % 2 === 0) {
                    // start break
                    work_mins = break_mins
                    bcount++

                    //change the panel
                    work_title.classList.remove('active')
                    break_title.classList.add('active')

                }else {
                    //continue work
                    work_mins = work_time
                    bcount++

                    // change the panel
                    break_title.classList.remove('active')
                    work_title.classList.add('active')
                }
            }
            seconds = 59
        }


    }


    //start countdown -- loop

    setInterval(timerfunction, 1000) // 1000ms = 1s
})


// Settings modal
const settingsModal = document.createElement('div')
settingsModal.id = 'settingsModal'
settingsModal.classList.add('modal')

settingsModal.innerHTML =`
    <div class="modal-content">
        <span class="close" id="closeModal">&times;</span>
        <label for="workTimeInput">Work Time (minutes):</label>
        <input type="number" id="workTimeInput" value="${work_time}">
        <label for="breakTimeInput">Break Time (minutes):</label>
        <input type="number" id="breakTimeInput" value="${break_time}">
        <button id="applySettings">Apply</button>
    </div>
`
document.body.appendChild(settingsModal)

// Open Settings Modal
document.getElementById('settings').addEventListener('click', function() {
    settingsModal.style.display = 'block'
});

// Close Settings Modal
document.getElementById('closeModal').addEventListener('click', function() {
    settingsModal.style.display = 'none'
});

// Apply Settings
document.getElementById('applySettings').addEventListener('click', function() {
    work_time = parseInt(document.getElementById('workTimeInput').value) || 25
    break_time = parseInt(document.getElementById('breakTimeInput').value) || 5

    document.querySelector('#mins').innerHTML = work_time
    document.querySelector('#secs').innerHTML = '00'

    settingsModal.style.display = 'none'
})

