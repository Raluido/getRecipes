window.onload = () => {
    const searchInput = document.getElementById('searchInput');
    const results = document.getElementById('results');
    const pagination = document.getElementById('pagination');
    searchInput.addEventListener('input', () => {
        axios({
            type: 'get',
            url: `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput.value}&apiKey=ba883262a53e4b948155f9ae2bfc1ac8`,
            headers: {
                "Content-Type": 'application/json'
            }
        }).then((response) => {
            let pageSelected = 0;
            reloadPage(response, pageSelected);
            const goToPage = (pageSelected) => {
                console.log("page Selected en goto" + pageSelected);
                axios({
                    type: 'get',
                    url: `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput.value}&offset=${pageSelected}&apiKey=ba883262a53e4b948155f9ae2bfc1ac8`,
                    headers: {
                        "Content-Type": 'application/json'
                    }
                }).then((response) => {
                    reloadPage(response);
                }).catch(error => console.error(error))
            }
            const previousButton = document.querySelector('#previous');
            const nextButton = document.querySelector('#next');
            previousButton.addEventListener('click', (pageSelected) => {
                pageSelected -= 1;
                goToPage(pageSelected);
            })

            nextButton.addEventListener('click', (pageSelected) => {
                pageSelected += 1;
                goToPage(pageSelected + 1);
            })
            $('#pages').on('click', function () {
                goToPage($(this).text());
            })
        }).catch(error => console.error(error))
    })
    const reloadPage = (response, pageSelected) => {
        console.log("page Selected reload page" + pageSelected);
        if (pagination.hasChildNodes()) {
            for (const child of pagination.children) {
                pagination.removeChild(child)
            }
        }

        let totalPages = Math.ceil(response.data.totalResults / response.data.number)
        if (totalPages == 1) {
            let middle = document.createElement('div');
            middle.setAttribute('id', 'pages');
            middle.innerHTML = 0;
            pagination.appendChild(middle);
        }
        if (1 < totalPages < 16) {
            for (let i = 0; i < totalPages; i++) {
                let middles = document.createElement('div');
                middles.innerHTML = i;
                pagination.appendChild(middles);
            }
        }
        else if (totalPages >= 16) {
            let goToFirst = document.createElement('div');
            goToFirst.innerHTML = '<<';
            goToFirst.setAttribute('id', 'goToFirst');
            pagination.appendChild(goToFirst);

            let previous = document.createElement('div');
            previous.innerHTML = '<';
            previous.setAttribute('id', 'previous');
            pagination.appendChild(previous);

            if (pageSelected < 11) {
                let first = document.createElement('div');
                first.innerHTML = 1;
                first.setAttribute('id', 'pages');
                pagination.appendChild(first);

                let second = document.createElement('div');
                second.innerHTML = 2;
                second.setAttribute('id', 'pages');
                pagination.appendChild(second);

                let dots = document.createElement('div');
                dots.innerHTML = "...";
                pagination.appendChild(dots);

                for (let i = pageSelected; i < totalPages; i++) {
                    let middles = document.createElement('div');
                    middles.innerHTML = i;
                    middles.setAttribute('id', 'pages');
                    pagination.appendChild(middles);
                }
            } else if (11 <= pageSelected < 20) {
                for (let i = 0; i < 11; i++) {
                    let middles = document.createElement('div');
                    middles.innerHTML = i;
                    middles.setAttribute('id', 'pages');
                    pagination.appendChild(middles);
                }

                dots = document.createElement('div');
                dots.innerHTML = "...";
                pagination.appendChild(dots);

                let beforeLast = document.createElement('div');
                beforeLast.innerHTML = totalPages - 1;
                beforeLast.setAttribute('id', 'pages');
                pagination.appendChild(beforeLast);

                let last = document.createElement('div');
                last.innerHTML = totalPages;
                last.setAttribute('id', 'pages');
                pagination.appendChild(last);
            } else {
                let first = document.createElement('div');
                first.innerHTML = 1;
                first.setAttribute('id', 'pages');
                pagination.appendChild(first);

                let second = document.createElement('div');
                second.innerHTML = 2;
                second.setAttribute('id', 'pages');
                pagination.appendChild(second);

                let dots = document.createElement('div');
                dots.innerHTML = "...";
                pagination.appendChild(dots);

                for (let i = pageSelected - 3; i < pageSelected + 3; i++) {
                    let middles = document.createElement('div');
                    middles.innerHTML = i;
                    middles.setAttribute('id', 'pages');
                    pagination.appendChild(middles);
                }

                dots = document.createElement('div');
                dots.innerHTML = "...";
                pagination.appendChild(dots);

                let beforeLast = document.createElement('div');
                beforeLast.innerHTML = totalPages - 1;
                beforeLast.setAttribute('id', 'pages');
                pagination.appendChild(beforeLast);

                let last = document.createElement('div');
                last.innerHTML = totalPages;
                last.setAttribute('id', 'pages');
                pagination.appendChild(last);
            }

            let next = document.createElement('div');
            next.innerHTML = '>';
            next.setAttribute('id', 'next');
            pagination.appendChild(next);

            let goToLast = document.createElement('div');
            goToLast.innerHTML = '>>';
            goToLast.setAttribute('id', 'goToLast');
            pagination.appendChild(goToLast);
        }
    }
}