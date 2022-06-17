document.querySelector('#map-tab').addEventListener('click', function (){
    // hide all the pages
    let pages = document.querySelectorAll('.page');
    for (let p of pages) {
        p.classList.remove('show')
        p.classList.add('hidden')
    }

    // //animate tab
    document.querySelector('#map-tab').classList.add('active')
    document.querySelector('#address-tab').classList.remove('active')


    // show map
    document.querySelector('#map-container').classList.add('show')
    console.log('hi2')
})

document.querySelector('#address-tab').addEventListener('click', function () {
    let pages = document.querySelectorAll('.page');
    for (let p of pages) {
        p.classList.remove('show')
        p.classList.add('hidden')
    }

    // show address
    document.querySelector('#home-address').classList.add('show')

    // //animate tab
    document.querySelector('#address-tab').classList.add('active')
    document.querySelector('#map-tab').classList.remove('active')

    console.log('hi2')
})