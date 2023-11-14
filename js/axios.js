window.onload = () => {
    const searchInput = document.getElementById('searchInput');
    const results = document.getElementById('results');
    const pagination = document.getElementById('pagination');
    searchInput.addEventListener('input', async () => {
        let offset = 0;
        await axios({
            type: 'get',
            url: `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput.value}&apiKey=ba883262a53e4b948155f9ae2bfc1ac8`,
            headers: {
                "Content-Type": 'application/json'
            }
        }).then((response) => {
            // clear all pagination
            if (pagination.hasChildNodes()) {
                console.log("yessss");
                // while (pagination.firstChild) {
                //     pagination.removeChild(pagination.lastElementChild)
                // }
            }

            // count pages
            let totalPages = Math.ceil(response.data.totalResults / response.data.number)

            if (totalPages == 1) {
                let middles = document.createElement('div');
                middles.innerHTML = 0;
            }
            if (totalPages <= 15) {
                for (let i = 0; i < totalPages; i++) {
                    let middles = document.createElement('div');
                    middles.setAttribute('id', 'pages');
                    middles.innerHTML = i;
                    pagination.appendChild(middles);
                }
            }
            else {
                let first = document.createElement('div');
                first.innerHTML = '<<';
                first.setAttribute('id', 'first');
                pagination.appendChild(first);

                let previous = document.createElement('div');
                previous.innerHTML = '<';
                previous.setAttribute('id', 'previous');
                pagination.appendChild(previous);

                for (let i = offset; i < 15; i++) {
                    let middles = document.createElement('div');
                    middles.innerHTML = i;
                    middles.setAttribute('id', 'pages');
                    pagination.appendChild(middles);
                }

                let next = document.createElement('div');
                next.innerHTML = '>';
                next.setAttribute('id', 'next');
                pagination.appendChild(next);

                let last = document.createElement('div');
                last.innerHTML = '>>';
                last.setAttribute('id', 'last');
                pagination.appendChild(last);


                // ir a pagina 0
                response.data.results.forEach(element => {
                    let liContainer = document.createElement('li');
                    let innerLiContainer = document.createElement('div');
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


                const goToPage = async (offset) => {
                    await axios({
                        type: 'get',
                        url: `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput.value}&offset=${offset}&apiKey=ba883262a53e4b948155f9ae2bfc1ac8`,
                        headers: {
                            "Content-Type": 'application/json'
                        }
                    }).then((response) => {
                        if (pagination.hasChildNodes()) {
                            while (pagination.firstChild) {
                                pagination.removeChild(pagination.lastElementChild)
                            }
                        }
                        let totalPages = Math.ceil(response.data.totalResults / response.data.number)
                        if (totalPages == 1) {
                            let middles = document.createElement('div');
                            middles.setAttribute('id', 'pages');
                            middles.innerHTML = 0;
                        }
                        if (totalPages <= 15) {
                            for (let i = 0; i < totalPages; i++) {
                                let middles = document.createElement('div');
                                middles.innerHTML = i;
                            }
                        }
                        else {
                            let first = document.createElement('div');
                            first.innerHTML = '<<';
                            pagination.appendChild(first);

                            let previous = document.createElement('div');
                            previous.innerHTML = '<';
                            previous.setAttribute('id', 'previous');
                            pagination.appendChild(previous);

                            for (let i = offset; i < 15; i++) {
                                let middles = document.createElement('div');
                                middles.innerHTML = i;
                                middles.setAttribute('id', 'pages');
                                pagination.appendChild(middles);
                            }

                            let next = document.createElement('div');
                            next.innerHTML = '>';
                            next.setAttribute('id', 'next');
                            pagination.appendChild(next);

                            let last = document.createElement('div');
                            last.innerHTML = '>>';
                            last.innerHTML = totalPages;
                            pagination.appendChild(last);


                            // ir a pagina 0
                            response.data.results.forEach(element => {
                                let liContainer = document.createElement('li');
                                let innerLiContainer = document.createElement('div');
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
                        }
                    })
                }
                const previousButton = document.querySelector('#previous');
                const nextButton = document.querySelector('#next');
                previousButton.addEventListener('click', (offset) => {
                    console.log(offset)
                    throw error
                    goToPage(offset - 1);
                })

                nextButton.addEventListener('click', (offset) => {
                    goToPage(offset + 1);
                })
                $('#pages').on('click', () => {
                    console.log("pages click");
                    goToPage($(this).text());
                })
            }
        }).catch(error => console.error(error))
    })
}