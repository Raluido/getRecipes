window.onload = () => {
    const searchInput = document.getElementById('searchInput');
    const results = document.getElementById('results');
    const pagination = document.getElementById('pagination');
    let offset = 0;
    searchInput.addEventListener('input', async () => {
        const initialPage = await axios({
            type: 'get',
            url: `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput.value}&apiKey=ba883262a53e4b948155f9ae2bfc1ac8`,
            headers: {
                "Content-Type": 'application/json'
            }
        }).then((response) => {
            if (pagination.isArray()) {
                pagination.forEach(element => {
                    element.removeChild(i)
                });
            }
            let totalPages = Math.ceil(response.data.totalResults / response.data.number)
            if (totalPages == 1) {
                let middles = document.createElement('div');
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
        }).catch(error => console.error(error))
    })
    const goToPage = async (offset) => {
        await axios({
            type: 'get',
            url: `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput.value}&apiKey=ba883262a53e4b948155f9ae2bfc1ac8`,
            headers: {
                "Content-Type": 'application/json'
            }
        }).then((response) => {
            
        })
    }
    const previousButton = document.querySelector('.previous');
    const nextButton = document.querySelector('.next');
    previousButton.addEventListener('click', (offset) => {
        goToPage(offset - 1);
    })

    nextButton.addEventListener('click', (offset) => {
        goToPage(offset + 1);
    })
}





// const startPaging = (dataOffset) => {
//     return new Promise((resolve, rejects) => {
//         axios({
//             type: 'get',
//             url: `https://api.spoonacular.com/recipes/complexSearch?query=${searchInput.value}&apiKey=ba883262a53e4b948155f9ae2bfc1ac8`,
//             headers: {
//                 "Content-Type": 'application/json'
//             },
//             params: {
//                 offset: dataOffset
//             }
//         }).then(response =>
//             console.log(response.data.results[0])
//             // response.data.results.forEach(element => {
//             //     let liContainer = document.createElement('li');
//             //     let innerLiContainer = document.createElement('div');
//             //     let divTextContainer = document.createElement('div');
//             //     let innerParagraphContainer = document.createElement('p');
//             //     let divImgContainer = document.createElement('div');
//             //     divImgContainer.setAttribute('class', 'imgContainer');
//             //     let innerImgContainer = document.createElement('img');
//             //     results.appendChild(liContainer);
//             //     liContainer.appendChild(innerLiContainer);
//             //     innerLiContainer.style.display = 'flex';
//             //     innerLiContainer.style.justifyContent = 'space-between';
//             //     innerLiContainer.appendChild(divTextContainer);
//             //     divTextContainer.style.margin = '0 1em 0 0';
//             //     divTextContainer.appendChild(innerParagraphContainer);
//             //     innerParagraphContainer.innerHTML = element.title;
//             //     innerLiContainer.appendChild(divImgContainer);
//             //     divImgContainer.appendChild(innerImgContainer);
//             //     innerImgContainer.setAttribute('src', element.image);
//             // })
//         ).catch(error => {
//             return rejects(error.message)
//         })
//     })
// }
// searchInput.addEventListener('input', async () => {
//     let dataHasMore = true;
//     let dataOffset = 0;
//     while (response.data.results); {
//         await startPaging(dataOffset).then((data) => {
//             dataOffset += 1;
//             if (dataOffset == 1) {
//                 data.results.forEach(element => {
//                     let liContainer = document.createElement('li');
//                     let innerLiContainer = document.createElement('div');
//                     let divTextContainer = document.createElement('div');
//                     let innerParagraphContainer = document.createElement('p');
//                     let divImgContainer = document.createElement('div');
//                     divImgContainer.setAttribute('class', 'imgContainer');
//                     let innerImgContainer = document.createElement('img');
//                     results.appendChild(liContainer);
//                     liContainer.appendChild(innerLiContainer);
//                     innerLiContainer.style.display = 'flex';
//                     innerLiContainer.style.justifyContent = 'space-between';
//                     innerLiContainer.appendChild(divTextContainer);
//                     divTextContainer.style.margin = '0 1em 0 0';
//                     divTextContainer.appendChild(innerParagraphContainer);
//                     innerParagraphContainer.innerHTML = element.title;
//                     innerLiContainer.appendChild(divImgContainer);
//                     divImgContainer.appendChild(innerImgContainer);
//                     innerImgContainer.setAttribute('src', element.image);
//                 })
//             }
//         })
//             .catch(error => {
//                 dataHasMore = false;
//                 console.error(error)
//             }
//             )
//     }
// })
// }
