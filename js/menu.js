document.addEventListener("DOMContentLoaded", function () {
    let i = 1;
    let elMenu = document.querySelector(".menu");
    // elMenu.innerHTML += `<li><a href="../monthly.html">2022-04 (2)</a></li>`;

    fetch("/posts/list.json")
        .then((response) => response.json())
        .then((data) => {
            console.log("fetch 함수 내부 블럭", i++);
            let menuList = _.chain(data)
                .groupBy((p) => p.createdAt.substring(0, 7)) // YYYY-MM 으로 그루핑
                .map((postGroup, yearAndMonth) => {
                    return {
                        key: yearAndMonth,
                        url: `/monthly.html?yearAndMonth=${yearAndMonth}`,
                        postCount: postGroup.length,
                    };
                }) // map 함수로 그루핑된 데이터를 메뉴 데이터로 사용하기 좋은 형태로 가공
                .sortBy((menu) => menu.key) // 키를 기준으로 정렬
                .reverse() // 정렬된 것을 역순으로
                .value(); // 최종 배열형태로 값 가져옴

            for (const menuItem of menuList) {
                elMenu.innerHTML += `<li><a href="${menuItem.url}">${menuItem.key} (${menuItem.postCount})</a></li>`;
            }
        });

    // 비동기 테스트
    console.log("fetch 함수 이후 코드 블럭", i++);

    // jquery Ajax
    // $.ajax({
    //     type: "get",
    //     url: "/posts/list.json",
    //     success: function (response) {
    //         console.log(response);
    //     },
    // });
});
