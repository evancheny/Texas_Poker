/**
 * project:性感荷官 在线发牌
 * author:evan
 * time:2020-07-12
 * */

     // 花色
var aTypes = ['红桃', '黑桃', '方块', '梅花'],
    // 点数
    aPoints = ['A', 2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K',],
    // 德州扑克没有大王小王
    aCards = [],
    nPlayernumber = 0;//玩家数量

/**
 * 生成一副扑克牌 此时和新买的一样
 * @method fMakeCards
 */
function fMakeCards() {
    // 遍历所有花色与点数
    for (let i in aTypes) {
        for (let j in aPoints) {
            aCards.push(aTypes[i] + aPoints[j])
        }
    }
    console.log("生成的扑克牌为:", aCards);
}

/**
 * 洗牌
 * @method fWashaCards
 */
function fWashaCards() {
    // 遍历 aCards 数组
    for (let i = 0, len = aCards.length; i < len; i++) {
        // 生成一个随机的数组下标(0~53)
        var index = Math.floor(Math.random() * len);
        // 将当前遍历到的元素与随机下标处的元素交换位置
        var tmp = aCards[i];
        aCards[i] = aCards[index];
        aCards[index] = tmp;
    }
    console.log("洗了之后的牌", aCards);
}

/**
 * 发牌
 * @method fGiveCards
 * @param {int} _start 开始出
 * @param {int} _aCards_num 发多少张牌
 * @return {array} 返回发的牌
 */
function fGiveCards(_start, _aCards_num) {
    return aCards.splice(_start, _aCards_num);
}

/**
 * 游戏初始化
 * @method fInitGame
 */
function fInitGame() {
    nPlayernumber = Number($('#playerNumber').val());
    aCards.length = 0;
    $('#publicCards').val('');
    $('#playerCardsShowArea').empty();
    console.log("游戏的参与人数是", nPlayernumber);
    if (nPlayernumber > 1 && nPlayernumber < 10) {
        //生成一副新的扑克牌
        fMakeCards();
        //洗牌
        fWashaCards();
        //给玩家发牌
        for (let i = 0; i < nPlayernumber; i++) {
            let _html = '<div class="u-player-cards">' +
                '<p>玩家' + (i + 1) + '手牌</p>' +
                '<p class="u-cards-detail">' + fGiveCards(0, 2) + '</p>' +
                '</div>'
            $('#playerCardsShowArea').append(_html);
        }

        $('#playerCardsShowArea .u-cards-detail').hover(function () {
            $(this).css("opacity", "1");
        }, function () {
            $(this).css("opacity", "0");
        })

    } else {
        alert("参与人数不合法,请重新输入参与人数!")
    }


}

/**
 * 发公共牌
 * @method fSendPublicCards
 * @param {int} _num 发牌的数量
 */
function fSendPublicCards(_num) {
    nPlayernumber ? $('#publicCards').val($('#publicCards').val() + fGiveCards(0, 1)) : alert('游戏尚未初始化呢!');
}

/**
 * 重新开始游戏
 * @method fRestartGame
 */
function fRestartGame() {
    fInitGame();
}