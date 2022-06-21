//create the searchbar (added here because hardcoded search bar which is translatedX will affect mobile responsiveness)
let searchbar = document.createElement('div')

document.querySelector('#map-tab').addEventListener('click', function (){
    //if error message exists, remove (see address-search.js)
    if(document.querySelector('#alert-div')) {
        document.querySelector('#home-address-search-container').removeChild(document.querySelector('#alert-div'))
    }
    // hide all the pages
    let pages = document.querySelectorAll('.page');
    for (let p of pages) {
        p.classList.remove('show')
        p.classList.add('hidden')
    }

    //animate tab
    document.querySelector('#map-tab').classList.add('active')
    document.querySelector('#address-tab').classList.remove('active')


    // show map
    document.querySelector('#map-container').classList.add('show')
    console.log('hi2')

    //show search
    document.querySelector('#search-container').classList.remove('search-hidden')
    document.querySelector('#search-container').classList.add('show')

    //create search
    document.createElement('div')


})

document.querySelector('#address-tab').addEventListener('click', function () {
    // hide all the pages
    let pages = document.querySelectorAll('.page');
    for (let p of pages) {
        p.classList.remove('show')
        p.classList.add('hidden')
    }

    // hide search
    document.querySelector('#search-container').classList.remove('show')
    document.querySelector('#search-container').classList.add('search-hidden')

    // show address
    document.querySelector('#home-address').classList.add('show')

    // //animate tab
    document.querySelector('#address-tab').classList.add('active')
    document.querySelector('#map-tab').classList.remove('active')

    console.log('hi2')
})