window.onload = () => {

    let magnifying = document.querySelector('#magnifying');
    let searchInputContainer = document.querySelector('.main .top');
    let searchInput = document.getElementById('searchInput');
    let results;
    let innerPagination;
    let previousButton;
    let nextButton;
    let gotToFirstButton;
    let gotToLastButton;
    let recipe;

    axios({
        type: 'get',
        url: `https://api.spoonacular.com/recipes/complexSearch?&apiKey=ba883262a53e4b948155f9ae2bfc1ac8`,
        headers: {
            "Content-Type": 'application/json'
        }
    }).then((response) => {
        let pageSelected = 1;
        reloadPage(response, pageSelected - 1);  // we want to start paging in 1 but offset start in 0
    }).catch(error => console.error(error))

    magnifying.addEventListener('click', () => {
        if (searchInputContainer.classList.contains('d-none')) {
            searchInputContainer.classList.remove('d-none');
            searchInputContainer.classList.add('d-block');
        } else {
            searchInputContainer.classList.remove('d-block');
            searchInputContainer.classList.add('d-none');
        }
        searchInput.addEventListener('input', () => {
            axios({
                type: 'get',
                url: `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput.value}&apiKey=ba883262a53e4b948155f9ae2bfc1ac8`,
                headers: {
                    "Content-Type": 'application/json'
                }
            }).then((response) => {
                let pageSelected = 1;
                reloadPage(response, pageSelected - 1);  // we want to start paging in 1 but offset start in 0
            }).catch(error => console.error(error))
        })
    })


    const reloadPage = (response, pageSelected) => {
        console.log("page Selected reload page " + pageSelected);
        console.log(response);

        results = document.getElementById('results');

        if (results.hasChildNodes()) {
            while (results.firstChild) {
                results.removeChild(results.firstChild)
            }
            console.log("results borrados " + results.firstElementChild);
        }

        console.log(response.data.results);

        // ir a pagina 0
        response.data.results.forEach(element => {
            let liContainer = document.createElement('li');
            let innerLiContainer = document.createElement('a');
            innerLiContainer.setAttribute('class', 'recipe');
            innerLiContainer.setAttribute('data-id', element.id);
            let divTextContainer = document.createElement('div');
            let innerParagraphContainer = document.createElement('p');
            let divImgContainer = document.createElement('div');
            divImgContainer.setAttribute('class', 'imgContainer');
            let innerImgContainer = document.createElement('img');
            results.appendChild(liContainer);
            liContainer.appendChild(innerLiContainer);
            innerLiContainer.style.display = 'flex';
            innerLiContainer.style.justifyContent = 'space-between';
            innerLiContainer.appendChild(divTextContainer);
            divTextContainer.style.margin = '0 1em 0 0';
            divTextContainer.appendChild(innerParagraphContainer);
            innerParagraphContainer.innerHTML = element.title;
            innerLiContainer.appendChild(divImgContainer);
            divImgContainer.appendChild(innerImgContainer);
            innerImgContainer.setAttribute('src', element.image);
        })

        innerPagination = document.getElementById('innerPagination');

        if (innerPagination.hasChildNodes()) {
            while (innerPagination.firstChild) {
                innerPagination.removeChild(innerPagination.firstChild)
            }
            console.log("innerPagination borrados " + innerPagination.firstElementChild);
        }

        let totalPages = Math.ceil(response.data.totalResults / response.data.number);
        console.log(totalPages);
        if (totalPages == 1) {
            let middle = document.createElement('div');
            middle.setAttribute('class', 'pages');
            middle.innerHTML = 0;
            innerPagination.appendChild(middle);
        }
        if (2 <= totalPages && totalPages <= 15) {
            console.log("menor de 15");
            for (let i = 0; i < totalPages; i++) {
                let middles = document.createElement('div');
                middle.setAttribute('class', 'pages');
                middles.innerHTML = i;
                innerPagination.appendChild(middles);
            }
        } else if (16 <= totalPages && totalPages <= 20) {
            console.log("16 a 20");
            let goToFirst = document.createElement('div');
            goToFirst.innerHTML = '<<';
            goToFirst.setAttribute('id', 'goToFirst');
            innerPagination.appendChild(goToFirst);

            let previous = document.createElement('div');
            previous.innerHTML = '<';
            previous.setAttribute('id', 'previous');
            innerPagination.appendChild(previous);

            if (pageSelected < 11) {

                for (let i = 1; i < 11; i++) {
                    let middles = document.createElement('div');
                    middles.innerHTML = i;
                    middles.setAttribute('class', 'pages');
                    innerPagination.appendChild(middles);
                }

                dots = document.createElement('div');
                dots.innerHTML = "...";
                innerPagination.appendChild(dots);

                let beforeLast = document.createElement('div');
                beforeLast.innerHTML = totalPages - 1;
                beforeLast.setAttribute('class', 'pages');
                innerPagination.appendChild(beforeLast);

                let last = document.createElement('div');
                last.innerHTML = totalPages;
                last.setAttribute('class', 'pages');
                innerPagination.appendChild(last);

            } else if (10 < pageSelected) {
                let first = document.createElement('div');
                first.innerHTML = 1;
                first.setAttribute('class', 'pages');
                innerPagination.appendChild(first);

                let second = document.createElement('div');
                second.innerHTML = 2;
                second.setAttribute('class', 'pages');
                innerPagination.appendChild(second);

                let dots = document.createElement('div');
                dots.innerHTML = "...";
                innerPagination.appendChild(dots);

                for (let i = 11; i <= totalPages; i++) {
                    let middles = document.createElement('div');
                    middles.innerHTML = i;
                    middles.setAttribute('class', 'pages');
                    innerPagination.appendChild(middles);
                }
            }

            let next = document.createElement('div');
            next.innerHTML = '>';
            next.setAttribute('id', 'next');
            innerPagination.appendChild(next);

            let goToLast = document.createElement('div');
            goToLast.innerHTML = '>>';
            goToLast.setAttribute('id', 'goToLast');
            innerPagination.appendChild(goToLast);

        } else if (21 <= totalPages && totalPages <= 26) {
            console.log("21 a 26");
            let goToFirst = document.createElement('div');
            goToFirst.innerHTML = '<<';
            goToFirst.setAttribute('id', 'goToFirst');
            innerPagination.appendChild(goToFirst);

            let previous = document.createElement('div');
            previous.innerHTML = '<';
            previous.setAttribute('id', 'previous');
            innerPagination.appendChild(previous);

            if (pageSelected < 8) {

                for (let i = 1; i < 8; i++) {
                    let middles = document.createElement('div');
                    middles.innerHTML = i;
                    middles.setAttribute('class', 'pages');
                    innerPagination.appendChild(middles);
                }

                dots = document.createElement('div');
                dots.innerHTML = "...";
                innerPagination.appendChild(dots);

                let beforeLast = document.createElement('div');
                beforeLast.innerHTML = totalPages - 1;
                beforeLast.setAttribute('class', 'pages');
                innerPagination.appendChild(beforeLast);

                let last = document.createElement('div');
                last.innerHTML = totalPages;
                last.setAttribute('class', 'pages');
                innerPagination.appendChild(last);

            } else if (7 < pageSelected <= 13) {
                let first = document.createElement('div');
                first.innerHTML = 1;
                first.setAttribute('class', 'pages');
                innerPagination.appendChild(first);

                let second = document.createElement('div');
                second.innerHTML = 2;
                second.setAttribute('class', 'pages');
                innerPagination.appendChild(second);

                let dots = document.createElement('div');
                dots.innerHTML = "...";
                innerPagination.appendChild(dots);

                for (let i = pageSelected - 3; i <= pageSelected + 3; i++) {
                    let middles = document.createElement('div');
                    middles.innerHTML = i;
                    middles.setAttribute('class', 'pages');
                    innerPagination.appendChild(middles);
                }

                dots = document.createElement('div');
                dots.innerHTML = "...";
                innerPagination.appendChild(dots);

                let beforeLast = document.createElement('div');
                beforeLast.innerHTML = totalPages - 1;
                beforeLast.setAttribute('class', 'pages');
                innerPagination.appendChild(beforeLast);

                let last = document.createElement('div');
                last.innerHTML = totalPages;
                last.setAttribute('class', 'pages');
                innerPagination.appendChild(last);

            } else if (13 < pageSelected) {
                let first = document.createElement('div');
                first.innerHTML = 1;
                first.setAttribute('class', 'pages');
                innerPagination.appendChild(first);

                let second = document.createElement('div');
                second.innerHTML = 2;
                second.setAttribute('class', 'pages');
                innerPagination.appendChild(second);

                let dots = document.createElement('div');
                dots.innerHTML = "...";
                innerPagination.appendChild(dots);

                for (let i = pageSelected; i <= totalPages; i++) {
                    let middles = document.createElement('div');
                    middles.innerHTML = i;
                    middles.setAttribute('class', 'pages');
                    innerPagination.appendChild(middles);
                }
            }

            let next = document.createElement('div');
            next.innerHTML = '>';
            next.setAttribute('id', 'next');
            innerPagination.appendChild(next);

            let goToLast = document.createElement('div');
            goToLast.innerHTML = '>>';
            goToLast.setAttribute('id', 'goToLast');
            innerPagination.appendChild(goToLast);

        } else if (27 <= totalPages) {
            console.log("mas de 27");
            let goToFirst = document.createElement('div');
            goToFirst.innerHTML = '<<';
            goToFirst.setAttribute('id', 'goToFirst');
            innerPagination.appendChild(goToFirst);

            let previous = document.createElement('div');
            previous.innerHTML = '<';
            previous.setAttribute('id', 'previous');
            innerPagination.appendChild(previous);

            if (pageSelected < 7) {
                console.log("menor que 8");
                for (let i = 1; i < 11; i++) {
                    let middles = document.createElement('div');
                    middles.innerHTML = i;
                    middles.setAttribute('class', 'pages');
                    innerPagination.appendChild(middles);
                }

                dots = document.createElement('div');
                dots.innerHTML = "...";
                innerPagination.appendChild(dots);

                let beforeLast = document.createElement('div');
                beforeLast.innerHTML = totalPages - 1;
                beforeLast.setAttribute('class', 'pages');
                innerPagination.appendChild(beforeLast);

                let last = document.createElement('div');
                last.innerHTML = totalPages;
                last.setAttribute('class', 'pages');
                innerPagination.appendChild(last);

            } else if (6 < pageSelected <= totalPages - 10) {
                console.log("mayor que 7");
                let first = document.createElement('div');
                first.innerHTML = 1;
                first.setAttribute('class', 'pages');
                innerPagination.appendChild(first);

                let second = document.createElement('div');
                second.innerHTML = 2;
                second.setAttribute('class', 'pages');
                innerPagination.appendChild(second);

                let dots = document.createElement('div');
                dots.innerHTML = "...";
                innerPagination.appendChild(dots);

                for (let i = pageSelected - 3; i <= pageSelected + 3; i++) {
                    let middles = document.createElement('div');
                    middles.innerHTML = i;
                    middles.setAttribute('class', 'pages');
                    innerPagination.appendChild(middles);
                }

                dots = document.createElement('div');
                dots.innerHTML = "...";
                innerPagination.appendChild(dots);

                let beforeLast = document.createElement('div');
                beforeLast.innerHTML = totalPages - 1;
                beforeLast.setAttribute('class', 'pages');
                innerPagination.appendChild(beforeLast);

                let last = document.createElement('div');
                last.innerHTML = totalPages;
                last.setAttribute('class', 'pages');
                innerPagination.appendChild(last);

            } else if (pageSelected > totalPages - 10) {
                let first = document.createElement('div');
                first.innerHTML = 1;
                first.setAttribute('class', 'pages');
                innerPagination.appendChild(first);

                let second = document.createElement('div');
                second.innerHTML = 2;
                second.setAttribute('class', 'pages');
                innerPagination.appendChild(second);

                let dots = document.createElement('div');
                dots.innerHTML = "...";
                innerPagination.appendChild(dots);

                for (let i = pageSelected; i <= totalPages; i++) {
                    let middles = document.createElement('div');
                    middles.innerHTML = i;
                    middles.setAttribute('class', 'pages');
                    innerPagination.appendChild(middles);
                }
            }

            let next = document.createElement('div');
            next.innerHTML = '>';
            next.setAttribute('id', 'next');
            innerPagination.appendChild(next);

            let goToLast = document.createElement('div');
            goToLast.innerHTML = '>>';
            goToLast.setAttribute('id', 'goToLast');
            innerPagination.appendChild(goToLast);
        }

        // print innerPagination
        previousButton = document.querySelector('#previous');
        nextButton = document.querySelector('#next');
        gotToFirstButton = document.querySelector('#goToFirst');
        gotToLastButton = document.querySelector('#goToLast');
        recipe = document.querySelector('#recipe');

        previousButton.addEventListener('click', (pageSelected) => {
            pageSelected -= 1;
            console.log(pageSelected);
            goToPage(pageSelected);
        })
        nextButton.addEventListener('click', (pageSelected) => {
            pageSelected += 1;
            goToPage(pageSelected + 1);
        })
        gotToFirstButton.addEventListener('click', () => {
            goToPage();
        })
        gotToLastButton.addEventListener('click', () => {
            goToPage();
        })
        $('.pages').on('click', function () {
            console.log("enviando a pagina " + $(this).text());
            goToPage($(this).text());
        })

        // print links to recipe
        $('.recipe').on('click', function () {
            let dataId = this.getAttribute('data-id');
            goToRecipe(dataId);
        });
    }

    const goToPage = (pageSelected) => {
        console.log("page Selected en goto" + pageSelected);
        axios({
            type: 'get',
            url: `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput.value}&offset=${pageSelected}&apiKey=ba883262a53e4b948155f9ae2bfc1ac8`,
            headers: {
                "Content-Type": 'application/json'
            }
        }).then((response) => {
            reloadPage(response, pageSelected - 1);
            console.log("fin");
        }).catch(error => console.error(error))
    }

    const goToRecipe = (dataId) => {
        axios({
            type: 'get',
            url: `https://api.spoonacular.com/recipes/${dataId}/information?includeNutrition=false&apiKey=ba883262a53e4b948155f9ae2bfc1ac8`,
            headers: {
                "Content-Type": 'application/json'
            }
        }).then((response) => {

            if (results.hasChildNodes()) {
                while (results.firstChild) {
                    results.removeChild(results.firstChild)
                }
                console.log("results borrados " + results.firstElementChild);
            }

            if (innerPagination.hasChildNodes()) {
                while (innerPagination.firstChild) {
                    innerPagination.removeChild(innerPagination.firstChild)
                }
                console.log("innerPagination borrados " + innerPagination.firstElementChild);
            }

            console.log(response.data);

            let recipe = document.createElement('div');
            recipe.setAttribute('class', 'recipeSelected');
            let diet = document.createElement('p');
            diet.innerHTML = "Dieta: "
            response.data.diets.forEach(subelement => {
                diet.innerHTML += '/' + subelement;
            })
            let titleContainer = document.createElement('div');
            let title = document.createElement('h4');
            title.innerHTML = response.data.title;
            let imgContainer = document.createElement('div');
            imgContainer.style.width = '100%';
            imgContainer.style.height = 'auto';
            let img = document.createElement('img');
            img.setAttribute('src', response.data.image);
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.margin = '2em 0';
            let instructions = document.createElement('div');
            instructions.innerHTML = response.data.instructions;
            results.appendChild(recipe);
            results.appendChild(imgContainer);
            imgContainer.appendChild(img);
            recipe.appendChild(diet);
            recipe.appendChild(titleContainer);
            titleContainer.appendChild(title);
            recipe.appendChild(imgContainer);
            recipe.appendChild(instructions);

        }).catch(error => console.error(error))
    }

}